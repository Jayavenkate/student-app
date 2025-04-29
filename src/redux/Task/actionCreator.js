export const CREATE_TASK_BEGIN = "CREATE_TASK_BEGIN";
export const CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS";
export const CREATE_TASK_ERROR = "CREATE_TASK_ERROR";

export const GET_TASK_BEGIN = "GET_TASK_BEGIN";
export const GET_TASK_SUCCESS = "GET_TASK_SUCCESS";
export const GET_TASK_ERROR = "GET_TASK_ERROR";

export const PUT_TASK_BEGIN = "PUT_TASK_BEGIN";
export const PUT_TASK_SUCCESS = "PUT_TASK_SUCCESS";
export const PUT_TASK_ERROR = "PUT_TASK_ERROR";

export const DELETE_TASK_BEGIN = "DELETE_TASK_BEGIN";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_ERROR = "DELETE_TASK_ERROR";

export const SUBMIT_MARKS_BEGIN = "SUBMIT_MARKS_BEGIN";
export const SUBMIT_MARKS_SUCCESS = "SUBMIT_MARKS_SUCCESS";
export const SUBMIT_MARKS_FAILURE = "SUBMIT_MARKS_FAILURE";

export const GET_MARKS_BEGIN = "GET_MARKS_BEGIN";
export const GET_MARKS_SUCCESS = "GET_MARKS_SUCCESS";
export const GET_MARKS_FAILURE = "GET_MARKS_FAILURE";
export const GET_NAME = "GET_NAME";

export const getMarksBegin = (payload) => ({
  type: GET_MARKS_BEGIN,
  payload,
});

export const getMarksSuccess = (payload) => ({
  type: GET_MARKS_SUCCESS,
  payload,
});
export const getmarksError = (payload) => ({
  type: GET_MARKS_FAILURE,
  payload,
});

export const submitTaskBegin = (payload) => ({
  type: SUBMIT_MARKS_BEGIN,
  payload,
});

export const submitTaskSuccess = (payload) => ({
  type: SUBMIT_MARKS_SUCCESS,
  payload,
});
export const submitTaskError = (payload) => ({
  type: SUBMIT_MARKS_FAILURE,
  payload,
});

export const getname = (payload) => ({
  type: GET_NAME,
  payload,
});

export const deleteTaskBegin = (payload) => ({
  type: DELETE_TASK_BEGIN,
  payload,
});

export const deleteTaskSuccess = (payload) => ({
  type: DELETE_TASK_SUCCESS,
  payload,
});
export const deleteTaskError = (payload) => ({
  type: DELETE_TASK_ERROR,
  payload,
});
export const putTaskBegin = (payload) => ({
  type: PUT_TASK_BEGIN,
  payload,
});

export const putTaskSuccess = (payload) => ({
  type: PUT_TASK_SUCCESS,
  payload,
});
export const putTaskError = (payload) => ({
  type: PUT_TASK_ERROR,
  payload,
});
export const createTaskBegin = (payload) => ({
  type: PUT_TASK_BEGIN,
  payload,
});

export const createTaskSuccess = (payload) => ({
  type: CREATE_TASK_SUCCESS,
  payload,
});
export const createTaskError = (payload) => ({
  type: CREATE_TASK_ERROR,
  payload,
});

export const getTaskBegin = (payload) => ({
  type: GET_TASK_BEGIN,
  payload,
});

export const getTaskSuccess = (payload) => ({
  type: GET_TASK_SUCCESS,
  payload,
});
export const getTaskError = (payload) => ({
  type: GET_TASK_ERROR,
  payload,
});

export const postTask = (payload) => {
  return async (dispatch) => {
    dispatch(createTaskBegin());
    try {
      const response = await fetch("/api/createtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201 || response.status === 200) {
        const data = await response.json();
        // console.log("data", data);
        dispatch(createTaskSuccess(data));
        return data;
      } else {
        dispatch(createTaskError("Unexpected response from server"));
      }
    } catch (error) {
      dispatch(createTaskError(error.message));
    }
  };
};

export const getTasks = () => {
  return async (dispatch) => {
    dispatch(getTaskBegin());

    try {
      const response = await fetch("/api/gettask", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        dispatch(getTaskSuccess(data));
        return data;
      } else {
        dispatch(getTaskError("Unexpected response from server"));
      }
    } catch (error) {
      dispatch(getTaskError(error.message));
    }
  };
};

export const updateTasks = (payload) => {
  return async (dispatch) => {
    dispatch(putTaskBegin());

    try {
      const { id, ...updateData } = payload; // 👈 separate id and rest of the data

      const response = await fetch(`/api/updatetask/${id}`, {
        // 👈 id in URL
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData), // 👈 only send update data (not id)
      });

      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        dispatch(putTaskSuccess(payload));
        return data;
      } else {
        dispatch(putTaskError("Unexpected response from server"));
      }
    } catch (error) {
      dispatch(putTaskError(error.message));
    }
  };
};

export const deletetask = (id) => {
  return async (dispatch) => {
    dispatch(deleteTaskBegin());

    try {
      const response = await fetch(`/api/deletetask/${id}`, {
        method: "DELETE",
      });

      if (response.status === 204 || response.status === 200) {
        dispatch(deleteTaskSuccess(id));
        return response;
      } else {
        dispatch(deleteTaskError("Unexpected response from server"));
      }
    } catch (error) {
      dispatch(deleteTaskError(error.message));
    }
  };
};
export const getMarks = () => {
  return async (dispatch) => {
    dispatch(getMarksBegin());

    try {
      const response = await fetch("/api/getmarks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        dispatch(getMarksSuccess(data));
        return data;
      } else {
        dispatch(getmarksError("Unexpected response from server"));
      }
    } catch (error) {
      dispatch(getmarksError(error.message));
    }
  };
};
export const submitMarks = (payload) => {
  // console.log("payload", payload);
  return async (dispatch) => {
    dispatch(submitTaskBegin());
    try {
      const response = await fetch("/api/submittask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201 || response.status === 200) {
        const data = await response.json();
        // console.log("data", data);
        dispatch(submitTaskSuccess(data));
        // dispatch(getMarks());
        return data;
      } else {
        dispatch(submitTaskError("Unexpected response from server"));
      }
    } catch (error) {
      dispatch(submitTaskError(error.message));
    }
  };
};

export const getCompleteList = () => {
  return async (dispatch) => {
    dispatch(getMarksBegin());

    try {
      const response = await fetch("/api/completedlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        dispatch(getMarksSuccess(data));
        return data;
      } else {
        dispatch(getmarksError("Unexpected response from server"));
      }
    } catch (error) {
      dispatch(getmarksError(error.message));
    }
  };
};
