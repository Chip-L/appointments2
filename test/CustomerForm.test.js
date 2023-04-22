import React from "react";
import {
  elements,
  form,
  initializeReactContainer,
  render,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";

describe("CustomerForm", () => {
  const blankCustomer = {
    firstName: "",
  };

  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a form", () => {
    render(<CustomerForm original={blankCustomer} />);

    expect(form()).not.toBeNull();
  });

  it("renders the first name field as a text box", () => {
    render(<CustomerForm original={blankCustomer} />);

    // the commented lines are removed when we change the reference to call the element by name. This is more precise, and has gotten there by building the form element up using the other tests.
    // const field = form().elements[0];
    const field = form().elements.firstName;

    // expect(field).not.toBeNull();
    expect(field.tagName).toEqual("INPUT");
    // expect(field.name).toEqual("firstName");
    expect(field.type).toEqual("text");
  });

  it("includes the existing value for the first name", () => {
    const customer = { firstName: "Ashley" };
    render(<CustomerForm original={customer} />);

    const field = form().elements.firstName;
    expect(field.value).toEqual(customer.firstName);
  });
});
