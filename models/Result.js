const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  scores: { type: [Number], default: [] },
});

module.exports = mongoose.model("Result", ResultSchema);
