import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Button } from "tabler-react";

import { saveUserData, loadUserData } from "../../store/actions";
import Loading from "../presentations/Loading";

import { formatPhone, getFirstAndLastName } from "../../common/utils";

export default () => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector(state => state);
  const {
    name,
    isSaving,
    userDataError,
    userDataSaved = false,
    token: userToken,
    loaded: authLoaded = false
  } = userAuth;
  const [userData, setUserData] = useState({
    ...userAuth,
    userDataSaved,
    started: true
  });
  const {
    firstName: savedFirstName,
    lastName: savedLastName
  } = getFirstAndLastName(name);
  const {
    firstName = savedFirstName,
    lastName = savedLastName,
    email,
    phone,
    error
  } = userData;

  useEffect(() => {
    if (userDataError) {
      setUserData({
        ...userAuth,
        ...userData,
        error: userDataError,
        started: authLoaded
      });
    } else if (!authLoaded) {
      startProfileApp();
    } else {
      setUserData({ ...userAuth, ...userData, userDataSaved, error: "" });
    }
  }, [authLoaded, userDataError, userDataSaved, isSaving]);

  function startProfileApp() {
    setTimeout(() => {
      dispatch(loadUserData());
    }, 100);
  }

  function saveData() {
    const {
      firstName: savedFirstName,
      lastName: savedLastName
    } = getFirstAndLastName(userData.name);
    const { firstName = savedFirstName, lastName = savedLastName } = userData;

    dispatch(saveUserData({ ...userData, name: `${firstName} ${lastName}` }));
  }

  if (authLoaded && !userToken) {
    return <Redirect to={"/login"} />;
  }

  return userData && userData.started ? (
    <div id="profile-page" className="page-height">
      <Card className="max-w-500 m-auto">
        <Card.Body header style={{ alignContent: "center" }}>
          <div
            className="h-7 m-7 text-center"
            style={{
              fontSize: 18
            }}
          >
            Update My Profile
          </div>

          <Form>
            {error ? <span className="text-danger">{error}</span> : null}

            <div className="mt-4 mb-4">
              <Form.Label>Your email</Form.Label>
              <Form.Input
                placeholder="Email"
                value={email}
                readOnly={true}
                onChange={() => {}}
              />
            </div>

            <div className="mt-4 mb-4">
              <Form.Label>Your first name</Form.Label>
              <Form.Input
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={e => {
                  setUserData({
                    ...userData,
                    firstName: e.target.value,
                    error: ""
                  });
                }}
              />
            </div>

            <div className="mt-4 mb-4">
              <Form.Label>Your last name</Form.Label>
              <Form.Input
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={e => {
                  setUserData({
                    ...userData,
                    lastName: e.target.value,
                    error: ""
                  });
                }}
              />
            </div>

            <div className="mt-4 mb-4">
              <Form.Label>Your phone</Form.Label>
              <Form.Input
                name="phone"
                placeholder="Phone"
                value={phone}
                onChange={e => {
                  setUserData({
                    ...userData,
                    phone: formatPhone(e.target.value),
                    error: ""
                  });
                }}
              />
            </div>

            <Button
              color="primary"
              type="button"
              disabled={!email || isSaving}
              className="mt-5 w-100"
              onClick={saveData}
            >
              <span>Save Profile</span>
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  ) : (
    <Loading style={{ marginTop: 100 }} />
  );
};
