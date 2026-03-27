"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Wrapper,
  HiddenInput,
  Window,
  LinesBlur,
  Lines,
  Line,
  IndentSpacer,
  Char,
  FadeTop,
  FadeBottom,
  Inactive,
  Done,
  Message,
} from "@/components/TypingTestInput/TypingTestInput.style";

/*
  --- TYPES ---
*/

type CharStatus = "untyped" | "correct" | "incorrect";

interface CharData {
  expected: string;
  status: CharStatus;
}

interface Line {
  indent: number;
  chars: CharData[];
}

interface CursorPos {
  line: number;
  char: number;
}

interface TypingStats {
  correct: number;
  incorrect: number;
  total: number;
}

interface TypingTestInputProps {
  code: string;
  onComplete?: (stats: TypingStats) => void;
  onProgress?: (stats: TypingStats) => void;
  onKeyPress?: (key: string) => void;
  visibleLines?: number; /* how many lines to show at once, default: 6 */
}

/*
  --- PARSER ---
*/

function parseCode(code: string): Line[] {
  const rawLines = code.split("\n");
  return rawLines.map((raw, i) => {
    const indent = raw.match(/^(\s*)/)?.[1].length ?? 0;
    const stripped = raw.slice(indent);
    const chars: CharData[] = stripped.split("").map((ch) => ({
      expected: ch,
      status: "untyped",
    }));
    // append newline char for every line except the last
    if (i < rawLines.length - 1) {
      chars.push({ expected: "↵", status: "untyped" });
    }
    return { indent, chars };
  });
}

/*
  --- STATS HELPER ---
*/

function computeStats(lines: Line[]): TypingStats {
  let correct = 0,
    incorrect = 0,
    total = 0;
  for (const line of lines) {
    for (const ch of line.chars) {
      if (ch.status === "correct") {
        correct++;
        total++;
      } else if (ch.status === "incorrect") {
        incorrect++;
        total++;
      }
    }
  }
  return { correct, incorrect, total };
}

/*
  --- COMPONENT ---
*/

const LINE_HEIGHT_PX = 32; // must match CSS --line-h
const VISIBLE_LINES_DEFAULT = 6;
const CURSOR_ANCHOR_ROW = 2;

