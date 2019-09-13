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
        render={routerProps => (
          <Home
            {...{
              ...routerProps,
              ...props
            }}
          />
        )}
        path={"/"}
      />
      <Route
        key={"FindTools"}
        render={routerProps => (
          <FindTools
            {...{
              ...routerProps,
              ...props
            }}
          />
        )}
        path={"/find-tools"}
      />
    </React.Fragment>
  );

  return <React.StrictMode>{routes}</React.StrictMode>;
};
