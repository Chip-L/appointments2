import React from "react";

export const CustomerForm = ({ original }) => (
  <form>
    <label htmlFor="firstName">First Name</label>
    <input
      id="firstName"
      name="firstName"
      type="text"
      value={original.firstName}
      readOnly
    />
  </form>
);
