import type { GameState } from '../types/index';

export const finishGame = (state: GameState, endTime: number = Date.now()): GameState => {
  return {
    ...state,
    status: 'won',
    endTime
  };
};
