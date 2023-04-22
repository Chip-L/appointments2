import { stripTerminalColor } from "./matcherUtils";
import { toBeInputFieldOfType } from "./toBeInputFieldOfType";

describe("toBeInputFieldOfType matcher", () => {
  const elementFrom = (text) => {
    const parent = document.createElement("div");
    parent.innerHTML = text;
    return parent.firstChild;
  };

  it("returns pass is true when input element is of the right type", () => {
    const domElement = elementFrom("<input type=text>");
    const result = toBeInputFieldOfType(domElement, "text");
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when element is null", () => {
    const result = toBeInputFieldOfType(null, "text");
    expect(result.pass).toBe(false);
  });

  it("returns pass is false when element is the wrong tag", () => {
    const domElement = elementFrom("<p />");
    const result = toBeInputFieldOfType(domElement, "text");
    expect(result.pass).toBe(false);
  });

  it("returns pass is false when element is the wrong type", () => {
    const domElement = elementFrom("<input type=date />");
    const result = toBeInputFieldOfType(domElement, "text");
    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if no match", () => {
    const domElement = elementFrom("<input type=date />");
    const result = toBeInputFieldOfType(domElement, "text");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).toBeInputFieldOfType("text")`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    const domElement = elementFrom("<input type=text />");
    const result = toBeInputFieldOfType(domElement, "text");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).not.toBeInputFieldOfType("text")`
    );
  });

  it("returns a message that the element passed is null", () => {
    const result = toBeInputFieldOfType(null, "text");
    expect(stripTerminalColor(result.message())).toContain(
      `Actual: element was not found`
    );
  });

  it("returns a message that the element passed has the wrong tag", () => {
    const domElement = elementFrom("<p />");
    const result = toBeInputFieldOfType(domElement, "text");
    expect(stripTerminalColor(result.message())).toContain(`Actual: <p>`);
  });

  it("returns a message that the element passed has the wrong type", () => {
    const domElement = elementFrom("<input type=date />");
    const result = toBeInputFieldOfType(domElement, "text");
    expect(stripTerminalColor(result.message())).toContain(
      `Actual: <input type=date>`
    );
  });
});
