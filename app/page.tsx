import { cookies } from "next/headers";
import TypingTestClient from "@/components/TypingTest/TypingTestClient";
import { STORAGE_KEY } from "@/components/Keyboard/Keyboard.constants";

export default async function TypingTest() {
  const savedLayout = (await cookies()).get(STORAGE_KEY)?.value;

  const initialLayout =
    savedLayout === "dvorak" ||
    savedLayout === "colemak" ||
    savedLayout === "qwerty"
      ? savedLayout
      : "qwerty";

  return <TypingTestClient initialLayout={initialLayout} />;
}

