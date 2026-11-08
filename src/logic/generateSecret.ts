import { DIGITS } from '../logic/constants/constants';

export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random
): string => {
  const shuffled = [...DIGITS].slice(0, base);

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }

  return shuffled.slice(0, length).join('');
};
