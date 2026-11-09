import { describe, expect, it } from 'vitest';
import { evaluateGuess } from '../../src/logic/evaluateGuess';

describe('evaluateGuess', () => {
  (it('should return 4 bulls and 0 cows for an exact match', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({
      bulls: 4,
      cows: 0
    });
  }),
    it('should return 0 bulls and 4 cows when all digits are misplaced', () => {
      expect(evaluateGuess('1234', '4321')).toEqual({
        bulls: 0,
        cows: 4
      });
    }),
    it('should count correctly: 2 bulls and 2 cows in this case', () => {
      expect(evaluateGuess('1234', '1243')).toEqual({
        bulls: 2,
        cows: 2
      });
    }),
    it('should return 0 bulls and 0 cows when all digits are mismatched', () => {
      expect(evaluateGuess('1234', '5678')).toEqual({
        bulls: 0,
        cows: 0
      });
    }),
    it('should return 1 bulls and 0 cows when only one digit matches', () => {
      expect(evaluateGuess('1234', '1678')).toEqual({
        bulls: 1,
        cows: 0
      });
    }),
    it('should count cows when all matching digits are misplaced', () => {
      expect(evaluateGuess('1234', '2148')).toEqual({
        bulls: 0,
        cows: 3
      });
    }),
    it('should compare hexadecimal digits case-insensitively', () => {
      expect(evaluateGuess('a1f3', 'A3F1')).toEqual({
        bulls: 2,
        cows: 2
      });
    }));
});
