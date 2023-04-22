import React from "react";

export const CustomerForm = ({ original }) => (
  <form>
    <input name="firstName" type="text" value={original.firstName} readOnly />
  </form>
);
