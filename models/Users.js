const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  username: { type: String, unique: true, sparse: true },
});

module.exports = mongoose.model("User", UserSchema);
