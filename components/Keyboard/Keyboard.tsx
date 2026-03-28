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
import type { KeyboardProps } from "@/components/Keyboard/Keyboard.types";

function normalizeKey(key: string): string {
  if (key.startsWith("Key") && key.length === 4) {
    return key[3].toLowerCase();
  }
  if (key.startsWith("Digit") && key.length === 6) {
    const digit = key[5];
    const shiftDigits: Record<string, string> = {
      "1": "!", "2": "@", "3": "#", "4": "$", "5": "%",
      "6": "^", "7": "&", "8": "*", "9": "(", "0": ")",
    };
    return shiftDigits[digit] || digit;
  }

  const keyMap: Record<string, string> = {
    "Backspace": "backspace",
    "Enter": "enter",
    "Tab": "tab",
    "Space": " ",
    "Minus": "-",
    "Equal": "=",
    "BracketLeft": "[",
    "BracketRight": "]",
    "Backslash": "\\",
    "Semicolon": ";",
    "Quote": "'",
    "Comma": ",",
    "Period": ".",
    "Slash": "/",
    "Backquote": "`",
  };

  if (keyMap[key]) return keyMap[key];

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

  if (key === "ArrowUp") return "ShiftLeft";
  if (key === "ArrowDown") return "Enter";
  if (key === "ArrowLeft") return "ControlLeft";
  if (key === "ArrowRight") return "AltRight";

  return key;
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