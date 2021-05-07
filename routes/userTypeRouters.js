const express = require("express");
const router = express.Router();
const userTypeController = require("../controller/userTypeController");

// get user type
router.get("/userTypes", userTypeController.getUserTypes);

// add user type
router.post("/addUserType",userTypeController.addUserType);

module.exports = router;
