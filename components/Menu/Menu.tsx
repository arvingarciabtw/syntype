import { Dialog } from "@base-ui/react/dialog";
import { Menu as MenuIcon, ArrowLeft } from "react-feather";
import Link from "next/link";
import {
  StyledTrigger,
  StyledBackdrop,
  StyledPopup,
  StyledTitle,
  StyledDescription,
  StyledClose,
  ContentWrapper,
  NavigationList,
  NavigationItem,
} from "@/components/Menu/Menu.style";

function Menu() {
  return (
    <Dialog.Root>
      <StyledTrigger>
        <MenuIcon size="1.25rem" />
      </StyledTrigger>
      <Dialog.Portal>
        <StyledBackdrop />
        <StyledPopup>
          <StyledTitle hidden={true}>Mobile menu</StyledTitle>
          <StyledDescription hidden={true}>
            This is the mobile menu.
          </StyledDescription>
          <ContentWrapper>
            <StyledClose>
              <ArrowLeft />
            </StyledClose>
            <NavigationList>
              <NavigationItem>
                <Link href="/overview">Overview</Link>
              </NavigationItem>
              <NavigationItem>
                <Link href="/challenge">Challenge</Link>
              </NavigationItem>
              <NavigationItem>
                <Link href="/auth">Sign in</Link>
              </NavigationItem>
            </NavigationList>
          </ContentWrapper>
        </StyledPopup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Menu;
