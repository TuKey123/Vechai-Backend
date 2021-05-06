const { db, getData } = require("../model/firebase");

var scraps = [];
getData("Scrap").then((val) => {
  scraps = [...val];
});

const getScraps = (req, res) => {
  res.json(scraps);
};

module.exports = { getScraps };
