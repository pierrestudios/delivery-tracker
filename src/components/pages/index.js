import React from "react";
import { Route } from "react-router-dom";

import Home from "./Home";
import Profile from "./Profile";
import FindTools from "./FindTools";
import Reservations from "./Reservations";
import Logout from "./Logout";

export default () => {
  const routes = (
    <React.Fragment>
      <Route exact path={"/"} component={Home} />
      <Route
        path={"/find-tools/:locationId?/:categoryId?"}
        component={FindTools}
      />
      <Route exact path={"/reservations"} component={Reservations} />
      <Route exact path={"/profile"} component={Profile} />
      <Route exact path={"/logout"} component={Logout} />
    </React.Fragment>
  );

  return <React.StrictMode>{routes}</React.StrictMode>;
};
