import React from "react";
import {
  element,
  field,
  form,
  initializeReactContainer,
  render,
} from "./reactTestExtensions";
import { AppointmentForm } from "../src/AppointmentForm";

describe("AppointmentForm", () => {
  const blankAppointment = {
    service: "",
  };

  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a form", () => {
    render(<AppointmentForm original={blankAppointment} />);

    expect(form()).not.toBeNull();
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
      render(<AppointmentForm original={blankAppointment} />);

      expect(field("service")).not.toBeNull();
      expect(field("service").tagName).toEqual("SELECT");
    });

    it("has a blank value as the first value", () => {
      render(<AppointmentForm original={blankAppointment} />);

      const firstOption = field("service").childNodes[0];
      expect(firstOption.value).toEqual("");
    });

    it("lists all salon services", () => {
      render(
        <AppointmentForm
          original={blankAppointment}
          selectableServices={services}
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
        <AppointmentForm selectableServices={services} original={appointment} />
      );

      const option = findOption(field("service"), selectedService);
      expect(option.selected).toBe(true);
    });
  });

  describe("time slot table", () => {
    it("renders a table for time slots with an id", () => {
      render(<AppointmentForm original={blankAppointment} />);

      expect(element("table#time-slots")).not.toBeNull();
    });
  });
});
