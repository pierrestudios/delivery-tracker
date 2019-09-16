import React from "react";
import { NavLink } from "react-router-dom";

export default ({ label, to, icon, isDropDown = false, ...props }) => {
  return isDropDown ? (
    <NavLink exact className={"dropdown-item"} activeClassName="na" to={to}>
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
