import {
  CTA,
  Ghost,
  Regular,
  Danger,
  Icon,
} from "@/components/Button/Button.style";
import type { Props } from "@/components/Button/Button.types";

function Button({ children, variant, as, ...delegated }: Props) {
  const props = { as, ...delegated };

  return (
    <>
      {variant === "cta" ? (
        <CTA {...props}>{children}</CTA>
      ) : variant === "ghost" ? (
        <Ghost {...props}>{children}</Ghost>
      ) : variant === "danger" ? (
        <Danger {...props}>{children}</Danger>
      ) : variant === "icon" ? (
        <Icon {...props}>{children}</Icon>
      ) : (
        <Regular {...props}>{children}</Regular>
      )}
    </>
  );
}

export default Button;
