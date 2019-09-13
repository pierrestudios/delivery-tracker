import React from "react";
import { NavLink } from "react-router-dom";

export default ({ label, to, icon, isDropDown = false }) => {
  return isDropDown ? (
    <NavLink exact className={"dropdown-item"} to={to}>
      {icon ? icon() : null}
      {label}
    </NavLink>
  ) : (
    <li className={"nav-item"}>
      <NavLink exact className={"nav-link"} to={to}>
        {icon ? icon() : null}
        {label}
      </NavLink>
    </li>
  );
};
