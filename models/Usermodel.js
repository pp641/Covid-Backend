const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minLength: 3,
    },
    lastname: {
      type: String,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    helptaken: {
      type: Number,
      default: 0,
    },
    helpgiven: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
