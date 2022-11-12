const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    file: {
      type: Buffer,
      required: true,
      default: 0
    },
  },
  { _id: false }
);
module.exports = mongoose.model("resume", resumeSchema);