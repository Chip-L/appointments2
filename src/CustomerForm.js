import React, { useState } from "react";

export const CustomerForm = ({ original }) => {
  const [customer, setCustomer] = useState(original);

  const handleChange = ({ target }) => {
    setCustomer((customer) => ({
      ...customer,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    global.fetch("/customers", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={customer.firstName}
        onChange={handleChange}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={customer.lastName}
        onChange={handleChange}
      />

      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        id="phoneNumber"
        name="phoneNumber"
        type="text"
        value={customer.phoneNumber}
        onChange={handleChange}
      />

      <input type="submit" value="add" />
    </form>
  );
};
