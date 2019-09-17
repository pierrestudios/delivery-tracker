import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Icon, Form, Button } from "tabler-react";

import { apiLogin, loadUserData } from "../../store/actions";
import Logo from "../presentations/Logo";

const Loading = () => {
  return <div>Loading...</div>;
};

export default props => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector(state => state);
  const { token: userToken, loginError, loaded: authLoaded = false } = userAuth;
  const [loginData, saveLoginData] = useState({ ...userAuth, started: true });
  const { email, password, error } = loginData;

  useEffect(() => {
    // TODO: If "Save Login" is checked, spread ${userAuth} in saveLoginData fn
    if (loginError) {
      saveLoginData({
        ...userAuth,
        ...loginData,
        error: loginError,
        started: authLoaded
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
    // Note: use "setTimeout" to avoid error: "can't perform a react state update on an unmounted component"
    setTimeout(() => false, 100);
  }

  function sendLogin() {
    dispatch(apiLogin(loginData));
  }

  return loginData && loginData.started ? (
    <div id="login-page">
      <div className="m-3 h-7 m-7 text-center">
        <Logo />
      </div>

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

            <div
              style={{
                borderWidth: 1,
                paddingTop: 10,
                paddingBottom: 7,
                ...props.style,
                ...(error ? { borderColor: "red", borderWidth: 1 } : null)
              }}
            >
              <Form.Label>Enter your Email</Form.Label>
              <Form.Input
                name="email"
                placeholder="Email"
                defaultValue={email}
                onChange={e => {
                  saveLoginData({
                    ...loginData,
                    email: e.target.value,
                    error: ""
                  });
                }}
              />
              <Icon
                name="md-person"
                style={[
                  {
                    color: "#999"
                  },
                  { ...(error ? { color: "red" } : null) }
                ]}
              />
            </div>
            <div
              style={{
                borderWidth: 1,
                paddingTop: 10,
                paddingBottom: 7,

                ...props.style,
                ...(error ? { borderColor: "red", borderWidth: 1 } : null)
              }}
            >
              <Form.Label>Enter your Password</Form.Label>
              <Form.Input
                name="password"
                type="password"
                placeholder="Password"
                defaultValue={password}
                onChange={e => {
                  saveLoginData({
                    ...loginData,
                    password: e.target.value,
                    error: ""
                  });
                }}
              />
              <Icon
                name="ios-key"
                style={[
                  {
                    color: "#999"
                  },
                  { ...(error ? { color: "red" } : null) }
                ]}
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
          <Button
            color="info"
            className="mt-3"
            onClick={
              () => false // navigation.navigate("PasswordRetrieve")
            }
          >
            <span>Retrieve password</span>
          </Button>
          <Button
            color="info"
            className="mt-3 float-right"
            onClick={
              () => false // navigation.navigate("Signup")
            }
          >
            <span>Create Account</span>
          </Button>
        </Card.Body>
      </Card>
    </div>
  ) : (
    <Loading size="large" style={{ marginTop: 100 }} />
  );
};
