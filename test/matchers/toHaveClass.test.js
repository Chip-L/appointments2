import { stripTerminalColor } from "./matcherUtils";
import { toHaveClass } from "./toHaveClass";

describe("toHaveClass matcher", () => {
  it("returns pass is true when the class is on the given DOM element", () => {
    const domElement = { className: "multiple class names" };
    const result = toHaveClass(domElement, "class");
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when the class is not on the given DOM element", () => {
    const domElement = { className: "" };
    const result = toHaveClass(domElement, "class");
    expect(result.pass).toBe(false);
  });

  it("returns pass is false when the class is a part of another className on given DOM element", () => {
    const domElement = { className: "className" };
    const result = toHaveClass(domElement, "class");
    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if no match", () => {
    const domElement = { className: "" };
    const result = toHaveClass(domElement, "class");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).toHaveClass("class")`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    const domElement = { className: "multiple class names" };
    const result = toHaveClass(domElement, "class");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).not.toHaveClass("class")`
    );
  });

  it("returns a message that contains the actual classes", () => {
    const domElement = { className: "class" };
    const result = toHaveClass(domElement, "class");
    expect(stripTerminalColor(result.message())).toContain(
      `Actual classes: ["class"]`
    );
  });

  it("returns a message with empty array if there are no classes", () => {
    const domElement = { className: "" };
    const result = toHaveClass(domElement, "class1");
    expect(stripTerminalColor(result.message())).toContain(
      `Actual classes: []`
    );
  });
});
