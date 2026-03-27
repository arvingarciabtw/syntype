"use client";

import { useEffect, useState } from "react";
import {
  Wrapper,
  KeyboardContainer,
  Row,
  Key,
  ShiftDisplay,
} from "@/components/Keyboard/Keyboard.style";
import { KEYBOARD_LAYOUTS } from "@/components/Keyboard/Keyboard.constants";

export type KeyboardLayout = "qwerty" | "dvorak" | "colemak";

interface KeyboardProps {
  pressedKey: string | null;
  keyCount: number;
  layout?: KeyboardLayout;
}

function normalizeKey(key: string): string {
  if (key.length === 1 && key >= "a" && key <= "z") return key;
  if (key.length === 1 && key >= "A" && key <= "Z") return key.toLowerCase();

  const shiftMap: Record<string, string> = {
    "~": "`",
    "!": "1",
    "@": "2",
    "#": "3",
    "$": "4",
    "%": "5",
    "^": "6",
    "&": "7",
    "*": "8",
    "(": "9",
    ")": "0",
    "_": "-",
    "+": "=",
    "{": "[",
    "}": "]",
    "|": "\\",
    ":": ";",
    '"': "'",
    "<": ",",
    ">": ".",
    "?": "/",
  };

  if (shiftMap[key]) return shiftMap[key];

  if (key === "ArrowUp") return "shift";
  if (key === "ArrowDown") return "enter";
  if (key === "ArrowLeft") return "control";
  if (key === "ArrowRight") return "alt";
  return key.toLowerCase();
}

export default function Keyboard({
  pressedKey,
  keyCount,
  layout = "qwerty",
}: KeyboardProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const keyboardLayout = KEYBOARD_LAYOUTS[layout] || KEYBOARD_LAYOUTS.qwerty;

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
        {keyboardLayout.map((row, rowIndex) => (
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
                {key.displayShift && <ShiftDisplay>{key.displayShift}</ShiftDisplay>}
                {key.display}
              </Key>
            ))}
          </Row>
        ))}
      </KeyboardContainer>
    </Wrapper>
  );
}