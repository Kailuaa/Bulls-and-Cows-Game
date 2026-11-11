import type { GameSettings } from '../types/index.js';
import { countPossibleSecrets } from '../logic/countPossibleSecrets.js';

const BASES = [
  { label: 'Binary (2)', value: 2 },
  { label: 'Octal (8)', value: 8 },
  { label: 'Decimal (10)', value: 10 },
  { label: 'Hexadecimal (16)', value: 16 }
];

export const renderSettings = (container: HTMLElement): void => {
  const section = document.createElement('section');
  section.className = 'settings';

  const title = document.createElement('h1');
  title.textContent = 'Bulls & Cows';

  const subtitle = document.createElement('p');
  subtitle.className = 'settings-subtitle';
  subtitle.textContent = 'Guess the secret number';

  const baseGroup = document.createElement('div');
  baseGroup.className = 'settings-group';

  const baseLabel = document.createElement('h2');
  baseLabel.textContent = 'Number system';

  const baseOptions = document.createElement('div');
  baseOptions.className = 'options';

  let selectedBase = 10;

  const lengthGroup = document.createElement('div');
  lengthGroup.className = 'settings-group';

  const lengthLabel = document.createElement('h2');
  lengthLabel.textContent = 'Number length';

  const lengthOptions = document.createElement('div');
  lengthOptions.className = 'options';

  let selectedLength = 4;

  const combinations = document.createElement('p');
  combinations.id = 'combinations';
  combinations.className = 'combinations';

  const startButton = document.createElement('button');
  startButton.id = 'start-button';
  startButton.className = 'primary-button';
  startButton.textContent = 'START GAME';

  const updateSettings = (): void => {
    combinations.textContent = `${countPossibleSecrets(selectedLength, selectedBase).toLocaleString()} possible combinations`;
  };

  const updateLengthOptions = (): void => {
    Array.from(lengthOptions.children).forEach((child) => {
      const button = child as HTMLButtonElement;
      const length = Number(button.dataset.length);

      button.disabled = length > selectedBase;
      button.classList.toggle('selected', length === selectedLength);
      button.setAttribute('aria-pressed', String(length === selectedLength));
    });
  };

  BASES.forEach(({ label, value }) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-button';
    button.textContent = label;
    button.dataset.base = String(value);
    button.setAttribute('aria-pressed', String(value === selectedBase));
    button.classList.toggle('selected', value === selectedBase);

    button.addEventListener('click', () => {
      selectedBase = value;

      if (selectedLength > selectedBase) {
        selectedLength = 2;
      }

      Array.from(baseOptions.children).forEach((child) => {
        const option = child as HTMLButtonElement;
        const isSelected = Number(option.dataset.base) === selectedBase;

        option.classList.toggle('selected', isSelected);
        option.setAttribute('aria-pressed', String(isSelected));
      });

      updateLengthOptions();
      updateSettings();
    });

    baseOptions.append(button);
  });

  for (let length = 2; length <= 6; length++) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-button';
    button.textContent = String(length);
    button.dataset.length = String(length);

    button.addEventListener('click', () => {
      if (length > selectedBase) return;
      selectedLength = length;

      updateLengthOptions();
      updateSettings();
    });

    lengthOptions.append(button);
  }

  startButton.addEventListener('click', () => {
    const settings: GameSettings = {
      base: selectedBase,
      length: selectedLength
    };

    container.dispatchEvent(
      new CustomEvent<GameSettings>('start-game', {
        detail: settings
      })
    );
  });

  baseGroup.append(baseLabel, baseOptions);

  lengthGroup.append(lengthLabel, lengthOptions);

  section.append(title, subtitle, baseGroup, lengthGroup, combinations, startButton);

  container.replaceChildren(section);

  updateLengthOptions();
  updateSettings();
};
