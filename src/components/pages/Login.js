import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "tabler-react";
import { Link } from "react-router-dom";

import { apiLogin, loadUserData } from "../../store/actions";
import Loading from "../presentations/Loading";
import LogoHeader from "../presentations/LogoHeader";
import LoginForm from "../presentations/LoginForm";

export default () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state);
  const {
    token: userToken,
    isLoggingIn,
    loginError,
    loaded: authLoaded = false,
  } = userAuth;
  const [loginData, setLoginData] = useState({ ...userAuth, isLoading: true });
  const { isLoading } = loginData;

  useEffect(() => {
    if (loginError) {
      setLoginData({
        ...userAuth,
        ...loginData,
        error: loginError,
        isLoading: false,
      });
    } else if (authLoaded && !userToken) {
      setLoginData({ ...userAuth, ...loginData, isLoading: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoaded, loginError]);

  useEffect(() => {
    userToken ? startAppWithAuth() : !authLoaded && startLoginApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  useEffect(() => {
    setLoginData({
      ...userAuth,
      ...loginData,
      error: loginError,
      isLoading: isLoggingIn,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggingIn]);

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
    setLoginData({
      ...loginData,
      error: "",
      isLoading: true,
    });
    dispatch(apiLogin(loginData));
  }

  return (
    <div id="login-page" className="page-height">
      <Link to="/">
        <LogoHeader />
      </Link>

      {isLoading ? (
        <div id="login-page" className="page-height">
          <Loading size="large" style={{ marginTop: 100 }} />
        </div>
      ) : (
        <Card className="max-w-500 m-auto">
          <Card.Body header style={{ alignContent: "center" }}>
            <div
              className="h-7 m-7 text-center"
              style={{
                fontSize: 18,
              }}
            >
              Please Sign In
            </div>
            <LoginForm
              {...{
                loginData,
                sendLogin,
                setLoginData,
              }}
            />
          </Card.Body>
          <Card.Body className="text-center">
            <span>Or</span>
          </Card.Body>
          <Card.Body className="justify-content-center">
            <Link className="btn btn mt-3" to="/retrieve-password">
              <span>Retrieve password</span>
            </Link>
            <Link className="btn btn mt-3 float-right" to="/signup">
              <span>Create Account</span>
            </Link>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
