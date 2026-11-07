// generateSecret(length, base, random = Math.random) — генерирует секретное число
// (секретное число рекомендуется представлять в виде строки или массива символов,
//     чтобы корректно обрабатывать лидирующие нули, например, 0123 для длины 4):
//     length уникальных цифр в системе счисления base. Функция обязательно принимает
//     источник случайности параметром — это и есть приём, который делает генерацию
//     тестируемой чистой функцией: в тестах вы передаёте детерминированный random,
//     и результат становится предсказуемым.

const digits = '0123456789abcdef';

export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random
): string => {
  const shuffled = [...digits].slice(0, base);

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }

  return shuffled.slice(0, length).join('');
};
