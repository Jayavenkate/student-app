import {
  LOGIN_BEGIN,
  LOGIN_ERR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "./actionCreator";

const initState = {
  loading: false,
  error: null,
  username: "",
  role: "",
  email: "",
  userId: "",
};

const LoginReducer = (state = initState, action) => {
  const { type, err } = action;
  switch (type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      // console.log(LOGIN_SUCCESS, action.payload);

      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        username: action.payload.username,
        role: action.payload.role,
        email: action.payload.email,
        userId: action.payload.id,
      };
    case LOGOUT_SUCCESS:
      // console.log("isLoggedIn", action.payload);
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        username: "",
        userId: "",
      };
    case LOGIN_ERR:
      // console.log(LOGIN_ERR, action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default LoginReducer;
