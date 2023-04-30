import React from "react";
import {
  click,
  element,
  initializeReactContainer,
  render,
} from "./reactTestExtensions";
import { AppointmentsDayViewLoader } from "../src/AppointmentsDayViewLoader";
import { CustomerForm } from "../src/CustomerForm";
import { App } from "../src/App";
import { blankCustomer } from "./builders/customer";

jest.mock("../src/AppointmentsDayViewLoader", () => ({
  AppointmentsDayViewLoader: jest.fn(() => (
    <div id="AppointmentsDayViewLoader" />
  )),
}));
jest.mock("../src/CustomerForm", () => ({
  CustomerForm: jest.fn(() => <div id="CustomerForm" />),
}));

describe("App", () => {
  beforeEach(() => {
    initializeReactContainer();
    AppointmentsDayViewLoader.mockImplementation(() => (
      <div id="AppointmentsDayViewLoader" />
    ));
    render(<App />);
    CustomerForm.mockImplementation(() => <div id="CustomerForm" />);
    render(<App />);
  });

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

  const beginAddingCustomerAndAppointment = () =>
    click(element("menu > li > button:first-of-type"));

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
});
