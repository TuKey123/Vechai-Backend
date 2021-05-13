var instance;
class Order {
  constructor() {
    if (instance == undefined) {
      instance = this;
      this.number = [];
      setTimeout(() => {
        this.number = [1, 2, 3];
      }, 1000);
      return instance;
    }
  }
}

var order = new Order();
console.log(order.number);
var s = order.number;

setTimeout(() => {
    s.push(6);
  console.log(order.number);
}, 1000);

