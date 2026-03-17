import styled from "styled-components";
import TypingTestInput from "@/components/TypingTestInput";
import {
  EXAMPLE_ONE,
  EXAMPLE_TWO,
} from "@/components/TypingTestInput/TypingTestInput.constants";

function OverviewPage() {
  return (
    <Wrapper>
      <Section title="Overview">
        <p>
          Syntype is a typing test for programmers. Instead of random words, you
          type actual code blocks. Pick the length, set a duration, and
          optionally give an AI prompt to generate specific code. You can also
          challenge a friend to a 1v1 if you want.
        </p>
      </Section>
      <Section title="Why build this">
        <p>
          A lot of typing tests just throw random words at you. That&apos;s
          fine, but programming has its own patterns that those tests don&apos;t
          really cover. Here&apos;s an example of what a &quot;programmer&quot;
          typing test might look like:
        </p>
        <TypingTestInput code={EXAMPLE_ONE} />
        <p>
          These are real JS identifiers, but that&apos;s not how we actually
          write code. In practice it looks more like this:
        </p>
        <TypingTestInput code={EXAMPLE_TWO} />
        <p>
          Syntype tries to fix that by letting you practice on real, structured
          code. You can also use the AI prompt feature to generate code in
          whatever language or style you actually work in day to day.
        </p>
      </Section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-3xl);
`;

function Section({
  title = "Section Title",
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SectionWrapper>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  color: var(--color-gray-300);
`;
const SectionTitle = styled.h1`
  color: var(--color-fg);
`;

export default OverviewPage;
