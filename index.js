const firebase = require("firebase");
const express = require("express");

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

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}.....`);
});

// get users
app.get("/users", (req, res) => {
  var arr = [];
  users.on("child_added", (snap) => {
    const data = snap.val();
    arr.push(data);
  });
  if (arr.length > 0) res.json(arr);
});

// get user type
app.get("/userTypes", (req, res) => {
  var arr = [];
  userTypes
    .on("child_added", (snap) => {
      const data = snap.val();
      arr.push(data);
      console.log(1);
    })
    .then(res.json(arr));
});

// get orders
app.get("/orders", (req, res) => {
  var arr = [];
  orders
    .on("child_added", (snap) => {
      const data = snap.val();
      arr.push(data);
    })
    .then(res.json(arr));
});

// get scrap orders
app.get("/scrapOrders", (req, res) => {
  var arr = [];
  scrapOrders
    .on("child_added", (snap) => {
      const data = snap.val();
      arr.push(data);
    })
    .then(res.json(arr));
});

// get scraps
app.get("/scraps", (req, res) => {
  var arr = [];
  scraps
    .on("child_added", (snap) => {
      const data = snap.val();
      arr.push(data);
    })
    .then(res.json(arr));
});
