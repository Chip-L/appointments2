import React from "react";
import {
  click,
  element,
  elements,
  field,
  form,
  initializeReactContainer,
  render,
  submit,
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

    expect(field("firstName").tagName).toEqual("INPUT");
    expect(field("firstName").type).toEqual("text");
  });

  it("includes the existing value for the first name", () => {
    const customer = { firstName: "Ashley" };
    render(<CustomerForm original={customer} />);

    expect(field("firstName").value).toEqual(customer.firstName);
  });

  it("renders a label for the first name field", () => {
    render(<CustomerForm original={blankCustomer} />);

    const label = element("label[for=firstName]");

    expect(label).not.toBeNull();
  });

  it("renders 'First Name' as the first name label", () => {
    render(<CustomerForm original={blankCustomer} />);

    const label = element("label[for=firstName]");

    expect(label).toContainText("First Name");
  });

  it("assigns an id that matches the label id to the first name field", () => {
    render(<CustomerForm original={blankCustomer} />);

    expect(field("firstName").id).toEqual("firstName");
  });

  it("renders a submit button", () => {
    render(<CustomerForm original={blankCustomer} />);

    const button = element("input[type=submit]");

    expect(button).not.toBeNull();
  });

  it("saves existing first name when submitted", () => {
    expect.hasAssertions();

    const customer = { firstName: "Ashley" };
    render(
      <CustomerForm
        original={customer}
        onSubmit={({ firstName }) => expect(firstName).toEqual("Ashley")}
      />
    );

    const button = element("input[type=submit]");
    click(button);
  });

  it("prevents the default action when submitting the form", () => {
    render(<CustomerForm original={blankCustomer} onSubmit={() => {}} />);

    const event = submit(form());

    expect(event.defaultPrevented).toBe(true);
  });
});
