import type { GameState } from '../types/index';
import { addGuess } from '../game/addGuess';
import { finishGame } from '../game/finishGame';
import { isValidGuess } from '../logic/isValidGuess';
import { evaluateGuess } from '../logic/evaluateGuess';

export const submitState = (
  state: GameState,
  guess: string,
  endTime: number = Date.now()
): GameState => {
  if (state.status !== 'playing') return state;

  if (!isValidGuess(guess, state.length, state.base)) return state;

  const isDuplicate = state.history.some((el) => el.guess === guess);
  if (isDuplicate) return state;

  const result = evaluateGuess(state.secret, guess);

  const newState = addGuess(state, { guess, ...result });

  if (result.bulls === state.length) return finishGame(newState, endTime);

  return newState;
};
