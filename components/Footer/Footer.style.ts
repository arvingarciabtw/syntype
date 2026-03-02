import styled from "styled-components";

const Wrapper = styled.footer`
  padding: var(--space-lg);
  text-align: center;
  color: var(--color-gray-300);
`;

const Author = styled.a`
  color: var(--color-fg);

  &:hover {
    text-decoration: none;
  }
`;

export { Wrapper, Author };
