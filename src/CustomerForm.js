import React, { useState } from "react";
import { Error } from "./Error";

const required = (description) => (value) =>
  !value || value.trim() === "" ? description : undefined;

const match = (re, description) => (value) =>
  !value.match(re) ? description : undefined;

const list =
  (...validators) =>
  (value) =>
    validators.reduce(
      (result, validator) => result || validator(value),
      undefined
    );

export const CustomerForm = ({ original, onSave }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState(false);

  const [customer, setCustomer] = useState(original);

  const handleChange = ({ target }) => {
    setCustomer((customer) => ({
      ...customer,
      [target.name]: target.value,
    }));
  };

  const handleBlur = ({ target }) => {
    const validators = {
      firstName: required("First name is required"),
      lastName: required("Last name is required"),
      phoneNumber: list(
        required("Phone number is required"),
        match(
          /^[0-9+()\- ]*$/,
          "Only numbers, spaces and these symbols are allowed: ( ) + -"
        )
      ),
    };

    const result = validators[target.name](target.value);
    setValidationErrors({ ...validationErrors, [target.name]: result });

    const fieldName = target.name;
    console.log({
      value: target.value,
      fieldName,
      hasError: hasError(fieldName),
      validationErrors: validationErrors[fieldName],
      result,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await global.fetch("/customers", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    if (result.ok) {
      const customerWithId = await result.json();
      onSave(customerWithId);
      setError(false);
    } else {
      setError(true);
    }
  };

  const hasError = (fieldName) => validationErrors[fieldName] !== undefined;

  const renderError = (fieldName) => (
    <span id={`${fieldName}Error`} role="alert">
      {hasError(fieldName) ? validationErrors[fieldName] : ""}
    </span>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Error hasError={error} />

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={customer.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-describedby="firstNameError"
      />
      {renderError("firstName")}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={customer.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-describedby="lastNameError"
      />
      {renderError("lastName")}

      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        id="phoneNumber"
        name="phoneNumber"
        type="text"
        value={customer.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-describedby="phoneNumberError"
      />
      {renderError("phoneNumber")}

      <input type="submit" value="add" />
    </form>
  );
};
