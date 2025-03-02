const Result = require("../models/Result");

const saveScore = async (req, res) => {
  const { score,username } = req.body;
  try {
    let userResult = await Result.findOne({ username });

    if (!userResult) {
      userResult = new Result({ username, scores: [score] });
    } else {
      userResult.scores.push(score);
    }

    await userResult.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserScores = async (req, res) => {
  const { uuid } = req.params;
  try {
    const result = await Result.findOne({ uuid });
    if (!result) return res.json({ scores: [] });

    res.json({ scores: result.scores });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { saveScore, getUserScores };
