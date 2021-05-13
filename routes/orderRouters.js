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

// change status
router.put("/orders/confirm",orderController.changeOrderStatus);

module.exports = router;
