import React, { useCallback, useState } from "react";
import { AppointmentsDayViewLoader } from "./AppointmentsDayViewLoader";
import { CustomerForm } from "./CustomerForm";

export const blankCustomer = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

export const App = () => {
  const [view, setView] = useState("dayView");

  const transitionToAddCustomer = useCallback(() => setView("addCustomer"), []);

  return view === "addCustomer" ? (
    <CustomerForm original={blankCustomer} />
  ) : (
    <>
      <menu>
        <li>
          <button type="button" onClick={transitionToAddCustomer}>
            Add customer and appointment
          </button>
        </li>
      </menu>
      <AppointmentsDayViewLoader />
    </>
  );
};
