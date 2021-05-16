const firebase = require("../model/firebase");
const ScrapOrder = require("../model/scraporder");
const Order = require("../model/order");

var sOrderInstance = new ScrapOrder();
var orderInstance = new Order();

function getId() {
  var id = 0;
  sOrderInstance.scrapOrders.forEach((element) => {
    if (element.id > id) id = element.id;
  });
  return id + 1;
}

const getScrapOders = (req, res) => {
  res.json(sOrderInstance.scrapOrders);
};

const getScrapOdersById = (req, res) => {
  const id_order = parseInt(req.query.id);
  res.json(
    sOrderInstance.scrapOrders.filter(
      (element) => element.id_order === id_order
    )
  );
};

const addScrapOrder = (req, res) => {
  var scrapOrder = {
    id: 0,
    id_order: parseInt(req.body.id_order),
    id_scrap: parseInt(req.body.id_scrap),
    total: parseInt(req.body.total),
    weight: parseInt(req.body.weight),
  };

  // get id
  scrapOrder.id = getId();

  try {
    if (firebase.addData("Scrap_Order", scrapOrder)) {
      sOrderInstance.scrapOrders.push(scrapOrder);
      orderInstance.orders.forEach((element) => {
        if (element.id === scrapOrder.id_order) {
          element.total_price += scrapOrder.total;
          element.total_weight += scrapOrder.weight;
          return;
        }
      });
      res.json({ msg: "successful" });
    } else res.json({ msg: "fail" });
  } catch (error) {
    res.json({ msg: "fail" });
  }
};

module.exports = { getScrapOders, addScrapOrder, getScrapOdersById };
