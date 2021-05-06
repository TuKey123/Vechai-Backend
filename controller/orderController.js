const firebase = require("../model/firebase");

var orders = [];
firebase.getData("Order").then((val) => {
  orders = [...val];
});

const getOrders = (req, res) => {
  res.json(orders);
};

const addOrder = (req,res) =>{
  var order = {
    id:req.body.id,
    id_buyer:req.body.id_buyer,
    id_seller:req.body.id_seller,
    city:req.body.city,
    location:req.body.location,
    status:req.body.status,
    date:req.body.date,
  };
  if (firebase.addData('Order',order)){
    orders.push(order);
    res.json({msg:'successful'});
  }
  else res.json({msg:'fail'}); 
 
}

const deleteOrder = (req,res) =>{
  var order = {
    id:req.params.id,
  };

  if (firebase.deletaData('Order',order)) res.json({msg:'successful'});
  else res.json({msg:'fail'}); 
 
}

module.exports = { getOrders,addOrder,deleteOrder };
