
const mongoose = require("mongoose");

const SavedCardSchema = new mongoose.Schema({
  frontImage: { type: String, required: true }, 
  backImage: { type: String, required: true },
  name: { type: String, required: true },
  Message: { type: String, required: true },
  Colour: { type: String, required: true },
  Crystal: { type: String, required: true },
  Description: { type: String, required: true },
  Guidance: { type: String, required: true },
  Affirmation: { type: String, required: true },
  Invocation: { type: String, required: true }
}, { timestamps: true });

const SavedCard = mongoose.model("SavedCard", SavedCardSchema);
module.exports = SavedCard;
