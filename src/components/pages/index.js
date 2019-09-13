import React from "react";
import { Route } from "react-router-dom";

import Home from "./Home";
import FindTools from "./FindTools";

export default props => {
  const routes = (
    <React.Fragment>
      <Route
        exact
        key={"Home"}
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
        key={"FindTools"}
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
    </React.Fragment>
  );

  return <React.StrictMode>{routes}</React.StrictMode>;
};
