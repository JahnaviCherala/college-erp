import express from "express";

import { addStudent } from "../controllers/admin.js";
import {
  checkAttendance,
  checkMarks,
  getSubjects,
  login,
} from "../controllers/student.js";
import {
  isAttendanceForEachStudentValid,
  isRegistrationValid,
  isTestValid,
  isYearSemesterValid,
} from "../middleware/validation.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", isRegistrationValid, addStudent);

router.post("/get-marks/:id", isTestValid, checkMarks);

router.post(
  "/check-attendance/:id",
  isAttendanceForEachStudentValid,
  checkAttendance
);

router.post("/get-subjects", isYearSemesterValid, getSubjects);

export default router;
