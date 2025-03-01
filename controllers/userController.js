const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res) => {
  const { username } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.json({ success: true, uuid: existingUser.uuid });

    const newUser = new User({ uuid: uuidv4(), username });
    await newUser.save();
    res.json({ success: true, uuid: newUser.uuid });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { registerUser };
