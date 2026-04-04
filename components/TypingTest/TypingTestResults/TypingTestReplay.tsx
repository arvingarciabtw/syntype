"use client";

import styled from "styled-components";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  ReplayContainer,
  CodeWindow,
  Lines,
  Line as ReplayLine,
  IndentSpacer,
  Char as ReplayChar,
  Controls,
  ReplayButton,
} from "./TypingTestReplay.style";
import type { TypingHistoryEntry, CharStatus } from "./TypingTestReplay.types";

interface TypingTestReplayProps {
  code: string;
  typingHistory: TypingHistoryEntry[];
  onReset: () => void;
}

interface CharDisplay {
  char: string;
  status: CharStatus;
}

interface LineData {
  indent: number;
  chars: CharDisplay[];
}

function parseCodeToLines(code: string): LineData[] {
  const rawLines = code.split("\n");
  return rawLines.map((raw, i) => {
    const indent = raw.match(/^(\s*)/)?.[1].length ?? 0;
    const stripped = raw.slice(indent);
    const chars: CharDisplay[] = stripped.split("").map((ch) => ({
      char: ch,
      status: "untyped" as CharStatus,
    }));
    if (i < rawLines.length - 1) {
      chars.push({ char: "↵", status: "untyped" as CharStatus });
    }
    return { indent, chars };
  });
}

function buildFinalState(
  lines: LineData[],
  typingHistory: TypingHistoryEntry[]
): LineData[] {
  const statusMap = new Map<number, CharStatus>();
  typingHistory.forEach((entry) => {
    statusMap.set(entry.charIndex, entry.status);
  });

  let globalIndex = 0;
  return lines.map((line) => ({
    indent: line.indent,
    chars: line.chars.map((ch) => {
      const status = statusMap.get(globalIndex) ?? "untyped";
      globalIndex++;
      return { ...ch, status };
    }),
  }));
}

function flattenToCharArray(lines: LineData[]): CharDisplay[] {
  return lines.flatMap((line) => line.chars);
}

function unflattenToLines(chars: CharDisplay[], originalLines: LineData[]): LineData[] {
  const result: LineData[] = [];
  let charIndex = 0;
  for (const originalLine of originalLines) {
    const lineChars: CharDisplay[] = [];
    for (let i = 0; i < originalLine.chars.length; i++) {
      lineChars.push(chars[charIndex] ?? { char: originalLine.chars[i].char, status: "untyped" });
      charIndex++;
    }
    result.push({ indent: originalLine.indent, chars: lineChars });
  }
  return result;
}

export default function TypingTestReplay({
  code,
  typingHistory,
  onReset,
}: TypingTestReplayProps) {
  const originalLines = parseCodeToLines(code);
  const finalState = buildFinalState(originalLines, typingHistory);
  const [displayLines, setDisplayLines] = useState<LineData[]>(finalState);
  const [isReplaying, setIsReplaying] = useState(false);
  const [hasStartedReplay, setHasStartedReplay] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetToInitial = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsReplaying(false);
    setHasStartedReplay(false);
    setDisplayLines(originalLines);
  }, [originalLines]);

  const startReplay = useCallback(() => {
    resetToInitial();
    setIsReplaying(true);
    setHasStartedReplay(true);

    let index = 0;
    const sortedHistory = [...typingHistory].sort(
      (a, b) => a.timestamp - b.timestamp
    );

    const allChars = flattenToCharArray(originalLines);
    const charsCopy = allChars.map((ch) => ({ ...ch }));

    const playNext = () => {
      if (index >= sortedHistory.length) {
        setIsReplaying(false);
        return;
      }

      const entry = sortedHistory[index];
      if (charsCopy[entry.charIndex]) {
        charsCopy[entry.charIndex] = {
          ...charsCopy[entry.charIndex],
          status: entry.status,
        };
        const newLines = unflattenToLines(charsCopy, originalLines);
        setDisplayLines(newLines);
      }

      index++;

      if (index < sortedHistory.length) {
        const nextTimestamp = sortedHistory[index].timestamp;
        const currentTimestamp = sortedHistory[index - 1].timestamp;
        const delay = nextTimestamp - currentTimestamp;
        timeoutRef.current = setTimeout(playNext, delay);
      } else {
        setIsReplaying(false);
      }
    };

    if (sortedHistory.length > 0) {
      playNext();
    } else {
      setIsReplaying(false);
    }
  }, [typingHistory, resetToInitial, originalLines]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleReplayClick = () => {
    if (!hasStartedReplay) {
      startReplay();
    } else {
      resetToInitial();
      setTimeout(startReplay, 0);
    }
  };

  return (
    <ReplayContainer>
      <CodeWindow>
        <Lines>
          {displayLines.map((line, lineIdx) => (
            <ReplayLine key={lineIdx}>
              {line.indent > 0 && (
                <IndentSpacer style={{ width: `${line.indent}ch` }} />
              )}
              {line.chars.map((ch, charIdx) => {
                const isNewline = ch.char === "↵";
                return (
                  <ReplayChar
                    key={charIdx}
                    className={ch.status}
                    data-newline={isNewline ? "true" : undefined}
                    data-space={ch.char === " " ? "true" : undefined}
                  >
                    {isNewline ? "↵" : ch.char}
                  </ReplayChar>
                );
              })}
            </ReplayLine>
          ))}
        </Lines>
      </CodeWindow>
      <Controls>
        <ReplayButton onClick={handleReplayClick} disabled={isReplaying}>
          {hasStartedReplay ? "Replay" : "Start Replay"}
        </ReplayButton>
        <ResetButton onClick={onReset}>Try Again</ResetButton>
      </Controls>
    </ReplayContainer>
  );
}

const ResetButton = styled.button`
  padding: var(--space-md) var(--space-2xl);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: background var(--transition-fast);

  &:hover {
    background: var(--color-primary-hover);
  }
`;
