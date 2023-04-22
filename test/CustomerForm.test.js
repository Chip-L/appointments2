import React from "react";
import {
  change,
  click,
  field,
  form,
  initializeReactContainer,
  labelFor,
  render,
  submit,
  submitButton,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";

describe("CustomerForm", () => {
  const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a form", () => {
    render(<CustomerForm original={blankCustomer} />);

    expect(form()).not.toBeNull();
  });

  it("renders a submit button", () => {
    render(<CustomerForm original={blankCustomer} />);

    expect(submitButton()).not.toBeNull();
  });

  it("prevents the default action when submitting the form", () => {
    render(<CustomerForm original={blankCustomer} onSubmit={() => {}} />);

    const event = submit(form());

    expect(event.defaultPrevented).toBe(true);
  });

  const itRendersAsATextBox = (fieldName) =>
    it("renders as a text box", () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(field(fieldName)).not.toBeNull();
      expect(field(fieldName).tagName).toEqual("INPUT");
      expect(field(fieldName)).toBeInputFieldOfType("text"); //this is by default
    });

  const itIncludesTheExistingValue = (fieldName, value) =>
    it("includes the existing value", () => {
      const customer = { [fieldName]: value };
      render(<CustomerForm original={customer} />);

      expect(field(fieldName).value).toEqual(customer[fieldName]);
    });

  const itRendersALabel = (fieldName, text) => {
    it("renders a label for the text box", () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(labelFor(fieldName)).not.toBeNull();
    });

    it(`renders '${text}' as the label`, () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(labelFor(fieldName)).toContainText(text);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelId = (fieldName) =>
    it("assigns an id that matches the label id", () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itSubmitsExistingValue = (fieldName, value) =>
    it("saves existing value when submitted", () => {
      expect.hasAssertions();

      const customer = { [fieldName]: value };
      render(
        <CustomerForm
          original={customer}
          onSubmit={(customer) => expect(customer[fieldName]).toEqual(value)}
        />
      );

      click(submitButton());
    });

  const itSubmitsNewValue = (fieldName, value) =>
    it("saves new value when submitted", () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          original={blankCustomer}
          onSubmit={(customer) => expect(customer[fieldName]).toEqual(value)}
        />
      );

      change(field(fieldName), value);
      click(submitButton());
    });

  describe("first name field", () => {
    itRendersAsATextBox("firstName");
    itIncludesTheExistingValue("firstName", "Ashley");
    itRendersALabel("firstName", "First Name");
    itAssignsAnIdThatMatchesTheLabelId("firstName");
    itSubmitsExistingValue("firstName", "Ashley");
    itSubmitsNewValue("firstName", "Jamie");
  });

  describe("last name field", () => {
    itRendersAsATextBox("lastName");
    itIncludesTheExistingValue("lastName", "Last");
    itRendersALabel("lastName", "Last Name");
    itAssignsAnIdThatMatchesTheLabelId("lastName");
    itSubmitsExistingValue("firstName", "Last 1");
    itSubmitsNewValue("firstName", "Last 2");
  });

  describe("phone number name field", () => {
    itRendersAsATextBox("phoneNumber");
    itIncludesTheExistingValue("phoneNumber", "303-555-1212");
    itRendersALabel("phoneNumber", "Phone Number");
    itAssignsAnIdThatMatchesTheLabelId("phoneNumber");
    itSubmitsExistingValue("phoneNumber", "303-555-1212");
    itSubmitsNewValue("phoneNumber", "720-555-9797");
  });
});
