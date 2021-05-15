const express = require("express");
const scrapOrderController = require("../controller/scrapOrderController");

const router = express.Router();

// get scrap orders
router.get("/scrapOrders", scrapOrderController.getScrapOders);

// get scrap orders by id
router.get("/scrapOrders/info", scrapOrderController.getScrapOdersById);

// post scrap orders
router.post("/addScrapOrder", scrapOrderController.addScrapOrder);

module.exports = router;
