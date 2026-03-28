import React from "react";

type BaseProps = {
  children: React.ReactNode;
  variant: string;
};

export type ButtonProps = BaseProps & {
  as?: never;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type AnchorProps = BaseProps & {
  as: "a";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type CustomProps = BaseProps & { as: React.ElementType } & Record<
    string,
    unknown
  >;

export type Props = ButtonProps | AnchorProps | CustomProps;
