import type { GuessResult } from '../types/index.js';

export const renderHistory = (container: HTMLElement, history: GuessResult[]): void => {
  const section = document.createElement('section');
  section.className = 'history';

  const title = document.createElement('h2');
  title.textContent = 'Guess History';

  section.append(title);

  if (history.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'empty-history';
    emptyMessage.textContent = 'No guesses yet';

    section.append(emptyMessage);
  } else {
    const list = document.createElement('ul');
    list.className = 'history-list';

    [...history].reverse().forEach(({ guess, bulls, cows }, index) => {
      const item = document.createElement('li');
      item.className = 'history-item';

      const number = document.createElement('span');
      number.className = 'history-number';
      number.textContent = `#${history.length - index}`;

      const guessElement = document.createElement('span');
      guessElement.className = 'history-guess';
      guessElement.textContent = guess;

      const resultElement = document.createElement('span');
      resultElement.className = 'history-result';
      resultElement.textContent = `${bulls} bulls | ${cows} cows`;

      item.append(number, guessElement, resultElement);
      list.append(item);
    });
    section.append(list);
  }
  container.replaceChildren(section);
};
