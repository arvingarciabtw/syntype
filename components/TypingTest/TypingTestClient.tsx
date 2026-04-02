"use client";

import { useState, useCallback, useMemo } from "react";
import Cookie from "js-cookie";
import TypingTestSettings from "@/components/TypingTestSettings";
import TypingTestInput from "@/components/TypingTestInput";
import Keyboard from "@/components/Keyboard";
import { CODE_SNIPPETS, DEFAULT_CODE } from "@/lib/codeSnippets";
import { STORAGE_KEY } from "@/components/Keyboard/Keyboard.constants";
import { Wrapper } from "@/components/TypingTest/TypingTestClient.style";
import type { TypingTestClientProps } from "@/components/TypingTest/TypingTestClient.types";
import { KeyboardLayout } from "@/components/Keyboard/Keyboard.types";
import type { Time, Length } from "@/components/TypingTestSettings/TypingTestSettings.types";

export default function TypingTestClient({
  initialLayout,
}: TypingTestClientProps) {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [keyCount, setKeyCount] = useState(0);
  const [layout, setLayout] = useState<KeyboardLayout>(initialLayout);
  const [time, setTime] = useState<Time>("30");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [length, setLength] = useState<Length>("moderate");
  const [language, setLanguage] = useState<string>("TypeScript");
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const code = useMemo(() => {
    if (generatedCode.trim()) {
      return generatedCode;
    }
    return CODE_SNIPPETS[language]?.[length] || DEFAULT_CODE;
  }, [generatedCode, language, length]);

  const handleKeyPress = useCallback((key: string) => {
    setPressedKey(key);
    setKeyCount((c) => c + 1);
  }, []);

  const handleLayoutChange = useCallback((newLayout: string) => {
    let normalizedLayout: KeyboardLayout;
    if (newLayout === "QWERTY") {
      normalizedLayout = "qwerty";
    } else if (newLayout === "DVORAK") {
      normalizedLayout = "dvorak";
    } else if (newLayout === "COLEMAK") {
      normalizedLayout = "colemak";
    } else {
      return;
    }
    setLayout(normalizedLayout);
    localStorage.setItem(STORAGE_KEY, normalizedLayout);
    Cookie.set(STORAGE_KEY, normalizedLayout, { sameSite: "Lax" });
  }, []);

  const layoutDisplay =
    layout === "qwerty" ? "QWERTY" : layout === "dvorak" ? "DVORAK" : "COLEMAK";

  const handleTimeChange = (newTime: Time) => {
    setTime(newTime);
    setTimeLeft(null);
  };

  const handleLengthChange = (newLength: Length) => {
    setLength(newLength);
    setTimeLeft(null);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setTimeLeft(null);
  };

  const handleAiPromptChange = (newPrompt: string) => {
    setAiPrompt(newPrompt);
    if (newPrompt !== aiPrompt) {
      setGeneratedCode("");
    }
    setTimeLeft(null);
  };

  const handleAiPromptSubmit = useCallback(async () => {
    if (!aiPrompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, language, length }),
      });

      const data = await response.json();
      if (data.code) {
        setGeneratedCode(data.code);
      }
    } catch (error) {
      console.error("Failed to generate code:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [aiPrompt, isGenerating, language, length]);

  return (
    <Wrapper>
      <TypingTestSettings
        time={time}
        length={length}
        language={language}
        aiPrompt={aiPrompt}
        layout={layoutDisplay}
        timeLeft={timeLeft}
        onTimeChange={handleTimeChange}
        onLengthChange={handleLengthChange}
        onLanguageChange={handleLanguageChange}
        onAiPromptChange={handleAiPromptChange}
        onAiPromptSubmit={handleAiPromptSubmit}
        isGenerating={isGenerating}
        onLayoutChange={handleLayoutChange}
      />
      <TypingTestInput
        code={code}
        onKeyPress={handleKeyPress}
        time={parseInt(time, 10)}
        onTimeLeftChange={setTimeLeft}
      />
      <Keyboard pressedKey={pressedKey} keyCount={keyCount} layout={layout} />
    </Wrapper>
  );
}

