import { describe, expect, it } from 'vitest';
import { createScopePresentation, getScopeLabel, getScopePresentationKey } from './scope-presentation';

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
    expect(createScopePresentation().associated.enabled).toBe(true);
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

  it('returns generic defaults when no instance overrides are supplied', () => {
    const defaults = createScopePresentation();
    expect(defaults.primary.label).toBe('Organismos principales');
    expect(defaults.associated.label).toBe('Organismos asociados');
    expect(defaults.all.label).toBe('Todos los organismos');
  });
});
