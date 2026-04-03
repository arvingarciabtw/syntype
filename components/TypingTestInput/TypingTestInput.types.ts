export type CharStatus = "untyped" | "correct" | "incorrect";

export interface CharData {
  expected: string;
  status: CharStatus;
}

export interface TypingLine {
  indent: number;
  chars: CharData[];
}

export interface CursorPos {
  line: number;
  char: number;
}

export interface TypingStats {
  correct: number;
  incorrect: number;
  total: number;
  timeConfig: number;
  elapsedTime: number;
  wpmHistory: number[];
}

export interface TypingTestInputProps {
  code: string;
  onComplete?: (stats: TypingStats) => void;
  onProgress?: (stats: TypingStats) => void;
  onKeyPress?: (key: string) => void;
  onTimeLeftChange?: (timeLeft: number) => void;
  visibleLines?: number;
  time?: number;
  resetKey?: string | number;
}
