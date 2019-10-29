import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Button } from "tabler-react";
import { Link } from "react-router-dom";

import { isValidEmail } from "../../common/utils";
import { apiSignup, loadUserData } from "../../store/actions";
import Loading from "../presentations/Loading";
import LogoHeader from "../presentations/LogoHeader";

export default () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector(state => state);
  const {
    token: userToken,
    signupError,
    loaded: authLoaded = false
  } = userAuth;
  const [signupData, saveSignupData] = useState({ started: false });
  const { email, password, passwordConfirm, error } = signupData;

  useEffect(() => {
    if (signupError) {
      saveSignupData({
        ...signupData,
        error: signupError,
        started: true
      });
    } else if (authLoaded && !userToken) {
      saveSignupData({ ...signupData, started: true });
    }
  }, [authLoaded, signupError]);

  useEffect(() => {
    userToken ? startAppWithAuth() : !authLoaded && startSignupApp();
  }, [userToken]);

  function startSignupApp() {
    setTimeout(() => {
      dispatch(loadUserData());
    }, 100);
  }

  function startAppWithAuth() {
    // TODO: redirect to  "/"
    setTimeout(() => false, 100);
  }

  function sendSignup() {
    // Validate data
    if (!signupData) {
      return saveSignupData({
        ...signupData,
        error: "Please enter all account information"
      });
    }

    // Validate email and password
    if (!signupData.email || !signupData.password) {
      return saveSignupData({
        ...signupData,
        error: "Please enter account email and password"
      });
    }

    // Validate email is valid
    if (!isValidEmail(signupData.email)) {
      return saveSignupData({
        ...signupData,
        error: "Please enter a valid email"
      });
    }

    // Validate password confirm
    if (
      !signupData.passwordConfirm ||
      !(signupData.password === signupData.passwordConfirm)
    ) {
      return saveSignupData({
        ...signupData,
        error: "Password confirmation doesn't match password"
      });
    }

    saveSignupData({ ...signupData, started: false });

    dispatch(apiSignup(signupData));
  }

  return signupData && signupData.started ? (
    <div id="login-page" className="page-height">
      <Link to="/">
        <LogoHeader />
      </Link>

      <Card className="max-w-500 m-auto">
        <Card.Body header style={{ alignContent: "center" }}>
          <div
            className="h-7 m-7 text-center"
            style={{
              fontSize: 18
            }}
          >
            Create An Account
          </div>

          <Form>
            {error ? <span className="text-danger">{error}</span> : null}

            <div className="mt-4 mb-4">
              <Form.Label>Enter your Email</Form.Label>
              <Form.Input
                name="email"
                icon="mail"
                position="append"
                placeholder="Email"
                value={email}
                onChange={e => {
                  saveSignupData({
                    ...signupData,
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
                defaultValue={password}
                onChange={e => {
                  saveSignupData({
                    ...signupData,
                    password: e.target.value,
                    error: ""
                  });
                }}
              />
            </div>
            <div className="mt-4 mb-4">
              <Form.Label>Confirm your Password</Form.Label>
              <Form.Input
                name="passwordConfirm"
                type="password"
                icon="lock"
                position="append"
                placeholder="Password"
                defaultValue={password}
                onChange={e => {
                  saveSignupData({
                    ...signupData,
                    passwordConfirm: e.target.value,
                    error: ""
                  });
                }}
              />
            </div>

            <Button
              color="info"
              type="button"
              disabled={!email || !password || !passwordConfirm}
              className="mt-5 w-100"
              onClick={sendSignup}
            >
              <span>Create Account</span>
            </Button>
          </Form>
        </Card.Body>

        <Card.Body className="text-center">
          <span>Or, if you have an Account</span>
        </Card.Body>

        <Card.Body className="text-center">
          <Link className="btn btn mt-3 " to="/login">
            <span>Sign In to your Account</span>
          </Link>
        </Card.Body>
      </Card>
    </div>
  ) : (
    <Loading size="large" style={{ marginTop: 100 }} />
  );
};
