import { describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { getContractIdentityKey } = require('./contract-identity');

describe('contract identity', () => {
  it('is deterministic for the same expediente and organism', () => {
    expect(getContractIdentityKey('12/2022 Patrimonial', 'organismo configurado'))
      .toBe(getContractIdentityKey('12/2022 Patrimonial', 'organismo configurado'));
  });

  it('separates contracts that share a PLACSP source id', () => {
    expect(getContractIdentityKey('12/2022 Patrimonial', 'organismo configurado'))
      .not.toBe(getContractIdentityKey('3/2023 Patrimonial', 'organismo configurado'));
  });

  it('separates the same expediente across different organisms', () => {
    expect(getContractIdentityKey('1/2023', 'organismo configurado'))
      .not.toBe(getContractIdentityKey('1/2023', 'organismo configurado'));
  });
});
