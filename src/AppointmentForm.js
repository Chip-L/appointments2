import React from "react";

const TimeSlotTable = () => <table id="time-slots"></table>;

export const AppointmentForm = ({ selectableServices, original }) => (
  <form>
    <select name="service" value={original.service} readOnly>
      <option />
      {selectableServices.map((service) => (
        <option key={service}>{service}</option>
      ))}
    </select>
    <TimeSlotTable />
  </form>
);

AppointmentForm.defaultProps = {
  selectableServices: [
    "Cut",
    "Blow-dry",
    "Cut & color",
    "Beard trim",
    "Cut & beard trim",
    "Extensions",
  ],
};
