import { beforeAll } from "vitest";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (i: number) => Object.keys(store)[i] || null,
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

beforeAll(() => {
  const originalGetComputedStyle = window.getComputedStyle;

  window.getComputedStyle = (element: Element) => {
    const styles = originalGetComputedStyle(element);
    const resolvedStyles = new Proxy(styles, {
      get(target, prop) {
        const value = target[prop as keyof CSSStyleDeclaration];
        if (typeof value === "string" && value.startsWith("var(")) {
          const match = value.match(/var\(--([^)]+)\)/);
          if (match) {
            const varName = `--${match[1]}`;
            const htmlElement = element as HTMLElement;
            return htmlElement.style.getPropertyValue(varName) || 
                   document.documentElement.style.getPropertyValue(varName) || 
                   value;
          }
        }
        return value;
      },
    });
    return resolvedStyles as CSSStyleDeclaration;
  };
});
