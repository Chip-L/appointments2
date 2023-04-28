import React from "react";
import {
  element,
  initializeReactContainer,
  render,
} from "./reactTestExtensions";
import { AppointmentsDayView } from "../src/AppointmentsDayView";
import { AppointmentsDayViewLoader } from "../src/AppointmentsDayViewLoader";

jest.mock("../src/AppointmentsDayView", () => ({
  AppointmentsDayView: jest.fn(() => (
    <p id="AppointmentsDayView">AppointmentsDayView</p>
  )),
}));

describe("AppointmentsDayViewLoader", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders an AppointmentsDayView", () => {
    render(<AppointmentsDayViewLoader />);

    expect(element("#AppointmentsDayView")).not.toBeNull();
  });

  it("initially passes empty array of appointments to AppointmentsDayView", () => {
    render(<AppointmentsDayViewLoader />);

    expect(AppointmentsDayView).toBeCalledWith(
      { appointments: [] },
      expect.anything()
    );
  });
});
