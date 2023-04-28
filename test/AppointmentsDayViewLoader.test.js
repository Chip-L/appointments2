import React from "react";
import {
  element,
  initializeReactContainer,
  renderAndWait,
} from "./reactTestExtensions";
import { AppointmentsDayView } from "../src/AppointmentsDayView";
import { AppointmentsDayViewLoader } from "../src/AppointmentsDayViewLoader";
import { today, todayAt } from "./builders/time";
import { fetchResponseOk } from "./builders/fetch";

jest.mock("../src/AppointmentsDayView", () => ({
  AppointmentsDayView: jest.fn(() => <div id="AppointmentsDayView" />),
}));

describe("AppointmentsDayViewLoader", () => {
  const appointments = [{ startsAt: todayAt(9) }, { startsAt: todayAt(10) }];

  beforeEach(() => {
    initializeReactContainer();
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(fetchResponseOk(appointments));
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

  it("fetches data when component is mounted", async () => {
    const from = todayAt(0);
    const to = todayAt(23, 59, 59, 999);

    await renderAndWait(<AppointmentsDayViewLoader today={today} />);

    expect(global.fetch).toBeCalledWith(`/appointments/${from}-${to}`, {
      method: "GET",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    });
  });

  it("passes fetched appointments to AppointmentsDayView once they have loaded", async () => {
    await renderAndWait(<AppointmentsDayViewLoader />);

    expect(AppointmentsDayView).toHaveBeenLastCalledWith(
      { appointments },
      expect.anything()
    );
  });
});
