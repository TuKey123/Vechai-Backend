const firebase= require("../model/firebase");

var scrapOrders = [];
firebase.getData("Scrap_Order").then((val) => {
  scrapOrders = [...val];
});

function getId(){
  var id = 0;
  scrapOrders.forEach(element => {
    if(element.id > id) id = element.id;
  });
  return id+1;
}

const getScrapOders = (req, res) => {
  res.json(scrapOrders);
};

const addScrapOrder = (req, res) => {
  var scrapOrder = {
    id: 0,
    id_order:parseInt(req.body.id_order),
    id_scrap:parseInt(req.body.id_scrap),
    total:parseInt(req.body.total),
    weight:parseFloat(req.body.weight)
  };
  // get id
  scrapOrder.id = getId();

  if (firebase.addData("Scrap_Order", scrapOrder)) {
    scrapOrders.push(scrapOrder);
    res.json({ msg: "successful" });
  } else res.json({ msg: "fail" });
};

module.exports = { getScrapOders,addScrapOrder };
