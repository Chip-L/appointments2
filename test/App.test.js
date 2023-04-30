import React from "react";
import {
  click,
  element,
  initializeReactContainer,
  propsOf,
  render,
} from "./reactTestExtensions";
import { AppointmentsDayViewLoader } from "../src/AppointmentsDayViewLoader";
import { AppointmentFormLoader } from "../src/AppointmentFormLoader";
import { CustomerForm } from "../src/CustomerForm";
import { App } from "../src/App";
import { blankCustomer } from "./builders/customer";
import { act } from "react-dom/test-utils";
import { blankAppointment } from "./builders/appointment";

jest.mock("../src/AppointmentsDayViewLoader", () => ({
  AppointmentsDayViewLoader: jest.fn(() => (
    <div id="AppointmentsDayViewLoader" />
  )),
}));
jest.mock("../src/CustomerForm", () => ({
  CustomerForm: jest.fn(() => <div id="CustomerForm" />),
}));
jest.mock("../src/AppointmentFormLoader", () => ({
  AppointmentFormLoader: jest.fn(() => <div id="AppointmentFormLoader" />),
}));

describe("App", () => {
  beforeEach(() => {
    initializeReactContainer();
    AppointmentsDayViewLoader.mockImplementation(() => (
      <div id="AppointmentsDayViewLoader" />
    ));
    render(<App />);
    CustomerForm.mockImplementation(() => <div id="CustomerForm" />);
    AppointmentFormLoader.mockImplementation(() => (
      <div id="AppointmentFormLoader" />
    ));
    render(<App />);
  });

  const beginAddingCustomerAndAppointment = () =>
    click(element("menu > li > button:first-of-type"));

  const exampleCustomer = { id: 123 };
  const saveCustomer = (customer = exampleCustomer) =>
    act(() => propsOf(CustomerForm).onSave(customer));

  const saveAppointment = () =>
    act(() => propsOf(AppointmentFormLoader).onSave());

  it("initially shows the AppointmentsDayViewLoader", () => {
    render(<App />);

    expect(AppointmentsDayViewLoader).toBeRendered();
  });

  it("has a menu bar", () => {
    render(<App />);

    expect(element("menu")).not.toBeNull();
  });

  it("has a button to initiate add customer and appointment action", () => {
    render(<App />);

    const firstButton = element("menu > li > button:first-of-type");

    expect(firstButton).toContainText("Add customer and appointment");
  });

  it("displays the CustomerForm when the button is clicked", () => {
    beginAddingCustomerAndAppointment();

    expect(element("#CustomerForm")).not.toBeNull();
  });

  it("does not display the CustomerForm when initially rendered", () => {
    render(<App />);

    expect(element("#CustomerForm")).toBeNull();
  });

  it("passes a blank original customer object to CustomerForm", () => {
    render(<App />);

    beginAddingCustomerAndAppointment();

    expect(CustomerForm).toBeRenderedWithProps(
      expect.objectContaining({ original: blankCustomer })
    );
  });

  it("hides the AppointmentsDayViewLoader when button is clicked", () => {
    render(<App />);

    beginAddingCustomerAndAppointment();

    expect(element("#AppointmentsDayViewLoader")).toBeNull();
  });

  it("hides the button bar when CustomerForm is being displayed", () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    expect(element("menu")).toBeNull();
  });

  it("displays the AppointmentFormLoader after the CustomerForm is submitted", () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    saveCustomer();

    expect(element("#AppointmentFormLoader")).not.toBeNull();
  });

  it("passes a blank original appointment object to CustomerForm", async () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    saveCustomer();

    expect(AppointmentFormLoader).toBeRenderedWithProps(
      expect.objectContaining({
        original: expect.objectContaining(blankAppointment),
      })
    );
  });

  it("passes the customer to the AppointmentForm", () => {
    const customer = { id: 123 };

    render(<App />);
    beginAddingCustomerAndAppointment();
    saveCustomer();

    expect(AppointmentFormLoader).toBeRenderedWithProps(
      expect.objectContaining({
        original: expect.objectContaining({ customer: customer.id }),
      })
    );
  });

  it("renders AppointmentsDayViewLoader after AppointmentForm is submitted", () => {
    render(<App />);
    beginAddingCustomerAndAppointment();
    saveCustomer();
    saveAppointment();

    expect(AppointmentsDayViewLoader).toBeRendered();
  });
});
