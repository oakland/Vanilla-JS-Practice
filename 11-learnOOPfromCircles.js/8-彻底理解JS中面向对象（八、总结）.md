## 彻底理解 JS 面向对象编程（OOP）

接上文，[5-彻底理解JS中面向对象（五、自己实现一个OOP）](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/5-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E4%BA%94%E3%80%81%E8%87%AA%E5%B7%B1%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AAOOP%EF%BC%89.md)

### 六、总结

最后总结一下整篇文章中最重要的内容：

1. 这部分的内容暂时为空，日后再做补充。


### 七、扩展

看完这个系列文章，我相信大多数的朋友还是会学到一些内容。但是实际上除了上述内容之外，还有一些内容是比较细节末枝，却有必要简单了解的。这个部分主要就是将这些内容补充进来，供大家通过一些细节更加深刻地去理解一些概念。

1. 关于\__proto__ 和 prototype 也有很多的文章去分析两者的关系，其实我觉得看完前面的整篇文章，大家应该不需要再看这样的文章了吧？两者的关系是比较明确地。在 [JavaScript. The core.](http://dmitrysoshnikov.com/ecmascript/javascript-the-core/#a-prototype-chain) 中，有一个单词形容 \__proto__ 属性，叫 implicit ，隐式的。而 prototype 则是 explicit，显式的。这两个词对于理解 \__proto__ 和 prototype 其实也有很大的帮助。其实大家如果在控制台打印一个对象的话，也会发现 \__proto__ 属性是比较虚的，没有直接挂在的属性和方法明显。这个属性是浏览器提供的，而并不是可以直接显示的。而 prototype 则是构造函数肯定会有的一个显式属性。


===

（全文完）