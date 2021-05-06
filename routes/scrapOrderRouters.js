const express = require("express");
const scrapOrderController = require("../controller/scrapOrderController");

const router = express.Router();

// get scrap orders
router.get("/scrapOrders", scrapOrderController.getScrapOders);

module.exports = router;
