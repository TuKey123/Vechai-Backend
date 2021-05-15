const firebase = require('./firebase');

var instance ;
class ScrapOrder{
    constructor(){
        if(instance==undefined){
            instance = this;
            this.scrapOrders = [];
            this.getData();            
        }
        return instance;
    }
    
    getData(){
        firebase.getData('Scrap_Order').then(val =>this.scrapOrders=[...val]);
    }
}

module.exports = ScrapOrder;