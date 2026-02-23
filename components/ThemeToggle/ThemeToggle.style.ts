import styled from "styled-components";

const ThemeToggleWrapper = styled.button`
  padding: 0;
  background-color: transparent;
  color: var(--color-gray-300);
  border: 8px solid transparent;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    background-color: var(--color-gray-850);
    border-color: var(--color-gray-850);
  }
`;

export default ThemeToggleWrapper;
