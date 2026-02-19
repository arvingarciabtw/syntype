import { cookies } from "next/headers";
import { LIGHT_COLORS, DARK_COLORS } from "@/lib/constants";

async function getTheme() {
  const savedTheme = (await cookies()).get("color-theme");
  const theme = savedTheme?.value || "light";

  return theme;
}

async function getThemeColors() {
  const theme = await getTheme();

  const themeColors = (
    theme === "light" ? LIGHT_COLORS : DARK_COLORS
  ) as React.CSSProperties;

  return themeColors;
}

export { getTheme, getThemeColors };
