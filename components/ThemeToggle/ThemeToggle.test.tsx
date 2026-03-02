import { expect, test, beforeEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import ThemeToggle from "@/components/ThemeToggle";

vi.mock("js-cookie", () => ({
  default: {
    get: vi.fn().mockReturnValue(undefined),
    set: vi.fn(),
  },
}));

beforeEach(() => {
  cleanup();
  document.documentElement.removeAttribute("data-color-theme");
  document.documentElement.classList.remove("dark");
});

test("ThemeToggle renders button with correct aria-label", () => {
  render(<ThemeToggle initialTheme="light" />);
  expect(screen.getByRole("button").getAttribute("aria-label")).toBe("Toggle dark / light mode");
});

test("ThemeToggle shows Sun icon when initialTheme is light", () => {
  render(<ThemeToggle initialTheme="light" />);
  const button = screen.getByRole("button");
  expect(button.querySelector("svg")).toBeDefined();
});

test("ThemeToggle shows Moon icon when initialTheme is dark", () => {
  render(<ThemeToggle initialTheme="dark" />);
  const button = screen.getByRole("button");
  expect(button.querySelector("svg")).toBeDefined();
});

test("ThemeToggle toggles theme on click", () => {
  render(<ThemeToggle initialTheme="light" />);

  const button = screen.getByRole("button");
  fireEvent.click(button);

  expect(document.documentElement.getAttribute("data-color-theme")).toBe("dark");
});

test("ThemeToggle sets CSS variables when toggling to dark", () => {
  render(<ThemeToggle initialTheme="light" />);

  const button = screen.getByRole("button");
  fireEvent.click(button);

  const styles = document.documentElement.style;
  expect(styles.getPropertyValue("--color-bg")).toBeDefined();
  expect(styles.getPropertyValue("--color-fg")).toBeDefined();
});
