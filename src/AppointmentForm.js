import React, { useCallback, useState } from "react";

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

const mergeDateAndTime = (date, timeSlot) => {
  const time = new Date(timeSlot);

  return new Date(date).setHours(
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds()
  );
};

const RadioButtonIfAvailable = ({
  availableTimeSlots,
  date,
  timeSlot,
  checkedTimeSlot,
  handleChange,
}) => {
  const startsAt = mergeDateAndTime(date, timeSlot);
  const isChecked = startsAt === checkedTimeSlot;

  if (
    availableTimeSlots.some(
      (availableTimeSlot) => availableTimeSlot.startsAt === startsAt
    )
  ) {
    return (
      <input
        name="startsAt"
        type="radio"
        value={startsAt}
        checked={isChecked}
        onChange={handleChange}
      />
    );
  }

  return null;
};

const TimeSlotTable = ({
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots,
  checkedTimeSlot,
  handleChange,
}) => {
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
            {dates.map((date) => (
              <td key={date}>
                <RadioButtonIfAvailable
                  availableTimeSlots={availableTimeSlots}
                  date={date}
                  timeSlot={timeSlot}
                  checkedTimeSlot={checkedTimeSlot}
                  handleChange={handleChange}
                />
              </td>
            ))}
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
  availableTimeSlots,
  onSubmit,
}) => {
  const [appointment, setAppointment] = useState(original);

  const handleServiceChange = (event) => {
    console.log("handleServiceChange:", event.target.value);

    setAppointment((appointment) => ({
      ...appointment,
      service: event.target.value,
    }));
  };

  const handleStartsAsChange = useCallback(
    ({ target: { value } }) =>
      setAppointment((appointment) => ({
        ...appointment,
        startsAt: parseInt(value),
      })),
    []
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("handleSubmit:", appointment);

    onSubmit(appointment);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="service">Services</label>
      <select
        id="service"
        name="service"
        value={appointment.service}
        onChange={handleServiceChange}
      >
        <option />
        {selectableServices.map((service) => (
          <option key={service}>{service}</option>
        ))}
      </select>

      <TimeSlotTable
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
        today={today}
        availableTimeSlots={availableTimeSlots}
        checkedTimeSlot={appointment.startsAt}
        handleChange={handleStartsAsChange}
      />

      <input type="submit" value="Add" />
    </form>
  );
};

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
