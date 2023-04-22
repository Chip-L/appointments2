import { stripTerminalColor } from "./matcherUtils";
import { toContainText } from "./toContainText";

describe("toContainText matcher", () => {
  const textToFind = "text to find";
  it("returns pass is true when text is found in the given DOM element", () => {
    const domElement = { textContent: textToFind };

    const result = toContainText(domElement, textToFind);

    expect(result.pass).toBe(true);
  });

  it("returns pass is false when text is not found in the given DOM element", () => {
    const domElement = { textContent: "" };

    const result = toContainText(domElement, textToFind);

    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if nomatch", () => {
    const domElement = { textContent: "" };

    const result = toContainText(domElement, textToFind);

    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).toContainText("${textToFind}")`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    const domElement = { textContent: textToFind };

    const result = toContainText(domElement, textToFind);

    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).not.toContainText("${textToFind}")`
    );
  });

  it("returns a message that contains the actual text", () => {
    const domElement = { textContent: textToFind };
    const result = toContainText(domElement, textToFind);

    expect(stripTerminalColor(result.message())).toContain(
      `Actual text: "${textToFind}"`
    );
  });
});
