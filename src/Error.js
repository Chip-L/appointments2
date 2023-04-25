import React from "react";

export const Error = ({ hasError }) => (
  <p role="alert">{hasError ? "An error occurred during save." : ""}</p>
);
