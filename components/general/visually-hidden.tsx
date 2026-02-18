import React from "react";
import styled from "styled-components";

const VisuallyHidden = ({
  children,
  ...delegated
}: {
  children: React.ReactNode;
}) => {
  const [forceShow, setForceShow] = React.useState(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") {
          setForceShow(true);
        }
      };

      const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") {
          setForceShow(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return children;
  }

  return (
    <Wrapper className="visually-hidden" {...delegated}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.span`
  &:not(:focus):not(:active) {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0); /* Legacy property for Internet Explorer */
    clip-path: inset(50%);
    white-space: nowrap;
  }
`;

export default VisuallyHidden;
