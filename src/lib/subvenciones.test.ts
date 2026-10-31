import { describe, it, expect } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { ensureSubvencionesTable, getSubvencionesByNifs } from './db';
import { buildTargetPatterns, isTargetOrgan, normalizeMatchText } from '../../scripts/sync-subvenciones';
import { SITE_CONFIG } from './site-config';

describe('Integración BDNS - Subvenciones Públicas (Issue #17)', () => {
  describe('isTargetAuthorityOrgan', () => {
    it('detecta entes y convocatorias del organismo configurado', () => {
      expect(isTargetOrgan({ nivel3: 'AYUNTAMIENTO DE AMBITO CONFIGURADO' }, ['AYUNTAMIENTO DE AMBITO CONFIGURADO'])).toBe(true);
      expect(isTargetOrgan({ nivel2: 'AMBITO CONFIGURADO' }, ['AMBITO CONFIGURADO'])).toBe(true);
      const localityName = SITE_CONFIG.localityName || 'Municipio de Prueba';
    expect(isTargetOrgan({ nivel1: 'LOCAL', convocatoria: `Ayudas municipales directas del Ayuntamiento de ${localityName}` }, [`AYUNTAMIENTO DE ${normalizeMatchText(localityName)}`])).toBe(true);
    });

    it('no clasifica entes externos como el ámbito configurado', () => {
      expect(isTargetOrgan({ nivel1: 'AUTONOMICA', nivel2: 'CASTILLA-LA MANCHA', nivel3: 'CONSEJERÍA DE ECONOMÍA' }, ['AYUNTAMIENTO DE AMBITO CONFIGURADO'])).toBe(false);
      expect(isTargetOrgan({ nivel1: 'ESTADO', nivel2: 'MINISTERIO DE HACIENDA' }, ['AYUNTAMIENTO DE AMBITO CONFIGURADO'])).toBe(false);
    });
  });

  describe('buildTargetPatterns', () => {
    it('deriva la nomenclatura municipal que usa BDNS desde las autoridades de PLACSP', () => {
      const localityName = SITE_CONFIG.localityName || 'Municipio de Prueba';
      const authorityName = `Concejalía Delegada de Contratación del Ayuntamiento de ${localityName}`;
      const municipality = normalizeMatchText(localityName);
      const patterns = buildTargetPatterns([{ name: authorityName }]);

      expect(patterns).toContain(normalizeMatchText(authorityName));
      expect(patterns).toContain(`AYUNTAMIENTO DE ${municipality}`);
      expect(patterns).toContain(municipality);
    });
  });

  describe('getSubvencionesByNifs', () => {
    it('crea la tabla subvenciones y agrega correctamente concesiones por CIF', () => {
      const db = new DatabaseSync(':memory:');
      ensureSubvencionesTable(db);

      // Insertar datos de prueba
      db.prepare(`
        INSERT INTO grants (
          bdns_id, award_code, beneficiary_nif, beneficiary,
          granting_authority, granting_authority_level_1, granting_authority_level_2, granting_authority_level_3,
          amount, grant_date, instrument, call, is_target_authority
        ) VALUES 
        (1001, 'SB01', 'B13016415', 'INTEDHOR SL', 'INSTITUTO REGIONAL SSL', 'AUTONOMICA', 'CASTILLA-LA MANCHA', 'IRSSL', 2500, '2024-05-10', 'Subvención', 'CLM Más Segura', 0),
        (1002, 'SB02', 'B13016415', 'INTEDHOR SL', 'MINISTERIO ENERGIA', 'ESTADO', 'MINISTERIO', 'DG', 15000, '2023-11-20', 'Subvención', 'RECORE', 0),
        (1003, 'SB03', 'B13016415', 'INTEDHOR SL', 'AYUNTAMIENTO AMBITO CONFIGURADO', 'LOCAL', 'ÁMBITO CONFIGURADO', 'AYTO', 3000, '2022-04-15', 'Subvención', 'Ayuda Local', 1);
      `).run();

      const res = getSubvencionesByNifs(db, ['B13016415']);

      expect(res.total).toBe(3);
      expect(res.volumenTotal).toBe(20500);
      expect(res.totalTargetAuthority).toBe(1);
      expect(res.volumenTargetAuthority).toBe(3000);
      expect(res.totalOtras).toBe(2);
      expect(res.volumenOtras).toBe(17500);
      expect(res.items.length).toBe(3);
      expect(res.items[0].grant_date).toBe('2024-05-10'); // Orden cronológico descendente
    });

    it('devuelve estructura vacía si no hay NIFs válidos o no constan registros', () => {
      const db = new DatabaseSync(':memory:');
      ensureSubvencionesTable(db);

      const emptyRes = getSubvencionesByNifs(db, ['A00000000']);
      expect(emptyRes.total).toBe(0);
      expect(emptyRes.volumenTotal).toBe(0);
      expect(emptyRes.items).toEqual([]);

      const invalidRes = getSubvencionesByNifs(db, ['***123***']);
      expect(invalidRes.total).toBe(0);
    });
  });
});
