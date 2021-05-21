const express = require("express");
const userController = require('../controller/userController');
const router = express.Router();

// get users
router.get("/users",userController.getUser);

// check user
router.post("/checkUser",userController.checkUser);

// add user
router.post("/addUser",userController.addUser);

// update profile
router.post("/updateProfile", userController.updateProfile);

module.exports = router;