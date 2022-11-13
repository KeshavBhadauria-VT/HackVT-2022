const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      lowercase: true
    },
    type: {
      type: String,
      default: "tech",
    },
    url: {
      type: String,
      required: true,
    },
    salaries: {
      intern: "",
      fullTime: ""
    },
  },
  { _id: false }
);
module.exports = mongoose.model("company", companySchema);