import { generateSecret } from '../logic/generateSecret';
import type { GameSettings, GameState } from '../types/index';

export const createGameState = (
  settings: GameSettings,
  startTime: number,
  random?: () => number
): GameState => {
  return {
    ...settings,
    secret: generateSecret(settings.length, settings.base, random),
    status: 'playing',
    history: [],
    startTime,
    endTime: null
  };
};

// Пользователь
//      |
//      v
// Выбирает настройки
//      |
//      v
// Нажимает START
//      |
//      v
// createGameState()
//      |
//      +---- generateSecret()
//      |
//      v
// Состояние игры создано
//      |
//      v
// Пользователь вводит попытку
//      |
//      v
// Проверка isValidGuess()
//      |
//      v
// evaluateGuess()
//      |
//      v
// addGuess()
//      |
//      v
// Проверка победы
//      |
//      +---- Нет ---> Новая попытка
//      |
//      +---- Да
//              |
//              v
//         Завершение игры
//              |
//              v
//         Сохранение результата
//              |
//              v
//         Таблица рекордов
