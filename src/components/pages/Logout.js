import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { apiLogout } from "../../store/actions";
import Loading from "../presentations/Loading";

export default ({ history }) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector(state => state);
  const { token: userToken, loaded: authLoaded = false } = userAuth;

  if (authLoaded && !userToken) {
    history.push("/login");
  }

  dispatch(apiLogout());

  return <Loading />;
};
