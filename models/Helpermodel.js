const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const HelperSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      minLength: 10,
      trim: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    assets: {
      type: [String],
      default: [],
    },
    seeker: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    helper: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Helper", HelperSchema);
