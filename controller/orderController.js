const firebase = require("../model/firebase");
const Order = require("../model/order");
const ScrapOrder = require("../model/scraporder");
const User = require("../model/user");

var orderInstance = new Order();
var sOrderInstance = new ScrapOrder();
var userInstance = new User();

function getId() {
  var id = 0;
  orderInstance.orders.forEach((element) => {
    if (element.id > id) id = element.id;
  });
  return id + 1;
}

const getOrders = (req, res) => {
  res.json(orderInstance.orders);
};

const addOrder = (req, res) => {
  var order = {
    id: 0,
    id_buyer: 0,
    id_seller: parseInt(req.body.id_seller),
    location: req.body.location,
    status: req.body.status,
    date: req.body.date,
    note: req.body.note,
  };
  // get id
  order.id = getId();

  try {
    if (firebase.addData("Order", order)) {
      // add data to array
      order.total_price = 0;
      order.total_weight = 0;
      orderInstance.orders.push(order);
      res.json({ msg: "successful" });
    } else res.json({ msg: "fail" });
  } catch (error) {
    res.json({ msg: "fail" });
  }
};

const deleteOrder = (req, res) => {
  var order = {
    id: parseInt(req.params.id),
  };

  try {
    if (firebase.deletaData("Order", order)) {
      //delete data from array
      orderInstance.orders.forEach((element, index) => {
        if (element.id === order.id) {
          orderInstance.orders.splice(index, 1);
          return;
        }
      });

      //delete scrap order
      firebase.deleteScrapOrder(order);
      sOrderInstance.scrapOrders = sOrderInstance.scrapOrders.filter(
        (val) => val.id_order !== order.id
      );

      res.json({ msg: "successful" });
    } else res.json({ msg: "fail" });
  } catch (error) {
    res.json({ msg: "fail" });
  }
};

const getOrderById = async (req, res) => {
  var arr = [];
  var key = "id_buyer";
  if (req.query.role === "seller") key = "id_seller";

  orderInstance.orders.forEach((element) => {
    if (element[key] === parseInt(req.query.id)) {
      var object = {
        id: element.id,
        location: element.location,
        date: element.date,
        status: element.status,
        note: element.note,
        total_price: element.total_price,
        total_weight: element.total_weight,
        buyer: {
          id: element.id_buyer,
        },
        seller: {
          id: element.id_seller,
        },
      };
      userInstance.users.forEach((element) => {
        if (element.id === object.buyer.id) {
          object.buyer.phone = element.phone;
          object.buyer.fullname = element.fullname;
        }
        if (element.id === object.seller.id) {
          object.seller.phone = element.phone;
          object.seller.fullname = element.fullname;
        }
      });
      arr.push(object);
    }
  });

  res.json(arr);
};

const getOrderByStatus = async (req, res) => {
  var arr = [];
  const status = req.query.type;
  orderInstance.orders.forEach((element) => {
    if (element.status === status) {
      var object = {
        id: element.id,
        location: element.location,
        date: element.date,
        status: element.status,
        note: element.note,
        total_price: element.total_price,
        total_weight: element.total_weight,
        buyer: {
          id: element.id_buyer,
        },
        seller: {
          id: element.id_seller,
        },
      };
      userInstance.users.forEach((element) => {
        if (element.id === object.buyer.id) {
          object.buyer.phone = element.phone;
          object.buyer.fullname = element.fullname;
        }
        if (element.id === object.seller.id) {
          object.seller.phone = element.phone;
          object.seller.fullname = element.fullname;
        }
      });
      arr.push(object);
    }
  });

  res.json(arr);
};

const getOrderByDate = (req, res) => {
  var dateStr = req.query.date;
  const components = dateStr.split("/");

  var arr = [];

  if (components.length === 1) {
    // year
    const year = parseInt(components[0]);

    orderInstance.orders.forEach((element) => {
      const date = new Date(element.date.split(" ")[0]);
      if (year == date.getFullYear()) arr.push(element);
    });
    res.json(arr);
  } else if (components.length === 2) {
    // month,year
    const month = parseInt(components[0]);
    const year = parseInt(components[1]);
    orderInstance.orders.forEach((element) => {
      const date = new Date(element.date.split(" ")[0]);
      if (year == date.getFullYear() && month == date.getMonth() + 1)
        arr.push(element);
    });
    res.json(arr);
  } else if (components.length === 3) {
    // day,month,year
    const day = parseInt(components[1]);
    const month = parseInt(components[0]);
    const year = parseInt(components[2]);
    orderInstance.orders.forEach((element) => {
      const date = new Date(element.date.split(" ")[0]);
      if (
        year == date.getFullYear() &&
        month == date.getMonth() + 1 &&
        day == date.getDate()
      )
        arr.push(element);
    });
    res.json(arr);
  }
};

const getOrderBy7DaysLatest = (req, res) => {
  var arr = [];
  orderInstance.orders.forEach((element) => {
    const day = new Date();
    const orderDay = new Date(element.date.split(" ")[0]);
    if (day.getMonth() === orderDay.getMonth() && day.getFullYear() === orderDay.getFullYear()) {
      const subtract = day.getDate() - orderDay.getDate();
      if (subtract <= 7 && subtract >= 0) 
        arr.push(element);    
    }
  });
  // sort
  arr.sort((a,b)=>{
    var date1 = new Date(a.date.split(" ")[0]);
    var date2 = new Date(b.date.split(" ")[0]);
    return date2-date1;
  });
  res.json(arr);
};

const confirm = (req, res) => {
  var id_order = parseInt(req.query.id);
  var id_buyer = parseInt(req.query.id_buyer);

  var order = {};
  orderInstance.orders.forEach((element) => {
    if (element.id === id_order) {
      element.id_buyer = id_buyer;
      element.status = "confirm";
      order = element;
      return;
    }
  });

  try {
    if (firebase.updateOrder(order)) res.json({ msg: "successful" });
    else res.json({ msg: "fail" });
  } catch (error) {
    res.json({ msg: "fail" });
  }
};

const complete = (req, res) => {
  var id_order = parseInt(req.query.id);

  var order = {};
  orderInstance.orders.forEach((element) => {
    if (element.id === id_order) {
      element.status = "complete";
      order = element;
      return;
    }
  });

  try {
    if (firebase.updateOrder(order)) res.json({ msg: "successful" });
    else res.json({ msg: "fail" });
  } catch (error) {
    res.json({ msg: "fail" });
  }
};

module.exports = {
  getOrders,
  addOrder,
  deleteOrder,
  getOrderById,
  getOrderByStatus,
  getOrderByDate,
  getOrderBy7DaysLatest,
  confirm,
  complete,
};
