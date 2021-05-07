const express = require("express");
const router = express.Router();
const scrapController = require('../controller/scrapController');

// get scraps
router.get("/scraps", scrapController.getScraps);

// add scrap
router.post("/addScrap",scrapController.addScrap);

module.exports = router;