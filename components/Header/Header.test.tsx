import { expect, test, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Header from "@/components/Header";

vi.mock("@/lib/helpers/theme", () => ({
  getTheme: vi.fn().mockResolvedValue("light"),
}));

beforeEach(cleanup);

test("Header renders with logo and app name", async () => {
  render(await Header());

  expect(screen.getByRole("banner")).toBeDefined();
  expect(screen.getByAltText("Syntype logo")).toBeDefined();
  expect(screen.getByText("syntype")).toBeDefined();
});

test("Header has correct navigation links", async () => {
  render(await Header());

  const overviewLink = screen.getByRole("link", { name: "Overview" });
  expect(overviewLink.getAttribute("href")).toBe("/overview");

  const challengeLink = screen.getByRole("link", { name: "Challenge" });
  expect(challengeLink.getAttribute("href")).toBe("/challenge");

  const signInLink = screen.getByRole("link", { name: "Sign in" });
  expect(signInLink.getAttribute("href")).toBe("/sign-in");
});

test("Header logo links to home", async () => {
  render(await Header());

  const logoLink = screen.getByRole("link", { name: "Syntype logo" });
  expect(logoLink.getAttribute("href")).toBe("/");
});

test("Header uses correct color in light mode", async () => {
  document.documentElement.style.setProperty(
    "--color-gray-300",
    "oklch(0.4 0 0)",
  );
  const { container } = render(await Header());

  const navItems = container.querySelectorAll("li");
  const firstNavItem = navItems[0] as HTMLElement;
  expect(getComputedStyle(firstNavItem).color).toBe("oklch(0.4 0 0)");
});

test("Header uses correct color in dark mode", async () => {
  document.documentElement.style.setProperty(
    "--color-gray-300",
    "oklch(0.8 0 0)",
  );
  const { container } = render(await Header());

  const navItems = container.querySelectorAll("li");
  const firstNavItem = navItems[0] as HTMLElement;
  expect(getComputedStyle(firstNavItem).color).toBe("oklch(0.8 0 0)");
});
