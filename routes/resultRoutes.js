const express = require("express");
const { saveScore, getUserScores } = require("../controllers/resultController");

const router = express.Router();

router.post("/save", saveScore);
router.get("/:uuid", getUserScores);

module.exports = router;
