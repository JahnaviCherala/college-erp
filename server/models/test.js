import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subjectID: {
    type: String,
    required: true,
  },
  outof: {
    type: Number,
    required: true,
  },
});

const Test = mongoose.model("Test", testSchema);

export default Test;
