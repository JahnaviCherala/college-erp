import * as API from "../api/student";
import studentActionTypes from "../constants/student";

export const studentLogin = (form) => async (dispatch) => {
  try {
    const response = await API.studentLogin(form);

    dispatch({
      type: studentActionTypes.STUDENT_LOGIN_SUCCESS,
      payload: {
        user: response.data.student,
        type: "Student",
        isAuthenticated: true,
        token: response.data.token,
        errorMessage: null,
        successMessage: null,
      },
    });
  } catch (error) {
    let message = error.message;
    if (error?.response?.data?.message) message = error.response.data.message;

    dispatch({
      type: studentActionTypes.STUDENT_LOGIN_FAIL,
      payload: {
        user: null,
        type: null,
        isAuthenticated: false,
        token: null,
        errorMessage: message,
        successMessage: null,
      },
    });
  }
};

export const studentRegister = (form) => async (dispatch) => {
  try {
    const response = await API.studentRegister(form);

    dispatch({
      type: studentActionTypes.STUDENT_REGISTER_SUCCESS,
      payload: {
        user: null,
        type: null,
        isAuthenticated: false,
        token: null,
        errorMessage: null,
        successMessage: response.data.message,
      },
    });
  } catch (error) {
    let message = error.message;
    if (error?.response?.data?.message) message = error.response.data.message;

    dispatch({
      type: studentActionTypes.STUDENT_REGISTER_FAIL,
      payload: {
        user: null,
        type: null,
        isAuthenticated: false,
        token: null,
        errorMessage: message,
        successMessage: null,
      },
    });
  }
};
