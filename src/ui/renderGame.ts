import type { GameState } from '../types/index.js';
import { createDigitValidator } from '../logic/createDigitValidator.js';
import { renderHistory } from '../ui/renderHistory.js';

export const renderGame = (
  container: HTMLElement,
  state: GameState,
  onGuess: (guess: string) => void,
  onNewGame: () => void
): (() => void) => {
  const section = document.createElement('section');
  section.className = 'game';

  const header = document.createElement('div');
  header.className = 'game-header';

  const title = document.createElement('h2');
  title.textContent = 'Bulls & Cows';

  const settings = document.createElement('p');
  settings.className = 'game-settings';
  settings.textContent = `Base: ${state.base} | Length: ${state.length}`;

  header.append(title, settings);

  const gameInfo = document.createElement('div');
  gameInfo.className = 'game-info';

  const timer = document.createElement('p');
  timer.className = 'info-item';
  timer.id = 'game-timer';

  const updateTimer = (): void => {
    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    timer.textContent = `Time: ${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  updateTimer();

  const timerInterval = window.setInterval(updateTimer, 1000);

  const attempts = document.createElement('p');
  attempts.className = 'info-item';
  attempts.id = 'attempts';
  attempts.textContent = `Attempts: ${state.history.length}`;

  gameInfo.append(timer, attempts);

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'guess-input';
  input.maxLength = state.length;
  input.autocomplete = 'off';

  const isValidDigit = createDigitValidator(state.base);

  input.addEventListener('input', () => {
    input.value = Array.from(input.value).filter(isValidDigit).join('');
  });

  const guessButton = document.createElement('button');
  guessButton.textContent = 'GUESS';

  const submitGuess = (): void => {
    if (input.value.length !== state.length) return;

    onGuess(input.value);
    input.value = '';
    input.focus();
  };

  guessButton.addEventListener('click', submitGuess);
  input.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter') submitGuess();
  });

  const history = document.createElement('div');
  history.id = 'game-history';

  renderHistory(history, state.history);

  const newGameButton = document.createElement('button');
  newGameButton.textContent = 'New Game';

  newGameButton.addEventListener('click', () => {
    window.clearInterval(timerInterval);
    onNewGame();
  });

  section.append(header, gameInfo, input, guessButton, history, newGameButton);

  container.replaceChildren(section);

  return () => window.clearInterval(timerInterval);
};
