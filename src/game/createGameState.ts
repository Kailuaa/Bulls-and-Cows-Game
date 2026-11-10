import { generateSecret } from '../logic/generateSecret.js';
import type { GameSettings, GameState } from '../types/index.js';

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
