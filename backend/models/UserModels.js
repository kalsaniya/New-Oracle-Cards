const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    mobile: { type: String, required: true, unique: true },
    savedcard: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
