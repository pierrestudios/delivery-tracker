import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Pages from "./components/pages";
import Header from "./components/presentations/Header";

export default App => {
  const { loggedIn = true } = {};
  return (
    <main id="app-container" className="container">
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
                    <Header />
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
