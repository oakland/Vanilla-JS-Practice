## 彻底理解 JS 面向对象编程（OOP）

接上文，[0-彻底理解JS中面向对象（前言）](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/0-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E5%89%8D%E8%A8%80%EF%BC%89.md)

### 一、对OOP模式的困惑

从开始学习 JS 的时候，就一直有人跟我讲要学会面向对象编程，而各种各样的相关文章也充斥网络。作为一个门外汉，说实话，我一开始就没能明白为什么要面向对象编程？感觉这是一个莫名其妙提出来的概念。我不理解这种方式到底有什么好？面向对象编程这种方式相对的又是什么样的编程方式？普通的编程方式有什么弊端才需要用面向对象这种编程的方式？面向对象这种编程方式到底应该用在什么样的情况下？这都是我心中的疑问。

在这些疑问没解决的情况下，其实对于任何实现面向对象的文章我都只是硬着头皮看下去，因为这些文章大多数讲解的如何去实现OOP，而没有解释为什么要用OOP这个问题。强迫自己去理解这些文章的过程中，就会接触很多的概念，比如 prototype chain, class, inheritance 等等，在详细地了解了这些概念，以及他们之间的关系后，我终于会实现OOP了，但是我还是没能理解为什么要实现OOP，以及在何种情况下去使用 OOP。同时，讲解 OOP 的文章实在太多了，而对于如何实现 OOP， 这些文章又有各种各样的形式，看完这么多概念，再看完这么多实现方式，我想很多人其实真的是摸不着头脑了，完全不知道应该采取哪种方式去实现面向对象，又更不明白这些实现方式之间的联系和区别都是什么？解决这些疑惑的方式，只有继续看书、学习、请教大牛。终于，在看过众多资料之后，对于为什么实现 OOP 这个问题我找到了我可以理解的答案，有两份资料对于我理解 OOP 的概念有比较大的启发和影响。

一份是阮一峰写的三篇面向对象的系列文章：

1. [Javascript 面向对象编程（一）：封装](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)

2. [构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)

3. [非构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html)

第二份资料就是著名的《JS高级程序设计，第3版》中的第六章，整个章节的名称就是 Object-Oriented-Programming。其实回头来去看这个章节，觉得写的真是很详尽，建议看英文版。

其他还有不错的参考资料，比如：

1. [JavaScript. The core.](http://dmitrysoshnikov.com/ecmascript/javascript-the-core/#a-prototype-chain)
看过很多相关的文章，这篇是印象比较深的。
2. (Introduction to Object-Oriented JavaScript)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript]
3. 待补充...

接下文，[2-彻底理解JS中面向对象（二、困惑释疑-为什么要用OOP）](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/2-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E4%BA%8C%E3%80%81%E5%9B%B0%E6%83%91%E9%87%8A%E7%96%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E7%94%A8OOP%EF%BC%89.md)