import { createDigitValidator } from '../logic/createDigitValidator';

export const isValidGuess = (guess: string, length: number, base: number): boolean => {
  if (guess.length !== length) return false;

  const isValidDigit = createDigitValidator(base);
  const guessArr = Array.from(guess.toLowerCase());

  const isValid = guessArr.every(isValidDigit);
  const isUnique = new Set(guessArr).size === guess.length;

  return isValid && isUnique;
};
