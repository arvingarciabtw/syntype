"use client";

import styled from "styled-components";
import React from "react";
import Cookie from "js-cookie";
import { Sun, Moon } from "react-feather";
import { LIGHT_COLORS, DARK_COLORS } from "@/lib/constants";

function ThemeToggle({ initialTheme }: { initialTheme: string }) {
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
    <Wrapper
      className=""
      onClick={handleClick}
      aria-label="Toggle dark / light mode"
    >
      {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  padding: 0;
  background-color: transparent;
  color: var(--color-gray-300);
  border: 8px solid transparent;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    background-color: var(--color-gray-850);
    border-color: var(--color-gray-850);
  }
`;

export default ThemeToggle;
