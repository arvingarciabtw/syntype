import styled from "styled-components";

function Footer() {
  return (
    <Wrapper className="wrapper-primary">
      {" "}
      Made by{" "}
      <Author
        href="https://github.com/arvingarciabtw/syntype"
        target="_blank"
        rel="noopener noreferrer"
      >
        @arvingarciabtw
      </Author>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  padding: var(--space-lg);
  text-align: center;
  color: var(--color-gray-300);
`;

const Author = styled.a`
  color: var(--color-gray-300);

  &:hover {
    text-decoration: none;
  }
`;

export default Footer;
