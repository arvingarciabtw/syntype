import { BREAKPOINTS } from "@/lib/constants";
import { Dialog } from "@base-ui/react/dialog";
import styled from "styled-components";

const StyledTrigger = styled(Dialog.Trigger)`
  padding: 0;
  margin: 0;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: var(--color-gray-fg);
  border: none;
  border-radius: var(--radius-full);
  user-select: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  @media (hover: hover) {
    &:hover {
      opacity: 0.75;
    }
    &:focus-visible {
      outline: 2px solid var(--color-fg);
      outline-offset: 4px;
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}rem) {
    & {
      display: none;
    }
  }
`;
const StyledBackdrop = styled(Dialog.Backdrop)`
  position: fixed;
  min-height: 100dvh;
  inset: 0;
  background-color: black;
  opacity: 0.25;
  transition: opacity 150ms cubic-bezier(0.45, 1.005, 0, 1.005);
  touch-action: none;

  /* iOS 26+: Ensure the backdrop covers the entire visible viewport. */
  @supports (-webkit-touch-callout: none) {
    position: absolute;
  }
  @media (prefers-color-scheme: dark) {
    opacity: 0.75;
  }
  &[data-starting-style],
  &[data-ending-style] {
    opacity: 0;
  }
`;
const StyledPopup = styled(Dialog.Popup)`
  margin: 0;
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100dvh;
  width: 100vw;
  padding: 1.5rem;
  background-color: var(--color-bg);
  color: var(--color-gray-fg);
  transition: all 150ms;
  touch-action: none;
  @media (prefers-color-scheme: dark) {
    outline: 1px solid var(--color-gray-300);
  }
  &[data-starting-style],
  &[data-ending-style] {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
`;
const StyledTitle = styled(Dialog.Title)`
  margin-top: -0.375rem;
  margin-bottom: 0.25rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  letter-spacing: -0.0025em;
  font-weight: 500;
`;
const StyledDescription = styled(Dialog.Description)`
  margin: 0 0 1.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-gray-600);
`;
const StyledClose = styled(Dialog.Close)`
  positin: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  color: var(--color-fg);
  border: none;
  border-radius: var(--radius-full);
`;
const ContentWrapper = styled.div`
  height: 100%;
  position: relative;
`;
const NavigationList = styled.ul`
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-md);
  list-style-type: none;
`;
const NavigationItem = styled.li`
  font-weight: var(--weight-bold);
  font-size: var(--font-xl);

  & > a {
    color: var(--color-fg);
    text-decoration: none;
  }
`;

export {
  StyledTrigger,
  StyledBackdrop,
  StyledPopup,
  StyledTitle,
  StyledDescription,
  StyledClose,
  ContentWrapper,
  NavigationList,
  NavigationItem,
};
