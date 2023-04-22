import React from "react";

export const CustomerForm = ({ original, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(original);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        value={original.firstName}
        readOnly
      />

      <input type="submit" value="add" />
    </form>
  );
};
