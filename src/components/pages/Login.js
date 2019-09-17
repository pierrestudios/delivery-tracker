import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Icon, Form, Button } from "tabler-react";
import { Link } from "react-router-dom";

import { apiLogin, loadUserData } from "../../store/actions";
import Logo from "../presentations/Logo";
import Loading from "../presentations/Loading";
import LogoHeader from "../presentations/LogoHeader";

export default props => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector(state => state);
  const { token: userToken, loginError, loaded: authLoaded = false } = userAuth;
  const [loginData, saveLoginData] = useState({ ...userAuth, started: false });
  const { email, password, error } = loginData;

  useEffect(() => {
    // TODO: If "Save Login" is checked, spread ${userAuth} in saveLoginData fn
    if (loginError) {
      saveLoginData({
        ...userAuth,
        ...loginData,
        error: loginError,
        started: true
      });
    } else if (authLoaded && !userToken) {
      saveLoginData({ ...userAuth, ...loginData, started: true });
    }
  }, [authLoaded, loginError]);

  useEffect(() => {
    userToken ? startAppWithAuth() : !authLoaded && startLoginApp();
  }, [userToken]);

  function startLoginApp() {
    setTimeout(() => {
      dispatch(loadUserData());
    }, 100);
  }

  function startAppWithAuth() {
    // TODO: Redirect to "/"
    setTimeout(() => false, 100);
  }

  function sendLogin() {
    dispatch(apiLogin(loginData));
  }

  return loginData && loginData.started ? (
    <div id="login-page">
      <LogoHeader />

      <Card className="max-w-500 m-auto">
        <Card.Body header style={{ alignContent: "center" }}>
          <div
            className="h-7 m-7 text-center"
            style={{
              fontSize: 18
            }}
          >
            Please Sign In
          </div>

          <Form>
            {error ? (
              <span
                style={{
                  marginBottom: 10,
                  color: "red"
                }}
              >
                {error}
              </span>
            ) : null}

            <div className="mt-4 mb-4">
              <Form.Label>Enter your Email</Form.Label>
              <Form.Input
                name="email"
                icon="mail"
                position="append"
                placeholder="Email"
                value={email}
                onChange={e => {
                  saveLoginData({
                    ...loginData,
                    email: e.target.value,
                    error: ""
                  });
                }}
              />
            </div>
            <div className="mt-4 mb-4">
              <Form.Label>Enter your Password</Form.Label>
              <Form.Input
                name="password"
                type="password"
                icon="lock"
                position="append"
                placeholder="Password"
                value={password}
                onChange={e => {
                  saveLoginData({
                    ...loginData,
                    password: e.target.value,
                    error: ""
                  });
                }}
              />
            </div>
            <div className="mt-4 mb-4">
              <Form.Switch
                onChange={() => false}
                value="1"
                checked={true}
                label="Save Login"
              />
            </div>

            <Button
              color="primary"
              type="button"
              disabled={!email || !password}
              className="mt-5 w-100"
              onClick={sendLogin}
            >
              <span>Sign In</span>
            </Button>
          </Form>
        </Card.Body>

        <Card.Body className="text-center">
          <span>Or</span>
        </Card.Body>

        <Card.Body className="justify-content-center">
          <Link className="btn btn-info mt-3" to="/retrieve-password">
            <span>Retrieve password</span>
          </Link>
          <Link className="btn btn-info mt-3 float-right" to="/signup">
            <span>Create Account</span>
          </Link>
        </Card.Body>
      </Card>
    </div>
  ) : (
    <Loading size="large" style={{ marginTop: 100 }} />
  );
};
