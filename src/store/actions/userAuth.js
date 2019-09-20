import {
  SAVE_USER_DATA,
  LOAD_USER_DATA,
  LOADING_USER_DATA,
  SAVING_USER_DATA,
  LOGIN_USER,
  LOGGING_IN_USER
} from "./types";
import { apiPostRequest, apiUnAuthPost } from "../../common/api";

export function loadUserData() {
  return async (dispatch, getState) => {
    // await localStorage.removeItem("userData");
    const savedUserData = await localStorage.getItem("userData");
    const { userAuth } = getState();

    dispatch({
      type: LOADING_USER_DATA,
      payload: { ...userAuth, isLoading: true }
    });

    if (!savedUserData) {
      return dispatch({
        type: LOAD_USER_DATA,
        payload: { loaded: true, isLoading: false }
      });
    }

    const userData = JSON.parse(savedUserData);
    const { token } = userData;
    const authenticated = await apiUnAuthPost("validate", { token }).catch(
      () => false
    );

    if (!authenticated) {
      // await localStorage.removeItem("userData");
      return dispatch({
        type: LOAD_USER_DATA,
        payload: {
          ...userData,
          loaded: true,
          isLoading: false,
          token: "",
          loginError: "Session has expired"
        }
      });
    }

    dispatch({
      type: LOAD_USER_DATA,
      payload: {
        ...userAuth,
        ...userData,
        ...authenticated,
        loginError: "",
        loaded: true,
        isLoading: false
      } // NOTE: DO NOT MUTATE
    });
  };
}

export function saveUserData({ name, phone }) {
  return async (dispatch, getState) => {
    const { userAuth } = getState();
    const { id, token: userToken } = userAuth;

    dispatch({
      type: SAVING_USER_DATA,
      payload: {
        ...userAuth,
        isSaving: true
      }
    });

    const userSaved = await apiPostRequest(
      "user-data",
      { name, phone },
      userToken
    ).catch(() => false);

    const userAuthData = {
      phone,
      name,
      id,
      isSaving: false,
      userDataSaved: true
    };

    dispatch({
      type: SAVE_USER_DATA,
      payload: userAuthData
    });
  };
}

export function apiLogin({ password, email }) {
  return async (dispatch, getState) => {
    const { userAuth } = getState();

    dispatch({
      type: LOGGING_IN_USER,
      payload: { ...userAuth, isLoggingIn: true, loginError: "", loaded: true }
    });

    const login = await apiUnAuthPost("login", {
      password,
      email
    }).catch(() => false);

    if (!login || !login.token) {
      return dispatch({
        type: LOGIN_USER,
        payload: {
          ...{ ...userAuth, loaded: true, password, email },
          isLoggingIn: false,
          loginError:
            "Login failed. Please check your credentials and try again"
        }
      });
    }

    const userAuthData = {
      ...login,
      password,
      email
    };

    await localStorage.setItem("userData", JSON.stringify(userAuthData));

    dispatch({
      type: LOGIN_USER,
      payload: { ...userAuthData, isLoggingIn: false, loaded: true }
    });
  };
}

export function apiLogout() {
  return async (dispatch, getState) => {
    const { userAuth } = getState();

    if (!userAuth.loaded && !userAuth.isLoading) {
      dispatch(loadUserData());
      setTimeout(() => {
        dispatch(apiLogout());
      }, 2000);
      return;
    }

    const newAuthState = { ...userAuth, token: "" };
    await localStorage.setItem("userData", JSON.stringify(newAuthState));

    return dispatch({
      type: LOGIN_USER,
      payload: {
        ...{ ...newAuthState, loaded: true }
      }
    });
  };
}

export function apiSignup({ password, email }) {
  return async dispatch => {
    const signup = await apiUnAuthPost("signup", { password, email }).catch(
      () => false
    );
    // TODO: Need to get error message for 'The email address is already in use by another account.'

    if (!signup || !signup.token) {
      return dispatch({
        type: SAVE_USER_DATA,
        payload: {
          ...{ password, email },
          signupError:
            "Sign up failed. Please check your credentials and try again"
        }
      });
    }

    const userAuthData = {
      password,
      email,
      token: signup.token,
      id: signup.id
    };
    await localStorage.setItem("userData", JSON.stringify(userAuthData));

    dispatch({
      type: SAVE_USER_DATA,
      payload: userAuthData
    });
  };
}

export function apiRetrievePassword({ email }) {
  return async dispatch => {
    const passwordRetrieved = await apiUnAuthPost("reset-password", {
      email
    }).catch(error => {
      console.log("passwordRetrieved", { error });
      return { error };
    });

    if (passwordRetrieved && passwordRetrieved.error) {
      return dispatch({
        type: SAVE_USER_DATA,
        payload: {
          ...{ email, loaded: true },
          passwordRetrievedError:
            "Password retrieve failed. Please check your credentials and try again"
        }
      });
    }

    const userAuthData = {
      ...{ email, loaded: true },
      passwordRetrievedMessage:
        "Password retrieve successful. A meessage has been sent to your email"
    };

    dispatch({
      type: SAVE_USER_DATA,
      payload: userAuthData
    });
  };
}
