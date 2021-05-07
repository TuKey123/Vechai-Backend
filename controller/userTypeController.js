const firebase = require("../model/firebase");

var userTypes = [];
firebase.getData("User_Type").then((val) => {
  userTypes = [...val];
});

function getId(){
  var id = 0;
  userTypes.forEach(element => {
    if(element.id > id) id = element.id;
  });
  return id+1;
}

const getUserTypes = (req, res) => {
  res.json(userTypes);
};

const addUserType = (req, res) => {
  var userType = {
    id: 0,
    role:req.body.role
  };

  // get id
  userType.id = getId();
  
  if (firebase.addData("User_Type", userType)) {
    userTypes.push(userType);
    res.json({ msg: "successful" });
  } else res.json({ msg: "fail" });
};

module.exports = { getUserTypes,addUserType };
