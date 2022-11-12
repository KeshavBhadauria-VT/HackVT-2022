const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    friends: [userSchema],
    applies: {
      type: Number,
      required: true,
    },
    rejects: {
      type: Number,
      required: true,
    },

    accepts: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      immutable: true,
    },
    application: [String],
  },
  { _id: false }
);
module.exports = mongoose.model(Users,  userSchema);