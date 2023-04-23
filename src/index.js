import React from "react";
import ReactDOM from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentDayView";
import { sampleAppointments, sampleAvailableTimeSlots } from "./sampleData";
import { CustomerForm } from "./CustomerForm";
import { AppointmentForm } from "./AppointmentForm";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppointmentForm
      original={sampleAppointments[0]}
      availableTimeSlots={sampleAvailableTimeSlots}
    />
    {/* <CustomerForm
      original={sampleAppointments[0].customer}
      onSubmit={(customer) => console.log({ customer })}
    /> */}
    {/* <AppointmentsDayView appointments={sampleAppointments} /> */}
  </React.StrictMode>
);
