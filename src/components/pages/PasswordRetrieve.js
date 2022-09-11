import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Button } from "tabler-react";
import { Link } from "react-router-dom";

import { apiRetrievePassword } from "../../store/actions";
import Loading from "../presentations/Loading";
import LogoHeader from "../presentations/LogoHeader";

export default () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state);
  const {
    passwordRetrievedError,
    passwordRetrievedMessage,
    loaded: authLoaded = false,
  } = userAuth;
  const [loginData, saveLoginData] = useState({ started: true });
  const { email = "", message = "", error } = loginData;

  useEffect(() => {
    if (passwordRetrievedError) {
      saveLoginData({
        ...loginData,
        error: passwordRetrievedError,
        started: authLoaded,
      });
    } else if (passwordRetrievedMessage) {
      saveLoginData({
        ...loginData,
        message: passwordRetrievedMessage,
        started: authLoaded,
      });
    } else if (authLoaded) {
      saveLoginData({ ...loginData, started: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoaded, passwordRetrievedError, passwordRetrievedMessage]);

  function sendPasswordRetrieve() {
    saveLoginData({
      ...loginData,
      started: false,
    });
    dispatch(apiRetrievePassword(loginData));
  }

  return loginData && loginData.started ? (
    <div id="login-page" className="page-height">
      <Link to="/">
        <LogoHeader />
      </Link>

      <Card className="max-w-500 m-auto">
        <Card.Body header style={{ alignContent: "center" }}>
          <div
            className="h-7 m-7 text-center"
            style={{
              fontSize: 18,
            }}
          >
            Password Retrieve
          </div>
          <Form>
            {error ? <span className="text-danger">{error}</span> : null}
            {message ? (
              <span className="text-success">{message}</span>
            ) : (
              <>
                <div className="mt-4 mb-4">
                  <Form.Label>Enter your Email</Form.Label>
                  <Form.Input
                    name="email"
                    icon="mail"
                    position="append"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      saveLoginData({
                        ...loginData,
                        email: e.target.value,
                        error: "",
                      });
                    }}
                  />
                </div>
                <Button
                  color="info"
                  type="button"
                  disabled={!email}
                  className="mt-5 w-100"
                  onClick={sendPasswordRetrieve}
                >
                  <span>Submit Now</span>
                </Button>
              </>
            )}
          </Form>
        </Card.Body>
        <Card.Body className="text-center">
          <span>Or </span>
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
