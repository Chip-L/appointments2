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

const spy = () => {
  let receivedArguments;
  return {
    fn: (...args) => (receivedArguments = args),
    receivedArguments: () => receivedArguments,
    receivedArgument: (n) => receivedArguments[n],
  };
};

describe("CustomerForm", () => {
  const originalFetch = global.fetch;
  let fetchSpy;

  const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  beforeEach(() => {
    initializeReactContainer();
    fetchSpy = spy();
    global.fetch = fetchSpy.fn;
  });

  afterEach(() => {
    global.fetch = originalFetch;
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
    render(<CustomerForm original={blankCustomer} />);

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
      const customer = { [fieldName]: value };
      render(<CustomerForm original={customer} />);

      click(submitButton());

      expect(fetchSpy).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          body: JSON.stringify(customer),
        })
      );
    });

  const itSubmitsNewValue = (fieldName, value) =>
    it("saves new value when submitted", () => {
      render(<CustomerForm original={blankCustomer} />);

      change(field(fieldName), value);
      click(submitButton());

      expect(fetchSpy).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({
          body: JSON.stringify({
            ...blankCustomer,
            [fieldName]: value,
          }),
        })
      );
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

  it("sends request to POST /customers when submitting the form", () => {
    render(<CustomerForm original={blankCustomer} />);

    click(submitButton());

    expect(fetchSpy).toBeCalledWith(
      "/customers",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("calls fetch with the right configuration", () => {
    render(<CustomerForm original={blankCustomer} />);

    click(submitButton());

    expect(fetchSpy).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });
});
