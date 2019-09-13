import React from "react";
import { Route } from "react-router-dom";

import Home from "./Home";

export default props => {
  const routes = (
    <React.Fragment>
      <Route
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
    </React.Fragment>
  );

  return <React.StrictMode>{routes}</React.StrictMode>;
};
