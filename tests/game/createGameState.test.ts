import { describe, expect, it } from 'vitest';
import { createGameState } from '../../src/game/createGameState';

describe('createGameState', () => {
  const settings = {
    length: 4,
    base: 10
  };
  const randomValues = [0, 0.1, 0.2, 0.3];
  const createRandom = () => {
    let index = 0;
    return () => randomValues[index++];
  };

  const startTime = 1000000;

  (it('should generate a secret number with the specified length', () => {
    const state = createGameState(settings, startTime, createRandom());

    expect(state.secret).toHaveLength(settings.length);
  }),
    it('should generate a secret number with unique digits', () => {
      const state = createGameState(settings, startTime, createRandom());

      expect(new Set(state.secret).size).toBe(settings.length);
    }),
    it('should preserve the game settings', () => {
      const state = createGameState(settings, startTime, createRandom());

      expect(state.length).toBe(settings.length);
      expect(state.base).toBe(settings.base);
    }),
    it('should initialize an empty history', () => {
      const state = createGameState(settings, startTime, createRandom());

      expect(state.history).toEqual([]);
    }),
    it('should initialize the game with playing status', () => {
      2;
      const state = createGameState(settings, startTime, createRandom());

      expect(state.status).toBe('playing');
    }),
    it('should set the start time', () => {
      const state = createGameState(settings, startTime, createRandom());

      expect(state.startTime).toBe(startTime);
    }),
    it('should initialize end time as null', () => {
      const state = createGameState(settings, startTime, createRandom());

      expect(state.endTime).toBeNull;
    }));
});
