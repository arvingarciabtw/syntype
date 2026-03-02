import { expect, test, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Footer from "@/components/Footer";

beforeEach(cleanup);

test("Footer renders", () => {
  render(<Footer />);
  expect(screen.getByRole("contentinfo")).toBeDefined();
});

test("Footer renders correct author and link", () => {
  render(<Footer />);

  expect(screen.getByText("Made by")).toBeDefined();

  const link = screen.getByRole("link", { name: /@arvingarciabtw/ });
  expect(link.getAttribute("href")).toBe(
    "https://github.com/arvingarciabtw/syntype",
  );
  expect(link.getAttribute("target")).toBe("_blank");
  expect(link.getAttribute("rel")).toBe("noopener noreferrer");
});

test("Footer uses correct color in light mode", () => {
  document.documentElement.style.setProperty(
    "--color-gray-300",
    "oklch(0.4 0 0)",
  );
  document.documentElement.style.setProperty("--color-fg", "oklch(0.175 0 0)");
  const { container } = render(<Footer />);
  const footer = container.firstChild as HTMLElement;
  const author = footer.querySelector("a") as HTMLElement;

  expect(getComputedStyle(footer).color).toBe("oklch(0.4 0 0)");
  expect(getComputedStyle(author).color).toBe("oklch(0.175 0 0)");
});

test("Footer uses correct color in dark mode", () => {
  document.documentElement.style.setProperty(
    "--color-gray-300",
    "oklch(0.8 0 0)",
  );
  document.documentElement.style.setProperty("--color-fg", "oklch(0.995 0 0)");
  const { container } = render(<Footer />);
  const footer = container.firstChild as HTMLElement;
  const author = footer.querySelector("a") as HTMLElement;

  expect(getComputedStyle(footer).color).toBe("oklch(0.8 0 0)");
  expect(getComputedStyle(author).color).toBe("oklch(0.995 0 0)");
});
