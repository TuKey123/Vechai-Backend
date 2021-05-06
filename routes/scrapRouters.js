const express = require("express");
const router = express.Router();
const scrapController = require('../controller/scrapController');

// get scraps
router.get("/scraps", scrapController.getScraps);

module.exports = router;