"use client";

import { useState, useCallback } from "react";
import Cookie from "js-cookie";
import TypingTestSettings from "@/components/TypingTestSettings";
import TypingTestInput from "@/components/TypingTestInput";
import Keyboard, { KeyboardLayout } from "@/components/Keyboard";
import { EXAMPLE_TWO } from "@/components/TypingTestInput/TypingTestInput.constants";
import { STORAGE_KEY } from "@/components/Keyboard/Keyboard.constants";
import { Wrapper } from "@/components/TypingTest/TypingTestClient.style";

export default function TypingTestClient({
  initialLayout,
}: {
  initialLayout: KeyboardLayout;
}) {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [keyCount, setKeyCount] = useState(0);
  const [layout, setLayout] = useState<KeyboardLayout>(initialLayout);

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
        layout={layoutDisplay}
        onLayoutChange={handleLayoutChange}
      />
      <TypingTestInput code={EXAMPLE_TWO} onKeyPress={handleKeyPress} />
      <Keyboard pressedKey={pressedKey} keyCount={keyCount} layout={layout} />
    </Wrapper>
  );
}

