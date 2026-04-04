import styled from "styled-components";

const ReplayContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xl);
`;

const CodeWindow = styled.div`
  --line-h: 32px;
  font-family: var(--font-jetbrains-mono);
  font-size: var(--font-md);
  line-height: var(--line-h);
  background: var(--color-gray-900);
  border: 1px solid var(--color-gray-850);
  border-radius: var(--radius-md);
  padding: var(--radius-xl) var(--radius-2xl);
  width: 100%;
  overflow-x: auto;
`;

const Lines = styled.div`
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  min-height: var(--line-h);
  white-space: pre-wrap;
  word-break: break-word;
`;

const IndentSpacer = styled.span`
  display: inline-block;
  flex-shrink: 0;
`;

const Char = styled.span`
  display: inline-block;
  position: relative;
  line-height: var(--line-h);
  letter-spacing: 0.01em;
  transition:
    background-color 60ms ease,
    color 60ms ease;

  &.untyped {
    color: var(--color-gray-600);
  }

  &.correct {
    background-color: rgba(74, 222, 128, 0.15);
    color: oklch(0.8003 0.1821 151.71);
  }

  &.incorrect {
    background-color: rgba(248, 113, 113, 0.2);
    color: oklch(0.7106 0.1661 22.22);
  }

  &.correct[data-space="true"] {
    background-color: rgba(74, 222, 128, 0.15);
    color: transparent;
  }

  &.incorrect[data-space="true"] {
    background-color: rgba(248, 113, 113, 0.2);
    color: transparent;
  }

  &[data-newline="true"] {
    color: transparent;
    background-color: transparent;
    padding: 0 2px;
  }

  &[data-newline="true"].correct {
    background-color: rgba(74, 222, 128, 0.15);
    color: oklch(0.8003 0.1821 151.71);
  }

  &[data-newline="true"].incorrect {
    background-color: rgba(248, 113, 113, 0.2);
    color: oklch(0.7106 0.1661 22.22);
  }
`;

const Controls = styled.div`
  display: flex;
  gap: var(--space-md);
`;

const ReplayButton = styled.button`
  padding: var(--space-md) var(--space-2xl);
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover:not(:disabled) {
    background: var(--color-border);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export {
  ReplayContainer,
  CodeWindow,
  Lines,
  Line,
  IndentSpacer,
  Char,
  Controls,
  ReplayButton,
};
