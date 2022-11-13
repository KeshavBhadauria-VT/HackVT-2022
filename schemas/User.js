const mongoose = require("mongoose");
const Application = require("../schemas/Application").schema;



const userSchema = new mongoose.Schema(
  {
    _id: {
        type: String,
        required: true
    },
    name: {
      type: String,
      required: true,
    },
    friends: [this],
    following_me: [this],
    applies: {
      type: Number,
      required: true,
      default: 0
    },
    rejects: {
      type: Number,
      required: true,
      default: 0

    },

    accepts: {
      type: Number,
      required: true,
      default: 0

    },
    createdAt: {
      type: Date,
      immutable: true,
      
    },
    applications: {
        type: [Application],
    }
  },
  { _id: false }
);
module.exports = mongoose.model("User",  userSchema);