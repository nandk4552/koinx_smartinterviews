const express = require("express");
const { getLatestStats } = require("../controllers/cryptoController");
const { getPriceDeviation } = require("../controllers/cryptoController");
const router = express.Router();

router.get("/stats", getLatestStats);
router.get("/deviation", getPriceDeviation);

module.exports = router;
