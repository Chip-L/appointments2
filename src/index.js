import React from "react";
import ReactDOM from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentDayView";
import { sampleAppointments } from "./sampleData";
import { CustomerForm } from "./CustomerForm";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CustomerForm
      original={sampleAppointments[0].customer}
      onSubmit={(customer) => console.log({ customer })}
    />
    {/* <AppointmentsDayView appointments={sampleAppointments} /> */}
  </React.StrictMode>
);
