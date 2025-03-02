const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");

// Register user (remains unchanged)
const registerUser = async (req, res) => {
  const { username, score } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.json({ success: false, message: "User already Exists" });

    const newUser = new User({ uuid: uuidv4(), username, score });
    await newUser.save();
    res.json({ success: true, message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: `Server error ${err}` });
  }
};

// Get user score based on the username
const getUserScores = async (req, res) => {
  const { username } = req.query; // Now fetching the username from query params
  try {
    const result = await User.findOne({ username });
    if (!result) return res.json({ scores: {} });
    res.json({ scores: result.score });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { registerUser, getUserScores };