export default function TypingTestInput({
  code,
  onComplete,
  onProgress,
  onKeyPress,
  visibleLines = VISIBLE_LINES_DEFAULT,
}: TypingTestInputProps) {
  const [lines, setLines] = useState<Line[]>(() => parseCode(code));
  const [cursor, setCursor] = useState<CursorPos>({ line: 0, char: 0 });
  const [done, setDone] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(parseCode(code));
    setCursor({ line: 0, char: 0 });
    setDone(false);
  }, [code]);

  const focusInput = () => hiddenInputRef.current?.focus();

  const restartTest = () => {
    setLines(parseCode(code));
    setCursor({ line: 0, char: 0 });
    setDone(false);
    setIsFocused(true);
    setTimeout(() => hiddenInputRef.current?.focus(), 0);
  };

  /* Keyboard handler */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (done) return;

      onKeyPress?.(e.key);

      // prevent browser shortcuts for keys we handle
      if (["Tab", "Enter", "Backspace"].includes(e.key)) e.preventDefault();

      setCursor((prevCursor) => {
        const { line: li, char: ci } = prevCursor;

        /* Backspace */
        if (e.key === "Backspace") {
          if (ci > 0) {
            setLines((prev) => {
              const next = prev.map((l) => ({
                ...l,
                chars: l.chars.map((c) => ({ ...c })),
              }));
              next[li].chars[ci - 1].status = "untyped";
              return next;
            });
            return { line: li, char: ci - 1 };
          } else if (li > 0) {
            setLines((prev) => {
              const next = prev.map((l) => ({
                ...l,
                chars: l.chars.map((c) => ({ ...c })),
              }));
              const lastIdx = next[li - 1].chars.length - 1;
              next[li - 1].chars[lastIdx].status = "untyped";
              return next;
            });
            return { line: li - 1, char: lines[li - 1].chars.length - 1 };
          }
          return prevCursor;
        }

        /* Enter */
        if (e.key === "Enter") {
          const currentChar = lines[li]?.chars[ci];
          if (currentChar?.expected !== "↵") return prevCursor;

          setLines((prev) => {
            const next = prev.map((l) => ({
              ...l,
              chars: l.chars.map((c) => ({ ...c })),
            }));
            next[li].chars[ci].status = "correct";
            return next;
          });

          const nextLine = li + 1;
          if (nextLine >= lines.length) {
            setTimeout(() => {
              setDone(true);
              onComplete?.(computeStats(lines));
            }, 0);
            return prevCursor;
          }
          return { line: nextLine, char: 0 };
        }

        /* Printable character */
        if (e.key.length === 1) {
          const currentChar = lines[li]?.chars[ci];
          if (!currentChar) return prevCursor;

          // typing any non-Enter key on a newline char → mark incorrect, advance line
          if (currentChar.expected === "↵") {
            setLines((prev) => {
              const next = prev.map((l) => ({
                ...l,
                chars: l.chars.map((c) => ({ ...c })),
              }));
              next[li].chars[ci].status = "incorrect";
              return next;
            });
            const nextLine = li + 1;
            if (nextLine >= lines.length) {
              setTimeout(() => {
                setDone(true);
                onComplete?.(computeStats(lines));
              }, 0);
              return prevCursor;
            }
            return { line: nextLine, char: 0 };
          }

          const isCorrect = e.key === currentChar.expected;

          setLines((prev) => {
            const next = prev.map((l) => ({
              ...l,
              chars: l.chars.map((c) => ({ ...c })),
            }));
            next[li].chars[ci].status = isCorrect ? "correct" : "incorrect";
            onProgress?.(computeStats(next));
            return next;
          });

          const nextChar = ci + 1;
          if (nextChar >= lines[li].chars.length && li === lines.length - 1) {
            // last char of last line → done
            setTimeout(() => {
              setDone(true);
              onComplete?.(computeStats(lines));
            }, 0);
            return prevCursor;
          }

          return { line: li, char: nextChar };
        }

        return prevCursor;
      });
    },
    [done, lines, onComplete, onProgress, onKeyPress],
  );

  /* Scroll offset: keep cursor at CURSOR_ANCHOR_ROW  */
  const scrollOffset = Math.max(0, cursor.line - CURSOR_ANCHOR_ROW);
  const translateY = -scrollOffset * LINE_HEIGHT_PX;

  const isBlurred = (!isFocused && !done && !isHovered) || done;

  /* Render */
  return (
    <Wrapper
      onClick={focusInput}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={
        {
          "--line-h": `${LINE_HEIGHT_PX}px`,
          "--visible": visibleLines,
        } as React.CSSProperties
      }
    >
      <HiddenInput
        ref={hiddenInputRef}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        readOnly
        aria-label="Typing input"
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
      />

      <Window aria-hidden>
        <LinesBlur $inactive={isBlurred}>
          <Lines style={{ transform: `translateY(${translateY}px)` }}>
            {lines.map((line, li) => (
              <Line key={li}>
                {line.indent > 0 && (
                  <IndentSpacer style={{ width: `${line.indent}ch` }} />
                )}

                {line.chars.map((ch, ci) => {
                  const isCursor = cursor.line === li && cursor.char === ci;
                  const isNewline = ch.expected === "↵";
                  const isSpace = ch.expected === " ";

                  return (
                    <Char
                      key={ci}
                      className={[
                        ch.status,
                        isNewline ? "newline-char" : "",
                        isCursor && isFocused ? "cursor-active" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      data-space={isSpace ? "true" : undefined}
                    >
                      {isNewline
                        ? isCursor && isFocused
                          ? "↵"
                          : " "
                        : ch.expected}
                    </Char>
                  );
                })}

                {cursor.line === li &&
                  isFocused &&
                  cursor.char === line.chars.length && (
                    <Char className="cursor-active">&nbsp;</Char>
                  )}
              </Line>
            ))}
          </Lines>
        </LinesBlur>

        <FadeTop />
        <FadeBottom />
      </Window>

      {!isFocused && !done && (
        <Inactive $hovered={isHovered}>
          <Message>click to start typing</Message>
        </Inactive>
      )}

      {done && (
        <Done onClick={restartTest}>
          <Message>restart</Message>
        </Done>
      )}
    </Wrapper>
  );
}
