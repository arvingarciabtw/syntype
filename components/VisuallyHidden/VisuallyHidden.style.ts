import styled from "styled-components";

const VisuallyHiddenWrapper = styled.span`
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
export default VisuallyHiddenWrapper;
