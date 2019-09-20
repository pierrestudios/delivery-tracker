import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PasswordRetrieve from "./pages/PasswordRetrieve";
import Pages from "./pages";
import Header from "./presentations/Header";

import { loadUserData } from "../store/actions";
import Footer from "./presentations/Footer";

export default () => {
  const { userAuth } = useSelector(state => state);
  const { token: loggedIn, loaded: authLoaded } = userAuth;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authLoaded) {
      dispatch(loadUserData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoaded]);

  return (
    <main id="app-container">
      <BrowserRouter>
        <Switch>
          <Route
            path={"/login"}
            render={routerProps => {
              if (loggedIn) {
                return <Redirect to={"/"} />;
              }

              return <Login {...routerProps} />;
            }}
          />
          <Route
            path={"/signup"}
            render={routerProps => {
              if (loggedIn) {
                return <Redirect to={"/"} />;
              }

              return <Signup {...routerProps} />;
            }}
          />
          <Route
            path={"/retrieve-password"}
            render={routerProps => {
              if (loggedIn) {
                return <Redirect to={"/"} />;
              }

              return <PasswordRetrieve {...routerProps} />;
            }}
          />
          <Route
            path="*"
            render={routerProps => {
              return (
                <React.Fragment>
                  <Header {...routerProps} isLoggedIn={loggedIn} />
                  <Pages id="app-content" {...routerProps} />
                </React.Fragment>
              );
            }}
          />
        </Switch>
      </BrowserRouter>
      <Footer />
    </main>
  );
};
