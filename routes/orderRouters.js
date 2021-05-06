const express = require("express");
const orderController = require("../controller/orderController");

const router = express.Router();

// get orders
router.get("/orders", orderController.getOrders);

// add order
router.post("/addOrder",orderController.addOrder);

// delete order
router.get("/deleteOrder/:id",orderController.deleteOrder);

module.exports = router;
