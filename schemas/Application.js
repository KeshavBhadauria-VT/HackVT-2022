const Company = require("../schemas/Company").schema;

const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: "Ghosted"
    },
    url: {
      type: String,
      immutable: true,
      required: true
    },
    company: {
        type: Company,
        immutable: true,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
  },
);
module.exports = mongoose.model("application", applicationSchema);