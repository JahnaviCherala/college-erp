import bcrypt from "bcrypt";

import Admin from "../models/admin.js";
import Department from "../models/department.js";
import Subject from "../models/subject.js";
import Teacher from "../models/teacher.js";
import Student from "../models/student.js";
import Test from "../models/test.js";
import Attendance from "../models/attendance.js";
import Mark from "../models/mark.js";

import {
  aadharCheck,
  passwordCheck,
  nameCheck,
  emailCheck,
  mobileCheck,
  semesterCheck,
  yearCheck,
} from "../util/check.js";

export const isRegistrationValid = async (req, res, next) => {
  console.log(req.body);
  console.log(req.body.aadhar);
  const firstNameChecked = nameCheck(req.body.firstName, "First");
  if (firstNameChecked)
    return res.status(422).json({ message: firstNameChecked });

  const lastNameChecked = nameCheck(req.body.lastName, "Last");
  if (lastNameChecked)
    return res.status(422).json({ message: lastNameChecked });

  const aadharChecked = aadharCheck(req.body.aadhar);
  if (aadharChecked) return res.status(422).json({ message: aadharChecked });

  const passwordChecked = passwordCheck(req.body.password);
  if (passwordChecked)
    return res.status(422).json({ message: passwordChecked });

  const emailChecked = emailCheck(req.body.email);
  if (emailChecked) return res.status(422).json({ message: emailChecked });

  const mobileChecked = mobileCheck(req.body.mobile);
  if (mobileChecked) return res.status(422).json({ message: mobileChecked });

  if (req.body.type === "Student") {
    const yearChecked = yearCheck(req.body.year);
    if (yearChecked) return res.status(422).json({ message: yearChecked });

    const semesterChecked = semesterCheck(req.body.year, req.body.semester);
    if (semesterChecked)
      return res.status(422).json({ message: semesterChecked });
  }

  if (req.body.type !== "Admin") {
    const departmentID = req.body.departmentID.trim();
    const department = await Department.findOne({
      registrationID: departmentID,
    });
    if (!department)
      return res
        .status(422)
        .json({ message: `Deparment ID ${departmentID} is invalid` });
  }

  if (req.body.confirmPassword !== req.body.password)
    return res.status(422).json({ message: "Passwords did not match" });

  next();
};

export const isAdminPasswordUpdationValid = async (req, res, next) => {
  const oldPassword = req.body.oldPassword.trim();
  if (oldPassword.length < 8)
    return res.status(422).json({
      message: "Password length should be at least 8 characters long",
    });

  const id = req.params.id;
  const admin = await Admin.findOne({ registrationID: id });
  if (!admin)
    return res
      .status(422)
      .json({ message: `Admin with registration id ${id} not found` });

  const isPasswordsSame = await bcrypt.compare(oldPassword, admin.password);
  if (!isPasswordsSame)
    return res
      .status(422)
      .json({ message: "Old Password and Entered Password did not match" });

  const newPassword = req.body.newPassword.trim();
  if (newPassword.length < 8)
    return res.status(422).json({
      message: "Password length should be at least 8 characters long",
    });

  const confirmPassword = req.body.confirmPassword.trim();
  if (confirmPassword.length < 8)
    return res.status(422).json({
      message: "Password length should be at least 8 characters long",
    });

  if (newPassword !== confirmPassword)
    return res
      .status(422)
      .json({ message: "New Password and Confirm Password did not match" });

  next();
};

export const isAdminUpdationValid = async (req, res, next) => {
  const firstName = req.body.firstName.trim();
  if (firstName.length < 2)
    return res.status(422).json({ message: "First Name is invalid" });

  const lastName = req.body.lastName.trim();
  if (lastName.length < 2)
    return res.status(422).json({ message: "Last Name is invalid" });

  const dob = req.body.dob.trim().split("-");
  if (dob.length < 3)
    return res.status(422).json({ message: "Date of Birth is invalid" });

  const aadhar = req.body.aadhar.trim();
  if (aadhar.length != 12)
    return res.status(422).json({ message: "Aadhar Number is invalid" });

  const email = req.body.email.trim();
  if (!email.includes("@"))
    return res.status(422).json({ message: "Email is invalid" });

  const contacts = req.body.contacts;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].length != 10)
      return res
        .status(422)
        .json({ message: `Contact Number ${contacts[i]} is invalid` });
  }

  const id = req.params.id;
  const admin = await Admin.findOne({
    registrationID: id,
  });
  if (!admin)
    return res.status(422).json({
      message: `Admin with Registration ID ${id} not found`,
    });

  next();
};

