import React from "react";
import {
  element,
  elements,
  field,
  form,
  initializeReactContainer,
  render,
  submitButton,
} from "./reactTestExtensions";
import { AppointmentForm } from "../src/AppointmentForm";

describe("AppointmentForm", () => {
  const blankAppointment = {
    service: "",
  };

  const today = new Date();
  const availableTimeSlots = [
    { startsAt: today.setHours(9, 0, 0, 0) },
    { startsAt: today.setHours(9, 30, 0, 0) },
  ];

  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a form", () => {
    render(
      <AppointmentForm
        original={blankAppointment}
        availableTimeSlots={availableTimeSlots}
      />
    );

    expect(form()).not.toBeNull();
  });

  it("renders a submit button", () => {
    render(
      <AppointmentForm
        original={blankAppointment}
        availableTimeSlots={availableTimeSlots}
      />
    );

    expect(submitButton()).not.toBeNull();
  });

  describe("service field", () => {
    const services = ["Cut", "Blow-dry"];

    const labelsOfAllOptions = (element) =>
      Array.from(element.childNodes, (node) => node.textContent);

    const findOption = (selectBox, textContent) => {
      const options = Array.from(selectBox.childNodes);
      return options.find((option) => option.textContent === textContent);
    };

    it("renders as a select box", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          availableTimeSlots={availableTimeSlots}
        />
      );

      expect(field("service")).not.toBeNull();
      expect(field("service").tagName).toEqual("SELECT");
    });

    it("has a blank value as the first value", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          availableTimeSlots={availableTimeSlots}
        />
      );

      const firstOption = field("service").childNodes[0];
      expect(firstOption.value).toEqual("");
    });

    it("lists all salon services", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          selectableServices={services}
          availableTimeSlots={availableTimeSlots}
        />
      );

      expect(labelsOfAllOptions(field("service"))).toEqual(
        expect.arrayContaining(services)
      );
    });

    it("preselects the existing value", () => {
      const selectedService = services[1];

      const appointment = {
        service: selectedService,
      };

      render(
        <AppointmentForm
          selectableServices={services}
          original={appointment}
          availableTimeSlots={availableTimeSlots}
        />
      );

      const option = findOption(field("service"), selectedService);
      expect(option.selected).toBe(true);
    });
  });

  describe("time slot table", () => {
    const startsAtField = (index) => elements("input[name=startsAt]")[index];

    it("renders a table for time slots with an id", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          availableTimeSlots={availableTimeSlots}
        />
      );

      expect(element("table#time-slots")).not.toBeNull();
    });

    it("renders a time slot for every half an hour between open and close times", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          salonOpensAt={9}
          salonClosesAt={11}
          availableTimeSlots={availableTimeSlots}
        />
      );

      const timesOfDayHeadings = elements("tbody >* th");

      expect(timesOfDayHeadings[0]).toContainText("09:00");
      expect(timesOfDayHeadings[1]).toContainText("09:30");
      expect(timesOfDayHeadings[3]).toContainText("10:30");
    });

    it("renders an empty cell at the start of the header row", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          availableTimeSlots={availableTimeSlots}
        />
      );

      const headerRow = element("thead > tr");

      expect(headerRow.firstChild).toContainText("");
    });

    it("renders a week of available dates", () => {
      const specificDate = new Date(2018, 11, 1);
      render(
        <AppointmentForm
          original={blankAppointment}
          today={specificDate}
          availableTimeSlots={availableTimeSlots}
        />
      );
      const dates = elements("thead >* th:not(:first-child)");
      expect(dates).toHaveLength(7);
      expect(dates[0]).toContainText("Sat 01");
      expect(dates[1]).toContainText("Sun 02");
      expect(dates[6]).toContainText("Fri 07");
    });

    const cellsWithRadioButtons = () =>
      elements("input[type=radio]").map((el) =>
        elements("td").indexOf(el.parentNode)
      );

    it("renders radio buttons in the correct table cell positions", () => {
      const oneDayInMs = 24 * 60 * 60 * 1000;
      const today = new Date();
      const tomorrow = new Date(today.getTime() + oneDayInMs);
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
        { startsAt: tomorrow.setHours(9, 30, 0, 0) },
      ];

      render(
        <AppointmentForm
          original={blankAppointment}
          today={today}
          availableTimeSlots={availableTimeSlots}
        />
      );

      expect(cellsWithRadioButtons()).toEqual(
        expect.arrayContaining([0, 7, 8])
      );
    });

    it("does not render radio buttons for unavailable time slots", () => {
      render(
        <AppointmentForm original={blankAppointment} availableTimeSlots={[]} />
      );

      expect(elements("input[type=radio]")).toHaveLength(0);
    });

    it("sets radio button values to the startsAt value of the corresponding appointment", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      );

      const allRadioValues = elements("input[type=radio]").map(({ value }) =>
        parseInt(value)
      );
      const allSlotTimes = availableTimeSlots.map(({ startsAt }) => startsAt);

      expect(allRadioValues).toEqual(allSlotTimes);
    });

    it("pre-selects the existing value", () => {
      const appointment = { startsAt: availableTimeSlots[1].startsAt };
      render(
        <AppointmentForm
          original={appointment}
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      );

      expect(startsAtField(1).checked).toBe(true);
    });
  });
});
