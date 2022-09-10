import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "tabler-react";
import { Link } from "react-router-dom";

import { isValidEmail } from "../../common/utils";
import { apiSignup, loadUserData } from "../../store/actions";
import Loading from "../presentations/Loading";
import LogoHeader from "../presentations/LogoHeader";
import SignupForm from "../presentations/SignupForm";

export default () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state);
  const {
    token: userToken,
    signupError,
    loaded: authLoaded = false,
  } = userAuth;
  const [signupData, setSignupData] = useState({ started: false });

  useEffect(() => {
    if (signupError) {
      setSignupData({
        ...signupData,
        error: signupError,
        started: true,
      });
    } else if (authLoaded && !userToken) {
      setSignupData({ ...signupData, started: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoaded, signupError]);

  useEffect(() => {
    userToken ? startAppWithAuth() : !authLoaded && startSignupApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      return setSignupData({
        ...signupData,
        error: "Please enter all account information",
      });
    }

    // Validate email and password
    if (!signupData.email || !signupData.password) {
      return setSignupData({
        ...signupData,
        error: "Please enter account email and password",
      });
    }

    // Validate email is valid
    if (!isValidEmail(signupData.email)) {
      return setSignupData({
        ...signupData,
        error: "Please enter a valid email",
      });
    }

    // Validate password confirm
    if (
      !signupData.passwordConfirm ||
      !(signupData.password === signupData.passwordConfirm)
    ) {
      return setSignupData({
        ...signupData,
        error: "Password confirmation doesn't match password",
      });
    }

    setSignupData({ ...signupData, started: false });
    dispatch(apiSignup(signupData));
  }

  return (
    <div id="login-page" className="page-height">
      <Link to="/">
        <LogoHeader />
      </Link>

      {signupData && signupData.started ? (
        <Card className="max-w-500 m-auto">
          <Card.Body header style={{ alignContent: "center" }}>
            <div
              className="h-7 m-7 text-center"
              style={{
                fontSize: 18,
              }}
            >
              Create An Account
            </div>
            <SignupForm
              {...{
                signupData,
                sendSignup,
                setSignupData,
              }}
            />
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
      ) : (
        <Loading size="large" style={{ marginTop: 100 }} />
      )}
    </div>
  );
};
