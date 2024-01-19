// 定义一个类
class Person {
  constructor(name) {
    this.name = name;
  }
  print() {
    console.log("this.name", this.name);
  }
}

// 定义一个好人
class GoodPerson extends Person {
  constructor(name, isGood) {
    super(name);
    this.isGood = isGood;
  }
  // 重写print()
  print() {
    console.log(`这个人是个${this.isGood ? "好" : "坏"}人`);
  }
}

GoodPerson.prototype.age = function () {
  return "男";
};

// 实例化
const person = new GoodPerson("张三", true);
person.print();
console.log("person.name", person.name);
console.log("person.age()", person.age());

function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function () {
  return `(${this.x},${this.y})`;
};
var p = new Point(1, 2);
console.log("p", p.toString());

console.log("typeof Point", typeof Point);
console.log(
  "Point === Point.prototype.constructor",
  Point === Point.prototype.constructor
);

Object.assign(Point.prototype, {
  toString() {
    console.log("重写toString");
  },
  toValue() {
    console.log("打印toValue");
  },
});

Point.prototype.toValue();
p.toString();

console.log("p.__proto__", p.__proto__);

console.clear();

class Foo {
  bar = "hello";
  baz = "world";
  val = 2;
  constructor() {}
  get val() {
    return (this.val *= 2);
  }
  set val(value) {
    console.log("设置了新的value值：", value);
    this.val = 333;
    return;
  }
}
let foo = new Foo();
console.log("foo.bar+foo.baz", foo.bar + " " + foo.baz);

// foo.val = 123;
console.log("foo.val", foo.val);

console.clear();

class Point1 {
  #x;
  constructor(x = 0) {
    this.#x = +x;
  }
  get x() {
    return this.#x;
  }
  set x(value) {
    this.#x = +value;
  }
  log() {
    console.log("this.#x", this.#x);
    console.log("#x in this", #x in this);
  }
}
let p1 = new Point1(2);
p1.x = 22 / 7;
console.log("p1.x", p1.x);
p1.log();

console.clear();

class C {
  static x = 1;
  static {
    console.log("静态块，每个类只会执行一次 ");
    this.x = 2333;
  }
}
let c = new C();
let cc = new C();
let ccc = new C();

console.clear();

// let Log = require("./utils/log");
// let log = new Log('test');
// log.error();

import { Log,L } from "./utils/log.js";
let log = new L("test");
log.log();
