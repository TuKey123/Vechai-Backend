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
class test {
  constructor() {
    this.w = 1;
  }
}
// var order = new Order();
// console.log(order.number);
// var s = order.number;

// setTimeout(() => {
//     s.push(6);
//   console.log(order.number);
// }, 1000);

// var t = new test();
// t.w = 2;

var arr = ["1", "2", "3"];
const date = new Date("5/22/2021 13:28");
date1 = new Date("2021/2/5 9:56");

console.log(new Date() - date);

