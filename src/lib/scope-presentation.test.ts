import { describe, expect, it } from 'vitest';
import { createScopePresentation, getScopeLabel, getScopePresentationKey, SCOPE_PRESENTATION } from './scope-presentation';

describe('scope presentation', () => {
  it.each([
    ['directa', 'primary'],
    ['Directa Municipal', 'primary'],
    ['mancomunidad', 'associated'],
    ['Indirecta (Mancomunidad)', 'associated'],
    ['todos', 'all'],
    ['', 'all'],
  ] as const)('maps %s to %s', (scope, expected) => {
    expect(getScopePresentationKey(scope)).toBe(expected);
  });

  it('keeps the associated group visible by default', () => {
    expect(SCOPE_PRESENTATION.associated.enabled).toBe(true);
  });

  it('applies instance labels and can hide an unused associated group', () => {
    const presentation = createScopePresentation({
      primary: { label: 'Ayuntamiento y entes municipales' },
      associated: { enabled: false, label: 'Comsermancha (21 municipios)' },
      all: { label: 'Toda la contratación' },
    });

    expect(presentation.primary.label).toBe('Ayuntamiento y entes municipales');
    expect(presentation.associated.label).toBe('Comsermancha (21 municipios)');
    expect(presentation.associated.enabled).toBe(false);
    expect(presentation.all.label).toBe('Toda la contratación');
  });

  it('returns generic configured labels for each scope', () => {
    expect(getScopeLabel('directa')).toBe('Organismos principales');
    expect(getScopeLabel('mancomunidad')).toBe('Organismos asociados');
    expect(getScopeLabel('todos')).toBe('Todos los organismos');
  });
});
