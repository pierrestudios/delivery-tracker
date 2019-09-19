import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import PasswordRetrieve from "./components/pages/PasswordRetrieve";
import Pages from "./components/pages";
import Header from "./components/presentations/Header";

import { loadUserData } from "./store/actions";
import Footer from "./components/presentations/Footer";

export default () => {
  const { userAuth } = useSelector(state => state);
  const { token: loggedIn, loaded: authLoaded } = userAuth;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authLoaded) {
      dispatch(loadUserData());
    }
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
              if (authLoaded && !loggedIn) {
                return <Redirect to={"/login"} />;
              }

              return (
                <React.Fragment>
                  <Header {...routerProps} />
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
