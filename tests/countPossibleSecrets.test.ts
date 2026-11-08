import { describe, expect, it } from 'vitest';
import { countPossibleSecrets } from '../src/logic/countPossibleSecrets';

describe('countPossibleSecrets', () => {
  (it('should return a number', () => {
    expect(typeof countPossibleSecrets(2, 2)).toBe('number');
  }),
    it('should return 2 for length 2 and base 2', () => {
      expect(countPossibleSecrets(2, 2)).toBe(2);
    }),
    it('should return 56 for length 2 and base 8', () => {
      expect(countPossibleSecrets(2, 8)).toBe(56);
    }));
  it('should return 5040 for length 4 and base 10', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });
  it('should return 43680 for length 4 and base 16', () => {
    expect(countPossibleSecrets(4, 16)).toBe(43680);
  });
  it('should return 3628800 when length equals base 10', () => {
    expect(countPossibleSecrets(10, 10)).toBe(3628800);
  });
  it('should return 40320 when length equals base 8', () => {
    expect(countPossibleSecrets(8, 8)).toBe(40320);
  });
});
