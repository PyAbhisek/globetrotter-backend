const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  username: { type: String, unique: true, sparse: true,required: true },
  score: {
    correctScore: { type: Number, default: 0 },
    incorrectScore: { type: Number, default: 0 },
},
});

module.exports = mongoose.model("User", UserSchema);
