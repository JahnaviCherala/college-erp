import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  registrationID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  aadhar: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  contacts: [
    {
      type: String,
    },
  ],
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Admin", adminSchema);
