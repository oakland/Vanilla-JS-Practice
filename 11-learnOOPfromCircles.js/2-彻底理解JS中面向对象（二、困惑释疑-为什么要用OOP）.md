## 彻底理解 JS 面向对象编程（OOP）

接上文，[1-彻底理解JS中面向对象（一、对OOP的困惑）](http://)

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
function Person(name, age, job){ this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = new Function(“alert(this.name)”);  //logical equivalent
}
```
"Thinking about the constructor in this manner makes it clear that each instance of Person gets
its own instance of Function that happens to display the name property. To be clear, creating a function in this manner is different with regard to scope chains and identifier resolution, but the mechanics of creating a new instance of Function remain the same. So, functions of the same name on different instances are not equivalent, as the following code proves:

```
alert(person1.sayName == person2.sayName); //false
```
It doesn’t make sense to have two instances of Function that do the same thing, especially when the this object makes it possible to avoid binding functions to particular objects until runtime...

整个上面这段话的阐述其实非常明确地表达了构造器给每个实例创造了单独的一个属性或者方法，只不过这些属性或者方法的值恰好相同。

好，截止目前我们已经知道了 OOP 的好处，那么到底应该如何实现 OOP 呢？

接下文，[3-彻底理解JS中面向对象（三、JS中如何实现OOP））](http://)

[^1]: 《JS高级程序设计-第三版》英文版，本系列文章中所有的《高程三》提到的页数都是指的英文版里的页数。