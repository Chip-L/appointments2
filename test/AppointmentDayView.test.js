import React from "react";
import { Appointment, AppointmentsDayView } from "../src/AppointmentDayView";
import {
  click,
  element,
  elements,
  initializeReactContainer,
  render,
  textOf,
  typesOf,
} from "./reactTestExtensions";

describe("Appointment", () => {
  const blankCustomer = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  beforeEach(() => {
    initializeReactContainer();
  });

  const appointmentTable = () => element("#appointmentView > table");

  it("renders a table in the appointmentView", () => {
    render(<Appointment customer={blankCustomer} />);

    expect(appointmentTable()).not.toBeNull();
  });

  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable()).toContainText("Ashley");
  });

  it("renders another customer first name", () => {
    const customer = { firstName: "Jordan" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable()).toContainText("Jordan");
  });

  it("renders the customer last name", () => {
    const customer = { lastName: "Benson" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable()).toContainText("Benson");
  });

  it("renders another customer last name", () => {
    const customer = { lastName: "Smith" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable()).toContainText("Smith");
  });

  it("renders the customer phone number", () => {
    const customer = { phoneNumber: "907-555-7745" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable()).toContainText("907-555-7745");
  });

  it("renders another customer phone number", () => {
    const customer = { phoneNumber: "303-555-1234" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable()).toContainText("303-555-1234");
  });

  it("renders the stylist", () => {
    render(<Appointment customer={blankCustomer} stylist="Sam" />);

    expect(appointmentTable()).toContainText("Sam");
  });

  it("renders another stylist", () => {
    render(<Appointment customer={blankCustomer} stylist="Betty" />);

    expect(appointmentTable()).toContainText("Betty");
  });

  it("renders the salon service", () => {
    render(<Appointment customer={blankCustomer} service="Cut" />);

    expect(appointmentTable()).toContainText("Cut");
  });

  it("renders another salon service", () => {
    render(<Appointment customer={blankCustomer} service="Shave" />);

    expect(appointmentTable()).toContainText("Shave");
  });

  it("renders a note", () => {
    render(<Appointment customer={blankCustomer} notes="Note1" />);

    expect(appointmentTable()).toContainText("Note1");
  });

  it("renders another note", () => {
    render(<Appointment customer={blankCustomer} notes="Note2" />);

    expect(appointmentTable()).toContainText("Note2");
  });

  it("renders an h3 heading", () => {
    render(<Appointment customer={blankCustomer} />);

    expect(element("h3")).not.toBeNull();
  });

  it("renders the timestamp as part of the heading", () => {
    const today = new Date();

    render(
      <Appointment startsAt={today.setHours(9, 0)} customer={blankCustomer} />
    );

    expect(element("h3")).toContainText("Today's appointment at 09:00");
  });
});

describe("AppointmentsDayView", () => {
  const today = new Date();
  const twoAppointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
    { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
  ];

  const secondButton = () => elements(" button")[1];

  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(element("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(element("ol")).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    expect(elements("ol > li")).toHaveLength(2);
  });

  it("renders the time for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    expect(textOf(elements("li"))).toEqual(["12:00", "13:00"]);
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.body).toContainText(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    expect(document.body).toContainText("Ashley");
  });

  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    expect(typesOf(elements("li > *"))).toEqual(["button", "button"]);
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    click(secondButton());

    expect(document.body).toContainText("Jordan");
  });

  it("adds toggled class to button when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    click(secondButton());

    expect(secondButton()).toHaveClass("toggled");
  });

  it("does not add toggled class to button not selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    expect(secondButton().className).not.toContain("toggled");
  });
});
