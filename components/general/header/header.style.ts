import styled from "styled-components";
import { BREAKPOINTS } from "@/lib/constants";

const HeaderWrapper = styled.header`
  padding: var(--space-lg);
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-xs);
`;

const RightSide = styled.div`
  display: flex;
  gap: var(--space-xl);
`;

const AppName = styled.h1`
  font-family: var(--font-fira-sans);
  font-size: var(--font-xl);
`;

const NavigationList = styled.ul`
  padding: 0;
  display: flex;
  align-items: center;
  gap: var(--space-xl);
  list-style-type: none;

  @media (max-width: ${BREAKPOINTS.tablet}rem) {
    li {
      display: none;
    }
  }
`;

const NavigationItem = styled.li`
  display: grid;
  place-items: center;
  color: var(--color-gray-300);

  a {
    color: var(--color-gray-300);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: var(--color-primary);
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
`;

const Hamburger = styled.button`
  display: none;
  padding: 0;
  background-color: transparent;
  color: var(--color-gray-300);
  border: none;
  cursor: pointer;

  svg {
    transition: color 0.3s ease;
  }

  svg:hover {
    color: var(--color-primary);
  }

  @media (max-width: ${BREAKPOINTS.tablet}rem) {
    display: block;
  }
`;

export {
  HeaderWrapper,
  Navigation,
  LeftSide,
  RightSide,
  AppName,
  NavigationList,
  NavigationItem,
  Buttons,
  Hamburger,
};
