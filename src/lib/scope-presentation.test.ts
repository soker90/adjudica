import { describe, expect, it } from 'vitest';
import { getScopeLabel, getScopePresentationKey } from './scope-presentation';

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

  it('returns generic configured labels for each scope', () => {
    expect(getScopeLabel('directa')).toBe('Organismos principales');
    expect(getScopeLabel('mancomunidad')).toBe('Organismos asociados');
    expect(getScopeLabel('todos')).toBe('Todos los organismos');
  });
});
