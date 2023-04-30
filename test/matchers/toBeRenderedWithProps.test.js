import React from "react";
import { initializeReactContainer, render } from "../reactTestExtensions";
import { stripTerminalColor } from "./matcherUtils";
import {
  toBeRenderedFirstWithProps,
  toBeRenderedWithProps,
} from "./toBeRenderedWithProps";

describe("toBeRenderedWithProps", () => {
  let Component;

  beforeEach(() => {
    initializeReactContainer();
    Component = jest.fn(() => <div />);
  });

  it("returns pass is true when mock has been rendered", () => {
    render(<Component />);
    const result = toBeRenderedWithProps(Component, {});
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when mock has not been rendered", () => {
    const result = toBeRenderedWithProps(Component, {});
    expect(result.pass).toBe(false);
  });

  it("returns pass is false when mock is null", () => {
    const result = toBeRenderedWithProps(null, {});
    expect(result.pass).toBe(false);
  });

  it("returns pass is false when the properties do not match", () => {
    render(<Component a="b" />);
    const result = toBeRenderedWithProps(Component, { c: "d" });
    expect(result.pass).toBe(false);
  });

  it("returns pass is true when the properties of the last render match", () => {
    render(<Component a="b" />);
    render(<Component c="d" />);
    const result = toBeRenderedWithProps(Component, { c: "d" });
    expect(result.pass).toBe(true);
  });

  it("returns a message that contains the source line if no match", () => {
    render(<Component a="b" />);
    const result = toBeRenderedWithProps(Component, { c: "d" });
    expect(stripTerminalColor(result.message())).toContain(
      `expect(mockedComponent).toBeRenderedWithProps({"c": "d"})`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    render(<Component c="d" />);
    const result = toBeRenderedWithProps(Component, { c: "d" });
    expect(stripTerminalColor(result.message())).toContain(
      `expect(mockedComponent).not.toBeRenderedWithProps({"c": "d"})`
    );
  });

  it("returns a message that the passed object is not a mock", () => {
    const result = toBeRenderedWithProps(<div />, {});
    expect(stripTerminalColor(result.message())).toContain(
      `mockedComponent is not a mock`
    );
  });

  it("returns a message if mock has not been rendered", () => {
    const result = toBeRenderedWithProps(Component, {});
    expect(stripTerminalColor(result.message())).toContain(
      `Mocked component was never rendered`
    );
  });

  it("returns a message if properties do not match", () => {
    render(<Component a="b" />);
    const result = toBeRenderedWithProps(Component, { c: "d" });
    expect(stripTerminalColor(result.message())).toContain(
      `Rendered with props: {"a": "b"}`
    );
  });
});

describe("toBeRenderedFirstWithProps", () => {
  let Component;

  beforeEach(() => {
    initializeReactContainer();
    Component = jest.fn(() => <div />);
  });

  it("returns pass is true when mock has been rendered", () => {
    render(<Component />);
    const result = toBeRenderedFirstWithProps(Component, {});
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when mock has not been rendered", () => {
    const result = toBeRenderedFirstWithProps(Component);
    expect(result.pass).toBe(false);
  });

  it("returns pass is false when mock is null", () => {
    const result = toBeRenderedFirstWithProps(null);
    expect(result.pass).toBe(false);
  });

  it("returns pass is false when the properties do not match", () => {
    render(<Component a="b" />);
    const result = toBeRenderedFirstWithProps(Component, { c: "d" });
    expect(result.pass).toBe(false);
  });

  it("returns pass is true when the properties of the first render match", () => {
    render(<Component a="b" />);
    render(<Component c="d" />);
    const result = toBeRenderedFirstWithProps(Component, { a: "b" });
    expect(result.pass).toBe(true);
  });

  it("returns a message that contains the source line if no match", () => {
    render(<Component a="b" />);
    const result = toBeRenderedFirstWithProps(Component, { c: "d" });
    expect(stripTerminalColor(result.message())).toContain(
      `expect(mockedComponent).toBeRenderedFirstWithProps({"c": "d"})`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    render(<Component c="d" />);
    const result = toBeRenderedFirstWithProps(Component, { c: "d" });
    expect(stripTerminalColor(result.message())).toContain(
      `expect(mockedComponent).not.toBeRenderedFirstWithProps({"c": "d"})`
    );
  });

  it("returns a message that the passed object is not a mock", () => {
    const result = toBeRenderedFirstWithProps(<div />, {});
    expect(stripTerminalColor(result.message())).toContain(
      `mockedComponent is not a mock`
    );
  });

  it("returns a message if mock has not been rendered", () => {
    const result = toBeRenderedFirstWithProps(Component, {});
    expect(stripTerminalColor(result.message())).toContain(
      `Mocked component was never rendered`
    );
  });

  it("returns a message if properties do not match", () => {
    render(<Component a="b" />);
    const result = toBeRenderedFirstWithProps(Component, { c: "d" });
    expect(stripTerminalColor(result.message())).toContain(
      `Rendered with props: {"a": "b"}`
    );
  });
});
