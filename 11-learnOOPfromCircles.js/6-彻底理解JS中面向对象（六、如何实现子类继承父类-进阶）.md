## 彻底理解 JS 面向对象编程（OOP）

接上文，[5-彻底理解JS中面向对象（五、自己实现一个OOP）]()

### 六、如何实现子类继承父类（进阶）

这部分内容是作为进阶了解的，如果觉得以上的内容需要消化一段时间的话，可以暂时不用看这部分的内容。

上面我们主要讲解了如何创建一个 class，然后根据这个 class 来创建很多 instance。所有的 instance 都是继承了这个 class 的一些属性和方法。如果打个比方的话，这个 class 就像是一个模具，new 一个 instance 出来，就像是通过工厂车间的模具浇铸出来一个一个的产品，这些产品全都一模一样。然后我们自己再把这个产品喷涂不同的色彩或者贴上不同的标签，让他们有自己独特的特点，但是他们的本质都是一样的。

这个时候还有另外一个问题，我们如何通过一个已有的父类(SuperClass)来创建一个子类(SubClass)呢？比如，我们已经有一个 Father 的类，如果实现一个 Child 的类呢？这个 Child 类除了继承 Father 类的属性和方法之外，还会有一些自己独特的属性和方法，甚至可能会覆盖一些 Father 类的属性或者方法。然后通过 var child1 = new Child() 来创建一个 child1，ta 会继承 Child 类的属性和方法，也会继承一些 Father 类的属性和方法。

要想实现这个目标，我们主要要关注两个点，一个是 call 方法的调用，一个是 Object.create() 方法的使用。这个过程中还牵扯到我们需要理解构造函数 new 一个实例出来的时候的这个过程到底是如何的？

假设，我们现在有一个 Father 类。

```javascript
function Father(name, age) {
    this.name = name;
    this.age = age;
}
Father.prototype.code = function() {
    console.log('coding...');
}
Father.prototype.greeting = function() {
    console.log('Hi, I\'m Mr ' + this.name);
}
```

现在我们想实现一个 Child 类，也有一个 code 方法和 greeting 方法，我们当然也可以像上面一样，给 Child.prototype 添加一个 code 和 greeting 的方法。但是这不符合 DRY 原则，既然 Father 已经有一个 code 方法了，我们为什么不从 Father 类来继承呢？这就是为什么要实现子类继承父类的情况。子类继承父类牵扯到 Object.create() 这个方法。其次，我们知道 call 方法可以改变 this 的指向，所以，实现 name, age 传参可以通过 call 方法来实现。

我们一个一个来进行说明，先说 call 方法。

```javascript
function Child(name, age, toys) {
    Father.call(this, name, age); // 调用父类的构造函数
    this.toys = toys; // 添加自己独有的属性
}
```

我们知道 new 的过程，其实就是工厂模式的一种简化。就是说 new 的过程是，先创建一个实例，然后所有的 this 都指向这个实例，也就是说 this.name = name 也好，this.age = age 也好，都是在给这个实例添加属性，添加完所有的属性之后，再将这个实例 return 出去。我们用 JS 语言表现出来，其实就是下面这个样子。

```javascript
function Father(name, age) {
    this.name = name;
    this.age = age;
}

var f1 = new Father('jizq', 29);

// 下面是如何实现 f1 的过程
var instance;
instance.name = name; // Father 类中会用 this 这个抽象的代词来指代所有的实例，当具体生成实例的时候，就会指向具体的实例。
instance.age = age; // 同理
return instance; // 相当于 f1 = instance，就是把这个生成的实例赋值给 f1
```

理解了上面这个过程，我们来说说 Father.call(this, name, age)。我们知道 call 可以改变 this 的指向，因此此时 this 就会指向 Child 的实例，也就是说，Father.call(this, name, age)中执行 this.name = name 的时候，这里的 this 指的就是 Child 实例。所以这个过程就是给 Child 实例添加 name 和 age 属性的过程。

this.toys = toys 则是给 Child 实例添加自己独有的属性，这个不用多讲。

接着来看一下如何让 Child.prototype 继承 Father.prototype 中的属性和方法呢？我们需要用到 Object.create() 方法。

```javascript
Child.prototype = Object.create(Father.prototype); // 相当于 Child.prototype.__proto__ = Father.prototype
```

Object.create() 方法返回一个对象，这个对象的原型就是这个方法的参数。例如：

```javascript
var person = {
    name: 'jizq',
    sayHi: function() {
        console.log('Hi!');        
    }
}
var p1 = Object.create(person); // 相当于 p1.__proto__ = person
console.log(p1); // 可以把 p1 打印出来在控制台看看原型链关系
```

所以说实例会继承 Child.prototype 的属性和方法，而 Child.prototype 又会继承 Father.prototype 的属性和方法。这样，就相当于实例会继承 Father.prototype 的属性和方法了。但是这里唯一有一个需要注意的地方，就是这个时候打印实例的 constructor 返回的是 Father，是因为整个 Child.prototype 都被 Father.prototype 替换了，所以自然就会指向 Father，我们需要把 constructor 修正一下。

```javascript
Child.prototype.constructor = Child;
```
最后，Father 的 greeting 方法不适合 Child，我们需要给 Child 子类添加自己的 greeting 方法。

```javascript
Child.prototype.greeting = function() {
    console.log('Hi, I\'m little ' + this.name);
};
```

OK，到这里就大功告成了。我们把所有的内容都写在一起。

```javascript
function Father(name, age) {
    this.name = name;
    this.age = age;
}

Father.prototype.code = function() {
    console.log('coding...');
};

Father.prototype.greeting = function() {
    console.log('Hi, I\'m Mr ' + this.name);
};

function Child(name, age, toys) {
    Father.call(this, name, age);
    this.toys = toys;
}

Child.prototype = Object.create(Father.prototype);

Child.prototype.constructor = Child;
Child.prototype.greeting = function() {
    console.log('Hi, I'\m little ' + this.name);
}

var c = new Child('jr', 1, ['NICIbear', 'IKEAdog']);

console.log(c);
```
上面大概就是整个子类继承父类的过程，其中还要注意，修改 constructor 以及覆盖 Father 中属性和方法的语句一定要放在 Object.create() 之后，

最后，MDN 中 Object.create() 的文章中也是通过上述的方式实现了子类继承父类，让 Rectangle 继承 Shape，值得阅读，链接如下。
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create

接下文，[7-彻底理解JS中面向对象（七、如何实现子类继承多个父类-进阶）](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/7-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E4%B8%83%E3%80%81%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E5%AD%90%E7%B1%BB%E7%BB%A7%E6%89%BF%E5%A4%9A%E4%B8%AA%E7%88%B6%E7%B1%BB-%E8%BF%9B%E9%98%B6%EF%BC%89.md)