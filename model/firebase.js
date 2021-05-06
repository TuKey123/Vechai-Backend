const firebase = require("firebase");

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

async function getData(name) {
  var table = db.ref(name);
  var arr = [];

  await new Promise((resolve, reject) => {
    table.on("child_added", (snap) => {
      const data = snap.val();
      arr.push(data);
      resolve(arr);
    });
  });

  return arr;
}

function addData(name, data) {
  try {
    var table = db.ref(name + "/" + data.id);
    table.set(data);
  } catch {
    return false;
  }
  return true;
}

function deletaData(name, data) {
  try {
    var table = db.ref(name + "/" + data.id);
    table.remove();
  } catch {
    return false;
  }
  return true;
}

module.exports = { db, getData, deletaData };
