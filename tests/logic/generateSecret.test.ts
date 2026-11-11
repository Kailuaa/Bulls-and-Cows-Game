import { describe, it, expect, vi } from 'vitest';
import { generateSecret } from '../../src/logic/generateSecret';

describe('generateSecret', () => {
  (it('should return a string', () => {
    const secret = generateSecret(4, 10, () => 0);

    expect(typeof secret).toBe('string');
  }),
    it('should generate a secrete with required length', () => {
      const secret = generateSecret(4, 10, () => 0);

      expect(secret).toHaveLength(4);
    }),
    it('should generate a secrete with unique digits', () => {
      const secret = generateSecret(4, 10, () => 0);
      const uniqueDigits = new Set(secret);

      expect(uniqueDigits.size).toBe(secret.length);
    }),
    it('should generate valid binary digits', () => {
      const secret = generateSecret(2, 2, () => 0);

      expect(secret).toMatch(/^[01]{2}$/);
    }),
    it('should allow zero as the first digit', () => {
      const secret = generateSecret(4, 10, () => 0.99);

      expect(secret[0]).toBe('0');
    }),
    it('should generate hexadecimal digits in lowerCase', () => {
      const secret = generateSecret(4, 10, () => 0);

      expect(secret).toBe(secret.toLowerCase());
    }),
    it('should use random', () => {
      const random = vi.fn(() => 0);
      generateSecret(4, 10, random);

      expect(random).toHaveBeenCalled();
    }));
});
