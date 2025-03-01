const User = require("../models/User");

const registerUser = async (req, res) => {
  const { username,uniqueID } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.json({ success: false, uuid: existingUser.uuid });

    const newUser = new User({ uuid: uniqueID, username });
    await newUser.save();
    res.json({ success: true, uuid: newUser.uuid });
  } catch (err) {

    res.status(500).json({ success: false, message: `Server error ${err}` });
  }
};

module.exports = { registerUser };
