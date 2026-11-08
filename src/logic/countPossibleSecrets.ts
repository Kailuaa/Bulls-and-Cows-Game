// countPossibleSecrets(length, base) — считает, сколько существует
// различных секретных чисел при данных length и base (количество перестановок
// без повторений). Секрет может начинаться с 0 — ограничений на первую цифру нет
// (см. пример 0123 выше), поэтому это просто P(base, length) = base! / (base − length)!,
// без отдельного вычитания варианта с нулём в начале. Реализуйте рекурсивно (через связь
// countPossibleSecrets(length, base) = base * countPossibleSecrets(length - 1, base - 1)-подобную формулу),
// а затем мемоизируйте результат — функция вызывается при каждом открытии настроек, пересчитывать заново незачем.

const cache = new Map<string, number>();

export const countPossibleSecrets = (length: number, base: number): number => {
  const key = `${length}-${base}`;

  if (cache.has(key)) return cache.get(key)!;

  if (length === 0) return 1;

  if (length > base || length < 0 || base < 0) return 0;

  const result = base * countPossibleSecrets(length - 1, base - 1);
  cache.set(key, result);

  return result;
};
