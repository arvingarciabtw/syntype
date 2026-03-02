import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Menu from "@/components/Menu";
import { getTheme } from "@/lib/helpers/theme";
import {
  HeaderWrapper,
  Navigation,
  LeftSide,
  RightSide,
  AppName,
  NavigationList,
  NavigationItem,
  Buttons,
} from "@/components/Header/Header.style";

async function Header() {
  const theme = await getTheme();

  return (
    <HeaderWrapper className="wrapper-primary">
      <Navigation>
        <LeftSide>
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Syntype logo"
              width={32}
              height={32}
              loading="eager"
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
              <ThemeToggle initialTheme={theme} />
            </NavigationItem>
            <NavigationItem>
              <Menu />
            </NavigationItem>
          </Buttons>
        </RightSide>
      </Navigation>
    </HeaderWrapper>
  );
}

export default Header;
