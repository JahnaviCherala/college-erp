import studentActionTypes from "../constants/student";
import teacherActionTypes from "../constants/teacher";
import adminActionTypes from "../constants/admin";
import otherActionTypes from "../constants/rest";

const locallyStored = localStorage.getItem("profile")
  ? localStorage.getItem("profile")
  : {
      user: null,
      token: null,
      isAuthenticated: false,
      type: null,
      errorMessage: null,
      successMessage: null,
    };

const initialState = {
  user: locallyStored.user,
  token: locallyStored.token,
  isAuthenticated: locallyStored.isAuthenticated,
  type: locallyStored.type,
  errorMessage: locallyStored.errorMessage,
  successMessage: locallyStored.successMessage,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case studentActionTypes.STUDENT_LOGIN_SUCCESS:
      localStorage.setItem("profile", action.payload);
      return action.payload;

    case studentActionTypes.STUDENT_LOGIN_FAIL:
      return action.payload;

    case studentActionTypes.STUDENT_REGISTER_SUCCESS:
      return action.payload;

    case studentActionTypes.STUDENT_REGISTER_FAIL:
      return action.payload;

    case teacherActionTypes.TEACHER_LOGIN_SUCCESS:
      localStorage.setItem("profile", action.payload);
      return action.payload;

    case teacherActionTypes.TEACHER_LOGIN_FAIL:
      return action.payload;

    case teacherActionTypes.TEACHER_REGISTER_SUCCESS:
      return action.payload;

    case teacherActionTypes.TEACHER_REGISTER_FAIL:
      return action.payload;

    case adminActionTypes.ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("profile", action.payload);
      return action.payload;

    case adminActionTypes.ADMIN_LOGIN_FAIL:
      return action.payload;

    case adminActionTypes.ADMIN_REGISTER_SUCCESS:
      return action.payload;

    case adminActionTypes.ADMIN_REGISTER_FAIL:
      return action.payload;

    case otherActionTypes.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: null,
      };

    case otherActionTypes.CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: null,
      };

    default:
      return state;
  }
};

export default userReducer;
