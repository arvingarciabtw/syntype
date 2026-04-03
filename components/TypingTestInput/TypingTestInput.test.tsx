import { expect, test, beforeEach, vi, describe } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import TypingTestInput from "@/components/TypingTestInput/TypingTestInput";

beforeEach(cleanup);

const SIMPLE_CODE = `ab
cd`;

describe("TypingTestInput initial render", () => {
  test("renders with code displayed", () => {
    render(<TypingTestInput code={SIMPLE_CODE} />);
    expect(screen.getByText("a")).toBeDefined();
    expect(screen.getByText("b")).toBeDefined();
    expect(screen.getByText("c")).toBeDefined();
    expect(screen.getByText("d")).toBeDefined();
  });

  test("shows 'click to start typing' message when not focused", () => {
    render(<TypingTestInput code={SIMPLE_CODE} />);
    expect(screen.getByText("click to start typing")).toBeDefined();
  });

  test("has hidden input for capturing keystrokes", () => {
    render(<TypingTestInput code={SIMPLE_CODE} />);
    expect(screen.getByLabelText("Typing input")).toBeDefined();
  });
});

describe("TypingTestInput focus behavior", () => {
  test("clicking focuses hidden input", () => {
    render(<TypingTestInput code={SIMPLE_CODE} />);
    const wrapper = screen.getByText("click to start typing").closest("div");
    fireEvent.click(wrapper!);
    const input = screen.getByLabelText("Typing input");
    expect(document.activeElement).toBe(input);
  });

  test("shows cursor when focused", () => {
    render(<TypingTestInput code={SIMPLE_CODE} />);
    const wrapper = screen.getByText("click to start typing").closest("div");
    fireEvent.click(wrapper!);
    expect(document.activeElement?.getAttribute("aria-label")).toBe("Typing input");
  });
});

describe("TypingTestInput typing behavior", () => {
  test("correct character is marked as correct", () => {
    render(<TypingTestInput code={SIMPLE_CODE} />);
    const wrapper = screen.getByText("click to start typing").closest("div");
    fireEvent.click(wrapper!);
    const input = screen.getByLabelText("Typing input");
    fireEvent.keyDown(input, { key: "a" });
    
    const charA = screen.getByText("a");
    expect(charA.className).toContain("correct");
  });

  test("incorrect character is marked as incorrect", () => {
    render(<TypingTestInput code={SIMPLE_CODE} />);
    const wrapper = screen.getByText("click to start typing").closest("div");
    fireEvent.click(wrapper!);
    const input = screen.getByLabelText("Typing input");
    fireEvent.keyDown(input, { key: "z" });
    
    const charA = screen.getByText("a");
    expect(charA.className).toContain("incorrect");
  });

  test("backspace resets character to untyped", () => {
    render(<TypingTestInput code={SIMPLE_CODE} />);
    const wrapper = screen.getByText("click to start typing").closest("div");
    fireEvent.click(wrapper!);
    const input = screen.getByLabelText("Typing input");
    
    fireEvent.keyDown(input, { key: "a" });
    const charA = screen.getByText("a");
    expect(charA.className).toContain("correct");
    
    fireEvent.keyDown(input, { key: "Backspace" });
    expect(charA.className).not.toContain("correct");
    expect(charA.className).not.toContain("incorrect");
  });

  test("onProgress is called as user types", () => {
    const onProgress = vi.fn();
    render(<TypingTestInput code="ab" onProgress={onProgress} />);
    const wrapper = screen.getByText("click to start typing").closest("div");
    fireEvent.click(wrapper!);
    const input = screen.getByLabelText("Typing input");
    
    fireEvent.keyDown(input, { key: "a" });
    expect(onProgress).toHaveBeenCalledWith({ correct: 1, incorrect: 0, total: 1, timeConfig: 0, elapsedTime: 0, wpmHistory: [] });
  });

  test("cursor advances to next character after typing", () => {
    render(<TypingTestInput code={SIMPLE_CODE} />);
    const wrapper = screen.getByText("click to start typing").closest("div");
    fireEvent.click(wrapper!);
    const input = screen.getByLabelText("Typing input");
    
    fireEvent.keyDown(input, { key: "a" });
    const charB = screen.getByText("b");
    expect(charB.className).toContain("cursor-active");
  });
});

describe("TypingTestInput props", () => {
  test("changing code prop resets test", () => {
    const { rerender } = render(<TypingTestInput code="ab" />);
    const wrapper = screen.getByText("click to start typing").closest("div");
    fireEvent.click(wrapper!);
    const input = screen.getByLabelText("Typing input");
    fireEvent.keyDown(input, { key: "a" });
    
    rerender(<TypingTestInput code="xy" />);
    const charX = screen.getByText("x");
    expect(charX.className).not.toContain("correct");
  });
});
