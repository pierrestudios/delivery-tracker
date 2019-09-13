import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Pages from "./components/pages";

export default App => {
  const { loggedIn = true } = {};
  return (
    <main id="app-container">
      <div id="wrapper">
        <BrowserRouter>
          <Switch>
            <Route
              path="*"
              render={props => {
                if (!loggedIn) {
                  return <Redirect to={"/login"} />;
                }

                return (
                  <React.Fragment>
                    <Pages id="app-content" />
                  </React.Fragment>
                );
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    </main>
  );
};
