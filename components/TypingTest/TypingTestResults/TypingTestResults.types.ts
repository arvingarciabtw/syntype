export interface TestResults {
  wpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  total: number;
  time: number;
  wpmHistory: number[];
  typingHistory: TypingHistoryEntry[];
  code: string;
}

export interface TypingHistoryEntry {
  charIndex: number;
  status: "untyped" | "correct" | "incorrect";
  timestamp: number;
}

export interface TypingTestResultsProps {
  results: TestResults;
  onReset: () => void;
}
