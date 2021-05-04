const firebase = require("firebase");
const express = require("express");
var bodyParser = require("body-parser");
const { json } = require("body-parser");

// database config
var firebaseConfig = {
  apiKey: "AIzaSyDWjylj7sOmLTPWYWD4zSuPdGN6y1bWhkc",
  authDomain: "vechai-prodn.firebaseapp.com",
  databaseURL:
    "https://vechai-prodn-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vechai-prodn",
  storageBucket: "vechai-prodn.appspot.com",
  messagingSenderId: "52687886966",
  appId: "1:52687886966:web:690c95e8036d97d302dd57",
  measurementId: "G-RHBGTBNWCG",
};
firebase.initializeApp(firebaseConfig);

var db = firebase.database();

// tables
var users = db.ref("User");
var userTypes = db.ref("User_Type");
var orders = db.ref("Order");
var scrapOrders = db.ref("Scrap_Order");
var scraps = db.ref("Scrap");

// server
const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}.....`);
});

function getJson(colection) {
  return new Promise((resolve, reject) => {
    var arr = [];

    colection.on("child_added", (snap) => {
      const data = snap.val();
      arr.push(data);
      resolve(arr);
    });
  });
}

// get users
app.get("/users", (req, res) => {
  getJson(users).then((resolve) => res.json(resolve));
});

// get user type
app.get("/userTypes", (req, res) => {
  getJson(userTypes).then((resolve) => res.json(resolve));
});

// get orders
app.get("/orders", (req, res) => {
  getJson(orders).then((resolve) => res.json(resolve));
});

// get scrap orders
app.get("/scrapOrders", (req, res) => {
  getJson(scrapOrders).then((resolve) => res.json(resolve));
});

// get scraps
app.get("/scraps", (req, res) => {
  getJson(scraps).then((resolve) => res.json(resolve));
});

// check user
app.post("/checkUser", (req, res) => {
  var user = {
    username: req.body.username,
    password: req.body.password,
  };
  
  getJson(users).then((resolve) => {
    var check = false;
    resolve.forEach(element => {
      if(element.username === user.username && element.password === user.password){
        check = true;
        user = element;
        return;
      }
    });

    if(check) res.json(user);
    else res.json({msg:'user not found'});
  });
});
