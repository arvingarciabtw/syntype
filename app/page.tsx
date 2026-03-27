"use client";

import { useState, useCallback } from "react";
import styled from "styled-components";
import TypingTestSettings from "@/components/TypingTestSettings";
import TypingTestInput from "@/components/TypingTestInput";
import Keyboard, { KeyboardLayout } from "@/components/Keyboard";
import { EXAMPLE_TWO } from "@/components/TypingTestInput/TypingTestInput.constants";

const STORAGE_KEY = "syntype-keyboard-layout";

function getStoredLayout(): KeyboardLayout {
  if (typeof window === "undefined") return "qwerty";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dvorak" || stored === "colemak" || stored === "qwerty") {
    return stored;
  }
  return "qwerty";
}

export default function TypingTest() {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [keyCount, setKeyCount] = useState(0);
  const [layout, setLayout] = useState<KeyboardLayout>(() => getStoredLayout());

  const handleKeyPress = useCallback((key: string) => {
    setPressedKey(key);
    setKeyCount((c) => c + 1);
  }, []);

  const handleLayoutChange = useCallback((newLayout: string) => {
    if (newLayout === "QWERTY") {
      setLayout("qwerty");
    } else if (newLayout === "DVORAK") {
      setLayout("dvorak");
    } else if (newLayout === "COLEMAK") {
      setLayout("colemak");
    }
  }, []);

  return (
    <Wrapper>
      <TypingTestSettings onLayoutChange={handleLayoutChange} />
      <TypingTestInput
        code={EXAMPLE_TWO}
        onKeyPress={handleKeyPress}
      />
      <Keyboard pressedKey={pressedKey} keyCount={keyCount} layout={layout} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
`;