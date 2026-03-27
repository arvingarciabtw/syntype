"use client";

import { useState, useCallback } from "react";
import styled from "styled-components";
import TypingTestSettings from "@/components/TypingTestSettings";
import TypingTestInput from "@/components/TypingTestInput";
import Keyboard from "@/components/Keyboard";
import { EXAMPLE_TWO } from "@/components/TypingTestInput/TypingTestInput.constants";

export default function TypingTest() {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [keyCount, setKeyCount] = useState(0);

  const handleKeyPress = useCallback((key: string) => {
    setPressedKey(key);
    setKeyCount((c) => c + 1);
  }, []);

  return (
    <Wrapper>
      <TypingTestSettings />
      <TypingTestInput
        code={EXAMPLE_TWO}
        onKeyPress={handleKeyPress}
      />
      <Keyboard pressedKey={pressedKey} keyCount={keyCount} />
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
