const savecard = require("../models/SavedCard");

const asyncHandler = require("express-async-handler");
const getsave = asyncHandler(async (req, res) => {
  try {
    const data = await savecard.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = { getsave };
