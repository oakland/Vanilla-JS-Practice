## 彻底理解 JS 面向对象编程（OOP）

接上文，[2-彻底理解JS中面向对象（二、困惑释疑-为什么要用OOP）](http://)

### 三、JS 中如何实现 OOP

关于 JS 中的 OOP 如何实现，有很多种模式，过多的模式会让读者在没看正文前就眉头一皱。其实只要讲解其中的三种模式，大家对于 OOP 的理解就会很深刻了。在所有的这些讲解文章中，《高程三》的第六章循序渐进的讲解是最经典的。下面我就会按照高程三的顺序，依次讲解三种模式，希望大家有耐心看下去，除了《高程三》的内容，我还会写一些我自己的理解，有助于大家更加深刻的认识这些模式。当然，因为《高程三》出版的时候还没有 ES6，所以自然也不会有 ES6 实现继承的方式，这种方式作为第四种方式，也会本章节中讲解。

这部分的内容需要配合本仓库中 [11-learnOOPfromCircles.js / 1-prototypeInJS](https://github.com/oakland/Native-JS-Practice/tree/master/11-learnOOPfromCircles.js/1-prototypeInJS) 的内容去理解。

#### 工厂模式

工厂模式，其实就是把对象赋值属性和方法的整个动作交给一个函数去实现，请查看 [1_factoryPattern.html](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/1-prototypeInJS/1_factoryPattern.html)，在这个函数中，注意工厂模式函数的的第一个语句：

```
var o = new Object(); 
```
有些文章将这里写成 var o = {}，其实也没有错，但是真正背后的内容其实是用 new Object() 来实现的，写成 new 的形式，更便于大家理解，工厂模式创建的每个实例都是单独的，互相没有关系的。

因为两个实例 sayName 完全相同，但是最后 person1.sayName == person2.sayName 的结果却是 false。可见只是简化了对象创造的方法，而并没有实现继承。

#### 构造器模式

查看 [2_constructorPattern.html](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/1-prototypeInJS/2_constructorPattern.html)，

可以看到 person1.sayName == person2.sayName 的结果依然是 false。其中的原因在上面 二、为什么要用 OOP 中有详细阐述，摘录了英文版《高程三》的内容，大家看完应该会有更深刻的理解。

#### 原型模式

这个是要详细说明的模式，我会摘录大段《高程三》中的内容，并做精简的概要，让大家能更明确地理解原型模式。

Each function is created with a prototype property, which is an object containing properties and methods that should be available to instances of a particular reference type. This object is literally
a prototype for the object to be created once the constructor is called. The benefit of using the prototype is that all of its properties and methods are shared among object instances. Instead of assigning object information in the constructor, they can be assigned directly to the prototype, as in this example:

上面这段话摘录自《高程三》对于原型模式的第一段话，这段话非常经典，而且就已经很明确地阐述了原型之间的关系了。
每个**函数**都有一个 prototype 属性，记住，只有函数才有，对象没有，而每个对象都会拥有的，是一个 \__proto__ 属性，后面会对 \__proto__ 属性详细讲解。其实因为在 JS 中，函数也是对象，所以，函数也会拥有一个 \__proto__ 属性。也就是说函数会同时拥有 prototype 和 \__proto__ 属性，而对象只有 \__proot__ 属性。
构造器作为一个普通函数，也会拥有一个 prototype 的属性。这个 prototype 属性是个对象，这个对象会拥有很多属性和方法，而一旦使用 new 操作符调用构造器函数的时候，所有的实例就会拥有构造器函数的 prototype 属性上的所有属性和方法，这样就实现了原型继承。怎么样，很简单吧？也就是在 [3_prototypePattern.html](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/1-prototypeInJS/3_prototypePattern.html) 中，p1.sayName 和 p2.sayName 是同一个 sayName。当通过 `Person.prototype` 来修改一个属性的时候，所有的实例都会受到影响。

Unlike the constructor pattern, the properties and methods are all shared among instances, so person1 and person2 are both accessing the same set of properties and the same sayName() function. 

上面这段英文是《高程三》对于原型继承的解释。

这里再对 \__proto__ 做一个简单的说明，每个由构造函数生成的实例都会拥有的是一个 [[prototype]]的属性，但是规范中并没有明确定义这样一个默认的属性，所以实际上是无法获取这个属性的，不过 FireFox, Safari, Chrome 都会支持通过 \__proto__ 来获取这个属性，所以才会有 \__proto__ 这样一个属性。也就是说 [[prototype]] == \__proto__。

关于 constrcutor 和实例，以及和 prototype 之间的关系，如下所示：

```
p1.constructor == p2.constructor == Person.prototype.constructor == Person
```
其实 p1.constructor 和 p2.constructor 之所以指向 Person 构造器的原因，就是因为他们继承了 Person.prototype.constructor 的原因。

原型链，其实就是对于 Person.prototype 而言，他也有原型，他的原型是 Person.prototype.__proto__，而这个对象是 new Object() 构造出来的， 所以 Person.prototype.__proto__ == Object.prototype。

这就是一级一级向上寻找的原型链。而关于这个原型链，最经典的就是知乎上某个回答者的一张图。[javascript原型](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/1-prototypeInJS/javascript%E5%8E%9F%E5%9E%8B.jpg)

也就是说这个实例对象是由谁 new 出来的，那么这个实例对象就会继承这个构造器的 prototype 属性中的属性和方法。

#### ES6 中的 class

《高程三》出版的时候，还没有 ES6。因此《高程三》中没有阐述 ES6 中 class 相关的内容。这部分的内容，请查看 [MDN 关于 class 的解释](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class)。这里还需补充其他的关于 ES6 中 class 相关的网络文章。具体示例参见[4_class.html](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/1-prototypeInJS/4_class.html)。

ES6 中 class 其实是原型继承的语法糖而已，所以没有什么可以讲解太多的，如果上面的内容你看懂了，那么ES6 中的 class 只是你创建原型的一种方式，原理还是前面提到的原型模式。

接下文，[4-彻底理解JS中面向对象（四-一个OOP的典型案例）](http://)