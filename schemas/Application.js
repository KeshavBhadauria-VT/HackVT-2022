import companySchema from "./Company";
import userSchema from "./User";

const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    appId: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      immutable: true,
    },
    company: {
        type: companySchema,
        immutable: true,
    },
    user: {
        type: userSchema,
        immutable: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
    },
  },
);
module.exports = mongoose.model(Applications, applicationSchema);