import type { GameState } from '../types/index.js';

export const renderResult = (
  container: HTMLElement,
  state: GameState,
  onNewGame: () => void
): void => {
  const section = document.createElement('section');
  section.className = 'game-results';

  const title = document.createElement('h2');
  title.textContent = 'Congratulations!';

  const message = document.createElement('p');
  message.textContent = 'You guessed the secret number!';

  const secret = document.createElement('p');
  secret.textContent = `Secret number: ${state.secret}`;

  const attempts = document.createElement('p');
  attempts.textContent = `Attempts: ${state.history.length}`;

  const elapsedTime = state.endTime ? Math.floor((state.endTime - state.startTime) / 1000) : 0;

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  const time = document.createElement('p');
  time.textContent = `Time: ${minutes}:${String(seconds).padStart(2, '0')}`;

  const newGameButton = document.createElement('button');

  newGameButton.textContent = 'NEW GAME';

  newGameButton.addEventListener('click', onNewGame);

  section.append(title, message, secret, attempts, time, newGameButton);

  container.replaceChildren(section);
};
