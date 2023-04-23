import React from "react";
import {
  click,
  element,
  elements,
  field,
  form,
  initializeReactContainer,
  labelFor,
  render,
  submit,
  submitButton,
} from "./reactTestExtensions";
import { AppointmentForm } from "../src/AppointmentForm";
import { today, todayAt, tomorrowAt } from "./builders/time";

describe("AppointmentForm", () => {
  const blankAppointment = {
    service: "",
  };

  const services = ["Cut", "Blow-dry"];

  const availableTimeSlots = [
    { startsAt: todayAt(9) },
    { startsAt: todayAt(9, 30) },
  ];

  const testProps = {
    today,
    selectableServices: services,
    availableTimeSlots,
    original: blankAppointment,
  };

  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a form", () => {
    render(<AppointmentForm {...testProps} />);

    expect(form()).not.toBeNull();
  });

  it("renders a submit button", () => {
    render(<AppointmentForm {...testProps} />);

    expect(submitButton()).not.toBeNull();
  });

  it("prevents the default action when submitting the form", () => {
    render(<AppointmentForm {...testProps} onSubmit={() => {}} />);

    const event = submit(form());

    expect(event.defaultPrevented).toBe(true);
  });

  const itRendersAsASelectBox = (fieldName) => {
    it("renders as a select box", () => {
      render(<AppointmentForm {...testProps} />);

      expect(field(fieldName)).not.toBeNull();
      expect(field(fieldName)).toBeElementWithTag("SELECT");
    });

    it("has a blank value as the first value", () => {
      render(<AppointmentForm {...testProps} original={blankAppointment} />);

      const firstOption = field(fieldName).childNodes[0];
      expect(firstOption.value).toEqual("");
    });
  };

  const itRendersALabel = (fieldName, text) => {
    it("renders a label for the select", () => {
      render(<AppointmentForm {...testProps} />);

      expect(labelFor(fieldName)).not.toBeNull();
    });

    it(`renders '${text}' as the label`, () => {
      render(<AppointmentForm {...testProps} />);

      expect(labelFor(fieldName)).toContainText(text);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelId = (fieldName) =>
    it("assigns an id that matches the label id", () => {
      render(<AppointmentForm {...testProps} />);

      expect(field(fieldName).id).toEqual(fieldName);
    });

  describe("service field", () => {
    const labelsOfAllOptions = (element) =>
      Array.from(element.childNodes, (node) => node.textContent);

    const findOption = (selectBox, textContent) => {
      const options = Array.from(selectBox.childNodes);
      return options.find((option) => option.textContent === textContent);
    };

    itRendersAsASelectBox("service");
    itRendersALabel("service", "Services");
    itAssignsAnIdThatMatchesTheLabelId("service");

    it("lists all salon services", () => {
      render(<AppointmentForm {...testProps} selectableServices={services} />);

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
          {...testProps}
          original={appointment}
          selectableServices={services}
        />
      );

      const option = findOption(field("service"), selectedService);

      expect(option.selected).toBe(true);
    });
  });

  describe("time slot table", () => {
    const startsAtField = (index) => elements("input[name=startsAt]")[index];

    it("renders a table for time slots with an id", () => {
      render(<AppointmentForm {...testProps} />);

      expect(element("table#time-slots")).not.toBeNull();
    });

    it("renders a time slot for every half an hour between open and close times", () => {
      render(
        <AppointmentForm {...testProps} salonOpensAt={9} salonClosesAt={11} />
      );

      const timesOfDayHeadings = elements("tbody >* th");

      expect(timesOfDayHeadings[0]).toContainText("09:00");
      expect(timesOfDayHeadings[1]).toContainText("09:30");
      expect(timesOfDayHeadings[3]).toContainText("10:30");
    });

    it("renders an empty cell at the start of the header row", () => {
      render(<AppointmentForm {...testProps} />);

      const headerRow = element("thead > tr");

      expect(headerRow.firstChild).toContainText("");
    });

    it("renders a week of available dates", () => {
      const specificDate = new Date(2018, 11, 1);
      render(<AppointmentForm {...testProps} today={specificDate} />);
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
      const availableTimeSlots = [
        { startsAt: todayAt(9) },
        { startsAt: todayAt(9, 30) },
        { startsAt: tomorrowAt(9, 30) },
      ];

      render(
        <AppointmentForm
          {...testProps}
          availableTimeSlots={availableTimeSlots}
        />
      );

      expect(cellsWithRadioButtons()).toEqual(
        expect.arrayContaining([0, 7, 8])
      );
    });

    it("does not render radio buttons for unavailable time slots", () => {
      render(<AppointmentForm {...testProps} availableTimeSlots={[]} />);

      expect(elements("input[type=radio]")).toHaveLength(0);
    });

    it("sets radio button values to the startsAt value of the corresponding appointment", () => {
      render(<AppointmentForm {...testProps} />);

      const allRadioValues = elements("input[type=radio]").map(({ value }) =>
        parseInt(value)
      );
      const allSlotTimes = availableTimeSlots.map(({ startsAt }) => startsAt);

      expect(allRadioValues).toEqual(allSlotTimes);
    });

    it("pre-selects the existing value", () => {
      const appointment = { startsAt: availableTimeSlots[1].startsAt };
      render(<AppointmentForm {...testProps} original={appointment} />);

      expect(startsAtField(1).checked).toBe(true);
    });

    it("saves the existing value when submitted", () => {
      expect.hasAssertions();

      const appointment = {
        startsAt: availableTimeSlots[1].startsAt,
      };
      render(
        <AppointmentForm
          {...testProps}
          original={appointment}
          onSubmit={({ startsAt }) =>
            expect(startsAt).toEqual(availableTimeSlots[1].startsAt)
          }
        />
      );

      click(submitButton());
    });

    it("save a new value when submitted", () => {
      expect.hasAssertions();

      const appointment = {
        startsAt: availableTimeSlots[0],
      };
      render(
        <AppointmentForm
          {...testProps}
          original={appointment}
          onSubmit={({ startsAt }) =>
            expect(startsAt).toEqual(availableTimeSlots[1].startsAt)
          }
        />
      );

      click(startsAtField(1));
      click(submitButton());
    });
  });
});
