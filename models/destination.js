const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  alias: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  clues: {
    type: [String],
    required: true
  },
  funFacts: {
    type: [String],
    required: true
  }
});

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
