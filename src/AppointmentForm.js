import React from "react";

const timeIncrements = (numTimes, startTime, increment) =>
  Array(numTimes)
    .fill([startTime])
    .reduce((acc, _, i) => acc.concat([startTime + i * increment]));

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000; //30 min in ms

  return timeIncrements(totalSlots, startTime, increment);
};

const weeklyDateValues = (startDate) => {
  const midnight = startDate.setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;

  return timeIncrements(7, midnight, increment);
};

const toTimeValue = (timestamp) =>
  new Date(timestamp).toTimeString().substring(0, 5);

const toShortDate = (timestamp) => {
  const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(" ");

  return `${day} ${dayOfMonth}`;
};

const TimeSlotTable = ({ salonOpensAt, salonClosesAt, today }) => {
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);
  const dates = weeklyDateValues(today);

  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
          {dates.map((d) => (
            <th key={d}>{toShortDate(d)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((timeSlot) => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const AppointmentForm = ({
  selectableServices,
  original,
  salonOpensAt,
  salonClosesAt,
  today,
}) => (
  <form>
    <select name="service" value={original.service} readOnly>
      <option />
      {selectableServices.map((service) => (
        <option key={service}>{service}</option>
      ))}
    </select>
    <TimeSlotTable
      salonOpensAt={salonOpensAt}
      salonClosesAt={salonClosesAt}
      today={today}
    />
  </form>
);

AppointmentForm.defaultProps = {
  salonOpensAt: 9,
  salonClosesAt: 19,
  selectableServices: [
    "Cut",
    "Blow-dry",
    "Cut & color",
    "Beard trim",
    "Cut & beard trim",
    "Extensions",
  ],
  today: new Date(),
};
