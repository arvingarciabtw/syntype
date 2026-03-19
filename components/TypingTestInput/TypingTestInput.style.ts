import styled, { css, keyframes } from "styled-components";

/*
  --- ANIMATIONS ---
*/

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

const newlinePulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
`;

/*
  --- COMPONENTS ---
*/

const Wrapper = styled.div`
  --color-correct: oklch(0.8003 0.1821 151.71);
  --color-correct-bg: rgba(74, 222, 128, 0.15);
  --color-incorrect: oklch(0.7106 0.1661 22.22);
  --color-incorrect-bg: rgba(248, 113, 113, 0.2);
  --line-h: 32px;
  padding: 0;
  width: 100%;
  position: relative;
  background: var(--color-gray-900);
  border: 1px solid var(--color-gray-850);
  border-radius: var(--radius-md);
  cursor: text;
  user-select: none;
  font-family: var(--font-jetbrains-mono);
  font-size: var(--font-md);
  font-variant-ligatures: none;

  html.dark & {
    --color-correct: pink;
  }
`;

const HiddenInput = styled.input`
  width: 0;
  height: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const Window = styled.div`
  position: relative;
  height: calc(var(--line-h) * var(--visible, 6));
  overflow: hidden;
  padding: var(--radius-xl) var(--radius-2xl);
  box-sizing: content-box;
  border-radius: var(--radius-md);
`;

const LinesBlur = styled.div<{ $inactive: boolean }>`
  transition:
    filter 200ms ease,
    opacity 200ms ease;

  ${({ $inactive }) =>
    $inactive &&
    css`
      filter: blur(4px);
      opacity: 0.3;
      pointer-events: none;
    `}
`;

const Lines = styled.div`
  transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
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
  color: var(--color-gray-600);
  transition:
    background-color 60ms ease,
    color 60ms ease;
  letter-spacing: 0.01em;

  &.correct {
    background-color: var(--color-correct-bg);
    color: var(--color-correct);
  }

  &.incorrect {
    background-color: var(--color-incorrect-bg);
    color: var(--color-incorrect);
  }

  &.correct[data-space="true"] {
    background-color: var(--color-correct-bg);
    color: transparent;
  }

  &.incorrect[data-space="true"] {
    background-color: var(--color-incorrect-bg);
    color: transparent;
  }

  &.newline-char {
    color: transparent;
    background-color: transparent;
    padding: 0 2px;
  }

  &.newline-char.cursor-active {
    color: var(--color-fg);
    background-color: var(--color-gray-800);
    animation: ${newlinePulse} 1.5s ease-in-out infinite;
  }

  &.newline-char.correct {
    background-color: var(--color-correct-bg);
    border-color: transparent;
    color: var(--color-correct);
    animation: none;
  }

  &.newline-char.incorrect {
    background-color: var(--color-incorrect-bg);
    border-color: transparent;
    color: var(--color-incorrect);
    animation: none;
  }

  &.cursor-active {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: -1px;
      top: 20%;
      height: 60%;
      width: 2px;
      background: var(--color-gray-100);
      border-radius: 0;
      animation: ${blink} 1s step-end infinite;
    }
  }
`;

const Fade = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 48px;
  pointer-events: none;
  z-index: 2;
`;

const FadeTop = styled(Fade)`
  top: 0;
  background: linear-gradient(to bottom, var(--color-surface), transparent);
`;

const FadeBottom = styled(Fade)`
  bottom: 0;
  background: linear-gradient(to top, var(--color-surface), transparent);
`;

const Inactive = styled.div<{ $hovered: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  span {
    opacity: ${({ $hovered }) => ($hovered ? 0 : 1)};
    transition: opacity 200ms ease;
  }
`;

const Done = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  border-radius: var(--radius-md);
  z-index: 10;
  cursor: pointer;

  &:hover span {
    color: var(--color-gray-100);
  }
`;

const Message = styled.span`
  font-family: var(--font-jetbrains-mono);
  font-size: var(--font-sm);
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-gray-500);
  transition: color 150ms ease;
`;

export {
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
};
