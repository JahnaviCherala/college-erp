import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  registrationID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
