import { DIGITS } from '../logic/constants/constants.js';

export const createDigitValidator = (base: number) => {
  const allowedDigits = DIGITS.slice(0, base);

  return (char: string): boolean => {
    return allowedDigits.includes(char.toLowerCase());
  };
};
