const {getData } = require("../model/firebase");

var scrapOrders = [];
getData("Scrap_Order").then((val) => {
  scrapOrders = [...val];
});

const getScrapOders = (req, res) => {
  res.json(scrapOrders);
};

module.exports = { getScrapOders };
