## 彻底理解 JS 面向对象编程（OOP）

### 前言

JS 中 OOP 牵扯到相当多的内容和概念，例如 class, prototype, \__proto__, prototype chain, constructor, inheritance 等，也牵扯到相当多的模式，比如 factory pattern, constructor pattern, prototype pattern 等，还牵扯到 ES6 中 class 的写法，以及相关的扩展知识 —— 有 this 的使用，甚至闭包的使用等等。这些概念之间是什么关系，模式之间是何种关系，他们是如何演变的，又是如何配合使用的，相信很多学习 JS 的同学在开始看到这些概念的时候就已经晕了，更不要说理清楚他们之间的关系了。

本文以自己认识 OOP 的过程，一步步来讲解 JS 中 OOP 的来龙去脉，希望通过这篇系列文章的详细阐述，能让大家彻底理解 JS 中的 OOP，并能熟练的使用 OOP。

本文提纲：

1. [对 OOP 模式的困惑](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/1-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E4%B8%80%E3%80%81%E5%AF%B9OOP%E7%9A%84%E5%9B%B0%E6%83%91%EF%BC%89.md)
2. [困惑释疑 - 为什么要用 OOP](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/2-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E4%BA%8C%E3%80%81%E5%9B%B0%E6%83%91%E9%87%8A%E7%96%91-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E7%94%A8OOP%EF%BC%89.md)
3. [JS 中如何实现 OOP](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/3-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E4%B8%89%E3%80%81JS%E4%B8%AD%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0OOP%EF%BC%89.md)
4. [一个 OOP 的典型案例 - circles.js](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/4-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E5%9B%9B-%E4%B8%80%E4%B8%AAOOP%E7%9A%84%E5%85%B8%E5%9E%8B%E6%A1%88%E4%BE%8B%EF%BC%89.md)
5. [自己实现一个 OOP](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/5-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E4%BA%94%E3%80%81%E8%87%AA%E5%B7%B1%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AAOOP%EF%BC%89.md)
6. [如何实现子类继承父类-进阶]()
7. [如何实现子类继承多个父类-进阶]()
8. [总结](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/6-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E5%85%AD%E3%80%81%E6%80%BB%E7%BB%93%EF%BC%89.md)

上面的提纲也是我认识 OOP 的一个过程。在学习 OOP 之前就会对 OOP 有很多的困惑和疑问？而这些困惑和疑问也是在不断地阅读他人的文章中逐渐得到解决，而在解决问题的同时，也逐渐明白了众多概念之间的关系，并知道了如何实现 OOP 的多种方式，以及他们之间的关系，最终以一个实际的开源项目源码为例，讲解在实际中到底如何应用 OOP，以及在实现 OOP 的过程中有一些什么注意事项。 在这么多的理论和他人优秀的实践基础上，我们自己来去实现一个简单的 OOP，彻底熟悉和了解 OOP 的本质。

下面进入正文。

接下文，[1-彻底理解JS中面向对象（一、对OOP的困惑）.md](https://github.com/oakland/Native-JS-Practice/blob/master/11-learnOOPfromCircles.js/1-%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3JS%E4%B8%AD%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%EF%BC%88%E4%B8%80%E3%80%81%E5%AF%B9OOP%E7%9A%84%E5%9B%B0%E6%83%91%EF%BC%89.md)