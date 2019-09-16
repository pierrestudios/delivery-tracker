import React from "react";
import { NavLink } from "react-router-dom";

export default ({
  label,
  to,
  icon,
  isDropDown = false,
  linkClassNames,
  ...props
}) => {
  return isDropDown ? (
    <NavLink
      exact
      className={`dropdown-item ${linkClassNames ? linkClassNames : ""}`}
      activeClassName="na"
      to={to}
    >
      {icon}
      {label}
    </NavLink>
  ) : (
    <li className={"nav-item"}>
      <NavLink
        exact
        className={`nav-link ${linkClassNames ? linkClassNames : ""}`}
        to={to}
      >
        {icon}
        {label}
      </NavLink>
    </li>
  );
};
