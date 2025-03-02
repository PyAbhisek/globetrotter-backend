const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res) => {
  const { username } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.json({ success: false, message:"User already Exists" });

    const newUser = new User({ uuid: uuidv4(), username });
    await newUser.save();
    res.json({ success: true, message:"User created successfully"});
  } catch (err) {

    res.status(500).json({ success: false, message: `Server error ${err}` });
  }
};

module.exports = { registerUser };
