## 彻底理解 JS 面向对象编程（OOP）

接上文，[4-彻底理解JS中面向对象（四-一个OOP的典型案例）](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/4-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E5%9B%9B-%E4%B8%80%E4%B8%AAOOP%E7%9A%84%E5%85%B8%E5%9E%8B%E6%A1%88%E4%BE%8B%EF%BC%89.md)

### 五、自己实现一个 OOP

通过上面对 circles-master 的源码进行分析，我们其实可以看到要实现 OOP 其实很简单。我们就简单的来实现一个类似的效果。

具体代码请查看 [3-OOPtest](https://github.com/oakland/Native-JS-Practice/tree/master/11-learnOOPfromCircles.js/3-OOPtest)

在链接的文件夹中，会以注释的形式在源码中注释整个创建 OOP 的过程，大家看源码就可以了。

需求就是将一个 Nums 的实例中的 innerHTML 属性放到对应的 HTML 元素下。

OOPtest1.1.html 就是使用了和 circles-master 一样的方式创建 OOP。
而 OOPtest1.2.html 则将创建的所有实例都打印出来，大家在浏览器打开，去控制台看这个打印出来的实例到底是什么。
OOPtest1.3.html 则是对比了将方法定义在 constructor 中和在原型对象中的时候的区别，也是会将所有的实例打印出来，需要去控制台查看这些实例，和 OOPtest1.2.html 对比着看，可以搞清楚构造器和原型对象之间的很多关系。

接下文，[6-彻底理解JS中面向对象（六、如何实现子类继承父类-进阶）](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/6-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E5%85%AD%E3%80%81%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E5%AD%90%E7%B1%BB%E7%BB%A7%E6%89%BF%E7%88%B6%E7%B1%BB-%E8%BF%9B%E9%98%B6%EF%BC%89.md)
