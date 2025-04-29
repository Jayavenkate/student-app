export const GET_USERS_BEGIN = "GET_USERS_BEGIN";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";

export const PUT_USERS_BEGIN = "PUT_USERS_BEGIN";
export const PUT_USERS_SUCCESS = "PUT_USERS_SUCCESS";
export const PUT_USERS_ERROR = "PUT_USERS_ERROR";

export const DELETE_USERS_BEGIN = "DELETE_USERS_BEGIN";
export const DELETE_USERS_SUCCESS = "DELETE_USERS_SUCCESS";
export const DELETE_USERS_ERROR = "DELETE_USERS_ERROR";

export const deleteUSERSBegin = (payload) => ({
  type: DELETE_USERS_BEGIN,
  payload,
});

export const deleteUSERSSuccess = (payload) => ({
  type: DELETE_USERS_SUCCESS,
  payload,
});
export const deleteUSERSError = (payload) => ({
  type: DELETE_USERS_ERROR,
  payload,
});
export const putUSERSBegin = (payload) => ({
  type: PUT_USERS_BEGIN,
  payload,
});

export const putUSERSSuccess = (payload) => ({
  type: PUT_USERS_SUCCESS,
  payload,
});
export const putUSERSError = (payload) => ({
  type: PUT_USERS_ERROR,
  payload,
});
export const createUSERSBegin = (payload) => ({
  type: PUT_USERS_BEGIN,
  payload,
});

export const createUSERSSuccess = (payload) => ({
  type: CREATE_USERS_SUCCESS,
  payload,
});
export const createUSERSError = (payload) => ({
  type: CREATE_USERS_ERROR,
  payload,
});

export const getUSERSBegin = (payload) => ({
  type: GET_USERS_BEGIN,
  payload,
});

export const getUSERSSuccess = (payload) => ({
  type: GET_USERS_SUCCESS,
  payload,
});
export const getUSERSError = (payload) => ({
  type: GET_USERS_ERROR,
  payload,
});

export const getusers = () => {
  return async (dispatch) => {
    dispatch(getUSERSBegin());

    try {
      const response = await fetch("/api/getusers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        dispatch(getUSERSSuccess(data));
        return data;
      } else {
        dispatch(getUSERSError("Unexpected response from server"));
      }
    } catch (error) {
      dispatch(getUSERSError(error.message));
    }
  };
};

export const updateUsers = (id) => {
  // console.log("payload", id);
  return async (dispatch) => {
    dispatch(putUSERSBegin());

    try {
      // 👈 separate id and rest of the data

      const response = await fetch(`/api/updateUser/${id}`, {
        // 👈 id in URL
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // 👈 only send update data (not id)
      });

      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        dispatch(putUSERSSuccess(data));
        return data;
      } else {
        dispatch(putUSERSError("Unexpected response from server"));
      }
    } catch (error) {
      dispatch(putUSERSError(error.message));
    }
  };
};

// export const deleteUSERS = (id) => {
//   return async (dispatch) => {
//     dispatch(deleteUSERSBegin());

//     try {
//       const response = await fetch(`/api/deleteUSERS/${id}`, {
//         method: "DELETE",
//       });

//       if (response.status === 204 || response.status === 200) {
//         dispatch(deleteUSERSSuccess(id));
//         return response;
//       } else {
//         dispatch(deleteUSERSError("Unexpected response from server"));
//       }
//     } catch (error) {
//       dispatch(deleteUSERSError(error.message));
//     }
//   };
// };
