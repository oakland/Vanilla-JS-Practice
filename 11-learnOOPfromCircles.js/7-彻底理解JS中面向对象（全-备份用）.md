## 彻底理解 JS 面向对象编程（OOP）

### 前言

JS 中 OOP 牵扯到相当多的内容和概念，例如 class, prototype, \__proto__, prototype chain, constructor, inheritance 等，也牵扯到相当多的模式，比如 factory pattern, constructor pattern, prototype pattern 等等，还牵扯到最新的 ES6 中 class 的写法，以及相关的扩展知识 —— 有 this 的使用，甚至闭包的使用等等。这些概念之间什么关系，模式之间是何种关系，他们是如何演变的，又是如何配合使用的，相信很多学习 JS 的同学在开始看到这些概念的时候就已经晕了，更不要说理清楚他们之间的关系了。

本文会从作者自己认识 OOP 的过程，一步步讲解 JS 中 OOP 的来龙去脉，希望通过这篇文章的详细阐述，能让大家彻底理解 JS 中的 OOP，并能熟练的使用 OOP。

本文提纲：

1. 对 OOP 模式的困惑
2. 困惑释疑 - 为什么要用 OOP
3. JS 中如何实现 OOP
4. 一个 OOP 的典型案例 - circles.js
5. 自己实现一个 OOP
6. 总结

上面的提纲也是我认识 OOP 的一个过程。在学习 OOP 之前就会对 OOP 有很多的困惑和疑问？而这些困惑和疑问也是在不断地阅读他人的文章中逐渐得到了解决，而在解决问题的同时，也著名明白了众多概念之间的关系，并知道了如何实现 OOP 的多种方式，以及他们之间的关系，最终以一个实际的开源项目源码为例，讲解在实际中到底如何应用 OOP，以及在实现 OOP 的过程中有一些什么注意事项。 在这么多的理论和他人优秀的实践基础上，我们自己来去实现一个简单的 OOP，彻底熟悉和了解 OOP 的本质。

下面进入正文。

### 一、对OOP模式的困惑

从开始学习 JS 的时候，就一直有人跟我讲要学会面向对象编程，而各种各样的相关文章也充斥网络。作为一个门外汉，说实话，我一开始就没能明白为什么要面向对象编程？感觉这是一个莫名其妙提出来的概念。我不理解这种方式到底有什么好？面向对象编程这种方式相对的又是什么样的编程方式？普通的编程方式有什么弊端才需要用面向对象这种编程的方式？面向对象这种编程方式到底应该用在什么样的情况下？这都是我心中的疑问。

在这些疑问没解决的情况下，其实对于任何实现面向对象的文章我都只是硬着头皮看下去，因为这些文章大多数讲解的如何去实现OOP，而没有解释为什么要用OOP这个问题。强迫自己去理解这些文章的过程中，就会接触很多的概念，比如 prototype chain, class, inheritance 等等，在详细地了解了这些概念，以及他们之间的关系后，我终于会实现OOP了，但是我还是没能理解为什么要实现OOP，以及在何种情况下去使用 OOP。同时，讲解 OOP 的文章实在太多了，而对于如何实现 OOP， 这些文章又有各种各样的形式，看完这么多概念，再看完这么多实现方式，我想很多人其实真的是摸不着头脑了，完全不知道应该采取哪种方式去实现面向对象，又更不明白这些实现方式之间的联系和区别都是什么？解决这些疑惑的方式，只有继续看书、学习、请教大牛。终于，在看过众多资料之后，对于为什么实现 OOP 这个问题我找到了我可以理解的答案，有两份资料对于我理解 OOP 的概念有比较大的启发和影响。

一份是阮一峰写的三篇面向对象的系列文章：

1. [Javascript 面向对象编程（一）：封装](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)

2. [构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)

3. [非构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html)

第二份资料就是著名的《JS高级程序设计，第3版》中的第六章，整个章节的名称就是 Object-Oriented-Programming。其实回头来去看这个章节，觉得写的真是很详尽，建议看英文版。

