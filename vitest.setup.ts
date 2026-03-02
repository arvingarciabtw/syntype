import { beforeAll } from "vitest";

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
