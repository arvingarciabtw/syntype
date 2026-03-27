import styled from "styled-components";

export const Wrapper = styled.div`
  display: none;

  @media (min-width: 37.5rem) {
    display: block;
    transform-origin: top center;
  }

  @media (min-width: 56.25rem) {
    transform: scale(1);
  }

  @media (min-width: 37.5rem) and (max-width: 56.25rem) {
    transform: scale(0.75);
  }
`;

export const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
  padding: var(--space-md);
  background-color: var(--color-gray-900);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-gray-800);
  user-select: none;
`;

export const Row = styled.div`
  display: flex;
  gap: var(--space-2xs);
`;

export const Key = styled.button<{
  $finger: number;
  $pressed: boolean;
  $grow?: boolean;
}>`
  min-width: 40px;
  height: 40px;
  padding: 0 var(--space-xs);
  border: none;
  border-radius: var(--radius-xs);
  background-color: ${({ $finger }) => {
    const colors = [
      "var(--color-gray-600)",
      "var(--color-gray-650)",
      "var(--color-gray-700)",
      "var(--color-gray-750)",
      "var(--color-gray-800)",
    ];
    return colors[$finger] || "var(--color-gray-350)";
  }};
  color: var(--color-fg);
  font-family: var(--font-jetbrains-mono);
  font-size: var(--font-xs);
  font-weight: var(--weight-regular);
  cursor: default;
  transition:
    background-color 100ms ease,
    transform 50ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${({ $pressed }) =>
    $pressed &&
    `
    background-color: var(--color-primary) !important;
    color: var(--color-bg);
    transform: scale(0.95);
  `}

  ${({ $grow }) =>
    $grow &&
    `
    flex-grow: 0.5;
  `}

  &.wide {
    min-width: 60px;
    flex-grow: 1;
  }

  &.extra-wide {
    min-width: 80px;
    flex-grow: 2;
  }

  &.spacebar {
    min-width: 200px;
    max-width: 340px;
    flex-grow: 4;
  }
`;

export const FingerLabel = styled.span`
  font-size: var(--font-3xs);
  color: var(--color-gray-600);
  display: block;
  margin-top: 2px;
`;
