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
      scrapOrder.orderByChild('id_order').equalTo(orderRow.id).once('child_added', snap => {
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
function updateOrder(order) {
  try {
    var table = db.ref('Order');
    table.on("child_added", (snap) => {
      if (snap.val().id === order.id) {
        key = snap.key;
      }
    });
    db.ref('Order/' + key).set(order);
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
      if (snap.val().id === data.id) {
        key = snap.key;
      }
    });
    db.ref(name + '/' + key).remove();
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
      if (snap.val().id_order === order.id) {
        key = snap.key;
        db.ref('Scrap_Order/' + key).remove();
      }
    });

  } catch {
    return false;
  }
  return true;
}


// LAI, update user profile, could be wrong
function updateUserProfile(user) {
  /**
   * DEFINE RETURN VALUE
   * true : profile_updated_successfully
   * false : failed
   */
  var results;
  try {
    db.ref('User').on('child_added', (snap) => {
      if (snap.val().id === user.id) {
        db.ref('User/' + snap.key).update({
          username: user.username,
          address: user.address,
          fullname: user.fullname,
          phone: user.phone
        });
        results = true;
      }
    })
  } catch (error) {
    results = error;
  } finally {
    return results;
  }
}

// LAI, update user password, could be wrong
function updatePassword(_userID, _currPassword, _newPassword) {
  /**
   * DEFINE RETURN VALUES
   * -1 : wrong_password
   * -2 : newPass_equals_currPass
   * true : password_updated_successfully
   * false : failed
   */
  var result;
  try {
    db.ref('User').on('child_added', (snap) => {
      if (snap.val().id === _userID) {
        if (snap.val().password != _currPassword) {
          result = -1;
        }
        else if (snap.val().password == _newPassword) {
          result = -2;
        }
        else {
          db.ref('User/' + snap.key).update({ password: _newPassword });
          result = true;
        }
      }
    })
  } catch (error) {
    result = false;
  } finally {
    return result;
  }
}

function randPassword() {
  return Math.random().toString(36).slice(-8);
}

function resetPassword(_userID) {
  /**
   * DEFINE RETURN VALUES
   * ... : new pass word
   * false : failed
   */
  var result;
  try {
    db.ref('User').on('child_added', (snap) => {
      if (snap.val().id === _userID) {
        result = randPassword();
        db.ref('User/' + snap.key).update({
          password : result
        });
      }
    })
  } catch (error) {
    result = false;
  } finally {
    return result;
  }
}

module.exports = {
  db,
  getData,
  addData,
  deletaData,
  updateOrder,
  getOrderDetail,
  deleteScrapOrder,
  updateUserProfile,
  updatePassword,
  resetPassword
};
