import styled from "styled-components";
import Link from "next/link";

function NotFound() {
  return (
    <Wrapper>
      <StatusCode>404</StatusCode>
      <StatusMessage>
        No page found here. This page may have been moved or deleted.
      </StatusMessage>
      <RedirectLink href="/">Go back home</RedirectLink>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatusCode = styled.h1`
  font-size: var(--font-4xl);
  font-weight: var(--weight-bold);
`;

const StatusMessage = styled.p`
  max-width: 16rem;
  color: var(--color-gray-300);
  text-align: center;
`;

const RedirectLink = styled(Link)`
  padding: var(--space-xs) var(--space-md);
  margin-top: var(--space-md);
  background-color: var(--color-gray-900);
  color: var(--color-gray-300);
  border: 1px solid var(--color-gray-800);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-gray-850);
  }
`;

export default NotFound;