export const isDepartmentEntryValid = async (req, res, next) => {
  const name = req.body.name.trim();
  if (name.length < 3)
    return res.status(422).json({ message: "Name is invalid" });

  const departmentWithSameName = await Department.findOne({
    name,
  });
  if (departmentWithSameName)
    return res.status(422).json({ message: `${name} already exists` });

  next();
};

export const isDepartmentUpdationValid = async (req, res, next) => {
  const name = req.body.name.trim();
  if (name.length < 3)
    return res.status(422).json({ message: "Name is invalid" });

  const departmentWithSameName = await Department.findOne({
    name,
  });
  if (departmentWithSameName)
    return res.status(422).json({ message: `${name} already exists` });

  const departmentID = req.body.departmentID.trim();
  const department = await Department.findOne({ registrationID: departmentID });
  if (!department)
    return res
      .status(422)
      .json({ message: `Department ID ${departmentID} is invalid` });

  next();
};

export const isSubjectEntryValid = async (req, res, next) => {
  const name = req.body.name.trim();
  if (name.length < 3)
    return res.status(422).json({ message: "Name is invalid" });

  const departmentID = req.body.departmentID.trim();
  const department = await Department.findOne({ registrationID: departmentID });
  if (!department)
    return res
      .status(422)
      .json({ message: `Deparment ID ${departmentID} is invalid` });

  const subjectWithSameName = await Subject.findOne({ name, departmentID });
  if (subjectWithSameName)
    return res.status(422).json({ message: `${name} already exists` });

  const year = req.body.year;
  if (year <= 0 || year > 4)
    return res.status(422).json({ message: "Year is invalid" });

  const semester = req.body.semester;
  if (semester !== 2 * year && semester !== 2 * year - 1)
    return res.status(422).json({ message: "Semester is invalid" });

  next();
};

export const isSubjectUpdationValid = async (req, res, next) => {
  const name = req.body.name.trim();
  if (name.length < 3)
    return res.status(422).json({ message: "Name is invalid" });

  const departmentID = req.body.departmentID.trim();
  const department = await Department.findOne({ registrationID: departmentID });
  if (!department)
    return res
      .status(422)
      .json({ message: `Deparment ID ${departmentID} is invalid` });

  const subjectWithSameName = await Subject.findOne({ name, departmentID });
  if (subjectWithSameName)
    return res.status(422).json({ message: `${name} already exists` });

  const subjectID = req.body.subjectID.trim();
  const subject = await Subject.findOne({ registrationID: subjectID });
  if (!subject)
    return res
      .status(422)
      .json({ message: `Subject ID ${subjectID} is invalid` });

  const year = req.body.year;
  if (year <= 0 || year > 4)
    return res.status(422).json({ message: "Year is invalid" });

  const semester = req.body.semester;
  if (semester !== 2 * year && semester !== 2 * year - 1)
    return res.status(422).json({ message: "Semester is invalid" });

  next();
};

export const isStudentEntryValid = async (req, res, next) => {
  const dob = req.body.dob.trim().split("-");
  if (dob.length < 3)
    return res.status(422).json({ message: "Date of Birth is invalid" });

  const departmentID = req.body.departmentID.trim();
  const department = await Department.findOne({ registrationID: departmentID });
  if (!department)
    return res
      .status(422)
      .json({ message: `Deparment ID ${departmentID} is invalid` });
};

export const isStudentUpdationValid = async (req, res, next) => {
  const firstName = req.body.firstName.trim();
  if (firstName.length < 2)
    return res.status(422).json({ message: "First Name is invalid" });

  const lastName = req.body.lastName.trim();
  if (lastName.length < 2)
    return res.status(422).json({ message: "Last Name is invalid" });

  const dob = req.body.dob.trim().split("-");
  if (dob.length < 3)
    return res.status(422).json({ message: "Date of Birth is invalid" });

  const aadhar = req.body.aadhar.trim();
  if (aadhar.length != 12)
    return res.status(422).json({ message: "Aadhar Number is invalid" });

  const email = req.body.email.trim();
  if (!email.includes("@"))
    return res.status(422).json({ message: "Email is invalid" });

  const departmentID = req.body.departmentID.trim();
  const department = await Department.findOne({ registrationID: departmentID });
  if (!department)
    return res
      .status(422)
      .json({ message: `Deparment ID ${departmentID} is invalid` });

  const studentID = req.body.studentID.trim();
  const student = await Student.findOne({ registrationID: studentID });
  if (!student)
    return res
      .status(422)
      .json({ message: `Student ID ${studentID} is invalid` });

  const contacts = req.body.contacts;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].length != 10)
      return res
        .status(422)
        .json({ message: `Contact Number ${contacts[i]} is invalid` });
  }

  const year = req.body.year;
  if (year <= 0 || year > 4)
    return res.status(422).json({ message: "Year is invalid" });

  const semester = req.body.semester;
  if (semester !== 2 * year && semester !== 2 * year - 1)
    return res.status(422).json({ message: "Semester is invalid" });

  next();
};

