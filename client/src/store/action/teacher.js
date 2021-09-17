import * as API from "../api/teacher";
import teacherActionTypes from "../constants/teacher";

export const teacherLogin = (form) => async (dispatch) => {
  try {
    const response = await API.teacherLogin(form);

    dispatch({
      type: teacherActionTypes.TEACHER_LOGIN_SUCCESS,
      payload: {
        user: response.data.teacher,
        type: "Teacher",
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
      type: teacherActionTypes.TEACHER_LOGIN_FAIL,
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

export const teacherRegister = (form) => async (dispatch) => {
  try {
    const response = await API.teacherRegister(form);

    dispatch({
      type: teacherActionTypes.TEACHER_REGISTER_SUCCESS,
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
      type: teacherActionTypes.TEACHER_REGISTER_FAIL,
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
