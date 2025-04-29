import {
  CREATE_TASK_BEGIN,
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_BEGIN,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  GET_MARKS_BEGIN,
  GET_MARKS_FAILURE,
  GET_MARKS_SUCCESS,
  GET_NAME,
  GET_TASK_BEGIN,
  GET_TASK_ERROR,
  GET_TASK_SUCCESS,
  PUT_TASK_BEGIN,
  PUT_TASK_ERROR,
  PUT_TASK_SUCCESS,
  SUBMIT_MARKS_BEGIN,
  SUBMIT_MARKS_FAILURE,
  SUBMIT_MARKS_SUCCESS,
} from "./actionCreator";

const initState = {
  loading: false,
  error: null,
  task: [],
  getNameByFilter: [],
  marks: null,
  totalscore: null,
};

const TaskReducer = (state = initState, action) => {
  const { type, err } = action;
  switch (type) {
    case CREATE_TASK_BEGIN:
    case GET_TASK_BEGIN:
    case PUT_TASK_BEGIN:
    case DELETE_TASK_BEGIN:
    case SUBMIT_MARKS_BEGIN:
    case GET_MARKS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_TASK_SUCCESS:
      // console.log(CREATE_TASK_SUCCESS, action.payload);

      return {
        ...state,
        loading: false,
        task: [...state.task, action.payload],
      };
    case GET_NAME:
      return {
        ...state,
        loading: false,
        getNameByFilter: action.payload,
      };
    // case SUBMIT_MARKS_SUCCESS:
    //   console.log(SUBMIT_MARKS_SUCCESS, action.payload);
    //   return {
    //     ...state,

    //     marks: action.payload,
    //     error: null,
    //   };
    case SUBMIT_MARKS_SUCCESS:
      // console.log(SUBMIT_MARKS_SUCCESS, action.payload);
      // Check if payload is an object, and convert to array if it is
      const marksArray = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      // console.log("marksArray", marksArray);
      return {
        ...state,
        marks: marksArray,
        error: null,
      };

    case GET_TASK_SUCCESS:
      // console.log(GET_TASK_SUCCESS, action.payload);

      return {
        ...state,
        loading: false,
        task: action.payload,
      };

    // case GET_MARKS_SUCCESS:
    //   // console.log(GET_MARKS_SUCCESS, action.payload);

    //   return {
    //     ...state,
    //     loading: false,
    //     marks: action.payload,
    //   };
    case GET_MARKS_SUCCESS:
      // console.log(GET_MARKS_SUCCESS, action.payload);
      // Check if payload is an object, and convert to array if it is
      const marksSuccessArray = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      // console.log("marksSuccessArray", marksSuccessArray);

      return {
        ...state,
        loading: false,
        marks: marksSuccessArray,
      };
    case PUT_TASK_SUCCESS:
      // console.log(PUT_TASK_SUCCESS, action.payload);

      return {
        ...state,
        loading: false,
        task: state.task.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        task: state.task.filter((t) => t.id !== action.payload),
      };
    case CREATE_TASK_ERROR:
    case GET_TASK_ERROR:
    case PUT_TASK_ERROR:
    case DELETE_TASK_ERROR:
    case SUBMIT_MARKS_FAILURE:
    case GET_MARKS_FAILURE:
      // console.log(CREATE_TASK_ERROR, action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
export default TaskReducer;
