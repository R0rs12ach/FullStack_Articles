# Angular2

## 综述
> 就长远来看，ng2肯定会成为主流的前端框架，但由于它的学习曲线十分陡峭，目前（2016年4月1日）还没有一个非常靠谱的教程。当然，fullstack.io已经出了一本权威指南，但是到现在还没有完全完结，时不时有更新。学习angular之前，有很多的概念需要先了解，否则会晕头转向，本文会作一定的名词解释，方便后续学习ng2的过程中不至于觉得完全搞不懂。

## 名词解释
* **shim** vs **polyfill**
    * *A shim is a library that brings a new API to an older enviroment, using only the means of that enviroment*
    (一个shim就是一个库，它将引进新的API到旧的环境中，而且仅仅只是依靠旧环境中已有的手段实现)
    * *A polyfill is a shim for a browser API. It typically checks if a browser supports an API. If it doesn't, the polyfill installs its own implementation. That allows you to use the API in either case.*
    (一个polyfill是一段代码(或者插件)，提供了那些开发者希望浏览器原生提供支持的功能)

总体来说，要记住一点，polyfill是为浏览器服务的，检查浏览器某个API存在与否，不存在就自己实现一个给用户。而shim是将新的API带到不同的环境中，用该环境已有的手段实现统一API。

* [**SystemJS**](https://github.com/systemjs/systemjs)
    * *Universal dynamic module loader - loads ES6 module, AMD, CommonJS and global scripts in the browser and NodeJS*
    * 对于浏览器，`systemjs`的基本使用方法

    ```html
    <script src="system.js"></script>
    <script>
        // 设置基本的模块路径
        SystemJS.config({
            baseURL: '/js'
        });

        // 加载入口
        SystemJS.import('main.js');
    </script>
    ```
    * 对于NodeJS，你可以按照如下方法使用，注意如下的调用代码中使用了then，说明实际上是利用了promise这个新的API，那么对于浏览器，需要提前加载该API的polyfill

    ```js
    var SystemJS = require('system.js');

    //loads './app.js' from the current directory
    SystemJS.import('./app.js').then(function(m) {
        console.log(m);
    });
    ```
    * 如果你使用的是`jspm`(浏览器端的包管理器)作为包管理器的话，那么需要让SystemJS变成`jspm`的一个实例

    ```
    var loader = require('jspm').Loader;
    var SystemJS = new Loader();

    SystemJS.import('loadsh').then(function(_) {
        console.log(_);
    });
    ```
* **FRP**
> 翻译过来就是Functional Reactive Programming，也就是所谓的函数式反应型编程。我们用一个小的应用说明什么是FRP。在Flicker上，你通过搜索框输入的过程中，每输入一个字符，下方的图片结果都会实时从Flicker服务器上获取并更新，当用户的输入不断改变，下方的结果也在不断改变，这就是所谓的reactive能力，而不像是我们之前那样需要最后提交才能获取。

* **FRP的几个概念**
    * 基本思想：引起实时互动系统发生变化的最根本的自变量是时间，变化的环境和各种事件（比如鼠标、键盘、网络）归根结低都是由时间变化引起的，时间是本质特征，从一开始就要考虑。
    * 信号：信号分为两种分别叫做事件流（Event Stream)和行为（Behavior）
        * Event Stream：事件流可以看成时间轴上无限长的数据流，这个里面流淌的数据代表一个个事件，它们在时间轴上是离散的
        * Behavior：行为也是随事件变化的数据，它在时间轴上是连续的

* **RxJS**
    * 可参见article文档中的RxJS的详细介绍和实例