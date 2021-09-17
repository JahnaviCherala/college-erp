import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import Student from "../models/student.js";
import Attendance from "../models/attendance.js";
import Mark from "../models/mark.js";
import Teacher from "../models/teacher.js";

import { passwordCheck } from "../util/check.js";

dotenv.config();

export const login = async (req, res, next) => {
  try {
    const passwordChecked = passwordCheck(req.body.password);

    if (passwordChecked)
      return res.status(422).json({ message: passwordChecked });

    const teacher = await Teacher.findOne({
      registrationID: req.body.registrationID,
    });

    if (!teacher)
      return res.status(422).json({
        message: `Teacher ID ${req.body.registrationID} is not valid`,
      });

    const password = await bcrypt.compare(req.body.password, teacher.password);

    if (!password)
      return res.status(404).json({ message: "Passwords did not match" });

    const token = jwt.sign(
      { registrationID: teacher.registrationID },
      process.env.JWT,
      { expiresIn: "1h" }
    );

    if (token) {
      return res.status(200).json({ token, teacher });
    } else {
      return res.status(404).json({ message: "Could not verify" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find({
      year: req.body.year,
      semester: req.body.semester,
    });

    if (students.length > 0) {
      return res.status(201).json({ students });
    } else {
      return res.status(404).json({ message: "No Students Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const addAttendance = async (req, res, next) => {
  try {
    const attendance = new Attendance({
      studentIDs: req.body.students.map((student) => student.registrationID),
      date: req.body.date,
      subjectID: req.body.subjectID,
    });

    const addedAttendance = await attendance.save();

    if (addedAttendance) {
      return res.status(201).json({ message: "Attendance added successfully" });
    } else {
      return res.status(404).json({ message: "Attendance not added" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const addMarks = async (req, res, next) => {
  try {
    req.body.students.forEach(async (student, index) => {
      const mark = new Mark({
        studentID: student.registrationID,
        testID: req.body.name,
        subjectID: req.body.subjectID,
        total: req.body.total[index],
      });

      await mark.save();
    });

    return res.status(201).json({ message: "Marks added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const getMarks = async (req, res, next) => {
  try {
    const marks = await Mark.find({
      testID: req.body.name,
      subjectID: req.body.subjectID,
    });

    if (marks) {
      return res.status(201).json({ marks });
    } else {
      return res.status(404).json({ message: "Marks not added" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};
