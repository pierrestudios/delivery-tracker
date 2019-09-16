import React from "react";
import { mount } from "enzyme";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Icon } from "tabler-react";

import NavItemLink from "./NavItemLink";

describe("Renders <NavItemLink /> with params correctly ", () => {
  const params = {
    label: "MenuTitle",
    to: "/menu-path",
    icon: <Icon name="plus" />
  };

  it("Renders <NavItemLink /> with correct label, to, and icon", () => {
    const wrapped = mount(
      <BrowserRouter>
        <Route>
          <NavItemLink {...params} />
        </Route>
      </BrowserRouter>
    );

    expect(wrapped.find(".nav-link").exists()).toEqual(true);

    expect(
      wrapped
        .find(".nav-link")
        .first()
        .text()
    ).toEqual(params.label);

    expect(
      wrapped
        .find(".nav-link")
        .first()
        .prop("to")
    ).toEqual(params.to);

    expect(
      wrapped
        .find(".nav-link")
        .containsAnyMatchingElements([<i className="fe fe-plus"></i>])
    ).toEqual(true);
  });
});
