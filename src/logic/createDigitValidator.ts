// createDigitValidator(base) → (char) => boolean — каррированная фабрика:
// по системе счисления возвращает функцию-предикат «этот символ — допустимая
// цифра в этой системе». Используется и в isValidGuess, и при вводе в реальном
// времени (блокировка недопустимых символов). Для hex регистр не важен
// (a и A — одна и та же цифра): приводите символ к нижнему регистру (toLowerCase)
// перед сравнением везде, где сравниваются цифры — в валидаторе, в evaluateGuess, при сверке с секретом.

import { DIGITS } from '../logic/constants/constants';

export const createDigitValidator = (base: number) => {
  const allowedDigits = DIGITS.slice(0, base);

  return (char: string): boolean => {
    return allowedDigits.includes(char.toLowerCase());
  };
};