其他还有不错的参考资料，比如：

[JavaScript. The core.](http://dmitrysoshnikov.com/ecmascript/javascript-the-core/#a-prototype-chain)
看过很多相关的文章，这篇是印象比较深的，后续还会继续补充比较好的资料。

### 二、为什么要用 OOP

作为非计算机专业的人士，如果我没有理解错的话，OOP是为了提高代码的复用性，而提高代码复用性的根本原因是为了降低内存的使用率。如果我的理解是错误的话，非常欢迎大家留言指出我的错误！

内存为什么会被使用呢？就是因为我们的语言会制造出很多的属性和方法，这些属性和方法是存储在内存中的，你调用的时候，是可以随时拿到这些属性和方法的，所以这些属性和方法都要放在内存中随时供你获取或者执行。而如果两个变量要用到同一个属性或者方法的时候，没有必要创造两个完全一样，但却属于不同变量的属性或者方法。举个简单的例子，在同一个家里，只要有一把螺丝刀就可以了，大家都可以使用，而不是每人都配一把螺丝刀，这样没有必要，而且浪费家里的空间。在这个例子中，家就是内存，而每个人就是一个变量，如果很多人想用螺丝刀，那么就创建一个类，由这个类创建出多个实例，每个实例都可以共用一个螺丝刀，而不是每个人一把螺丝刀，这样太浪费了。

上面提供的这两份资料，我看过很多次，两份资料中各有一句话让我得出上面的结论。

[Javascript 面向对象编程（一）：封装](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)中，第四部分—构造函数模式的问题，倒数第二段：

“...（构造函数模式）表面上好像没什么问题，但是实际上这样做，有一个很大的弊端。那就是对于每一个实例对象，type属性和eat()方法都是一模一样的内容，每一次生成一个实例，都必须为重复的内容，多占用一些内存。这样既不环保，也缺乏效率”。

这其实就是在说，每一个实例使用的都是不同的属性和方法，只不过**恰好**这些方法和属性的值完全相同而已。而如果同样又很多的实例都要使用这些属性和方法的话，创造出来太多这样相同的值，其实是没有必要和浪费内存的。

其次，在《高程三》第六章[^1]-Object Creation 章节中，The Constructor Pattern 小节，183页中间有一段话：

Though the constructor paradigm is useful, it is not without its faults. The major downside to constructors is that methods are created once for each instance. So, in the previous example, both person1 and person2 have a method called sayName(), but those methods are not the same instance of Function. Remember, functions are objects in ECMAScript, so every time a function is defined, it’s actually an object being instantiated. Logically, the constructor actually looks like this:

```
function Person(name, age, job){ this.name = name;    this.age = age;    this.job = job;    this.sayName = new Function(“alert(this.name)”);  //logical equivalent}
```
"Thinking about the constructor in this manner makes it clear that each instance of Person getsits own instance of Function that happens to display the name property. To be clear, creating a function in this manner is different with regard to scope chains and identifier resolution, but the mechanics of creating a new instance of Function remain the same. So, functions of the same name on different instances are not equivalent, as the following code proves:```alert(person1.sayName == person2.sayName); //false
```
It doesn’t make sense to have two instances of Function that do the same thing, especially when the this object makes it possible to avoid binding functions to particular objects until runtime...

整个上面这段话的阐述其实非常明确地表达了构造器给每个实例创造了单独的一个属性或者方法，只不过这些属性或者方法的值恰好相同。

好，截止目前我们已经知道了 OOP 的好处，那么到底应该如何实现 OOP 呢？

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

Each function is created with a prototype property, which is an object containing properties and methods that should be available to instances of a particular reference type. This object is literallya prototype for the object to be created once the constructor is called. The benefit of using the prototype is that all of its properties and methods are shared among object instances. Instead of assigning object information in the constructor, they can be assigned directly to the prototype, as in this example:

上面这段话摘录自《高程三》对于原型模式的第一段话，这段话非常经典，而且就已经很明确地阐述了原型之间的关系了。
每个**函数**都有一个 prototype 属性，记住，只有函数才有，对象没有，而每个对象都会拥有的，是一个 \__proto__ 属性，后面会对 \__proto__ 属性详细讲解。其实因为在 JS 中，函数也是对象，所以，函数也会拥有一个 \__proto__ 属性。也就是说函数会同时拥有 prototype 和 \__proto__ 属性，而对象只有 \__proot__ 属性。
构造器作为一个普通函数，也会拥有一个 prototype 的属性。这个 prototype 属性是个对象，这个对象会拥有很多属性和方法，而一旦使用 new 操作符调用构造器函数的时候，所有的实例就会拥有构造器函数的 prototype 属性上的所有属性和方法，这样就实现了原型继承。怎么样，很简单吧？也就是在 [3_prototypePattern.html](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/1-prototypeInJS/3_prototypePattern.html) 中，p1.sayName 和 p2.sayName 是同一个 sayName。当通过 `Person.prototype` 来修改一个属性的时候，所有的实例都会受到影响。Unlike the constructor pattern, the properties and methods are all shared among instances, so person1 and person2 are both accessing the same set of properties and the same sayName() function. 

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

### 四、一个 OOP 的典型案例 - circles.js

上面长篇大论说了这么多的内容，我相信大家可能已经对于OOP说出个大概了，而且也可以实现 OOP 了。但是依然还是不能明白到底什么情况下应该使用 OOP。我也是一样的，上面的内容我在看过很多很多文章之后其实已经明白了，但是问题是，我在实际中却从来都不会使用到 OOP，我不知道 OOP 的使用场景是如何的。

直到最近，我们的项目使用了一个模板，这个模板中有一个插件库，插件库里有各式各样的插件，最简单有类似简单的 back-to-top.js 插件。为了能熟练的使用这个模板，我必须要熟悉这些插件的内容，以便于日后能对插件进行整合，形成一些新的内容，所以就开始挨个看这些插件的说明以及源码等。第一个看的源码就是 [circle-master](https://github.com/oakland/Native-JS-Practice/tree/master/11-learnOOPfromCircles.js/circles-master)，这个插件是在 html 中插入 svg 饼图动画效果的一个插件。效果如下：

effect.gif

这个库本身也是开源的。大家可以在 github 中[查看](https://github.com/lugolabs/circles)。

说明：我使用这个模板中的circle-master的版本是 0.0.3，但是现在去看这个库的版本已经是0.0.6了。下面的分析都是以 0.0.3 版本的源码为例，详细说明 OOP 在实际中的情况，以及定义 OOP 时候应该注意的一些事项。如果大家有兴趣的话，可以去查看最新的 0.0.6 版本的源码，相信还会有一些更多的收获，因为会牵扯到一些闭包以及模块化等的概念。本文分析的 0.0.3 版本的源码请查看 [cirlce-master 文件夹](https://github.com/oakland/Native-JS-Practice/tree/master/11-learnOOPfromCircles.js/circles-master)。

阅读 circles.js 的源码，我们可以发现，这个源码是典型的 OOP 的实现方式。首先从大的结构来看：整个插件是一个匿名自执行函数，通过 window.Circles 在全局定义一个 Circles 的构造器。同时再定义一个 Circles 的原型对象——Circles.prototype，以便于所有的 Circles 实例都会继承这个原型里的属性和方法。

```
// 1. 定义一个构造函数
var Circles = function(options) {
    this.props = ... // 通过 this 关键词这种方式给所有的实例挂载各种属性，这些属性的值是通过 options 参数传入的
    this.method(); // 通过 this 关键词加上函数名的方式来执行各种共有方法，这些 method 是定义在 Circles.prototype 这个原型对象中的
    };
// 2. 定义构造函数的公有方法
Circles.prototype = {
    method1: function() {},
    method2: function() {},
    //...
    //定义这么多的方法，一是供方法之间的互相使用，二是在上面构造器中使用
}; 
```

这个 Circles 构造器创建的实例会挂载很多属性，例如，圆的半径，百分比，文字，数字，颜色，甚至时间间隔等等。这些都是实例会挂载的属性，当然，这些属性是通过参数 options 这个对象传入进来的。在构造器函数中，除了挂载各种属性之外，还会执行一些方法，进而确保所绘制的饼图可以展示在 HTML 文档中。构造器中通过 this.method 的形式来执行实例的方法，例如，line43，`this._confirmAnimation(options.duration)`，那么这个 `_confirmAnimation()`这个方法从哪里来的呢，这个是定义在 Circles.prototype 这个对象中的。

那么这个产生的实例又如何放在 html 文档中的呢？实例其实会将 HTML 文档中的某个元素作为自己的属性，见 line26，`this._el = document.getElementBy(elId)`，也就是说 HTML 文档中的某个元素也成为了这个对象的属性，然后会对这个属性添加一些具体的 HTML 内容，自然就会在 HTML 文档中渲染这些内容了。

我们在浏览器中打开 circles-master / spec / index.html 可以看到有四个动画展示的饼状图标。这四个饼状图表共用所有的方法，比如 _animate()，比如 _generateText(), _generateSvg() 等等。可见，这样就不会每次都获取一个 id ，然后生成 svg, 生成文本...最终绘制一个饼图，然后再获取一个 id 再按照上面的流程走一遍，绘制一个饼图了。而是大家使用同样的一些共同的方法来绘制饼图，显然这种方式节约了内存。

为了让大家能明白，这个 OOP 到底生成了什么样的实例，请参考 2-circles-master/spec/indexAnalysis.html，这个文件使用注释的方式描述了通过面向对象的方式到底创建了几个什么样的对象。用浏览器打开这个文件，在控制台其实可以看到一个数组，分别是四个 Circles 实例组成的数组，而这些实例共用的其实都是同样的方法，而不是每个单独挂在一个方法。大家可以在控制台仔细的查看这个数组的每一个元素，会能明白很多原型实现的秘密和优点，以及如何实现将对象展示在 html 中的。

现在回头来看这个简单的插件，会发现其实写的很简单，所以也非常适合初学者学习和理解 OOP 的概念。当然，大家除了看 OOP 的内容之外，还可以发现源码中很多一些处理的技巧和方式。因为我当时只是看这个 0.0.3版本的内容，所以没有去分析现在最新的 0.0.6 版本的源码，如果大家看完这个 0.0.3 之后再去看 0.0.6 的源码，相信还会有很都的变化，并且能学到关于 OOP 的更多的内容。我这里就不再分析 0.0.6 版本的源码了。不过以后更新这篇文章的时候，有可能会再专门写一个小节分析这个版本。

### 五、自己实现一个 OOP

通过上面对 circles-master 的源码进行分析，我们其实可以看到要实现 OOP 其实很简单。我们就简单的来实现一个类似的功能。

OOPtest1.1.html 实现的其实将一个 Nums 的实例中的 innerHTML 属性放到对应的 HTML 元素下。
而 1.2.html 则是为了让大家看清这个 OOP 产生的三个实例对象分别是什么，大家可以在控制台打开看这个数组中每个 Nums 实例都是什么。
而 1.3.html 则是为了让大家看清楚在构造器中定义方法和在prototype 中定义方法的不同之处，让大家更加明白 OOP 为什么会节约内存空间，提高代码的复用性。

### 六、总结

最后总结一下整篇文章中最重要的内容：

1. 

===


在终于弄懂了这里面的一些核心的概念，比如 class, prototype, \__proto__, prototype chain, constructor 以及如何实现继承等之后，我也学习了各种各样的模式，比如 工厂模式，构造器模式，原型模式等等，并且也明白了这些模式之间的关系和利弊。但是我还是不理解应该在什么的情况下去使用 OOP。这也是留在我脑中的最后一个疑问？

不久前，项目上线，用到了一个模板，这个模板中有个插件库，插件库中有很多的插件，为了能更好地使用模板并熟悉原生 JS 的写法，我开始看插件库中的各个小插件的源码。结果看的第一个插件库就发现了我非常熟悉的一种实现 OOP 的方式，而且这个插件的源码写的非常简洁，是经典的实现 OOP 的写法。所以详细的看了这个插件源码之后，我终于更加明白了为什么要使用 OOP，以及在何种情况下应该使用 OOP，也许我的理解还是没有到达最高的境界，但是对于我而言，从接触 OOP 开始，到现在可以很清楚的知道各个概念及其之间的关系，可以很明白地写出 OOP 的实例，这对于我来说已经可以作为一个完整的过程记录下来，并且迭代了。所以我就新建了一个文件夹专门来阐述这件事情。

而最开始打算以博客的形式写，但发现自己想说的实在太多了，甚至可以写成一个系列文章了，而这样一篇长篇大论的文章，相信很多朋友没有耐心看下去。而更不好的一点是，为了能清楚的阐释各种概念之间的关系，我新建了很多的 html 演示文件，并且分析了 circles-master 中的源码，在博客中查看这些文件或者源码其实是非常不方便的一件事情。所以最终还是决定以 github 文件的方式来阐述这件事情。

选择 github 来阐述的话，又面临一个选择，是应该用 issue 的形式来写，还是应该直接写在一篇 markdown 格式的文章中呢？鉴于很多人诟病用 issue 写博客的方式，而且打开 issue ，提示 "Issues are used to track todos, bugs, feature requests, and more"，其实也就是说 issues 有其专门的用途，万一以后这个仓库 star 多了，要很多人来维护呢？这样岂不是这个 issue 最开始就没开好头吗？所以我就放弃了用 issue 的方式来写这篇博客，而采用了这种方式写出这篇文章。

所以大家如果觉得这篇文章哪里不好或者不对的，可以开个 issue 给我提意见。这样的话，issue 就有了正确的用法了。



其次我看了很多文章，有各式各样的实现 OOP 的方法，各家说法也不一致，已经看晕了。最后我不知道面向对象到底应该用在什么情况下，没有见过太多的实例。在这个过程中，我只能不断地查找资料，学习如何实现OOP，并且在不断地理解OOP中的继承是如何实现的，也就是我们说的**类**（class）是如何实现的。后来我终于知道了原型链是怎么回事，也终于会自己实现各式各样的继承，并且能说出他们之间的区别，以及利弊等，但是我还是没能理解到底为什么要用OOP，以及在何种情况下使用OOP。直到有一天，我们的项目中要用到一个模板，模板的插件库中有一个很简单的 circles-master 的插件，这个插件使用起来非常简单方便，而且效果还不错。我就去看了下这个插件的源码，发现，这个插件就是面向对象的一种方式去实现的，而且是非常典型的形式。通过这个实际的例子我才真正明白了什么是OOP，以及如何实现OOP，还有为什么要用OOP等这些概念。所以就开了这个仓库，来详细的说一下 JS 中的 OOP，希望可以帮到后来人。

本来打算用博客的形式来写的，但是后来发现博客其实并不适合这么长篇大论，大家一看这么长的文字，估计都没有耐心看下去了，其次博客没法贴大段的分析代码，因为在博客中看代码实在是很麻烦。所以最终还是建立了这个repo，以这样一种形式来表达。

我会按照下面的提纲对 JS 中的 OOP进行详细的阐释：

1. 对 OOP 的困惑（列出困惑的问题）
2. 为什么要用 OOP
3. 如何实现 OOP，以及这几种实现 OOP 的方式的区别
4. 以 circles-master 这个插件的源码为例让大家明白实际中使用 OOP 的场景，以及最佳的实现方式，还有实现过程中应该注意的和实现的一些技巧。
5. 模仿 circles-master ，自己亲自去实现一个 OOP 的例子，更加深刻的去理解 OOP。
6. 总结


[^1]: 《JS高级程序设计-第三版》英文版，上面提到的页数也都是指的英文版里的页数。