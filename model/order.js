const firebase = require('./firebase');

class Order{
    static instance = new Order();

    constructor(){
        firebase.getData('Order').then(val=>{
            this.orders = [...val];
        });
    }    

}

module.exports = Order;