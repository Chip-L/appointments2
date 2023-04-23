import { stripTerminalColor } from "./matcherUtils";
import { toBeElementWithTag } from "./toBeElementWithTag";

describe("toBeElementWithTag matcher", () => {
  const elementFrom = (text) => {
    const parent = document.createElement("div");
    parent.innerHTML = text;
    return parent.firstChild;
  };

  it("returns pass is true when select element is of the right type regardless of case", () => {
    const domElement = elementFrom("<select />");
    const result = toBeElementWithTag(domElement, "select");
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when element is null", () => {
    const result = toBeElementWithTag(null, "select");
    expect(result.pass).toBe(false);
  });

  it("returns pass is false when element is the wrong tag", () => {
    const domElement = elementFrom("<p />");
    const result = toBeElementWithTag(domElement, "select");
    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if no match", () => {
    const domElement = elementFrom("<p />");
    const result = toBeElementWithTag(domElement, "select");
    expect(stripTerminalColor(result.message())).toMatch(
      `expect(element).toBeElementWithTag("select")`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    const domElement = elementFrom("<select type=select />");
    const result = toBeElementWithTag(domElement, "select");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).not.toBeElementWithTag("select")`
    );
  });

  it("returns a message that the element passed is null", () => {
    const result = toBeElementWithTag(null, "select");
    expect(stripTerminalColor(result.message())).toContain(
      `Actual: element was not found`
    );
  });

  it("returns a message that the element passed has the wrong tag", () => {
    const domElement = elementFrom("<p />");
    const result = toBeElementWithTag(domElement, "select");
    expect(stripTerminalColor(result.message())).toContain(`Actual: <p>`);
  });
});
