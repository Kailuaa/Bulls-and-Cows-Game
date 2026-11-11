import type { GameState } from '../types/index.js';

export const finishGame = (state: GameState, endTime: number = Date.now()): GameState => {
  return {
    ...state,
    status: 'won',
    endTime
  };
};
