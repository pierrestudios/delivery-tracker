import React from "react";
import { Nav, Dropdown, Icon } from "tabler-react";

const Logo = props => (
  <>
    <Icon name="globe" /> <span>Fanklin Tools</span>
  </>
);

export default props => {
  return (
    <Nav>
      <Nav.Item>
        <Logo />
      </Nav.Item>
      <Nav.Item active to="/">
        Dashboard
      </Nav.Item>
      <Nav.Item to="/find-tools">Find Tools</Nav.Item>
      <Nav.Item to="/reservations">My Rentals</Nav.Item>
      <Nav.Item hasSubNav value="My Account" icon="user">
        <Nav.SubItem to="/profile">
          <Icon name="edit-3" />
          Update
        </Nav.SubItem>
        <Dropdown.Item to="/logout" className="bg-danger text-white">
          <Icon name="log-out" />
          <span className="">Log Out</span>
        </Dropdown.Item>
      </Nav.Item>
    </Nav>
  );
};
