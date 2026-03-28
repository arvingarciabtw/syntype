export type KeyboardLayout = "qwerty" | "dvorak" | "colemak";

export interface KeyboardProps {
  pressedKey: string | null;
  keyCount: number;
  layout?: KeyboardLayout;
}
