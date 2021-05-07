const express = require("express");
const scrapOrderController = require("../controller/scrapOrderController");

const router = express.Router();

// get scrap orders
router.get("/scrapOrders", scrapOrderController.getScrapOders);

// post scrap orders
router.post("/addScrapOrder", scrapOrderController.addScrapOrder);

module.exports = router;
