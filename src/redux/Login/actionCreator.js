import Cookies from "js-cookie";

export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERR = "LOGIN_ERR";

export const LOGOUT_BEGIN = "LOGOUT_BEGIN";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERR = "LOGOUT_ERR";

export const clearLoginError = () => ({
  type: "CLEAR_LOGIN_ERROR",
});


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
      Cookies.remove("token");
      Cookies.remove("isLoggedIn");
      Cookies.remove("username");
      Cookies.remove("role");
      Cookies.remove("userId");
      // Dispatch a logout success action
      dispatch(logoutSuccess());

      // console.log("Logout successful and cookies cleared.");
    } catch (err) {
      // console.error("Logout error:", err);
    }
  };
};

// export const login = (username, password) => {
//   return async (dispatch) => {
//     dispatch(loginBegin());

//     try {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await res.json();
//       console.log("data", data);
//       if (data) {
//         Cookies.set("isLoggedIn", true);
//         Cookies.set("username", data.user.username);
//         Cookies.set("userId", data.user.id);
//         Cookies.set("role", data.user.role);

//         dispatch(loginSuccess(data));
//         return data;
//       } else {
//         dispatch(loginErr(data.error));
//         // throw new Error("Failed to login");
//       }
//     } catch (error) {
//       console.error("Login error:", error.message);
//       // console.error("Login error:", error.response?.data?.message);
//       // dispatch(loginErr(data.error));
//       console.error("Login error:", error.message); // Log in console
//       dispatch(loginErr(error.message));
//     }
//   };
// };
export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(loginBegin());

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json(); // Always try to parse the response

      if (!res.ok) {
        throw new Error(data.error || "Failed to login");
      }

      Cookies.set("isLoggedIn", true);
      Cookies.set("username", data.user.username);
      Cookies.set("userId", data.user.id);
      Cookies.set("role", data.user.role);

      dispatch(loginSuccess(data));
      return data;
    } catch (error) {
      // console.error("Login error:", error.message); // Log in console
      dispatch(loginErr(error.message)); // Send error string to reducer
    }
  };
};

export const autoLogin = () => {
  return (dispatch) => {
    const username = Cookies.get("username");
    const userId = Cookies.get("userId");
    const role = Cookies.get("role");

    if (userId) {
      dispatch(loginSuccess({ username, userId, role })); // Just set username
    }
  };
};
