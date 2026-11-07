import { describe, expect, it } from 'vitest';
import { createDigitValidator } from '../src/logic/createDigitValidator';

describe('createDigitValidator', () => {
  (it('should return a functions', () => {
    const validator = createDigitValidator(10);

    expect(typeof validator).toBe('function');
  }),
    it('should validate binary digits 0-1', () => {
      const validator = createDigitValidator(2);

      expect(validator('0')).toBe(true);
      expect(validator('1')).toBe(true);
      expect(validator('2')).toBe(false);
      expect(validator('A')).toBe(false);
    }),
    it('should validate octal digits 0-7', () => {
      const validator = createDigitValidator(8);

      (expect(validator('0')).toBe(true),
        expect(validator('7')).toBe(true),
        expect(validator('8')).toBe(false),
        expect(validator('C')).toBe(false));
    }),
    it('should validate decimal digits 0-9', () => {
      const validator = createDigitValidator(10);

      (expect(validator('0')).toBe(true),
        expect(validator('9')).toBe(true),
        expect(validator('11')).toBe(false),
        expect(validator('C')).toBe(false));
    }),
    it('should validate hexadecimal digits ', () => {
      const validator = createDigitValidator(16);

      (expect(validator('0')).toBe(true),
        expect(validator('9')).toBe(true),
        expect(validator('A')).toBe(true),
        expect(validator('b')).toBe(true),
        expect(validator('F')).toBe(true),
        expect(validator('G')).toBe(false));
    }));
});
