import { renderSettings } from './ui/renderSettings.js';
import { renderResult } from './ui/renderResult.js';
import { renderGame } from './ui/renderGame.js';

import { submitState } from './game/submitState.js';
import { createGameState } from './game/createGameState.js';

import type { GameState, GameSettings } from './types/index.js';

const app = document.createElement('main');
app.id = 'app';

document.body.append(app);

let gameState: GameState | null = null;
let cleanupTimer: (() => void) | null = null;

const startNewGame = (): void => {
  if (cleanupTimer) {
    cleanupTimer();
    cleanupTimer = null;
  }

  gameState = null;

  renderSettings(app);
};

const startGame = (settings: GameSettings): void => {
  gameState = createGameState(settings, Date.now());

  renderCurrentGame();
};

const renderCurrentGame = (): void => {
  if (!gameState) return;

  if (cleanupTimer) cleanupTimer();

  if (gameState.status === 'won') {
    cleanupTimer = null;

    renderResult(app, gameState, startNewGame);
    return;
  }

  cleanupTimer = renderGame(app, gameState, handleGuess, startNewGame);
};

const handleGuess = (guess: string): void => {
  if (!gameState) return;

  gameState = submitState(gameState, guess.toLowerCase());

  renderCurrentGame();
};

app.addEventListener('start-game', (event: Event) => {
  const customEvent = event as CustomEvent<GameSettings>;

  startGame(customEvent.detail);
});

startNewGame();
