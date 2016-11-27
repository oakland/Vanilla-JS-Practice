## 彻底理解 JS 面向对象编程（OOP）

接上文，[2-彻底理解JS中面向对象（二、困惑释疑-为什么要用OOP）](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/2-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E4%BA%8C%E3%80%81%E5%9B%B0%E6%83%91%E9%87%8A%E7%96%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E7%94%A8OOP%EF%BC%89.md)

### 三、JS 中如何实现 OOP

关于 JS 中的 OOP 如何实现，有很多种模式，过多的模式会让读者在没看正文前就眉头一皱。其实只要讲解其中的三种模式，大家对于 OOP 的理解就会很深刻了。在所有的这些讲解文章中，《高程三》的第六章循序渐进的讲解是最经典的。下面我就会按照高程三的顺序，依次讲解三种模式，希望大家有耐心看下去，除了《高程三》的内容，我还会写一些我自己的理解，有助于大家更加深刻的认识这些模式。当然，因为《高程三》出版的时候还没有 ES6，所以自然也不会有 ES6 实现继承的方式，这种方式作为第四种方式，也会本章节中讲解。

这部分的内容需要配合本仓库中 [11-learnOOPfromCircles.js / 1-prototypeInJS](https://github.com/oakland/Native-JS-Practice/tree/master/11-learnOOPfromCircles.js/1-prototypeInJS) 的内容去理解。

---

#### 工厂模式

查看 [1_factoryPattern.html](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/1-prototypeInJS/1_factoryPattern.html)，

工厂模式其实就是将对象挂载属性和方法的过程封装到一个函数中，按照下面的三个步骤去实现的：
新建一个对象 => 通过传入参数的方式，为对象挂载相应的属性和方法 => 返回对象

在这个函数中，注意工厂模式函数的的第一个语句：

```
var o = new Object(); 
```
有些文章将这里写成 var o = {}，其实也没有错，但是真正背后的内容其实是用 new Object() 来实现的，写成 new 的形式，更便于大家理解，工厂模式创建的每个实例都是单独的，互相没有关系的。

因为两个实例 sayName 完全相同，但是最后 person1.sayName == person2.sayName 的结果却是 false。可见只是简化了对象创造的方法，而并没有实现继承。

---

#### 构造器模式

查看 [2_constructorPattern.html](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/1-prototypeInJS/2_constructorPattern.html)，

可以看到 person1.sayName == person2.sayName 的结果依然是 false。其中的原因在之 [二、为什么要用 OOP](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/2-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E4%BA%8C%E3%80%81%E5%9B%B0%E6%83%91%E9%87%8A%E7%96%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E7%94%A8OOP%EF%BC%89.md) 中有详细阐述，主要参考从从英文版《高程三》中摘录的内容，大家看完应该会有更深刻的理解。

---

#### 原型模式（应该重点查看的模式）

这个模式是要详细说明的模式，我会摘录大段《高程三》中的内容，最后对这些内容做精简、概要，让大家能更明确地理解原型模式。

《高程三》英文版，184页，The Prototype Pattern 

"Each function is created with a prototype property, which is an object containing properties and methods that should be available to instances of a particular reference type. This object is literally
a prototype for the object to be created once the constructor is called. The benefit of using the prototype is that all of its properties and methods are shared among object instances. Instead of assigning object information in the constructor, they can be assigned directly to the prototype, as in this example:"

这段话非常经典，而且已经很明确地阐述了实例和原型之间的关系了。

每个**函数**都有一个 prototype 属性，记住，只有函数才有，对象没有，而每个对象都会拥有一个 \__proto__ 属性（后面会对 \__proto__ 属性详细讲解）。因为在 JS 中，函数也是对象，所以，函数也会拥有一个 \__proto__ 属性。也就是说函数会同时拥有 prototype 和 \__proto__ 属性，而对象只有 \__proot__ 属性。（大家仔细体会和品味这段话，或者先记下来，之后看完整个系列文章之后再回头来看这句话，非常重要）

构造器作为一个普通函数，如上面所说，会拥有一个 prototype 的属性。这个 prototype 属性是个对象，这个对象就是原型对象（下文说原型对象都指的是这个对象）。原型对象会拥有很多属性和方法，而一旦使用 new 操作符调用构造器函数的时候，所有的实例就会拥有构造器函数的 prototype 属性上的所有属性和方法，也就是原型对象上的所有属性和方法，这样就实现了原型继承。怎么样，很简单吧？也就是在 [3_prototypePattern.html](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/1-prototypeInJS/3_prototypePattern.html) 中，p1.sayName 和 p2.sayName 是同一个 sayName。当通过 `Person.prototype` 来修改 sayName 属性的时候，所有的实例都会受到影响，因为所有的实例都是指向这个方法的。

《高程三》英文版，185页，第一段话第三句： 

"Unlike the constructor pattern, the properties and methods are all shared among instances, so person1 and person2 are both accessing the same set of properties and the same sayName() function. "

上面这段英文是《高程三》对于原型继承的解释。

这里再对 \__proto__ 做一个简单的说明，每个由构造函数生成的实例都会拥有的是一个 [[prototype]]的属性，但是规范中并没有明确定义这样一个默认的属性，所以实际上是无法获取这个属性的，不过 FireFox, Safari, Chrome 都会支持通过 \__proto__ 来获取这个属性，所以才会有 \__proto__ 这样一个属性。也就是说 [[prototype]] == \__proto__。

关于 constrcutor 和实例，以及和 prototype 之间的关系，如下所示：

```
p1.constructor == p2.constructor == Person.prototype.constructor == Person
```
其实 p1.constructor 和 p2.constructor 之所以指向 Person 构造器的原因，就是因为他们继承了 Person.prototype.constructor 的原因。因为 Person.prototype 默认会拥有一个 constructor 属性，这个属性指回 Person 构造器。

原型链其实就是，原型对象的也有原型，所以会形成一个链状关系。对于 Person.prototype 而言，他也有原型，他的原型是 Person.prototype.__proto__，而这个对象是 new Object() 构造出来的， 所以 Person.prototype.__proto__ == Object.prototype。

这就是一级一级向上寻找的原型链。而关于这个原型链，最经典的就是知乎上某个回答者的一张图。[javascript原型](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/1-prototypeInJS/javascript%E5%8E%9F%E5%9E%8B.jpg)

也就是说这个实例对象是由谁 new 出来的，那么这个实例对象就会继承这个构造器的 prototype 属性中的属性和方法。

---

#### ES6 中的 class

最后再说一下 ES6 中 class 实现原型继承。

因为《高程三》出版的时候，还没有 ES6。因此《高程三》中没有阐述 ES6 中 class 相关的内容。这部分的内容，请查看 [MDN 关于 class 的解释](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class)。

网络上还有很多关于 ES6 中 class 的文章，我这里暂时放一个占位符，以后找到合适的文章会补充在这里。
这里还需补充其他的关于 ES6 中 class 相关的网络文章。

具体示例参见[4_class.html](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/1-prototypeInJS/4_class.html)。这个示例其实就是使用 class 实现的继承。

ES6 中 class 其实是原型继承的语法糖而已，所以没有什么可以讲解太多的，如果之前的内容你看懂了，那么ES6 中的 class 只是你创建原型的一种方式而已，并不是什么新的内容，原理还是前面提到的原型模式，只不过用了一个关键词 class。

接下文，[4-彻底理解JS中面向对象（四-一个OOP的典型案例）](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/4-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E5%9B%9B-%E4%B8%80%E4%B8%AAOOP%E7%9A%84%E5%85%B8%E5%9E%8B%E6%A1%88%E4%BE%8B%EF%BC%89.md)

---

#### Object.create() 方式

除了以上几张方式之外，还有一种不兼容旧版本浏览器的方式，就是使用 Object.create() 实现继承的方式。这种方式极其简单，被称为 pure prototypal inheritance，即 纯粹的原型继承 方式。以前，以前看到这个方式就觉得很麻烦，因为要牵扯到 JS 内置的 Object。但是实际这个方法非常简单，大家一看就明白。

```
var person = {
    firstname: 'Default',
    lastname: 'Default',
    greet: function() {
        console.log('Hi' + this.firstname);
    }
}

var p1 = Object.create(person);
console.log(p1)
```
将上面这段代码拷贝到浏览器控制台中回车，就会将 p1 打印出来，大家看 p1， 会发现 p1 是个空对象，就是没有任何的直接属性和方法，但是你打开 p1.__proto__ 会发现，这里面就有 `firstname`, `lastname`, 以及 'greet' 方法。什么意思？这表示 p1 的原型指向 person 这个普通的对象。也就是说再通过 Object.create() 创建一个对象，这个对象也会继承 person 的属性和方法。如果你想给原型上添加属性和方法，就只需要在 person 这个普通对象上添加键值对就可以了。

```
var p2 = Object.create(person);
console.log(p1.greet === p2.greet); // true
```

那么有些同学会说，这种方法，没法给 p1 或者 p2 添加自己的独有属性了呀？确实，如果只从上面的代码来看的话确实无法添加了。其实但是如果我们想要给 p1 和 p2 添加自己独有的 firstname 和 lastname 怎么办呢？那么就只能手动添加了：

```
p1.firstname = 'John';
p1.lastname = 'Doe';

p2.firstname = 'Jane';
p2.last.name = 'Doe';
```

通过这种方式添加的属性会覆盖原型中的默认属性，也就是 firstname:'Default' 和 lastname:'Default'。

但是前面还讲了，这种方式不兼容旧的浏览器，旧的浏览器无法解析 Object.create() 方法。那么应该如何做到兼容呢？我们需要手动添加一个兼容的方法：

```
if(!Object.create) {
    Object.create = function(o) {
        if(arguments.length > 1) {
            throw new Error('Object.create implementation only accepts the first
            parameter.');
        }     
        function F() {};
        F.prototype = o;
        return new F();   
    };
}
```