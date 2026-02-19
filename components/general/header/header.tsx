import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/general/theme-toggle";
import { Menu } from "react-feather";
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
  Hamburger,
} from "../header/header.style";

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
              <Hamburger>
                <Menu />
              </Hamburger>
            </NavigationItem>
          </Buttons>
        </RightSide>
      </Navigation>
    </HeaderWrapper>
  );
}

export default Header;
