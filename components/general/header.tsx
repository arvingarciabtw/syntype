import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "react-feather";
import { BREAKPOINTS } from "@/lib/constants";

async function Header() {
  return (
    <Wrapper className="wrapper-primary">
      <Navigation>
        <LeftSide>
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Syntype logo"
              width={32}
              height={32}
            />
          </Link>
          <AppName>syntype</AppName>
        </LeftSide>
        <RightSide>
          <NavigationList>
            <NavigationItem>
              <Link href="/overview">Overview</Link>
            </NavigationItem>
            <NavigationItem>
              <Link href="/challenge">Challenge</Link>
            </NavigationItem>
            <NavigationItem>
              <Link href="/sign-in">Sign in</Link>
            </NavigationItem>
          </NavigationList>
          <Buttons>
            <NavigationItem>
            </NavigationItem>
            <NavigationItem>
              <Hamburger>
                <Menu />
              </Hamburger>
            </NavigationItem>
          </Buttons>
        </RightSide>
      </Navigation>
    </Wrapper>
  );
}

const Wrapper = styled.header`
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

const RightSide = styled.ul`
  padding: 0;
  display: flex;
  gap: var(--space-xl);
  list-style-type: none;
`;

const AppName = styled.h1`
  font-family: var(--font-fira-sans);
  font-size: var(--font-xl);
`;

const NavigationList = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-xl);

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

export default Header;
