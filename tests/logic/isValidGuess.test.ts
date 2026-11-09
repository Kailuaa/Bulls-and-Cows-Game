import { describe, expect, it } from 'vitest';
import { isValidGuess } from '../../src/logic/isValidGuess';

describe('isValidGuess', () => {
  (it('should return true for a valid decimal guess', () => {
    expect(isValidGuess('1234', 4, 10)).toBe(true);
  }),
    it('should return true for a valid binary guess', () => {
      expect(isValidGuess('10', 2, 2)).toBe(true);
    }),
    it('should return true for a valid octal guess', () => {
      expect(isValidGuess('1537', 4, 8)).toBe(true);
    }),
    it('should allow zero as the first digit', () => {
      expect(isValidGuess('0537', 4, 8)).toBe(true);
    }),
    it('should return true for a valid hexadecimal guess', () => {
      expect(isValidGuess('2a4f', 4, 16)).toBe(true);
    }),
    it('should accept uppercase hexadecimal guess', () => {
      expect(isValidGuess('2A4F', 4, 16)).toBe(true);
    }),
    it('should return false if the guess is shorter than requested', () => {
      expect(isValidGuess('123', 4, 10)).toBe(false);
    }),
    it('should return false if the guess is longer than requested', () => {
      expect(isValidGuess('12356', 4, 10)).toBe(false);
    }),
    it('should return false if the guess has duplicated digits', () => {
      (expect(isValidGuess('1224', 4, 10)).toBe(false),
        expect(isValidGuess('aA34', 4, 16)).toBe(false));
    }),
    it('should return false if the guess is outside the base', () => {
      expect(isValidGuess('2A4F', 4, 10)).toBe(false);
    }));
});
