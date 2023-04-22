import React from "react";
import {
  element,
  initializeReactContainer,
  render,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";

describe("CustomerForm", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a form", () => {
    render(<CustomerForm />);

    expect(element("form")).not.toBeNull();
  });
});
