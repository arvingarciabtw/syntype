import { Wrapper, Author } from "@/components/Footer/Footer.style";

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
