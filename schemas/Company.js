const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
    },
    salaries: [String],
  },
  { _id: false }
);
module.exports = mongoose.model(companies, companySchema);