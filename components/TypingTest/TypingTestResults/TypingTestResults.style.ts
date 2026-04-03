import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xl);
  padding: var(--space-2xl);
`;

const Title = styled.h2`
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
  width: 100%;
  max-width: 400px;
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
`;

const StatValue = styled.div`
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
`;

const StatLabel = styled.div`
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-top: var(--space-xs);
`;

const CharacterBreakdown = styled.div`
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  padding: var(--space-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
`;

const CharacterCorrect = styled.span`
  color: var(--color-success);
`;

const CharacterIncorrect = styled.span`
  color: var(--color-error);
`;

const CharacterTotal = styled.span`
  color: var(--color-text-primary);
`;

const ResetButton = styled.button`
  padding: var(--space-md) var(--space-2xl);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: background var(--transition-fast);

  &:hover {
    background: var(--color-primary-hover);
  }
`;

export {
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
};
