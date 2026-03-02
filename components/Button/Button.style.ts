import styled from "styled-components";

const ButtonWrapper = styled.button`
  padding: var(--space-xs) 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const CTA = styled(ButtonWrapper)`
  background-color: var(--color-primary);
  color: var(--color-gray-900);
  border: 1px solid var(--color-primary);
  font-weight: var(--weight-medium);

  &:hover {
    opacity: 0.75;
  }
`;

const Ghost = styled(ButtonWrapper)`
  background-color: transparent;
  color: var(--color-black);
  border: none;

  html.dark & {
    color: var(--color-white);
  }

  & svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

const Regular = styled(ButtonWrapper)`
  background-color: var(--color-gray-100);
  color: var(--color-fg);
  border: 1px solid var(--color-gray-200);

  &:hover {
    background-color: var(--color-gray-150);
  }

  html.dark & {
    background-color: var(--color-gray-850);
    border-color: var(--color-gray-750);

    &:hover {
      background-color: var(--color-gray-800);
    }
  }
`;

const Danger = styled(ButtonWrapper)`
  background-color: var(--color-danger);
  color: var(--color-bg);
  border: 1px solid var(--color-danger);

  &:hover {
    opacity: 0.75;
  }

  html.dark & {
    color: var(--color-fg);
  }
`;

const Icon = styled(ButtonWrapper)`
  padding: 0;
  background-color: transparent;
  color: var(--color-fg);
  border: none;

  & > svg {
    color: var(--color-fg);
  }

  &:hover {
    opacity: 0.75;
  }

  html.dark & {
    color: var(--color-gray-300);
  }
`;

export { CTA, Ghost, Regular, Danger, Icon };
