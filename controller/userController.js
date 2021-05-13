const firebase = require("../model/firebase");
const User = require('../model/user');

var userInstance  = new User();

function getId() {
  var id = 0;
  userInstance.forEach((element) => {
    if (element.id > id) id = element.id;
  });
  return id + 1;
}

function hasUserName(user) {
  var check = false;
  userInstance.forEach((element) => {
    if (element.username === user.username) {
      check = true;
      return;
    }
  });

  return check;
}

const getUser = (req, res) => {
  res.json(userInstance);
};

const checkUser = (req, res) => {
  var user = {
    username: req.body.username,
    password: req.body.password,
    address: "",
    fullname: "",
    id: 0,
    phone: "",
    type: 0,
  };

  var check = false;
  userInstance.forEach((element) => {
    if (
      element.username === user.username &&
      element.password === user.password
    ) {
      check = true;
      user = element;
      return;
    }
  });

  if (check) {
    var json = {
      msg: "successfull",
      user,
    };
    res.json(json);
  } else {
    var json = {
      msg: "user not found",
      user,
    };
    res.json(json);
  }
};

const addUser = (req, res) => {
  var user = {
    username: req.body.username,
    password: req.body.password,
    address: req.body.address,
    fullname: req.body.fullname,
    id: 0,
    phone: req.body.phone,
    type: parseInt(req.body.type),
  };
  // get id
  user.id = getId();

  if (hasUserName(user)) {
    res.json({ msg: "duplicate user" });
    return;
  }

  if (firebase.addData("User", user)) {
    userInstance.push(user);
    res.json({ msg: "successful" });
  } else res.json({ msg: "fail" });
};

module.exports = { getUser, checkUser, addUser };
