import { describe, it, expect } from 'vitest';
import {
  AUDITORIA_PERIODOS,
  CONTRATOS_EXTERNOS_CATALOGO,
  verificarDuplicidadFuente,
  getAuditoriaFuentesStats,
} from './fuentes-historicas';

describe('fuentes históricas configurables por instancia', () => {
  it('no incluye datos de una instancia si no se ha configurado un catálogo', () => {
    expect(AUDITORIA_PERIODOS).toEqual([]);
    expect(CONTRATOS_EXTERNOS_CATALOGO).toEqual([]);
    expect(getAuditoriaFuentesStats().totalExternos).toBe(0);
  });

  it('detecta duplicidades por número de expediente', () => {
    const result = verificarDuplicidadFuente(
      { expediente: 'EXP-100', objeto: 'Obras', importe: 50000 },
      [{ expediente: 'EXP-100', objeto: 'Obras públicas', importe_adjudicacion: 50000 }]
    );
    expect(result.esDuplicado).toBe(true);
    expect(result.expedienteCoincidente).toBe('EXP-100');
  });

  it('detecta duplicidades por contratista, importe y similitud del objeto', () => {
    const result = verificarDuplicidadFuente(
      { expediente: 'EXT-55', objeto: 'Pavimentación y reasfaltado de vías públicas', importe: 215000, nifAdjudicatario: 'A13019872' },
      [{ expediente: 'EXP-12', objeto: 'Pavimentación y reasfaltado de vías públicas', importe_adjudicacion: 215000, nif_adjudicatario: 'A13019872' }]
    );
    expect(result.esDuplicado).toBe(true);
  });

  it('no deduplica importes unitarios por coincidencia económica', () => {
    const result = verificarDuplicidadFuente(
      { expediente: 'EXT-01', objeto: 'Servicio de mantenimiento', importe: 450, nifAdjudicatario: 'B12345678' },
      [{ expediente: 'EXP-01', objeto: 'Servicio de mantenimiento', importe_adjudicacion: 450, nif_adjudicatario: 'B12345678', award_amount_type: 'unitario' }]
    );
    expect(result.esDuplicado).toBe(false);
  });
});
