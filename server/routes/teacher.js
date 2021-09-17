import express from "express";

import { addTeacher } from "../controllers/admin.js";
import {
  getStudents,
  addAttendance,
  addMarks,
  getMarks,
  login,
} from "../controllers/teacher.js";
import {
  isYearSemesterValid,
  isAttendanceValid,
  isMarkValid,
  isTestValid,
  isRegistrationValid,
} from "../middleware/validation.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", isRegistrationValid, addTeacher);

router.post("/get-students", isYearSemesterValid, getStudents);

router.post("/add-attendance", isAttendanceValid, addAttendance);

router.post("/add-marks", isMarkValid, addMarks);

router.post("/get-marks", isTestValid, getMarks);

export default router;
