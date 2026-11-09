import type { GameSettings } from '../types/index';
import { countPossibleSecrets } from '../logic/countPossibleSecrets';

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

  const baseLabel = document.createElement('label');
  baseLabel.textContent = 'Number system';

  const baseSelect = document.createElement('select');
  baseSelect.id = 'base-select';

  BASES.forEach(({ label, value }) => {
    const option = document.createElement('option');
    option.value = String(value);
    option.textContent = label;
    baseSelect.append(option);
  });

  baseLabel.append(baseSelect);

  const lengthLabel = document.createElement('label');
  lengthLabel.textContent = 'Number length';

  const lengthSelect = document.createElement('select');
  lengthSelect.id = 'length-select';

  for (let length = 2; length < 6; length++) {
    const option = document.createElement('option');
    option.value = String(length);
    option.textContent = String(length);
    lengthSelect.append(option);
  }

  lengthLabel.append(lengthSelect);

  const combinations = document.createElement('p');
  combinations.id = 'combinations';

  const startButton = document.createElement('button');
  startButton.id = 'start-button';
  startButton.textContent = 'START';

  const updateSettings = (): void => {
    const base = Number(baseSelect.value);
    const length = Number(lengthSelect.value);

    Array.from(lengthSelect.options).forEach(
      (option) => (option.disabled = Number(option.value) > base)
    );

    if (length > base) {
      lengthSelect.value = '2';
    }

    const settings: GameSettings = {
      base,
      length: Number(lengthSelect.value)
    };

    combinations.textContent = `Possible combinations: ${countPossibleSecrets(settings.length, settings.base)}`;
  };

  baseSelect.addEventListener('change', updateSettings);
  lengthSelect.addEventListener('change', updateSettings);

  startButton.addEventListener('click', () => {
    const settings: GameSettings = {
      base: Number(baseSelect.value),
      length: Number(lengthSelect.value)
    };

    container.dispatchEvent(
      new CustomEvent<GameSettings>('game-start', {
        detail: settings
      })
    );
  });

  section.append(title, baseLabel, lengthLabel, combinations, startButton);

  container.replaceChildren(section);

  updateSettings();
};
