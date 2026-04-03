"use client";

import {
  Container,
  Title,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  CharacterBreakdown,
  CharacterCorrect,
  CharacterIncorrect,
  CharacterTotal,
  ResetButton,
} from "./TypingTestResults.style";
import Graph from "@/components/Graph/Graph";
import type { TypingTestResultsProps } from "./TypingTestResults.types";

export default function TypingTestResults({
  results,
  onReset,
}: TypingTestResultsProps) {
  return (
    <Container>
      <Title>Test Complete!</Title>
      <StatsGrid>
        <StatCard>
          <StatValue>{results.wpm}</StatValue>
          <StatLabel>WPM</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{results.accuracy}%</StatValue>
          <StatLabel>Accuracy</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{results.time}s</StatValue>
          <StatLabel>Time</StatLabel>
        </StatCard>
      </StatsGrid>
      <Graph data={results.wpmHistory} />
      <CharacterBreakdown>
        <CharacterCorrect>{results.correct}</CharacterCorrect>
        {"/"}
        <CharacterIncorrect>{results.incorrect}</CharacterIncorrect>
        {"/"}
        <CharacterTotal>{results.total}</CharacterTotal>
      </CharacterBreakdown>
      <ResetButton onClick={onReset}>Try Again</ResetButton>
    </Container>
  );
}
