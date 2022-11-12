const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: {
        type: Number,
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
    application: [String],
  },
  { _id: false }
);
module.exports = mongoose.model("User",  userSchema);