export const isTeacherEntryValid = async (req, res, next) => {
  const firstName = req.body.firstName.trim();
  if (firstName.length < 2)
    return res.status(422).json({ message: "First Name is invalid" });

  const lastName = req.body.lastName.trim();
  if (lastName.length < 2)
    return res.status(422).json({ message: "Last Name is invalid" });

  const dob = req.body.dob.trim().split("-");
  if (dob.length < 3)
    return res.status(422).json({ message: "Date of Birth is invalid" });

  const password = req.body.password.trim();
  if (password.length < 8)
    return res.status(422).json({
      message: "Password length should be at least 8 characters long",
    });

  const aadhar = req.body.aadhar.trim();
  if (aadhar.length != 12)
    return res.status(422).json({ message: "Aadhar Number is invalid" });

  const email = req.body.email.trim();
  if (!email.includes("@"))
    return res.status(422).json({ message: "Email is invalid" });

  const departmentID = req.body.departmentID.trim();
  const department = await Department.findOne({ registrationID: departmentID });
  if (!department)
    return res
      .status(422)
      .json({ message: `Deparment ID ${departmentID} is invalid` });

  const contacts = req.body.contacts;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].length != 10)
      return res
        .status(422)
        .json({ message: `Contact Number ${contacts[i]} is invalid` });
  }

  next();
};

export const isTeacherUpdationValid = async (req, res, next) => {
  const firstName = req.body.firstName.trim();
  if (firstName.length < 2)
    return res.status(422).json({ message: "First Name is invalid" });

  const lastName = req.body.lastName.trim();
  if (lastName.length < 2)
    return res.status(422).json({ message: "Last Name is invalid" });

  const dob = req.body.dob.trim().split("-");
  if (dob.length < 3)
    return res.status(422).json({ message: "Date of Birth is invalid" });

  const aadhar = req.body.aadhar.trim();
  if (aadhar.length != 12)
    return res.status(422).json({ message: "Aadhar Number is invalid" });

  const email = req.body.email.trim();
  if (!email.includes("@"))
    return res.status(422).json({ message: "Email is invalid" });

  const departmentID = req.body.departmentID.trim();
  const department = await Department.findOne({ registrationID: departmentID });
  if (!department)
    return res
      .status(422)
      .json({ message: `Deparment ID ${departmentID} is invalid` });

  const teacherID = req.body.teacherID.trim();
  const teacher = await Teacher.findOne({ registrationID: teacherID });
  if (!teacher)
    return res
      .status(422)
      .json({ message: `Teacher ID ${teacherID} is invalid` });

  const contacts = req.body.contacts;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].length != 10)
      return res
        .status(422)
        .json({ message: `Contact Number ${contacts[i]} is invalid` });
  }

  next();
};

export const isTestEntryValid = async (req, res, next) => {
  const name = req.body.name.trim();
  if (name.length <= 0 || name.length > 3)
    return res.status(422).json({ message: "Name is invalid" });

  const subjectID = req.body.subjectID.trim();
  const subject = await Subject.findOne({ registrationID: subjectID });
  if (!subject)
    return res
      .status(422)
      .json({ message: `Subject ID ${subjectID} is invalid` });

  const test = await Test.findOne({ subjectID, name });
  if (test) return res.status(422).json({ message: "Test already exists" });

  const outof = req.body.outof;
  if (outof !== 20 && outof !== 40 && outof !== 60)
    return res.status(422).json({ message: "Out of marks is invalid" });

  next();
};

