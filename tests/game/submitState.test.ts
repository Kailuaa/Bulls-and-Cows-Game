import { describe, expect, it } from 'vitest';
import { submitState } from '../../src/game/submitState';
import { GameState } from '../../src/types/index';

describe('submitState', () => {
  const createState = (): GameState => ({
    secret: '1234',
    length: 4,
    base: 10,
    status: 'playing',
    history: [],
    startTime: 1000000,
    endTime: null
  });

  const endTime = 1500000;

  (it('should add a valid guess to history', () => {
    const state = createState();
    const newState = submitState(state, '1245', endTime);

    expect(newState.history).toHaveLength(1);
    expect(newState.history[0]).toEqual({
      guess: '1245',
      bulls: 2,
      cows: 1
    });
  }),
    it('should not add an invalid guess', () => {
      const state = createState();
      const newState = submitState(state, 'Fa24', endTime);

      expect(newState).toBe(state);
      expect(newState.history).toHaveLength(0);
    }),
    it('should not add a guess with incorrect length', () => {
      const state: GameState = {
        ...createState(),
        history: [{ guess: '1245', bulls: 2, cows: 1 }]
      };
      const newState = submitState(state, '1245', endTime);

      expect(newState).toBe(state);
      expect(newState.history).toHaveLength(1);
    }),
    it('should finish the game when the guess is correct', () => {
      const state = createState();
      const newState = submitState(state, '1234', endTime);

      expect(newState.status).toBe('won');
      expect(newState.endTime).toBe(endTime);
    }),
    it('should add the winning guess to history', () => {
      const state = createState();
      const newState = submitState(state, '1234', endTime);

      expect(newState.history).toEqual([
        {
          guess: '1234',
          bulls: 4,
          cows: 0
        }
      ]);
    }),
    it('should not accept guesses after winning', () => {
      const state: GameState = {
        ...createState(),
        status: 'won',
        endTime
      };
      const newState = submitState(state, '1245', endTime);

      expect(newState).toBe(state);
    }),
    it('should not mutate the original state', () => {
      const state = createState();
      submitState(state, '1234', endTime);

      expect(state.status).toEqual('playing');
      expect(state.history).toBe([]);
      expect(state.endTime).toBeNull();
    }));
});
