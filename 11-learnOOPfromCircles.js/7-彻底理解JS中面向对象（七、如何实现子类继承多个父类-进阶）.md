## 彻底理解 JS 面向对象编程（OOP）

接上文，[6-彻底理解JS中面向对象（六、如何实现子类继承父类-进阶）](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/6-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E5%85%AD%E3%80%81%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E5%AD%90%E7%B1%BB%E7%BB%A7%E6%89%BF%E7%88%B6%E7%B1%BB-%E8%BF%9B%E9%98%B6%EF%BC%89.md)

### 七、如何实现子类继承多个父类（进阶）

这部分内容如果在第六部分内容没有消化之前，不建议阅读。
在第六部分中，我们实现了子类继承父类，那如果有多个父类需要继承怎么办呢？比如，我们 Child 子类除了继承 Father 父类之外，还要继承 Mother 父类怎么办？我们的 Mother 父类如下：

```javascript
function Mother(eyes, health) {
    this.eyes = eyes;
    this.health = health;
}

Mother.prototype.cook = function() {
    console.log('cooking');
};
```

这个过程中牵扯到 Object.assign() 方法，就是如何给一个对象添加其他对象的属性的过程。我们先把代码写出来，然后一一来分析：

```javascript
function Child(name, age, eyes, health, toys) {
    Father.call(this, name, age);
    Mother.call(this, eyes, health);
    this.toys = toys;
}

Child.prototype = Object.create(Father.prototype); // Child.prototype.__proto__ = Father.prototype

Object.assign(Child.prototype, Mother.prototype); // Child.prototype = Child.prototype + Mother.prototype

Child.prototype.constructor = Child;
Child.prototype.greeting = function() {
    console.log('Hi, I\'m little ' + this.name);
}

var child = new Child('jr', 1, 'big eyes', 100, ['NICIbear', 'IKEAdog']);

console.log(child); // 可以看到 child 的原型链上会同时有来自 Mother 的 cooking 和来自 Father 的 coding，虽然也会有来自 Father 的 greeting，但是也有自己独有的 greeting，只不过自己独有的 greeting 会覆盖 Father 的 greeting。
/*
把上面的代码放到控制台中打印出来，仔细看一下，你会发现 cooking 和 coding 在原型链的位置中是不同的。这是因为 Object.create() 方法是给对象原型上添加属性，而 Object.assign() 是给对象本身添加属性。
其实 Object.create() 方法主要是在 JS 中用来执行和继承有关的事情。而 Object.assign 则是改造对象本身。这个方法也特别有用，可以用来复制对象，可以用来给对象添加其他对象的属性，甚至可以用来合并对象等等。想知道这个方法的用法，请看 MDN 的文章：
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
*/
```

我们来详细解读一下上面的代码。上述代码和之前只继承 Father 父类的最大区别有两点。第一点就是在构造函数中增加了 Mother.call()，这个我相信如果大家理解 Father.call() 的话，这个也能理解。还有一点区别在于用到了 Object.assign() 这个方法。这个方法会将第二个参数以及之后的所有参数的可枚举属性都添加到第一个对象上面，同时返回第一个对象。正如我在注释中表达的一样，就是给 Child.prototype 上添加了所有 Mother.prototype 的属性。所以子类的原型中也会有所有 Mother 的属性和方法。而值得注意的是 Mother.prototype 上的属性和方法 和 Father.prototype 的属性和方法不在同一个层级的原型上。理由我卸载了整个代码最后的多行注释中。所以尽管看起来这个实现了同时继承两个父类，但是他们的原型链层级确实不同的。

以上这个就是实现继承多个父类的方法。

接下文，[8-彻底理解JS中面向对象（八、总结）]()