export const isTestNameIDValid = async (req, res, next) => {
  const name = req.body.name.trim();
  if (name.length <= 0 || name.length > 3)
    return res.status(422).json({ message: "Name is invalid" });

  const subjectID = req.body.subjectID.trim();
  const subject = await Subject.findOne({ registrationID: subjectID });
  if (!subject)
    return res
      .status(422)
      .json({ message: `Subject ID ${subjectID} is invalid` });

  next();
};

export const isTestUpdationValid = async (req, res, next) => {
  const name = req.body.name.trim();
  if (name.length <= 0 || name.length > 3)
    return res.status(422).json({ message: "Name is invalid" });

  const subjectID = req.body.subjectID.trim();
  const subject = await Subject.findOne({ registrationID: subjectID });
  if (!subject)
    return res
      .status(422)
      .json({ message: `Subject ID ${subjectID} is invalid` });

  const testwithSameName = await Test.findOne({ subjectID, name });
  if (testwithSameName)
    return res.status(422).json({ message: "Test already exists" });

  const outof = req.body.outof;
  if (!(outof === 20 || outof === 40 || outof === 60))
    return res.status(422).json({ message: "Out of marks is invalid" });

  next();
};

export const isYearSemesterValid = (req, res, next) => {
  const year = req.body.year;
  if (year <= 0 || year > 4)
    return res.status(422).json({ message: "Year is invalid" });

  const semester = req.body.semester;
  if (semester !== 2 * year && semester !== 2 * year - 1)
    return res.status(422).json({ message: "Semester is invalid" });

  next();
};

export const isAttendanceValid = async (req, res, next) => {
  const students = req.body.students;
  if (students.length === 0)
    return res.status(422).json({ message: "All students absent" });

  const date = req.body.date.trim().split("-");
  if (date.length < 3)
    return res.status(422).json({ message: "Date is invalid" });

  const subjectID = req.body.subjectID.trim();
  const subject = await Subject.findOne({
    registrationID: subjectID,
    year: students[0].year,
    semester: students[0].semester,
  });
  if (!subject)
    return res.status(422).json({
      message: `Subject ID ${subjectID} is not for ${students[0].year} year and ${students[0].semester} semester students`,
    });

  const attendance = await Attendance.findOne({
    subjectID,
    date: req.body.date,
  });
  if (attendance)
    return res.status(422).json({ message: "Attendance already exists" });

  next();
};

export const isMarkValid = async (req, res, next) => {
  const students = req.body.students;
  if (students.length === 0)
    return res.status(422).json({ message: "No students found" });

  const subjectID = req.body.subjectID.trim();
  const subject = await Subject.findOne({ registrationID: subjectID });
  if (!subject)
    return res
      .status(422)
      .json({ message: `Subject ID ${subjectID} is invalid` });

  const name = req.body.name.trim();
  const test = await Test.findOne({ subjectID, name });
  if (!test) return res.status(422).json({ message: "Test is invalid" });

  const mark = await Mark.findOne({
    testID: name,
    subjectID,
  });
  if (mark) return res.status(422).json({ message: "Marks already exist" });

  if (
    subject.year !== students[0].year &&
    subject.semester !== students[0].semester
  )
    return res
      .status(422)
      .json({ message: "Subject and Students year do not match" });

  const total = req.body.total;
  for (let i = 0; i < total.length; i++) {
    if (total < 0 || total > test.outof)
      return res.status(422).json({ message: "Entered total not valid" });
  }

  next();
};

export const isTestValid = async (req, res, next) => {
  const subjectID = req.body.subjectID.trim();
  const subject = await Subject.findOne({ registrationID: subjectID });
  if (!subject)
    return res
      .status(422)
      .json({ message: `Subject ID ${subjectID} is invalid` });

  const name = req.body.name.trim();
  const test = await Test.findOne({ name });
  if (!test) return res.status(422).json({ message: "Test is invalid" });

  next();
};

export const isAttendanceForEachStudentValid = async (req, res, next) => {
  const subjectID = req.body.subjectID.trim();
  const subject = await Subject.findOne({ registrationID: subjectID });
  if (!subject)
    return res
      .status(422)
      .json({ message: `Subject ID ${subjectID} is invalid` });

  const studentID = req.params.id;
  const student = await Student.findOne({ registrationID: studentID });
  if (!student)
    return res
      .status(422)
      .json({ message: `Student ID ${studentID} is invalid` });

  const date = req.body.date.trim().split("-");
  if (date.length < 3)
    return res.status(422).json({ message: "Date is invalid" });

  next();
};
