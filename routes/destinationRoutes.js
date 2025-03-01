const express = require("express");
const { getDestination, checkDestination } = require("../controllers/destinationController");

const router = express.Router();

router.get("/", getDestination);
router.post("/checkDestination",checkDestination)

module.exports = router;
