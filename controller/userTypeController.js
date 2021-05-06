const { db, getData } = require("../model/firebase");

var userTypes = [];
getData("User_Type").then((val) => {
  userTypes = [...val];
});

const getUserTypes = (req, res) => {
  res.json(userTypes);
};

module.exports = { getUserTypes };
