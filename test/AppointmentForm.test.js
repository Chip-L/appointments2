import React from "react";
import {
  change,
  click,
  clickAndWait,
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
import { fetchResponseOk } from "./builders/fetch";

describe("AppointmentForm", () => {
  const blankAppointment = {
    service: "",
    stylists: "",
  };

  const availableTimeSlots = [
    {
      startsAt: todayAt(9),
      stylists: ["Ashley", "Jo"],
    },
    {
      startsAt: todayAt(9, 30),
      stylists: ["Ashley"],
    },
  ];

  const services = ["Cut", "Blow-dry"];
  const stylists = ["Ashley", "Jo"];

  const testProps = {
    today,
    selectableServices: services,
    selectableStylists: stylists,
    availableTimeSlots,
    original: blankAppointment,
  };

  const labelsOfAllOptions = (element) =>
    Array.from(element.childNodes, (node) => node.textContent);

  const findOption = (selectBox, textContent) => {
    const options = Array.from(selectBox.childNodes);
    return options.find((option) => option.textContent === textContent);
  };

  beforeEach(() => {
    initializeReactContainer();
    jest.spyOn(global, "fetch").mockResolvedValue(fetchResponseOk);
  });

  const itRendersAsASelectBox = (fieldName) =>
    it("renders as a select box", () => {
      render(<AppointmentForm {...testProps} />);

      expect(field(fieldName)).not.toBeNull();
      expect(field(fieldName)).toBeElementWithTag("SELECT");
    });

  const itInitiallyHasABlankValueChosen = (fieldName) => {
    it("has a blank value as the first value", () => {
      render(<AppointmentForm {...testProps} original={blankAppointment} />);

      const firstOption = field(fieldName).childNodes[0];
      expect(firstOption.value).toEqual("");
    });
  };

  const itPreSelectsExistingValue = (fieldName, existing) => {
    it("pre-selects the existing value", () => {
      const appointment = { [fieldName]: existing };

      render(<AppointmentForm {...testProps} original={appointment} />);
      const option = findOption(field(fieldName), existing);

      expect(option.selected).toBe(true);
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

  const itSubmitsExistingValue = (fieldName, value) =>
    it("saves the existing value when submitted", async () => {
      const submitSpy = jest.fn();
      let submitArg;

      const appointment = {
        [fieldName]: value,
      };
      render(
        <AppointmentForm
          {...testProps}
          original={appointment}
          onSubmit={(submittedAppointment) =>
            (submitArg = submittedAppointment)
          }
        />
      );

      await clickAndWait(submitButton());

      expect(submitArg).toEqual(appointment);
    });

  const itSubmitsNewValue = (fieldName, newValue) =>
    it("saves a new value when submitted", () => {
      expect.hasAssertions();

      render(
        <AppointmentForm
          {...testProps}
          onSubmit={(appointment) =>
            expect(appointment[fieldName]).toEqual(newValue)
          }
        />
      );

      change(field(fieldName), newValue);
      click(submitButton());
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

  describe("service field", () => {
    itRendersAsASelectBox("service");
    itInitiallyHasABlankValueChosen("service");

    it("lists all salon services", () => {
      render(<AppointmentForm {...testProps} selectableServices={services} />);

      expect(labelsOfAllOptions(field("service"))).toEqual(
        expect.arrayContaining(services)
      );
    });

    itPreSelectsExistingValue("service", services[1]);
    itRendersALabel("service", "Services");
    itAssignsAnIdThatMatchesTheLabelId("service");
    itSubmitsExistingValue("service", services[1]);
    itSubmitsNewValue("service", services[1]);
  });

  describe("stylists field", () => {
    itRendersAsASelectBox("stylist");
    itInitiallyHasABlankValueChosen("stylist");

    it("lists selectable stylists", () => {
      const selectableStylists = ["A", "B", "C"];
      render(
        <AppointmentForm
          {...testProps}
          selectableStylists={selectableStylists}
        />
      );

      expect(labelsOfAllOptions(field("stylist"))).toEqual(
        expect.arrayContaining(selectableStylists)
      );
    });

    it("lists only stylists that can perform the selected service", () => {
      const selectableServices = ["1", "2"];
      const selectableStylists = ["A", "B", "C"];
      const serviceStylists = {
        1: ["A", "B"],
      };
      const appointment = { service: "1" };
      render(
        <AppointmentForm
          {...testProps}
          original={appointment}
          selectableServices={selectableServices}
          selectableStylists={selectableStylists}
          serviceStylists={serviceStylists}
        />
      );
      expect(labelsOfAllOptions(field("stylist"))).toEqual(["", "A", "B"]);
    });

    itPreSelectsExistingValue("stylist", "Jo");
    itRendersALabel("stylist", "Stylist");
    itAssignsAnIdThatMatchesTheLabelId("stylist");
    itSubmitsExistingValue("stylist", "Jo");
    itSubmitsNewValue("stylist", "Jo");
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

    it("saves a new value when submitted", () => {
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

    it("filters appointments by selected stylist", () => {
      const availableTimeSlots = [
        {
          startsAt: todayAt(9),
          stylists: ["Ashley"],
        },
        {
          startsAt: todayAt(9, 30),
          stylists: ["Jo"],
        },
      ];

      render(
        <AppointmentForm
          {...testProps}
          availableTimeSlots={availableTimeSlots}
        />
      );

      change(field("stylist"), "Jo");

      expect(cellsWithRadioButtons()).toEqual([7]);
    });
  });

  it("sends request to POST /customers when submitting the form", async () => {
    render(<AppointmentForm {...testProps} onSubmit={() => {}} />);

    await clickAndWait(submitButton());

    expect(global.fetch).toBeCalledWith(
      "/appointments",
      expect.objectContaining({ method: "POST" })
    );
  });
});
