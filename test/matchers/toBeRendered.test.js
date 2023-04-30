import React from "react";
import { initializeReactContainer, render } from "../reactTestExtensions";
import { stripTerminalColor } from "./matcherUtils";
import { toBeRendered } from "./toBeRendered";

describe("toBeRendered", () => {
  let Component;

  beforeEach(() => {
    initializeReactContainer();
    Component = jest.fn(() => <div />);
  });

  it("returns pass is true when mock has been rendered", () => {
    render(<Component />);
    const result = toBeRendered(Component);
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when mock is null", () => {
    const result = toBeRendered(null);
    expect(result.pass).toBe(false);
  });

  it("returns pass is false when mock has not been rendered", () => {
    const result = toBeRendered(Component);
    expect(result.pass).toBe(false);
  });

  it("returns pass is false when mock has not a mock", () => {
    const result = toBeRendered(<div />);
    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if no match", () => {
    render(<Component />);
    const result = toBeRendered();
    expect(stripTerminalColor(result.message())).toContain(
      `expect(mockedComponent).toBeRendered()`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    render(<Component />);
    const result = toBeRendered(Component);
    expect(stripTerminalColor(result.message())).toContain(
      `expect(mockedComponent).not.toBeRendered()`
    );
  });
});
