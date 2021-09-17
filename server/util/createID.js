import Student from "../models/student.js";
import Admin from "../models/admin.js";
import Subject from "../models/subject.js";
import Teacher from "../models/teacher.js";
import Department from "../models/department.js";

export const createStudentID = async () => {
  let id = "STU";

  const date = new Date();
  const year = date.getFullYear().toString().substring(2);
  id += year;

  while (true) {
    const random = Math.random().toString().substring(2, 6);
    const possibleID = id + random;
    const IDPresent = await Student.findOne({ registrationID: possibleID });

    if (!IDPresent) {
      id = possibleID;
      break;
    }
  }

  return id;
};

export const createTeacherID = async () => {
  let id = "TEA";

  const date = new Date();
  const year = date.getFullYear().toString().substring(2);
  id += year;

  while (true) {
    const random = Math.random().toString().substring(2, 6);
    const possibleID = id + random;
    const IDPresent = await Teacher.findOne({ registrationID: possibleID });

    if (!IDPresent) {
      id = possibleID;
      break;
    }
  }

  return id;
};

export const createAdminID = async () => {
  let id = "ADM";

  const date = new Date();
  const year = date.getFullYear().toString().substring(2);
  id += year;
  console.log(id);

  while (true) {
    const random = Math.random().toString().substring(2, 6);
    const possibleID = id + random;
    const IDPresent = await Admin.findOne({ registrationID: possibleID });

    if (!IDPresent) {
      id = possibleID;
      break;
    }
  }

  return id;
};

export const createDepartmentID = async (name) => {
  if (name === "Computer Science") return "CSE";
  else if (name === "Information Technology") return "IT";
  else if (name === "Electronics And Telecommunication") return "EXTC";
  else if (name === "Electronics") return "ELEX";
  else if (name === "Electrical") return "ELEC";
  else if (name === "Production") return "PROD";
  else if (name === "Civil") return "CIV";
  else if (name === "Mechanical") return "MECH";
  else if (name === "Chemical") return "CHEM";
  else if (name === "Textile") return "TEXT";
  else {
    for (let i = 2; i < name.length; i++) {
      const possibleID = name.substring(0, i).toUpperCase();
      const IDPresent = await Department.findOne({
        registrationID: possibleID,
      });

      if (!IDPresent) {
        return possibleID;
      }
    }
  }

  return "Cannot create ID";
};

export const createSubjectID = async () => {
  let id = "SUB";

  const date = new Date();
  const year = date.getFullYear().toString().substring(2);
  id += year;

  while (true) {
    const random = Math.random().toString().substring(2, 6);
    const possibleID = id + random;
    const IDPresent = await Subject.findOne({ registrationID: possibleID });

    if (!IDPresent) {
      id = possibleID;
      break;
    }
  }

  return id;
};
