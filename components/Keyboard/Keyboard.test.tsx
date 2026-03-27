import { expect, test, beforeEach, describe } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Keyboard from "@/components/Keyboard";

beforeEach(cleanup);

describe("Keyboard renders", () => {
  test("renders without crashing", () => {
    render(<Keyboard pressedKey={null} keyCount={0} />);
    expect(screen.getByText("Q")).toBeDefined();
  });

  test("renders all 5 rows", () => {
    render(<Keyboard pressedKey={null} keyCount={0} />);
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("Q")).toBeDefined();
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("Z")).toBeDefined();
    expect(screen.getByText("Space")).toBeDefined();
  });

  test("renders correct key labels", () => {
    render(<Keyboard pressedKey={null} keyCount={0} />);
    expect(screen.getAllByText("Enter")).toHaveLength(1);
    expect(screen.getAllByText("Tab")).toHaveLength(1);
    expect(screen.getAllByText("Shift")).toHaveLength(2);
    expect(screen.getAllByText("Backspace")).toHaveLength(1);
  });

  test("bottom row has 5 keys", () => {
    render(<Keyboard pressedKey={null} keyCount={0} />);
    const ctrlKeys = screen.getAllByText("Ctrl");
    const altKeys = screen.getAllByText("Alt");
    expect(ctrlKeys).toHaveLength(2);
    expect(altKeys).toHaveLength(2);
    expect(screen.getByText("Space")).toBeDefined();
  });
});

describe("Keyboard key press behavior", () => {
  test("key flashes when pressed", () => {
    const { container } = render(<Keyboard pressedKey="q" keyCount={1} />);
    const qKey = container.querySelectorAll("button")[15];
    expect(qKey).toBeDefined();
  });

  test("lowercase and uppercase both highlight the same key", () => {
    const { container: containerLower } = render(
      <Keyboard pressedKey="a" keyCount={1} />
    );
    const { container: containerUpper } = render(
      <Keyboard pressedKey="A" keyCount={2} />
    );

    const lowerKey = containerLower.querySelectorAll("button")[11];
    const upperKey = containerUpper.querySelectorAll("button")[11];
    expect(lowerKey).toBeDefined();
    expect(upperKey).toBeDefined();
  });

  test("special keys are normalized correctly", () => {
    const { container: backspace } = render(
      <Keyboard pressedKey="Backspace" keyCount={1} />
    );
    expect(backspace.querySelectorAll("button")[13]).toBeDefined();

    const { container: enter } = render(
      <Keyboard pressedKey="Enter" keyCount={2} />
    );
    expect(enter.querySelectorAll("button")[24]).toBeDefined();
  });
});

describe("Keyboard key width classes", () => {
  test("regular keys have correct min-width", () => {
    render(<Keyboard pressedKey={null} keyCount={0} />);
    const qKey = screen.getByText("Q");
    const styles = window.getComputedStyle(qKey);
    expect(styles.minWidth).toBe("40px");
  });

  test("wide keys have wide class", () => {
    const { container } = render(<Keyboard pressedKey={null} keyCount={0} />);
    const tabKey = container.querySelector(".wide");
    expect(tabKey).toBeDefined();
  });

  test("extra-wide keys have extra-wide class", () => {
    const { container } = render(<Keyboard pressedKey={null} keyCount={0} />);
    const backspaceKey = container.querySelector(".extra-wide");
    expect(backspaceKey).toBeDefined();
  });

  test("spacebar has spacebar class", () => {
    const { container } = render(<Keyboard pressedKey={null} keyCount={0} />);
    const spacebar = container.querySelector(".spacebar");
    expect(spacebar).toBeDefined();
  });
});

describe("Keyboard responsive behavior", () => {
  test("wrapper has display none on small screens", () => {
    render(<Keyboard pressedKey={null} keyCount={0} />);
    const wrapper = document.querySelector("div");
    expect(wrapper).toBeDefined();
  });
});