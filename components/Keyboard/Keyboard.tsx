"use client";

import { useEffect, useState } from "react";
import {
  Wrapper,
  KeyboardContainer,
  Row,
  Key,
} from "@/components/Keyboard/Keyboard.style";

type Finger = 0 | 1 | 2 | 3 | 4;

interface KeyData {
  display: string;
  value: string;
  finger: Finger;
  width?: "wide" | "extra-wide" | "spacebar";
  grow?: boolean;
}

const KEYBOARD_LAYOUT: KeyData[][] = [
  [
    { display: "`", value: "`", finger: 0 },
    { display: "1", value: "1", finger: 0 },
    { display: "2", value: "2", finger: 1 },
    { display: "3", value: "3", finger: 2 },
    { display: "4", value: "4", finger: 3 },
    { display: "5", value: "5", finger: 3 },
    { display: "6", value: "6", finger: 3 },
    { display: "7", value: "7", finger: 3 },
    { display: "8", value: "8", finger: 2 },
    { display: "9", value: "9", finger: 1 },
    { display: "0", value: "0", finger: 0 },
    { display: "-", value: "-", finger: 0 },
    { display: "=", value: "=", finger: 0 },
    { display: "Backspace", value: "backspace", finger: 0, width: "extra-wide" },
  ],
  [
    { display: "Tab", value: "tab", finger: 0, width: "wide" },
    { display: "Q", value: "q", finger: 0 },
    { display: "W", value: "w", finger: 1 },
    { display: "E", value: "e", finger: 2 },
    { display: "R", value: "r", finger: 3 },
    { display: "T", value: "t", finger: 3 },
    { display: "Y", value: "y", finger: 3 },
    { display: "U", value: "u", finger: 3 },
    { display: "I", value: "i", finger: 2 },
    { display: "O", value: "o", finger: 1 },
    { display: "P", value: "p", finger: 0 },
    { display: "[", value: "[", finger: 0 },
    { display: "]", value: "]", finger: 0 },
    { display: "\\", value: "\\", finger: 0, width: "wide" },
  ],
  [
    { display: "Caps", value: "capslock", finger: 0, width: "wide" },
    { display: "A", value: "a", finger: 0 },
    { display: "S", value: "s", finger: 1 },
    { display: "D", value: "d", finger: 2 },
    { display: "F", value: "f", finger: 3 },
    { display: "G", value: "g", finger: 3 },
    { display: "H", value: "h", finger: 3 },
    { display: "J", value: "j", finger: 3 },
    { display: "K", value: "k", finger: 2 },
    { display: "L", value: "l", finger: 1 },
    { display: ";", value: ";", finger: 0 },
    { display: "'", value: "'", finger: 0 },
    { display: "Enter", value: "enter", finger: 0, width: "extra-wide" },
  ],
  [
    { display: "Shift", value: "shift", finger: 0, width: "wide" },
    { display: "Z", value: "z", finger: 0 },
    { display: "X", value: "x", finger: 1 },
    { display: "C", value: "c", finger: 2 },
    { display: "V", value: "v", finger: 3 },
    { display: "B", value: "b", finger: 3 },
    { display: "N", value: "n", finger: 3 },
    { display: "M", value: "m", finger: 3 },
    { display: ",", value: ",", finger: 2 },
    { display: ".", value: ".", finger: 1 },
    { display: "/", value: "/", finger: 0 },
    { display: "Shift", value: "shift", finger: 0, width: "extra-wide" },
  ],
  [
    { display: "Ctrl", value: "control", finger: 0, grow: true },
    { display: "Alt", value: "alt", finger: 0, grow: true },
    { display: "Space", value: " ", finger: 4, width: "spacebar" },
    { display: "Alt", value: "alt", finger: 0, grow: true },
    { display: "Ctrl", value: "control", finger: 0, grow: true },
  ],
];

interface KeyboardProps {
  pressedKey: string | null;
  keyCount: number;
}

function normalizeKey(key: string): string {
  if (key.length === 1 && key >= "a" && key <= "z") return key;
  if (key.length === 1 && key >= "A" && key <= "Z") return key.toLowerCase();
  if (key === "ArrowUp") return "shift";
  if (key === "ArrowDown") return "enter";
  if (key === "ArrowLeft") return "control";
  if (key === "ArrowRight") return "alt";
  return key.toLowerCase();
}

export default function Keyboard({ pressedKey, keyCount }: KeyboardProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    if (!pressedKey) return;

    const normalized = normalizeKey(pressedKey);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveKey(normalized);

    const timeout = setTimeout(() => {
      setActiveKey(null);
    }, 100);

    return () => clearTimeout(timeout);
  }, [pressedKey, keyCount]);

  const isKeyPressed = (keyValue: string): boolean => {
    if (!activeKey) return false;
    return activeKey.toLowerCase() === keyValue.toLowerCase();
  };

  return (
    <Wrapper>
      <KeyboardContainer>
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((key, keyIndex) => (
              <Key
                key={`${rowIndex}-${keyIndex}`}
                type="button"
                $finger={key.finger}
                $pressed={isKeyPressed(key.value)}
                $grow={key.grow}
                className={key.width || ""}
              >
                {key.display}
              </Key>
            ))}
          </Row>
        ))}
      </KeyboardContainer>
    </Wrapper>
  );
}