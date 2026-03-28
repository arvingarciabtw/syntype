export type Time = "15" | "30" | "60";
export type Length = "short" | "moderate" | "long";

export interface TypingTestSettingsProps {
  time: Time;
  length: Length;
  language: string;
  aiPrompt: string;
  layout?: string;
  onTimeChange?: (time: Time) => void;
  onLengthChange?: (length: Length) => void;
  onLanguageChange?: (language: string) => void;
  onAiPromptChange?: (aiPrompt: string) => void;
  onLayoutChange?: (layout: string) => void;
}
