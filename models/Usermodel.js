const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../valuekeys");
const validator = require("validator");
const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 3,
    },
    lastname: {
      type: String,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    dob: {
      type: Date,
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

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET, {
    expiresIn: "7 days",
  });
  return token;
};

UserSchema.statics.findCrediential = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    throw new Error("Unable to login");
  }
  return user;
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hashPassword = await bcrypt.hash(user.password, 8);
    user.password = hashPassword;
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
