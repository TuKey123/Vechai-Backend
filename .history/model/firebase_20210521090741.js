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

// Get 
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

async function getOrderDetail() {
  var order = db.ref('Order');
  var scrapOrder = db.ref('Scrap_Order');
  var arr = [];

  await new Promise((resolve, reject) => {
    order.on("child_added", snap => {
      var orderRow = snap.val();
      orderRow.total_weight = 0;
      orderRow.total_price = 0;
      scrapOrder.orderByChild('id_order').equalTo(orderRow.id).once('child_added',snap=>{
        var sOrderRow = snap.val();
        orderRow.total_weight += sOrderRow.weight;
        orderRow.total_price += sOrderRow.total;
      });
      arr.push(orderRow);
      resolve(arr);
    });
  });

  return arr;
}

// Add 
function addData(name, data) {
  try {
    var table = db.ref(name);
    table.push().set(data);
  } catch {
    return false;
  }
  return true;
}

// Update
function updateOrder(order){
  try {
    var table = db.ref('Order');
    table.on("child_added", (snap) => {
      if(snap.val().id===order.id){
        key = snap.key;
      }
    });
    db.ref('Order/'+key).set(order);
  } catch {
    return false;
  }
  return true;
}

// Delete

function deletaData(name, data) {
  try {
    var table = db.ref(name);
    var key;
    table.on("child_added", (snap) => {
      if(snap.val().id===data.id){
        key = snap.key;
      }
    });
    db.ref(name+'/'+key).remove();
  } catch {
    return false;
  }
  return true;
}

function deleteScrapOrder(order) {
  try {
    var table = db.ref('Scrap_Order');
    var key;
    table.on("child_added", (snap) => {
      if(snap.val().id_order===order.id){
        key = snap.key;
        db.ref('Scrap_Order/'+key).remove();
      }
    });

  } catch {
    return false;
  }
  return true;
}


// LAI, 
function updateUserProfile(user) {

  try {
    var table = db.ref('')
  } catch {
    return false;
  }

  return true;
}



module.exports = { db, getData, addData,deletaData ,updateOrder, getOrderDetail, deleteScrapOrder};
