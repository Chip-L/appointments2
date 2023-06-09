import React from "react";
import {
  change,
  clickAndWait,
  element,
  elements,
  field,
  form,
  initializeReactContainer,
  labelFor,
  render,
  submitAndWait,
  submitButton,
  textOf,
  withFocus,
} from "./reactTestExtensions";
import { bodyOfLastFetchRequest } from "./spyHelpers";
import { fetchResponseOk, fetchResponseError } from "./builders/fetch";
import { blankCustomer, validCustomer } from "./builders/customer";
import { CustomerForm } from "../src/CustomerForm";

describe("CustomerForm", () => {
  beforeEach(() => {
    initializeReactContainer();
    jest.spyOn(global, "fetch").mockResolvedValue(fetchResponseOk({}));
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
    it("saves existing value when submitted", async () => {
      const customer = { ...validCustomer, [fieldName]: value };
      render(<CustomerForm original={customer} onSave={() => {}} />);

      await clickAndWait(submitButton());

      expect(bodyOfLastFetchRequest()).toMatchObject(customer);
    });

  const itSubmitsNewValue = (fieldName, value) =>
    it("saves new value when submitted", async () => {
      render(<CustomerForm original={validCustomer} onSave={() => {}} />);

      change(field(fieldName), value);
      await clickAndWait(submitButton());

      expect(bodyOfLastFetchRequest()).toMatchObject({
        [fieldName]: value,
      });
    });

  it("renders a form", () => {
    render(<CustomerForm original={blankCustomer} />);

    expect(form()).not.toBeNull();
  });

  it("renders a submit button", () => {
    render(<CustomerForm original={blankCustomer} />);

    expect(submitButton()).not.toBeNull();
  });

  it("prevents the default action when submitting the form", async () => {
    render(<CustomerForm original={validCustomer} onSave={() => {}} />);

    const event = await submitAndWait(form());

    expect(event.defaultPrevented).toBe(true);
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

  describe("save", () => {
    // combined "sends request to POST /customers when submitting the form" with the next
    it("calls fetch with the right configuration", async () => {
      render(<CustomerForm original={validCustomer} onSave={() => {}} />);

      await clickAndWait(submitButton());

      expect(global.fetch).toBeCalledWith(
        "/customers",
        expect.objectContaining({
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
    });

    it("notifies onSave when form is submitted", async () => {
      const customer = { id: 123 };
      global.fetch.mockResolvedValue(fetchResponseOk(customer));
      const saveSpy = jest.fn().mockName("saveSpy");

      render(<CustomerForm original={validCustomer} onSave={saveSpy} />);
      await clickAndWait(submitButton());

      expect(saveSpy).toBeCalledWith(customer);
    });

    it("renders an alert space", async () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(element("[role=alert]")).not.toBeNull();
    });

    it("initially has no text in the alert space", () => {
      render(<CustomerForm original={blankCustomer} />);

      expect(element("[role=alert]")).not.toContainText("error occurred");
    });

    describe("when Post request returns an error", () => {
      beforeEach(() => {
        global.fetch.mockResolvedValue(fetchResponseError());
      });

      it("does not notify onSave", async () => {
        const saveSpy = jest.fn();

        render(<CustomerForm original={validCustomer} onSave={saveSpy} />);
        await clickAndWait(submitButton());

        expect(saveSpy).not.toBeCalled();
      });

      it("renders error message", async () => {
        render(<CustomerForm original={validCustomer} />);
        await clickAndWait(submitButton());

        expect(element("[role=alert]")).toContainText("error occurred");
      });

      it("clears the error state when resubmit is successful", async () => {
        const customer = { id: 123 };

        render(<CustomerForm original={validCustomer} onSave={() => {}} />);
        await clickAndWait(submitButton());

        global.fetch.mockResolvedValue(fetchResponseOk(customer));
        await clickAndWait(submitButton());

        expect(element("[role=alert]")).not.toContainText("error occurred");
      });
    });

    it("does not submit the form when there are validation errors", async () => {
      render(<CustomerForm original={blankCustomer} />);

      await clickAndWait(submitButton());

      expect(global.fetch).not.toBeCalled();
    });

    it("renders validation errors after submission fails", async () => {
      render(<CustomerForm original={blankCustomer} />);

      await clickAndWait(submitButton());

      expect(textOf(elements("[role=alert]"))).not.toEqual(["", "", "", ""]);
    });
  });

  describe("validation", () => {
    const errorFor = (fieldName) => element(`#${fieldName}Error[role=alert]`);

    const itRendersAnAlertForFieldValidation = (fieldName) =>
      it(`renders an alert space for ${fieldName} validation errors`, async () => {
        render(<CustomerForm original={validCustomer} />);

        expect(errorFor(fieldName)).not.toBeNull();
      });

    const itSetsAlertAsAccessibleDescriptionForField = (fieldName) =>
      it(`sets alert as the accessible description for the ${fieldName} field`, async () => {
        render(<CustomerForm original={validCustomer} />);

        expect(field(fieldName).getAttribute("aria-describedby")).toEqual(
          `${fieldName}Error`
        );
      });

    const itInvalidatesFieldWithValue = (fieldName, value, description) => {
      it(`displays error after blur when ${fieldName} field is '${value}'`, () => {
        render(<CustomerForm original={validCustomer} />);

        withFocus(field(fieldName), () => change(field(fieldName), value));

        expect(errorFor(fieldName)).toContainText(description);
      });
    };

    const itInitiallyHasNoTextInTheAlertSpace = (fieldName) =>
      it(`initially has no text in the ${fieldName} field alert space`, async () => {
        render(<CustomerForm original={validCustomer} />);

        expect(errorFor(fieldName).textContent).toEqual("");
      });

    describe("firstName", () => {
      itRendersAnAlertForFieldValidation("firstName");
      itSetsAlertAsAccessibleDescriptionForField("firstName");
      itInvalidatesFieldWithValue("firstName", " ", "First name is required");
      itInitiallyHasNoTextInTheAlertSpace("firstName");
    });

    describe("lastName", () => {
      itRendersAnAlertForFieldValidation("lastName");
      itSetsAlertAsAccessibleDescriptionForField("lastName");
      itInvalidatesFieldWithValue("lastName", " ", "Last name is required");
      itInitiallyHasNoTextInTheAlertSpace("lastName");
    });

    describe("phoneNumber", () => {
      itRendersAnAlertForFieldValidation("phoneNumber");
      itSetsAlertAsAccessibleDescriptionForField("phoneNumber");
      itInvalidatesFieldWithValue(
        "phoneNumber",
        " ",
        "Phone number is required"
      );
      itInvalidatesFieldWithValue(
        "phoneNumber",
        "invalid",
        "Only numbers, spaces and these symbols are allowed: ( ) + -"
      );
      itInitiallyHasNoTextInTheAlertSpace("phoneNumber");

      it("accepts standard phone number characters when validating", async () => {
        render(<CustomerForm original={validCustomer} />);

        withFocus(field("phoneNumber"), () =>
          change(field("phoneNumber"), "0123456789+()- ")
        );

        expect(errorFor("phoneNumber")).not.toContainText("Only numbers");
      });
    });
  });
});
