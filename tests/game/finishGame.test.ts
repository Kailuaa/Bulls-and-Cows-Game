import { describe, expect, it } from 'vitest';
import { finishGame } from '../../src/game/finishGame';
import { createGameState } from '../../src/game/createGameState';

describe('finishGame', () => {
  const state = createGameState({ length: 4, base: 10 }, 1000000, () => 0.1);

  const endTime = 1500000;

  (it('should change game status to won', () => {
    const newState = finishGame(state, endTime);
    expect(newState.status).toBe('won');
  }),
    it('should set the end time', () => {
      const newState = finishGame(state, endTime);
      expect(newState.endTime).toBe(endTime);
    }),
    it('should preserve the game history', () => {
      const stateWithHistory = {
        ...state,
        history: [{ guess: '1234', bulls: 2, cows: 1 }]
      };
      const newState = finishGame(stateWithHistory, endTime);
      expect(newState.history).toEqual(stateWithHistory.history);
    }),
    it('should preserve the original state', () => {
      finishGame(state, endTime);
      expect(state.status).toBe('playing');
      expect(state.endTime).toBeNull;
    }),
    it('should preserve other game properties', () => {
      const newState = finishGame(state, endTime);
      expect(newState.secret).toBe(state.secret);
      expect(newState.startTime).toBe(state.startTime);
      expect(newState.base).toBe(state.base);
      expect(newState.length).toBe(state.length);
    }));
});
