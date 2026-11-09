import type { GameState, GuessResult } from '../types/index';

export const addGuess = (state: GameState, result: GuessResult): GameState => {
  return {
    ...state,
    history: [...state.history, result]
  };
};
