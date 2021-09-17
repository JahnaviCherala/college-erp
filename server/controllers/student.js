import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import Subject from "../models/subject.js";
import Mark from "../models/mark.js";
import Attendance from "../models/attendance.js";
import Student from "../models/student.js";

import { passwordCheck } from "../util/check.js";

dotenv.config();

export const login = async (req, res, next) => {
  try {
    const passwordChecked = passwordCheck(req.body.password);

    if (passwordChecked)
      return res.status(422).json({ message: passwordChecked });

    const student = await Student.findOne({
      registrationID: req.body.registrationID,
    });

    if (!student)
      return res.status(422).json({
        message: `Student ID ${req.body.registrationID} is not valid`,
      });

    const password = await bcrypt.compare(req.body.password, student.password);

    if (!password)
      return res.status(404).json({ message: "Passwords did not match" });

    const token = jwt.sign(
      { registrationID: student.registrationID },
      process.env.JWT,
      { expiresIn: "1h" }
    );

    if (token) {
      return res.status(200).json({ token, student });
    } else {
      return res.status(404).json({ message: "Could not verify" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const checkMarks = async (req, res, next) => {
  try {
    const marks = await Mark.findOne({
      studentID: req.params.id,
      testID: req.body.name,
      subjectID: req.body.subjectID,
    });

    if (marks) {
      return res.status(201).json({ marks });
    } else {
      return res.status(404).json({ message: "Marks not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const checkAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findOne({
      subjectID: req.body.subjectID,
      date: req.body.date,
    });

    const found = attendance.studentIDs.find(
      (studentID) => studentID === req.params.id
    );

    if (found) {
      return res
        .status(201)
        .json({ message: `Student ${req.params.id} present` });
    } else {
      return res
        .status(201)
        .json({ message: `Student ${req.params.id} not present` });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const getSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find({
      year: req.body.year,
      semester: req.body.semester,
    });

    if (subjects.length > 0) {
      return res.status(201).json({ subjects });
    } else {
      return res.status(404).json({ message: "No Subjects Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};
