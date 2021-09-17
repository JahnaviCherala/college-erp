import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import Admin from "../models/admin.js";
import Department from "../models/department.js";
import Subject from "../models/subject.js";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
import Test from "../models/test.js";
import {
  createAdminID,
  createDepartmentID,
  createSubjectID,
  createStudentID,
  createTeacherID,
} from "../util/createID.js";

import {
  aadharCheck,
  passwordCheck,
  nameCheck,
  emailCheck,
  mobileCheck,
  semesterCheck,
} from "../util/check.js";

dotenv.config();

export const login = async (req, res, next) => {
  try {
    const passwordChecked = passwordCheck(req.body.password);

    if (passwordChecked)
      return res.status(422).json({ message: passwordChecked });

    const admin = await Admin.findOne({
      registrationID: req.body.registrationID,
    });

    if (!admin)
      return res.status(422).json({
        message: `Admin ID ${req.body.registrationID} is not valid`,
      });

    const password = await bcrypt.compare(req.body.password, admin.password);

    if (!password)
      return res.status(404).json({ message: "Passwords did not match" });

    const token = jwt.sign(
      { registrationID: admin.registrationID },
      process.env.JWT,
      { expiresIn: "1h" }
    );

    if (token) {
      return res.status(200).json({ token, admin });
    } else {
      return res.status(404).json({ message: "Could not verify" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const addAdmin = async (req, res, next) => {
  try {
    const admin = new Admin({
      name: req.body.firstName + " " + req.body.lastName,
      dob: req.body.dob,
      aadhar: req.body.aadhar,
      registrationID: await createAdminID(),
      password: await bcrypt.hash(req.body.password, 12),
      email: req.body.email,
      contacts: req.body.contacts,
    });

    const addedAdmin = await admin.save();

    if (addedAdmin) {
      return res
        .status(201)
        .json({
          admin: addedAdmin,
          message: `Admin successfully registered with ID ${addedAdmin.registrationID}`,
        });
    } else {
      return res.status(404).json({ message: "Adding Admin Failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const updateAdmin = async (req, res, next) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findOneAndUpdate(
      { registrationID: id },
      {
        name: req.body.firstName + " " + req.body.lastName,
        dob: req.body.dob,
        aadhar: req.body.aadhar,
        email: req.body.email,
        contacts: req.body.contacts,
      },
      { new: true }
    );

    if (admin) {
      return res.status(201).json({ admin });
    } else {
      return res.status(404).json({ message: "Updating Admin Failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const updateAdminPassword = async (req, res, next) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findOneAndUpdate(
      { registrationID: id },
      { password: await bcrypt.hash(req.body.newPassword, 12) },
      { new: true }
    );

    if (admin) {
      return res.status(201).json({ admin });
    } else {
      return res.status(404).json({ message: "Updating Admin Failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const addDepartment = async (req, res, next) => {
  try {
    const department = new Department({
      name: req.body.name,
      registrationID: await createDepartmentID(req.body.name),
    });

    const addedDepartment = await department.save();

    if (addedDepartment) {
      return res.status(201).json({ department: addedDepartment });
    } else {
      return res.status(404).json({ message: "Adding Department Failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const getDepartment = async (req, res, next) => {
  try {
    const department = await Department.findOne({
      registrationID: req.body.departmentID,
    });

    if (department) {
      return res.status(201).json({ department });
    } else {
      return res.status(404).json({ message: "Department not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findOneAndUpdate(
      { registrationID: req.body.departmentID },
      {
        name: req.body.name,
      },
      { new: true }
    );

    if (department) {
      return res.status(201).json({ department });
    } else {
      return res.status(404).json({ message: "Updating Department Failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const addSubject = async (req, res, next) => {
  try {
    const subject = new Subject({
      name: req.body.name,
      departmentID: req.body.departmentID,
      year: req.body.year,
      semester: req.body.semester,
      registrationID: await createSubjectID(),
    });

    const addedSubject = await subject.save();

    if (addedSubject) {
      return res.status(201).json({ subject: addedSubject });
    } else {
      return res.status(404).json({ message: "Adding Subject Failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const getSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findOne({
      registrationID: req.body.subjectID,
    });

    if (subject) {
      return res.status(201).json({ subject });
    } else {
      return res.status(404).json({ message: "Subject not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const updateSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findOneAndUpdate(
      { registrationID: req.body.subjectID },
      {
        name: req.body.name,
        departmentID: req.body.departmentID,
        year: req.body.year,
        semester: req.body.semester,
      },
      { new: true }
    );

    if (subject) {
      return res.status(201).json({ subject });
    } else {
      return res.status(404).json({ message: "Updating Subject Failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const addStudent = async (req, res, next) => {
  try {
    const student = new Student({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      aadhar: req.body.aadhar,
      registrationID: await createStudentID(),
      password: await bcrypt.hash(req.body.password, 12),
      departmentID: req.body.departmentID,
      email: req.body.email,
      mobile: req.body.mobile,
      year: req.body.year,
      semester: req.body.semester,
    });

    const addedStudent = await student.save();

    if (addedStudent) {
      return res.status(201).json({
        student: addedStudent,
        message: `Student successfully registered with ID ${addedStudent.registrationID}`,
      });
    } else {
      return res.status(404).json({ message: "Adding Student Failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const student = await Student.findOne({
      registrationID: req.body.studentID,
    });

    if (student) {
      return res.status(201).json({ student });
    } else {
      return res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findOneAndUpdate(
      { registrationID: req.body.studentID },
      {
        name: req.body.firstName + " " + req.body.lastName,
        dob: req.body.dob,
        aadhar: req.body.aadhar,
        email: req.body.email,
        departmentID: req.body.departmentID,
        contacts: req.body.contacts,
        year: req.body.year,
        semester: req.body.semester,
      },
      { new: true }
    );

    if (student) {
      return res.status(201).json({ student });
    } else {
      return res.status(404).json({ message: "Updating Student Failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const addTeacher = async (req, res, next) => {
  try {
    const teacher = new Teacher({
      name: req.body.firstName + " " + req.body.lastName,
      dob: req.body.dob,
      aadhar: req.body.aadhar,
      registrationID: await createTeacherID(),
      password: await bcrypt.hash(req.body.password, 12),
      departmentID: req.body.departmentID,
      email: req.body.email,
      contacts: req.body.contacts,
    });

    const addedTeacher = await teacher.save();

    if (addedTeacher) {
      return res.status(201).json({
        teacher: addedTeacher,
        message: `Teacher successfully registered with ID ${addedTeacher.registrationID}`,
      });
    } else {
      return res.status(404).json({ message: "Adding Teacher Failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const getTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({
      registrationID: req.body.teacherID,
    });

    if (teacher) {
      return res.status(201).json({ teacher });
    } else {
      return res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const updateTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOneAndUpdate(
      { registrationID: req.body.teacherID },
      {
        name: req.body.firstName + " " + req.body.lastName,
        dob: req.body.dob,
        aadhar: req.body.aadhar,
        email: req.body.email,
        departmentID: req.body.departmentID,
        contacts: req.body.contacts,
      },
      { new: true }
    );

    if (teacher) {
      return res.status(201).json({ teacher });
    } else {
      return res.status(404).json({ message: "Updating Teacher Failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const addTest = async (req, res, next) => {
  try {
    const test = new Test({
      name: req.body.name,
      subjectID: req.body.subjectID,
      outof: req.body.outof,
    });

    const addedTest = await test.save();

    if (addedTest) {
      return res.status(201).json({ test: addedTest });
    } else {
      return res.status(404).json({ message: "Adding Test Failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const getTest = async (req, res, next) => {
  try {
    const test = await Test.findOne({
      name: req.body.name,
      subjectID: req.body.subjectID,
    });

    if (test) {
      return res.status(201).json({ test });
    } else {
      return res.status(404).json({ message: "Test not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};

export const updateTest = async (req, res, next) => {
  try {
    const test = await Test.findOneAndUpdate(
      { registrationID: req.body.testID },
      {
        name: req.body.name,
        subjectID: req.body.subjectID,
        outof: req.body.outof,
      },
      { new: true }
    );

    if (test) {
      return res.status(201).json({ test });
    } else {
      return res.status(404).json({ message: "Updating Test Failed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Occured" });
  }
};
