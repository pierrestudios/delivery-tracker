import React from "react";
import { Route } from "react-router-dom";

import Home from "./Home";
import Profile from "./Profile";
import FindTools from "./FindTools";
import Logout from "./Logout";

export default props => {
  const routes = (
    <React.Fragment>
      <Route
        exact
        path={"/"}
        render={routerProps => (
          <Home
            {...{
              ...routerProps,
              ...props
            }}
          />
        )}
      />
      <Route
        path={"/find-tools"}
        render={routerProps => (
          <FindTools
            {...{
              ...routerProps,
              ...props
            }}
          />
        )}
      />
      <Route
        exact
        path={"/profile"}
        render={routerProps => (
          <Profile
            {...{
              ...routerProps,
              ...props
            }}
          />
        )}
      />
      <Route
        exact
        path={"/logout"}
        render={routerProps => {
          return <Logout {...routerProps} />;
        }}
      />
    </React.Fragment>
  );

  return <React.StrictMode>{routes}</React.StrictMode>;
};
