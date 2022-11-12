const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      unique: true
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