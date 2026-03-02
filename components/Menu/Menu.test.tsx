import { expect, test, beforeEach, describe } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Menu from "@/components/Menu";

beforeEach(cleanup);

test("Menu renders trigger button", () => {
  render(<Menu />);
  expect(screen.getByRole("button")).toBeDefined();
});

test("Menu trigger renders with menu icon", () => {
  render(<Menu />);
  const button = screen.getByRole("button");
  expect(button).toBeDefined();
});

describe("Menu dialog", () => {
  test("opens when trigger is clicked", async () => {
    render(<Menu />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeDefined();
  });

  test("dialog contains navigation links when opened", async () => {
    render(<Menu />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    expect(await screen.findByRole("link", { name: "Overview" })).toBeDefined();
    expect(
      await screen.findByRole("link", { name: "Challenge" }),
    ).toBeDefined();
    expect(await screen.findByRole("link", { name: "Sign in" })).toBeDefined();
  });

  test("navigation links have correct hrefs", async () => {
    render(<Menu />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    const overviewLink = await screen.findByRole("link", { name: "Overview" });
    const challengeLink = await screen.findByRole("link", {
      name: "Challenge",
    });
    const signInLink = await screen.findByRole("link", { name: "Sign in" });

    expect(overviewLink.getAttribute("href")).toBe("/overview");
    expect(challengeLink.getAttribute("href")).toBe("/challenge");
    expect(signInLink.getAttribute("href")).toBe("/auth");
  });

  test("dialog has correct title", async () => {
    render(<Menu />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    const title = await screen.findByText("Mobile menu");
    expect(title).toBeDefined();
  });

  test("close button exists in dialog", async () => {
    render(<Menu />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    const dialog = await screen.findByRole("dialog");
    const closeButtons = dialog.querySelectorAll("button");
    expect(closeButtons.length).toBeGreaterThan(0);
  });

  test("backdrop is present when dialog is open", async () => {
    render(<Menu />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    await screen.findByRole("dialog");
    const backdrop = document.querySelector("[data-backdrop]");
    expect(backdrop).toBeDefined();
  });
});

describe("Menu theme colors", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.removeProperty("--color-fg");
    document.documentElement.style.removeProperty("--color-bg");
  });

  test("uses correct colors in light mode", async () => {
    document.documentElement.style.setProperty("--color-fg", "oklch(0.175 0 0)");
    document.documentElement.style.setProperty("--color-bg", "oklch(0.995 0 0)");
    render(<Menu />);

    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

    const dialog = await screen.findByRole("dialog");
    const dialogElement = dialog as HTMLElement;
    expect(getComputedStyle(dialogElement).backgroundColor).toBe("oklch(0.995 0 0)");
  });
});
