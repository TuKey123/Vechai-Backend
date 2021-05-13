const firebase = require("../model/firebase");

var orders = [];
firebase.getData("Order").then((val) => {
  orders = [...val];
});

function getId() {
  var id = 0;
  orders.forEach((element) => {
    if (element.id > id) id = element.id;
  });
  return id + 1;
}

const getOrders = (req, res) => {
  res.json(orders);
};

const addOrder = (req, res) => {
  var order = {
    id: 0,
    id_buyer: parseInt(req.body.id_buyer),
    id_seller: parseInt(req.body.id_seller),
    city: req.body.city,
    location: req.body.location,
    status: req.body.status,
    date: req.body.date,
  };
  // get id
  order.id = getId();

  if (firebase.addData("Order", order)) {
    // add data to array
    orders.push(order);
    res.json({ msg: "successful" });
  } else res.json({ msg: "fail" });
};

const deleteOrder = (req, res) => {
  var order = {
    id: parseInt(req.params.id),
  };

  if (firebase.deletaData("Order", order)) {
    //delete data from array
    for (let index = 0; index < orders.length; index++) {
      if (orders[index].id === order.id) {
        orders.pop(index);
        break;
      }
    }
    res.json({ msg: "successful" });
  } else res.json({ msg: "fail" });
};

const getOrderById = (req, res) => {
  var arr = [];
  var key = "id_buyer";
  if (req.query.role === "seller") key = "id_seller";

  orders.forEach((element) => {
    if (element[key] === parseInt(req.query.id)) arr.push(element);
  });

  res.json(arr);
};

const changeOrderStatus = (req, res) => {
  var id_order = parseInt(req.query.id);
  var id_buyer = parseInt(req.query.id_buyer);

  var order = {};
  orders.forEach((element) => {
    if (element.id === id_order) {
      element.id_buyer = id_buyer;
      element.status = "confirm";
      order = element;
      return;
    }
  });
  if (firebase.updateOrder(order)) {
    res.json({ msg: "successful" });
  } else res.json({ msg: "fail" });

};
module.exports = { getOrders, addOrder, deleteOrder, getOrderById,changeOrderStatus };
