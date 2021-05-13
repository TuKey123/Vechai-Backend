const firebase = require('./firebase');

var instance ;
class User{
    constructor(){
        if(instance==undefined){
            instance = this;
            this.users = [];
            this.getData();            
        }
        return instance;
    }
    
    getData(){
        firebase.getData('User').then(val =>this.users=[...val]);
    }
}

module.exports = User;