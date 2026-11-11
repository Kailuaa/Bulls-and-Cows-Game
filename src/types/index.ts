export interface GameSettings {
  length: number;
  base: number;
}

export type GameStatus = 'playing' | 'won';

export interface GuessResult {
  guess: string;
  bulls: number;
  cows: number;
}

export interface GameState extends GameSettings {
  secret: string;
  status: GameStatus;
  history: GuessResult[];
  startTime: number;
  endTime: number | null;
}
