export type CharStatus = "untyped" | "correct" | "incorrect";

export interface TypingHistoryEntry {
  charIndex: number;
  status: CharStatus;
  timestamp: number;
}
