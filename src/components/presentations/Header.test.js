import React from "react";
import { mount } from "enzyme";

import App from "../App";
import Store from "../../store";

describe("Renders <Header /> with menu ", () => {
  const wrapped = mount(
    <Store>
      <App />
    </Store>
  );

  it("Renders <Header /> with correct number of menu and dropdown menu items", () => {
    const numberOfMenus = 3;
    const numberOfSubmenus = 2;

    expect(wrapped.find(".header-nav .nav-item").length).toEqual(numberOfMenus);

    wrapped
      .find(".header-nav .nav-item")
      .last()
      .simulate("click");

    // TODO: Rewrite test for logged-in user
    /*
    expect(
      wrapped.find(".header-nav .nav-item .dropdown-menu").hasClass("show")
    ).toEqual(true);

    expect(
      wrapped.find(".header-nav .nav-item .dropdown-menu").children().length
    ).toEqual(numberOfSubmenus);
    */
  });
});
