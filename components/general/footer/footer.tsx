import { Wrapper, Author } from "../footer/footer.style";

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

export default Footer;
