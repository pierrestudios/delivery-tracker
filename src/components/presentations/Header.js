import React from "react";
import { Nav, Dropdown, Icon, AccountDropdown } from "tabler-react";

import NavItemLink from "./NavItemLink";
import Logo from "./Logo";

export default ({ match }) => {
  return (
    <Nav>
      <Nav.Item>
        <Logo />
      </Nav.Item>
      <NavItemLink {...{ label: "Dashboard", to: "/" }} />
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
            icon: () => <Icon name="edit-3" className="dropdown-icon" />
          }}
        />

        <Dropdown.Item to="/logout" className="bg-danger text-white">
          <Icon name="log-out" className="dropdown-icon text-white" />
          <span className="">Log Out</span>
        </Dropdown.Item>
      </Nav.Item>
    </Nav>
  );
};
