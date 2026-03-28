"use client";

import * as React from "react";
import { Select } from "@base-ui/react/select";
import {
  Wrapper,
  Column,
  Section,
  Label,
  ToggleButtonGroup,
  ToggleOption,
  StyledSelectTrigger,
  StyledSelectPositioner,
  StyledSelectPopup,
  StyledSelectItem,
  StyledTextarea,
} from "@/components/TypingTestSettings/TypingTestSettings.style";
import type { Time, Length, TypingTestSettingsProps } from "@/components/TypingTestSettings/TypingTestSettings.types";

const LANGUAGES = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Rust",
  "Go",
  "Java",
  "C",
  "C#",
  "C++",
  "SQL",
];

const KEYBOARD_LAYOUTS = ["QWERTY", "DVORAK", "COLEMAK"];

function TypingTestSettings({
  time,
  length,
  language,
  aiPrompt,
  layout = "QWERTY",
  onTimeChange,
  onLengthChange,
  onLanguageChange,
  onAiPromptChange,
  onLayoutChange,
}: TypingTestSettingsProps) {
  const handleLayoutChange = (value: string | null) => {
    if (!value) return;
    onLayoutChange?.(value);
  };

  return (
    <Wrapper>
      <Column>
        <Section>
          <Label id="time-label">Time</Label>
          <ToggleButtonGroup role="group" aria-labelledby="time-label">
            <ToggleOption $active={time === "15"} aria-pressed={time === "15"} onClick={() => onTimeChange?.("15" as Time)}>15</ToggleOption>
            <ToggleOption $active={time === "30"} aria-pressed={time === "30"} onClick={() => onTimeChange?.("30" as Time)}>30</ToggleOption>
            <ToggleOption $active={time === "60"} aria-pressed={time === "60"} onClick={() => onTimeChange?.("60" as Time)}>60</ToggleOption>
          </ToggleButtonGroup>
        </Section>

        <Section>
          <Label id="length-label">Length</Label>
          <ToggleButtonGroup role="group" aria-labelledby="length-label">
            <ToggleOption $active={length === "short"} aria-pressed={length === "short"} onClick={() => onLengthChange?.("short" as Length)}>Short</ToggleOption>
            <ToggleOption $active={length === "moderate"} aria-pressed={length === "moderate"} onClick={() => onLengthChange?.("moderate" as Length)}>Moderate</ToggleOption>
            <ToggleOption $active={length === "long"} aria-pressed={length === "long"} onClick={() => onLengthChange?.("long" as Length)}>Long</ToggleOption>
          </ToggleButtonGroup>
        </Section>
      </Column>

      <Column>
        <Section>
          <Label id="language-label">Language</Label>
          <Select.Root
            value={language}
            onValueChange={(value) => onLanguageChange?.(value as string)}
          >
            <StyledSelectTrigger aria-labelledby="language-label">
              {language}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </StyledSelectTrigger>
            <Select.Portal>
              <StyledSelectPositioner sideOffset={4}>
                <StyledSelectPopup>
                  {LANGUAGES.map((lang) => (
                    <StyledSelectItem key={lang} value={lang}>
                      {lang}
                    </StyledSelectItem>
                  ))}
                </StyledSelectPopup>
              </StyledSelectPositioner>
            </Select.Portal>
          </Select.Root>
        </Section>

        <Section>
          <Label id="layout-label">Keyboard Layout</Label>
          <Select.Root value={layout} onValueChange={handleLayoutChange}>
            <StyledSelectTrigger aria-labelledby="layout-label">
              {layout}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </StyledSelectTrigger>
            <Select.Portal>
              <StyledSelectPositioner sideOffset={4}>
                <StyledSelectPopup>
                  {KEYBOARD_LAYOUTS.map((layout) => (
                    <StyledSelectItem key={layout} value={layout}>
                      {layout}
                    </StyledSelectItem>
                  ))}
                </StyledSelectPopup>
              </StyledSelectPositioner>
            </Select.Portal>
          </Select.Root>
        </Section>
      </Column>

      <Column>
        <Section>
          <Label htmlFor="ai-prompt">AI Prompt</Label>
          <StyledTextarea
            id="ai-prompt"
            placeholder="Generate a React useAuth hook with login, logout, and session persistence..."
            value={aiPrompt}
            onChange={(e) => onAiPromptChange?.(e.target.value)}
            spellCheck="false"
          />
        </Section>
      </Column>
    </Wrapper>
  );
}

export default TypingTestSettings;
