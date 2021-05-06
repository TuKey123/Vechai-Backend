const firebase = require("../model/firebase");

var users = [];
firebase.getData("User").then((val) => {
  users = [...val];
});

const getUser = (req, res) => {
  res.json(users);
};

const checkUser = (req, res) => {
  var user = {
    username: req.body.username,
    password: req.body.password,
    address: "",
    fullname: "",
    id: "",
    phone: "",
    type: "",
  };

  var check = false;
  users.forEach((element) => {
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

const addUser = (req,res) =>{
  var user = {
    username: req.body.username,
    password: req.body.password,
    address: req.body.address,
    fullname: req.body.fullname,
    id: req.body.id,
    phone: req.body.phone,
    type: req.body.type,
  };
  if (firebase.addData('User',user)) res.json({msg:'successful'});
  else res.json({msg:'fail'}); 
 
}
module.exports = { getUser, checkUser,addUser};
