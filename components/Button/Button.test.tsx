import { expect, test, beforeEach, vi, describe } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Button from "@/components/Button";

beforeEach(cleanup);

test("Button renders children", () => {
  render(<Button variant="cta">Click me</Button>);
  expect(screen.getByRole("button", { name: "Click me" })).toBeDefined();
});

test("Button renders as button element by default", () => {
  render(<Button variant="cta">Click me</Button>);
  expect(screen.getByRole("button")).toBeDefined();
});

test("Button calls onClick when clicked", () => {
  const handleClick = vi.fn();

  render(<Button variant="cta" onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByRole("button"));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("Button can be disabled", () => {
  render(<Button variant="cta" disabled>Click me</Button>);
  const button = screen.getByRole("button") as HTMLButtonElement;
  expect(button.getAttribute("disabled")).not.toBeNull();
});

describe("Button variants", () => {
  test("cta variant renders", () => {
    render(<Button variant="cta">CTA</Button>);
    expect(screen.getByRole("button")).toBeDefined();
  });

  test("ghost variant renders", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toBeDefined();
  });

  test("regular variant renders", () => {
    render(<Button variant="regular">Regular</Button>);
    expect(screen.getByRole("button")).toBeDefined();
  });

  test("danger variant renders", () => {
    render(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole("button")).toBeDefined();
  });

  test("icon variant renders", () => {
    render(<Button variant="icon">Icon</Button>);
    expect(screen.getByRole("button")).toBeDefined();
  });
});

describe("Button as anchor", () => {
  test("renders as anchor element when as='a'", () => {
    render(<Button variant="cta" as="a" href="https://example.com">Link</Button>);
    expect(screen.getByRole("link")).toBeDefined();
  });

  test("anchor has correct href", () => {
    render(<Button variant="cta" as="a" href="https://example.com">Link</Button>);
    expect(screen.getByRole("link").getAttribute("href")).toBe("https://example.com");
  });

  test("anchor supports target attribute", () => {
    render(<Button variant="cta" as="a" href="https://example.com" target="_blank">Link</Button>);
    expect(screen.getByRole("link").getAttribute("target")).toBe("_blank");
  });

  test("anchor supports rel attribute", () => {
    render(<Button variant="cta" as="a" href="https://example.com" rel="noopener noreferrer">Link</Button>);
    expect(screen.getByRole("link").getAttribute("rel")).toBe("noopener noreferrer");
  });
});

describe("Button theme colors", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.removeProperty("--color-primary");
    document.documentElement.style.removeProperty("--color-gray-900");
    document.documentElement.style.removeProperty("--color-gray-100");
    document.documentElement.style.removeProperty("--color-fg");
    document.documentElement.style.removeProperty("--color-gray-850");
    document.documentElement.style.removeProperty("--color-danger");
    document.documentElement.style.removeProperty("--color-bg");
    document.documentElement.style.removeProperty("--color-gray-300");
  });

  test("cta variant uses primary color in light mode", () => {
    document.documentElement.style.setProperty("--color-primary", "oklch(0.738 0.1764 50.27)");
    document.documentElement.style.setProperty("--color-gray-900", "oklch(0.2 0 0)");
    const { container } = render(<Button variant="cta">CTA</Button>);
    const button = container.firstChild as HTMLElement;
    expect(getComputedStyle(button).backgroundColor).toBe("oklch(0.738 0.1764 50.27)");
  });

  test("regular variant uses correct colors in light mode", () => {
    document.documentElement.style.setProperty("--color-gray-100", "oklch(0.2 0 0)");
    document.documentElement.style.setProperty("--color-fg", "oklch(0.175 0 0)");
    const { container } = render(<Button variant="regular">Regular</Button>);
    const button = container.firstChild as HTMLElement;
    expect(getComputedStyle(button).backgroundColor).toBe("oklch(0.2 0 0)");
  });

  test("regular variant uses correct colors in dark mode", () => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.setProperty("--color-gray-850", "oklch(0.25 0 0)");
    const { container } = render(<Button variant="regular">Regular</Button>);
    const button = container.firstChild as HTMLElement;
    expect(getComputedStyle(button).backgroundColor).toBe("oklch(0.25 0 0)");
  });

  test("danger variant uses danger color", () => {
    document.documentElement.style.setProperty("--color-danger", "oklch(0.6 0.2 25)");
    document.documentElement.style.setProperty("--color-bg", "oklch(0.995 0 0)");
    const { container } = render(<Button variant="danger">Danger</Button>);
    const button = container.firstChild as HTMLElement;
    expect(getComputedStyle(button).backgroundColor).toBe("oklch(0.6 0.2 25)");
  });

  test("icon variant uses correct color in light mode", () => {
    document.documentElement.style.setProperty("--color-fg", "oklch(0.175 0 0)");
    const { container } = render(<Button variant="icon">Icon</Button>);
    const button = container.firstChild as HTMLElement;
    expect(getComputedStyle(button).color).toBe("oklch(0.175 0 0)");
  });

  test("icon variant uses correct color in dark mode", () => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.setProperty("--color-gray-300", "oklch(0.8 0 0)");
    const { container } = render(<Button variant="icon">Icon</Button>);
    const button = container.firstChild as HTMLElement;
    expect(getComputedStyle(button).color).toBe("oklch(0.8 0 0)");
  });
});
