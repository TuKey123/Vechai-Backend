const express = require("express");
const orderController = require("../controller/orderController");

const router = express.Router();

// get orders
router.get("/orders", orderController.getOrders);

// add order
router.post("/addOrder",orderController.addOrder);

// delete order
router.get("/deleteOrder/:id",orderController.deleteOrder);

// get order by id
router.get("/orders/info",orderController.getOrderById);

// get order by status
router.get("/orders/status",orderController.getOrderByStatus);

// get order by date
router.get("/orders/bydate",orderController.getOrderByDate);

// confirm status
router.put("/orders/confirm",orderController.confirm);

// complete status
router.put("/orders/complete",orderController.complete);

module.exports = router;
