import { expect, test, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import VisuallyHidden from "@/components/VisuallyHidden";

beforeEach(cleanup);

test("VisuallyHidden renders children", () => {
  render(<VisuallyHidden>Hidden content</VisuallyHidden>);
  expect(screen.getByText("Hidden content")).toBeDefined();
});

test("VisuallyHidden renders as span element", () => {
  render(<VisuallyHidden>Content</VisuallyHidden>);
  expect(screen.getByText("Content").tagName).toBe("SPAN");
});

test("VisuallyHidden passes through aria-label", () => {
  render(
    <VisuallyHidden aria-label="This is hidden">
      Content
    </VisuallyHidden>
  );
  expect(screen.getByText("Content").getAttribute("aria-label")).toBe("This is hidden");
});

test("VisuallyHidden has correct styles", () => {
  render(<VisuallyHidden>Content</VisuallyHidden>);
  const element = screen.getByText("Content");
  const styles = window.getComputedStyle(element);
  
  expect(styles.position).toBe("absolute");
  expect(styles.width).toBe("1px");
  expect(styles.height).toBe("1px");
  expect(styles.overflow).toBe("hidden");
});
