import { expect, test, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import TypingTestSettings from "@/components/TypingTestSettings";

beforeEach(cleanup);

test("renders all sections", () => {
  render(<TypingTestSettings />);

  expect(screen.getByRole("group", { name: "Time" })).toBeDefined();
  expect(screen.getByRole("group", { name: "Length" })).toBeDefined();
  expect(screen.getByRole("combobox", { name: "Language" })).toBeDefined();
  expect(screen.getByRole("textbox", { name: "AI Prompt" })).toBeDefined();
});

test("time options render correctly", () => {
  render(<TypingTestSettings />);

  expect(screen.getByRole("button", { name: "15" })).toBeDefined();
  expect(screen.getByRole("button", { name: "30" })).toBeDefined();
  expect(screen.getByRole("button", { name: "60" })).toBeDefined();
});

test("length options render correctly", () => {
  render(<TypingTestSettings />);

  expect(screen.getByRole("button", { name: "Short" })).toBeDefined();
  expect(screen.getByRole("button", { name: "Moderate" })).toBeDefined();
  expect(screen.getByRole("button", { name: "Long" })).toBeDefined();
});

test("default time is 30s", () => {
  render(<TypingTestSettings />);

  const thirtySeconds = screen.getByRole("button", {
    name: "30",
  }) as HTMLButtonElement;
  expect(thirtySeconds.getAttribute("aria-pressed")).toBe("true");
});

test("default length is moderate", () => {
  render(<TypingTestSettings />);

  const moderate = screen.getByRole("button", {
    name: "Moderate",
  }) as HTMLButtonElement;
  expect(moderate.getAttribute("aria-pressed")).toBe("true");
});

test("default language is TypeScript", () => {
  render(<TypingTestSettings />);

  const select = screen.getByRole("combobox", { name: "Language" });
  expect(select.textContent).toBe("TypeScript");
});

test("ai prompt textarea is empty by default", () => {
  render(<TypingTestSettings />);

  const textarea = screen.getByRole("textbox", {
    name: "AI Prompt",
  }) as HTMLTextAreaElement;
  expect(textarea.value).toBe("");
});

test("ai prompt textarea has placeholder text", () => {
  render(<TypingTestSettings />);

  const textarea = screen.getByRole("textbox", { name: "AI Prompt" });
  expect(textarea.getAttribute("placeholder")).toBe(
    "Generate a React useAuth hook with login, logout, and session persistence...",
  );
});
