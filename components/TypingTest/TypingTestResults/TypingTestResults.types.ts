export interface TestResults {
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  total: number;
  time: number;
  wpmHistory: number[];
}

export interface TypingTestResultsProps {
  results: TestResults;
  onReset: () => void;
}
