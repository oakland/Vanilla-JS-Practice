### 前言

刚开始学习 JS 的时候，就一直有人跟我说要学会 JS 的继承，类，面向对象编程（OOP）。说实话，作为一个转行的人，我真不知道这是什么意思，什么叫面向对象编程？！然后就不停地搜索，学习面向对象的概念，看了大量的面向对象编程的文章，还有一些示例等等。后来终于知道如何去实现类，实现继承，实现 OOP 了，但是还是不知道为什么要面向对象编程，而且也不知道这个面向对象到底用在设么地方。反正你让我写一个 p1 和 p2 去继承 Peson，我肯定是会写的，而且我还能讲清楚他们的关系，但是我真不知道这是干什么用的，而且也不知道这有什么好处。

后来就把这个概念放了放，直到最近，项目用了一个 unify 的模板，这个模板里有个插件叫，circles-master。插件的功能就是使用 js 实现一个 svg 展示饼状图的动画效果。如下所示：

effect.gif

因为最近都一直在看各种库的源码，所以就把这个小插件的源码也看了一遍，结果发现这个小框架就是一个很好的 OOP 的一个实例，而且非常好的展示了什么叫做 OOP，以及 OOP 用在什么样的情况下。我已经把这个小插件放到circles-master 文件夹内部了，想看源码的可以直接看。

在多说一句，这个文件夹内部的代码是 0.0.3 版本，大家如果想看最新的版本的话，可以去看作者的 [github](https://github.com/lugolabs/circles)。你可以发现最新的版本和我这个文件夹里的版本不太相同，但是因为我当时看的源码是 0.0.3 版本的，所以我这里主要讲解这个版本，而你去看最新的版本，会发现很多共性的地方，也会发现很多改进的地方，这些改进的地方也是值得我们再去深入学习的。

### 为什么要 OOP

最开始知道 OOP 的时候我就一直有个疑问，为什么要 OOP，OOP 到底是在做什么？但是几乎所有的文章都是介绍如何用 JS 实现 OOP ，而几乎没有太多的文章讲解为什么要用 OOP。直到看到了两篇文章我才明白了为什么用 OOP。

一篇是阮一峰写的 [Javascript 面向对象编程（一）：封装](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)，在第四部分，构造函数模式的问题中，有这样一段话：

> ...表面上好像没什么问题，但是实际上这样做，有一个很大的弊端。那就是对于每一个实例对象，`type`属性和`eat()`方法都是一模一样的内容，每一次生成一个实例，都必须为重复的内容，**多占用一些内存**。这样既不环保，也缺乏效率。

如果我现在没有理解错误的话，使用 OOP 就是为了节省一些内存空间，同时实现代码的复用，减少不必要的代码。众多的实例都会使用同一个方法，而不是单独每一个实例一个方法，而这个方法又是相同的，没有实现代码的复用，也增加了内存。其实代码的复用其实就是为了减少内存。

后来又想到，声明一个方法或者一个属性也好，都需要放在内存中的，因为调用的时候要立即获取，所以如果大家有共同的方法的话，可以放到一个 class 中，然后所有的 instance 都使用这个 class 的方法，就不需要每个 instance 自己再单独挂载一个方法了。

后来又看《JS 高级程序设计-第三版》的时候，第六章讲的就是 OOP。英文版 183 页有一个部分叫“Problems with Constructors”，里面有这样一段内容：

> Though the constructor paradigm is useful, it is not without its faults. The major downside to constructors is that methods are created once for each instance. So, in the previous example, both person1 and person2 have a method called sayName(), but those methods are not the same instance of Function. Remember, functions are objects in ECMAScript, so every time a function is defined, it’s actually an object being instantiated. Logically, the constructor actually looks like this:
> 
	function Person(name, age, job){ this.name = name;		this.age = age;		this.job = job;        this.sayName = new Function(“alert(this.name)”);  //logical equivalent	}
上面这段话的意思就是说，构造函数尽管很有用，但是实际上也是有弊端的。弊端就是，每一个实例都会有一个自己的方法，也就是说 person1 和 person2 尽管都有一个 sayName 的方法，但是这两个方法只是恰好名字和功能完全相同而已，他们并不是同一个 sayName，并没有实现代码的复用，也没有节约内存空间。因为实际上，this.sayName 每次都是 new 出来的，而不是用的统一的一个 function。
> So, functions of the same name on different instances are not equivalent, as the following code proves:
	alert(person1.sayName == person2.sayName); //false
> It doesn’t make sense to have two instances of Function that do the same thing, especially when the this object makes it possible to avoid binding functions to particular objects until runtime.

其实通过上述的讲解，我们就明白了为什么要使用 OOP 了。

### 如何使用 OOP

关于如何实现 OOP，应该讲解一下从工厂模式到构造器模式，然后再到原型模式等等，这一系列的来龙去脉，其实讲解的最好的就是《JS高级程序设计-第三版》中的第六章，也推荐看阮一峰关于OOP的三篇文章：

[Javascript 面向对象编程（一）：封装](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)

[构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)

[非构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html)

还推荐看 [javascript the core](http://dmitrysoshnikov.com/ecmascript/javascript-the-core/#a-prototype-chain) 这篇文章，文章前面几个部分都是讲解原型链的内容的，而且讲解的非常好。

但是这里就不做说明了，主要来以 circles.js 为例来说明一下实际中 OOP 的使用，以及circles.js是如何实现 OOP。

### circle.js

具体的分析可以看 2-circles-master 中的 circlesAnalysis.js 文件，以及对比看 OOPtest系列的三个文件，可以看到如何通过一个例子来实现 OOP，以及如何把 circles-master 的 OOP 方法运用到这三个文件中的。
