import Cookies from "js-cookie";

export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERR = "LOGIN_ERR";

export const LOGOUT_BEGIN = "LOGOUT_BEGIN";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERR = "LOGOUT_ERR";

export const logoutBegin = (payload) => ({
  type: LOGOUT_BEGIN,
  payload,
});
export const logoutSuccess = (payload) => ({
  type: LOGOUT_SUCCESS,
  payload,
});
export const logoutErr = (payload) => ({
  type: LOGOUT_ERR,
  payload,
});

export const loginBegin = (payload) => ({
  type: LOGIN_BEGIN,
  payload,
});

export const loginSuccess = (payload) => {
  // console.log(payload);
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const loginErr = (payload) => ({
  type: LOGIN_ERR,
  payload,
});

export const logout = () => {
  return async (dispatch) => {
    try {
      // Remove the cookies
      Cookies.remove("access_token");
      Cookies.remove("isLoggedIn");
      Cookies.remove("username");

      // Dispatch a logout success action
      dispatch(logoutSuccess());

      // console.log("Logout successful and cookies cleared.");
    } catch (err) {
      // console.error("Logout error:", err);
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(loginBegin()); // Trigger login request

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json(); // Parse the JSON response once

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Dispatch success action
      dispatch(loginSuccess(data));

      // Optionally, store the tokens in cookies/localStorage
      Cookies.set("access_token", data.access);
      Cookies.set("isLoggedIn", true);
      Cookies.set("username", data.user.username);
      Cookies.set("userId", data.user.id);

      return data; // Return the parsed data directly
    } catch (err) {
      dispatch(loginErr("An error occurred during login"));
      // console.error("Login error:", err);
      throw err; // Rethrow error to propagate it to the handleSubmit
    }
  };
};

export const autoLogin = () => {
  return (dispatch) => {
    const username = Cookies.get("username");
    const userId = Cookies.get("userId");

    if (userId) {
      dispatch(loginSuccess({ username, userId })); // Just set username
    }
  };
};
