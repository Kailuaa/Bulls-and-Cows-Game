export const evaluateGuess = (secret: string, guess: string): { bulls: number; cows: number } => {
  const secretDigits = [...secret.toLowerCase()];
  const guessDigits = [...guess.toLowerCase()];

  const bulls = guessDigits.reduce(
    (count, digit, index) => (digit === secretDigits[index] ? count + 1 : count),
    0
  );

  const cows = guessDigits.reduce(
    (count, digit, index) =>
      digit !== secretDigits[index] && secretDigits.includes(digit) ? count + 1 : count,
    0
  );

  return { bulls, cows };
};
