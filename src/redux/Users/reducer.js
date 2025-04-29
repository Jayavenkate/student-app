import {
  DELETE_USERS_BEGIN,
  DELETE_USERS_ERROR,
  DELETE_USERS_SUCCESS,
  GET_USERS_BEGIN,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
  PUT_USERS_BEGIN,
  PUT_USERS_ERROR,
  PUT_USERS_SUCCESS,
} from "./actionCreator";

const initState = {
  loading: false,
  error: null,
  users: [],
};

const UsersReducer = (state = initState, action) => {
  const { type, err } = action;
  switch (type) {
    case GET_USERS_BEGIN:
    case PUT_USERS_BEGIN:
    case DELETE_USERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_USERS_SUCCESS:
      // console.log(GET_USERS_SUCCESS, action.payload);

      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case PUT_USERS_SUCCESS:
      // console.log(PUT_USERS_SUCCESS, action.payload);

      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case DELETE_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case GET_USERS_ERROR:
    case PUT_USERS_ERROR:
    case DELETE_USERS_ERROR:
      // console.log(CREATE_USERS_ERROR, action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
export default UsersReducer;
