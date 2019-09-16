import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Icon } from "tabler-react";

import NavItemLink from "./NavItemLink";
import Logo from "./Logo";

export default ({ match }) => {
  return (
    <Nav className="header-nav">
      <Nav.Item>
        <NavLink exact className={"nav-link"} to={"/"}>
          <Logo />
        </NavLink>
      </Nav.Item>
      <NavItemLink {...{ label: "Find Tools", to: "/find-tools" }} />
      <NavItemLink {...{ label: "My Rentals", to: "/reservations" }} />
      <Nav.Item
        active={match.url === "/profile"}
        hasSubNav
        value="My Account"
        icon="user"
      >
        <NavItemLink
          {...{
            label: "Update",
            to: "/profile",
            isDropDown: true,
            icon: <Icon name="edit-3" className="dropdown-icon" />
          }}
        />
        <NavItemLink
          {...{
            label: "Log Out",
            to: "/logout",
            isDropDown: true,
            linkClassNames: "bg-danger text-white",
            icon: <Icon name="log-out" className="dropdown-icon text-white" />
          }}
        />
      </Nav.Item>
    </Nav>
  );
};
