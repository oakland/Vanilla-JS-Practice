## 彻底理解 JS 面向对象编程（OOP）

接上文，[4-彻底理解JS中面向对象（四-一个OOP的典型案例）](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/4-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E5%9B%9B-%E4%B8%80%E4%B8%AAOOP%E7%9A%84%E5%85%B8%E5%9E%8B%E6%A1%88%E4%BE%8B%EF%BC%89.md)

### 五、自己实现一个 OOP

通过上面对 circles-master 的源码进行分析，我们其实可以看到要实现 OOP 其实很简单。我们就简单的来实现一个类似的效果。

具体代码请查看 [3-OOPtest](https://github.com/oakland/Native-JS-Practice/tree/master/11-learnOOPfromCircles.js/3-OOPtest)

OOPtest1.1.html 实现的其实将一个 Nums 的实例中的 innerHTML 属性放到对应的 HTML 元素下。
而 1.2.html 则是为了让大家看清这个 OOP 产生的三个实例对象分别是什么，大家可以在控制台打开看这个数组中每个 Nums 实例都是什么。
而 1.3.html 则是为了让大家看清楚在构造器中定义方法和在prototype 中定义方法的不同之处，让大家更加明白 OOP 为什么会节约内存空间，提高代码的复用性。

接下文，[6-彻底理解JS中面向对象（六、总结）](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/6-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E5%85%AD%E3%80%81%E6%80%BB%E7%BB%93%EF%BC%89.md)
