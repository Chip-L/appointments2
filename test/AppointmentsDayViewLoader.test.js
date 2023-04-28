import React from "react";
import {
  element,
  initializeReactContainer,
  renderAndWait,
} from "./reactTestExtensions";
import { AppointmentsDayView } from "../src/AppointmentsDayView";
import { AppointmentsDayViewLoader } from "../src/AppointmentsDayViewLoader";

jest.mock("../src/AppointmentsDayView", () => ({
  AppointmentsDayView: jest.fn(() => <div id="AppointmentsDayView" />),
}));

describe("AppointmentsDayViewLoader", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders an AppointmentsDayView", async () => {
    await renderAndWait(<AppointmentsDayViewLoader />);
    expect(element("#AppointmentsDayView")).not.toBeNull();
  });

  it("initially passes empty array of appointments to AppointmentsDayView", async () => {
    await renderAndWait(<AppointmentsDayViewLoader />);

    expect(AppointmentsDayView).toBeCalledWith(
      { appointments: [] },
      expect.anything()
    );
  });
});
