import React from "react";

export default () => (
  <div className="m-9 p-9 text-center">
    <span className="badge badge-pill badge-info p-3">
      <span
        className="spinner-grow spinner-grow-sm p-2 mr-2"
        role="status"
        aria-hidden="true"
      ></span>
      <strong>Loading...</strong>
    </span>
  </div>
);
