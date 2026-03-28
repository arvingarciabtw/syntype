import styled from "styled-components";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toggle } from "@base-ui/react/toggle";
import { Select } from "@base-ui/react/select";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: var(--space-lg);
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  width: 100%;
  height: 100%;
`;

const Label = styled.label`
  font-size: var(--font-sm);
  font-weight: var(--weight-regular);
  color: var(--color-gray-600);
`;

const StyledToggleGroup = styled(ToggleGroup)`
  display: flex;
  background-color: var(--color-gray-900);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-gray-850);
  padding: 0.25rem;
  gap: 0.25rem;
`;

const ToggleButton = styled(Toggle)`
  padding: 0.5rem 1rem;
  border: none;
  background-color: transparent;
  color: var(--color-gray-400);
  border-radius: calc(var(--radius-md) - 0.125rem);
  font-size: var(--font-sm);
  font-weight: var(--weight-medium);
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
  flex: 1;

  &[data-active="true"] {
    background-color: var(--color-bg);
    color: var(--color-fg);
  }

  &:hover {
    background-color: var(--color-fg);
    color: var(--color-bg);
  }
`;

const StyledSelectTrigger = styled(Select.Trigger)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: var(--color-gray-900);
  border: 1px solid var(--color-gray-850);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  font-weight: var(--weight-medium);
  color: var(--color-gray-400);
  cursor: pointer;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: var(--color-gray-800);
  }
`;

const StyledSelectPositioner = styled(Select.Positioner)`
  z-index: 1000;
`;

const StyledSelectPopup = styled(Select.Popup)`
  background-color: var(--color-gray-900);
  color: var(--color-gray-400);
  border: 1px solid var(--color-gray-850);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: var(--weight-medium);
  padding: 0.25rem;
  max-height: 16rem;
  overflow-y: auto;
`;

const StyledSelectItem = styled(Select.Item)`
  padding: 0.5rem 1rem;
  border-radius: calc(var(--radius-md) - 0.125rem);
  font-size: var(--font-sm);
  font-weight: var(--weight-medium)
  color: var(--color-gray-400);
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover,
  &[data-highlighted="true"] {
    background-color: var(--color-gray-850);
    border: none;
  }

  &[data-state="checked"] {
    background-color: var(--color-gray-100);
    font-weight: var(--weight-semibold);
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  background-color: var(--color-gray-900);
  border: 1px solid var(--color-gray-850);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  font-family: inherit;
  font-weight: var(--weight-medium);
  color: var(--color-gray-400);
  resize: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  overflow: hidden;
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  scrollbar-width: none; /* For Firefox */

  &::placeholder {
    color: var(--color-gray-650);
  }

  &:hover {
    border-color: var(--color-gray-800);
  }

  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and newer versions of Opera */
  }

  &:focus {
    outline: none;
  }
`;

export {
  Wrapper,
  Column,
  Section,
  Label,
  StyledToggleGroup,
  ToggleButton,
  StyledSelectTrigger,
  StyledSelectPositioner,
  StyledSelectPopup,
  StyledSelectItem,
  StyledTextarea,
};
