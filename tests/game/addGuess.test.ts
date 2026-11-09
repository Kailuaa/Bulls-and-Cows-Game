import { describe, expect, it } from 'vitest';
import { addGuess } from '../../src/game/addGuess';
import { createGameState } from '../../src/game/createGameState';

describe('addGuess', () => {
  const state = createGameState({ length: 4, base: 10 }, 1000000, () => 0.1);

  const result = {
    guess: '1234',
    bulls: 2,
    cows: 1
  };

  (it('should add a guess to the game history', () => {
    const newState = addGuess(state, result);

    expect(newState.history).toEqual([result]);
  }),
    it('should preserve previous guesses', () => {
      const prevState = {
        ...state,
        history: [{ guess: '5678', bulls: 0, cows: 1 }]
      };

      const newState = addGuess(prevState, result);

      expect(newState.history).toHaveLength(2);
      expect(newState.history[0]).toEqual(prevState.history[0]);
      expect(newState.history[1]).toEqual(result);
    }),
    it('should not mutate the original state', () => {
      addGuess(state, result);

      expect(state.history).toEqual([]);
    }),
    it('should preserve other game state properties', () => {
      const newState = addGuess(state, result);

      expect(newState.status).toEqual(state.status);
      expect(newState.secret).toEqual(state.secret);
      expect(newState.startTime).toEqual(state.startTime);
    }));
});
