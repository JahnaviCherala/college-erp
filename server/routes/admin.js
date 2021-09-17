import express from "express";

import {
  addAdmin,
  updateAdmin,
  updateAdminPassword,
  addDepartment,
  addSubject,
  addStudent,
  updateDepartment,
  updateSubject,
  updateStudent,
  addTeacher,
  updateTeacher,
  addTest,
  updateTest,
  getDepartment,
  getSubject,
  getStudent,
  getTeacher,
  getTest,
  login,
} from "../controllers/admin.js";
import {
  isAdminPasswordUpdationValid,
  isAdminUpdationValid,
  isDepartmentEntryValid,
  isSubjectEntryValid,
  isStudentEntryValid,
  isDepartmentUpdationValid,
  isSubjectUpdationValid,
  isTeacherEntryValid,
  isTeacherUpdationValid,
  isTestEntryValid,
  isTestUpdationValid,
  isStudentUpdationValid,
  isTestNameIDValid,
  isRegistrationValid,
} from "../middleware/validation.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", isRegistrationValid, addAdmin);
router.post("/add-admin", isRegistrationValid, addAdmin);

router.put("/update/:id", isAdminUpdationValid, updateAdmin);

router.put(
  "/update-password/:id",
  isAdminPasswordUpdationValid,
  updateAdminPassword
);

router.post("/add-department", isDepartmentEntryValid, addDepartment);

router.post("/get-department", getDepartment);

router.put("/update-department", isDepartmentUpdationValid, updateDepartment);

router.post("/add-subject", isSubjectEntryValid, addSubject);

router.post("/get-subject", getSubject);

router.put("/update-subject", isSubjectUpdationValid, updateSubject);

router.post("/add-student", isStudentEntryValid, addStudent);

router.post("/get-student", getStudent);

router.put("/update-student", isStudentUpdationValid, updateStudent);

router.post("/add-teacher", isTeacherEntryValid, addTeacher);

router.post("/get-teacher", getTeacher);

router.put("/update-teacher", isTeacherUpdationValid, updateTeacher);

router.post("/add-test", isTestEntryValid, addTest);

router.post("/get-test", isTestNameIDValid, getTest);

router.put("/update-test", isTestUpdationValid, updateTest);

export default router;
