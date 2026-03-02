import {
  CTA,
  Ghost,
  Regular,
  Danger,
  Icon,
} from "@/components/Button/Button.style";

type BaseProps = {
  children: React.ReactNode;
  variant: string;
};

type ButtonProps = BaseProps & {
  as?: never;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = BaseProps & {
  as: "a";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;
type CustomProps = BaseProps & { as: React.ElementType } & Record<
    string,
    unknown
  >;

type Props = ButtonProps | AnchorProps | CustomProps;

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
