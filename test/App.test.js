import React from "react";
import { initializeReactContainer, render } from "./reactTestExtensions";
import { AppointmentsDayViewLoader } from "../src/AppointmentsDayViewLoader";
import { App } from "../src/App";

jest.mock("../src/AppointmentsDayViewLoader", () => ({
  AppointmentsDayViewLoader: jest.fn(() => (
    <div id="AppointmentsDayViewLoader" />
  )),
}));

describe("App", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("initially shows the AppointmentsDayViewLoader", () => {
    AppointmentsDayViewLoader.mockImplementation(() => (
      <div id="AppointmentsDayViewLoader" />
    ));
    render(<App />);

    expect(AppointmentsDayViewLoader).toBeRendered();
  });
});
