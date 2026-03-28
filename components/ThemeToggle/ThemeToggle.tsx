"use client";

import React from "react";
import Cookie from "js-cookie";
import Button from "@/components/Button";
import { Sun, Moon } from "react-feather";
import { LIGHT_COLORS, DARK_COLORS } from "@/lib/constants";
import type { ThemeToggleProps } from "@/components/ThemeToggle/ThemeToggle.types";

function ThemeToggle({ initialTheme }: ThemeToggleProps) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);

    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    const colors = nextTheme === "light" ? LIGHT_COLORS : DARK_COLORS;

    root.setAttribute("data-color-theme", nextTheme);

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <Button
      variant="icon"
      className=""
      onClick={handleClick}
      aria-label="Toggle dark / light mode"
    >
      {theme === "light" ? <Sun size="1.25rem" /> : <Moon size="1.25rem" />}
    </Button>
  );
}

export default ThemeToggle;
