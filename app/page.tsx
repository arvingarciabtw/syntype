import styled from "styled-components";
import TypingTestSettings from "@/components/TypingTestSettings";
import TypingTestInput from "@/components/TypingTestInput";
import { EXAMPLE_TWO } from "@/components/TypingTestInput/TypingTestInput.constants";

export default function TypingTest() {
  return (
    <Wrapper>
      <TypingTestSettings />
      <TypingTestInput code={EXAMPLE_TWO} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
