const firebase = require("../model/firebase");
const User = require('../model/user');

var userInstance = new User();

function getId() {
  var id = 0;
  userInstance.users.forEach((element) => {
    if (element.id > id) id = element.id;
  });
  return id + 1;
}

function hasUserName(user) {
  var check = false;
  userInstance.users.forEach((element) => {
    if (element.username === user.username) {
      check = true;
      return;
    }
  });

  return check;
}

const getUser = (req, res, next) => {
  res.json(userInstance.users);
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
  userInstance.users.forEach((element) => {
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
    userInstance.users.push(user);
    res.json({ msg: "successful" });
  } else res.json({ msg: "fail" });
};

// LAI, update user profile, could be wrong
const updateProfile = (req, res) => {
  // CHECK IF REQ.BODY ISEMPTY OR MISSING PROP
  if (JSON.stringify(req.body) === JSON.stringify({}) ||
      !req.hasOwnProperty('id') ||
      !req.hasOwnProperty('username') ||
      !req.hasOwnProperty('address') ||
      !req.hasOwnProperty('fullname') ||
      !req.hasOwnProperty('phone')) {
        res.json({ msg : 'invalid_request' });
        return;
  }

  var user = {
    id: req.body.id,
    username: req.body.username,
    address: req.body.address,
    fullname: req.body.fullname,
    phone: req.body.phone,
  }

  if (-1 != userInstance.users.findIndex(e => e.id != req.body.id && e.username == req.body.username)) {
    res.json({ msg: 'username_exists' });
    return;
  }

  switch (firebase.updateUserProfile(user)) {
    case true:
      res.json({ msg: 'profile_updated_successfully' });

      // LOCAL UPDATE (CACHE): user instance
      var needUpdating = userInstance.users.findIndex(e => e.id == req.body.id);
      if (needUpdating != -1) {
        userInstance.users[needUpdating]['username'] = req.body.username;
        userInstance.users[needUpdating]['address'] = req.body.address;
        userInstance.users[needUpdating]['fullname'] = req.body.fullname;
        userInstance.users[needUpdating]['phone'] = req.body.phone;
      }
      break;
    case false:
      res.json({ msg: 'failed' });
      break;
    default:
      res.json({ msg: 'unexpected_value' });
  }
}

// LAI, update user password, could be wrong
const updatePassword = (req, res) => {
  // CHECK IF REQ.BODY ISEMPTY OR MISSING PROP
  if (JSON.stringify(req.body) === JSON.stringify({}) ||
      !req.hasOwnProperty('id') ||
      !req.hasOwnProperty('currPass') ||
      !req.hasOwnProperty('newPass')) {
        res.json({ msg : 'invalid_request' });
        return;
  }

  switch (firebase.updatePassword(parseInt(req.body.id),
                                           req.body.currPass,
                                           req.body.newPass)) {
    case -1:
      res.json({ msg: 'wrong_password' });
      break;
    case -2:
      res.json({ msg: 'newPass_equals_currPass' });
      break;
    case true:
      res.json({ msg: 'password_updated_successfully' });

      // LOCAL UPDATE (CACHE): user instance
      var needUpdating = userInstance.users.findIndex(e => e.id == req.body.id);
      if (needUpdating != -1) {
        userInstance.users[needUpdating]['password'] = req.body.newPass;
      }

      break;
    case false:
      res.json({ msg: 'failed' });
      break;
    default:
      res.json({ msg: 'unexpected_value' });
  }
}

module.exports = {
  getUser,
  checkUser,
  addUser,
  updateProfile,
  updatePassword
};
