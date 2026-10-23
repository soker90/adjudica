import fs from 'node:fs';
import path from 'node:path';

export type OrigenFuente = string;

export interface ContratoFuenteExterna {
  id: string;
  expediente: string;
  objeto: string;
  organismoEmisor: string;
  enteBeneficiario: string;
  tipoContrato: string;
  procedimiento: string;
  importe: number;
  adjudicatario: string;
  nifAdjudicatario?: string;
  fecha: string;
  ano: number;
  origenFuente: OrigenFuente;
  esMenor: boolean;
  estadoIntegracion: 'integrado' | 'externo_aislado' | 'posible_duplicado';
  urlFuente?: string;
  observaciones: string;
}

export interface AuditoriaCoberturaHistorica {
  periodo: string;
  anos: string;
  estado: 'no_estructurada' | 'cobertura_completa' | 'parcial';
  fuentePrincipal: string;
  formatoOriginal: string;
  motivoJuridico: string;
  analisisTecnico: string;
  recomendacionTransparencia: string;
}

interface HistoricalData {
  periods?: AuditoriaCoberturaHistorica[];
  catalog?: ContratoFuenteExterna[];
}

function readHistoricalData(): HistoricalData {
  const configuredPath = process.env.ADJUDICA_HISTORICAL_DATA_PATH;
  const dataPath = path.resolve(configuredPath || path.join(process.cwd(), 'data', 'historical-sources.json'));
  if (!fs.existsSync(dataPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8')) as HistoricalData;
  } catch (error) {
    console.error(`Could not read historical source data at ${dataPath}`, error);
    return {};
  }
}

const historicalData = readHistoricalData();
export const AUDITORIA_PERIODOS = historicalData.periods || [];
export const CONTRATOS_EXTERNOS_CATALOGO = historicalData.catalog || [];

export interface ResultadoDeduplicacion {
  esDuplicado: boolean;
  motivo?: string;
  expedienteCoincidente?: string;
  similitudObjeto?: number;
}

export function verificarDuplicidadFuente(
  contratoExterno: { expediente: string; objeto: string; importe: number; nifAdjudicatario?: string },
  contratosPlacsp: { expediente: string; objeto: string; importe_adjudicacion?: number | null; nif_adjudicatario?: string | null; award_amount_type?: 'total' | 'unitario' | 'desconocido' | null }[]
): ResultadoDeduplicacion {
  const expediente = (contratoExterno.expediente || '').trim().toLowerCase();
  for (const contract of contratosPlacsp) {
    const placspExpediente = (contract.expediente || '').trim().toLowerCase();
    if (expediente && placspExpediente && expediente === placspExpediente) {
      return { esDuplicado: true, motivo: 'Mismo código de expediente', expedienteCoincidente: contract.expediente, similitudObjeto: 1 };
    }
    const nifExterno = (contratoExterno.nifAdjudicatario || '').trim().toUpperCase();
    const nifPlacsp = (contract.nif_adjudicatario || '').trim().toUpperCase();
    const amount = contract.importe_adjudicacion || 0;
    const comparable = contract.award_amount_type == null || contract.award_amount_type === 'total';
    if (comparable && nifExterno && nifExterno === nifPlacsp && contratoExterno.importe > 0 && Math.abs(contratoExterno.importe - amount) < 1) {
      const similarity = jaccard(contratoExterno.objeto, contract.objeto);
      if (similarity >= 0.35) {
        return { esDuplicado: true, motivo: 'Coinciden adjudicatario, importe y objeto', expedienteCoincidente: contract.expediente, similitudObjeto: Math.round(similarity * 100) / 100 };
      }
    }
  }
  return { esDuplicado: false };
}

function jaccard(left: string, right: string): number {
  const words = (value: string) => new Set((value || '').toLowerCase().replace(/[^a-z0-9áéíóúñ]/gi, ' ').split(/\s+/).filter(word => word.length > 3));
  const a = words(left);
  const b = words(right);
  if (!a.size || !b.size) return 0;
  const intersection = [...a].filter(word => b.has(word)).length;
  return intersection / new Set([...a, ...b]).size;
}

export function getAuditoriaFuentesStats() {
  const grouped = new Map<string, ContratoFuenteExterna[]>();
  for (const contract of CONTRATOS_EXTERNOS_CATALOGO) {
    const contracts = grouped.get(contract.origenFuente) || [];
    contracts.push(contract);
    grouped.set(contract.origenFuente, contracts);
  }
  const minors = CONTRATOS_EXTERNOS_CATALOGO.filter(contract => contract.esMenor);
  return {
    totalExternos: CONTRATOS_EXTERNOS_CATALOGO.length,
    volumenTotalExternos: CONTRATOS_EXTERNOS_CATALOGO.reduce((sum, contract) => sum + contract.importe, 0),
    desgloseFuentes: [...grouped.entries()].map(([fuente, contracts]) => ({
      fuente,
      contratos: contracts.length,
      volumen: contracts.reduce((sum, contract) => sum + contract.importe, 0),
    })),
    totalMenoresExternos: minors.length,
    volumenMenoresExternos: minors.reduce((sum, contract) => sum + contract.importe, 0),
    periodos: AUDITORIA_PERIODOS,
    catalogo: CONTRATOS_EXTERNOS_CATALOGO,
  };
}
