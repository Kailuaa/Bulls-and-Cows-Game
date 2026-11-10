import type { GuessResult } from '../types/index.js';

export const renderHistory = (container: HTMLElement, history: GuessResult[]): void => {
  const section = document.createElement('section');
  section.className = 'history';

  const title = document.createElement('h2');
  title.textContent = 'Guess History';

  section.append(title);

  if (history.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No guesses yet';

    section.append(emptyMessage);
  } else {
    const list = document.createElement('ul');

    [...history].reverse().forEach(({ guess, bulls, cows }) => {
      const item = document.createElement('li');

      const guessElement = document.createElement('span');
      item.textContent = guess;

      const resultElement = document.createElement('span');
      resultElement.textContent = `Bulls: ${bulls}, Cows: ${cows}`;

      item.append(guessElement, resultElement);
      list.append(item);
    });
    section.append(list);
  }
  container.replaceChildren(section);
};
