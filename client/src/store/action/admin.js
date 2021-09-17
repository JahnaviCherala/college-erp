import * as API from "../api/admin";
import adminActionTypes from "../constants/admin";

export const adminLogin = (form) => async (dispatch) => {
  try {
    const response = await API.adminLogin(form);

    dispatch({
      type: adminActionTypes.ADMIN_LOGIN_SUCCESS,
      payload: {
        user: response.data.admin,
        type: "Admin",
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
      type: adminActionTypes.ADMIN_LOGIN_FAIL,
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

export const adminRegister = (form) => async (dispatch) => {
  try {
    const response = await API.adminRegister(form);

    dispatch({
      type: adminActionTypes.ADMIN_REGISTER_SUCCESS,
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
      type: adminActionTypes.ADMIN_REGISTER_FAIL,
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
