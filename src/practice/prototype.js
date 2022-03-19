function A() {}
A.prototype.n = 1

const b = new A()

A.prototype = {
    m: 2,
    n: 3
}

const c = new A()

console.log(b.n, b.m)
console.log(c.n, c.m)


var F = function() {}

Object.prototype.a = function() {
  console.log('a')
};

Function.prototype.b = function() {
  console.log('b')
}

var f = new F()

// f.a(); // a
// f.b(); // b is not a function

// F.a(); // a
// F.b(); // b


function Person(name) {
    this.name = name
}
let p = new Person('Tom')
// console.log(p.__proto__)
// console.log(Person.__proto__)

Object.prototype.isInstanceOf = function(target) {
    let proto = Object.getPrototypeOf(this)
    while(proto) {
        console.log(proto, target)
        if(proto === target.prototype) {
            return true
        } 
        proto = proto = Object.getPrototypeOf(proto)
    }
    return false
}

console.log(new String('123').isInstanceOf(String))

