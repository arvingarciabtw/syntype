"use client";

import * as React from "react";
import { Select } from "@base-ui/react/select";
import {
  Wrapper,
  Section,
  Label,
  StyledToggleGroup,
  ToggleButton,
  StyledSelectTrigger,
  StyledSelectPositioner,
  StyledSelectPopup,
  StyledSelectItem,
  StyledTextarea,
} from "@/components/TypingTestSettings/TypingTestSettings.style";

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

function TypingTestSettings() {
  const [time, setTime] = React.useState<string>("30");
  const [length, setLength] = React.useState<string>("moderate");
  const [language, setLanguage] = React.useState<string>("TypeScript");
  const [aiPrompt, setAiPrompt] = React.useState<string>("");

  return (
    <Wrapper>
      <Section>
        <Label id="time-label">Time</Label>
        <StyledToggleGroup
          value={[time]}
          onValueChange={(value) => setTime(value[0] || "30")}
          aria-labelledby="time-label"
        >
          <ToggleButton value="15">15</ToggleButton>
          <ToggleButton value="30">30</ToggleButton>
          <ToggleButton value="60">60</ToggleButton>
        </StyledToggleGroup>
      </Section>

      <Section>
        <Label id="length-label">Length</Label>
        <StyledToggleGroup
          value={[length]}
          onValueChange={(value) => setLength(value[0] || "moderate")}
          aria-labelledby="length-label"
        >
          <ToggleButton value="short">Short</ToggleButton>
          <ToggleButton value="moderate">Moderate</ToggleButton>
          <ToggleButton value="long">Long</ToggleButton>
        </StyledToggleGroup>
      </Section>

      <Section>
        <Label id="language-label">Language</Label>
        <Select.Root
          value={language}
          onValueChange={(value) => setLanguage(value as string)}
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
        <Label htmlFor="ai-prompt">AI Prompt</Label>
        <StyledTextarea
          id="ai-prompt"
          placeholder="Generate a React useAuth hook with login, logout, and session persistence..."
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          spellCheck="false"
        />
      </Section>
    </Wrapper>
  );
}

export default TypingTestSettings;
