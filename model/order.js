const firebase = require('./firebase');

var instance ;
class Order{
    constructor(){
        if(instance==undefined){
            instance = this;
            this.orders = [];
            this.getData();            
        }
        return instance;
    }

    getData(){
        firebase.getOrderDetail().then(val =>this.orders=[...val]);
    }
}

module.exports = Order;