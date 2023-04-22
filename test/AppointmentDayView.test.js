import React from "react";
import { Appointment, AppointmentsDayView } from "../src/AppointmentDayView";
import {
  click,
  container,
  initializeReactContainer,
  render,
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

  const appointmentTable = () =>
    document.querySelector("#appointmentView > table");

  it("renders a table in the appointmentView", () => {
    render(<Appointment customer={blankCustomer} />);

    expect(appointmentTable()).not.toBeNull();
  });

  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable().textContent).toContain("Ashley");
  });

  it("renders another customer first name", () => {
    const customer = { firstName: "Jordan" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable().textContent).toContain("Jordan");
  });

  it("renders the customer last name", () => {
    const customer = { lastName: "Benson" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable().textContent).toContain("Benson");
  });

  it("renders another customer last name", () => {
    const customer = { lastName: "Smith" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable().textContent).toContain("Smith");
  });

  it("renders the customer phone number", () => {
    const customer = { phoneNumber: "907-555-7745" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable().textContent).toContain("907-555-7745");
  });

  it("renders another customer phone number", () => {
    const customer = { phoneNumber: "303-555-1234" };

    render(<Appointment customer={customer} />);

    expect(appointmentTable().textContent).toContain("303-555-1234");
  });

  it("renders the stylist", () => {
    render(<Appointment customer={blankCustomer} stylist="Sam" />);

    expect(appointmentTable().textContent).toContain("Sam");
  });

  it("renders another stylist", () => {
    render(<Appointment customer={blankCustomer} stylist="Betty" />);

    expect(appointmentTable().textContent).toContain("Betty");
  });

  it("renders the salon service", () => {
    render(<Appointment customer={blankCustomer} service="Cut" />);

    expect(appointmentTable().textContent).toContain("Cut");
  });

  it("renders another salon service", () => {
    render(<Appointment customer={blankCustomer} service="Shave" />);

    expect(appointmentTable().textContent).toContain("Shave");
  });

  it("renders a note", () => {
    render(<Appointment customer={blankCustomer} notes="Note1" />);

    expect(appointmentTable().textContent).toContain("Note1");
  });

  it("renders another note", () => {
    render(<Appointment customer={blankCustomer} notes="Note2" />);

    expect(appointmentTable().textContent).toContain("Note2");
  });

  it("renders an h3 heading", () => {
    render(<Appointment customer={blankCustomer} />);

    const heading = document.querySelector("h3");

    expect(heading).not.toBeNull();
  });

  it("renders the timestamp as part of the heading", () => {
    const today = new Date();

    render(
      <Appointment startsAt={today.setHours(9, 0)} customer={blankCustomer} />
    );

    const heading = document.querySelector("h3");

    expect(heading.textContent).toEqual("Today's appointment at 09:00");
  });
});

describe("AppointmentsDayView", () => {
  const today = new Date();
  const twoAppointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
    { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
  ];

  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);

    expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders an ol element to display appointments", () => {
    render(<AppointmentsDayView appointments={[]} />);
    const listElement = document.querySelector("ol");
    expect(listElement).not.toBeNull();
  });

  it("renders an li for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const listChildren = document.querySelectorAll("ol > li");
    expect(listChildren).toHaveLength(2);
  });

  it("renders the time for each appointment", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const listChildren = document.querySelectorAll("li");

    expect(listChildren[0].textContent).toEqual("12:00");
    expect(listChildren[1].textContent).toEqual("13:00");
  });

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(document.body.textContent).toContain(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    expect(document.body.textContent).toContain("Ashley");
  });

  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const buttons = document.querySelectorAll("li > button");

    expect(buttons).toHaveLength(2);
    expect(buttons[0].type).toEqual("button");
  });

  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={twoAppointments} />);

    const button = document.querySelectorAll("li > button")[1];

    click(button);

    expect(document.body.textContent).toContain("Jordan");
  });
});
