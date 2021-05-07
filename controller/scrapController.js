const firebase = require("../model/firebase");

var scraps = [];
firebase.getData("Scrap").then((val) => {
  scraps = [...val];
});

function getId() {
  var id = 0;
  scraps.forEach((element) => {
    if (element.id > id) id = element.id;
  });
  return id + 1;
}

const getScraps = (req, res) => {
  res.json(scraps);
};

const addScrap = (req, res) => {
  var scrap = {
    id: 0,
    name: req.body.name,
    price: parseInt(req.body.price),
    type: req.body.type,
  };
  // get id
  scrap.id = getId();

  if (firebase.addData("Scrap", scrap)) {
    scraps.push(scrap);
    res.json({ msg: "successful" });
  } else res.json({ msg: "fail" });
};

module.exports = { getScraps, addScrap };
