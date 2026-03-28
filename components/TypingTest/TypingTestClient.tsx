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
  const [length, setLength] = useState<Length>("moderate");
  const [language, setLanguage] = useState<string>("TypeScript");
  const [aiPrompt, setAiPrompt] = useState<string>("");

  const code = useMemo(() => {
    if (aiPrompt.trim()) {
      return aiPrompt;
    }
    return CODE_SNIPPETS[language]?.[length] || DEFAULT_CODE;
  }, [aiPrompt, language, length]);

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

  return (
    <Wrapper>
      <TypingTestSettings
        time={time}
        length={length}
        language={language}
        aiPrompt={aiPrompt}
        layout={layoutDisplay}
        onTimeChange={setTime}
        onLengthChange={setLength}
        onLanguageChange={setLanguage}
        onAiPromptChange={setAiPrompt}
        onLayoutChange={handleLayoutChange}
      />
      <TypingTestInput code={code} onKeyPress={handleKeyPress} />
      <Keyboard pressedKey={pressedKey} keyCount={keyCount} layout={layout} />
    </Wrapper>
  );
}

