# RequireJS 教程

## Overview
* RequireJS是什么
* RequireJS基本使用
* RequireJS资源介绍

## RequireJS是什么
`RequireJS`是一个JavaScript模块加载器。它非常适合在**浏览器**中使用，但它也可以用在其他脚本环境, 就像**Node**。使用RequireJS加载模块化脚本将提高代码的加载速度和质量。

这里需要强调一点，RequireJS是遵循AMD规范的，也就是说如下代码中`module1`和`module2`的加载顺序是异步的，requirejs并不关心谁先谁后。

```
require([module1,module2], function(module1, module2){
	
})
```
那么既然是异步加载，它便有一个优势：**防止JS加载阻塞页面渲染**，如下以代码说明它的好处：

* **传统代码写法**

文件：index.html
```
<!DOCTYPE html>
<html>
    <head>
        <script type="text/javascript" src="a.js"></script>
    </head>
    <body>
      <span>Hello, RequireJS</span>
    </body>
</html>
```

文件：a.js
```
(function(){
    function fun1(){
      alert("it works");
    }
    fun1();
})() //当然这里为了避免污染全局变量，使用了闭包的写法
```
如果运行如上代码，你会发现，在`it works`弹出来之前，界面上的`Hello，RequireJS`实际上并没有出现，只有当用户点击确定，弹窗消失之后，界面上才会出现`Hello, RequireJS`，这就是**JS阻塞浏览器渲染导致的结果**。

* **利用RequireJS的写法**

文件：index.html
```
<!DOCTYPE html>
<html>
    <head>
        <script type="text/javascript" src="require.js"></script>
        <script type="text/javascript">
            require(["a"]);
        </script>
    </head>
    <body>
      <span>Hello, RequrieJS</span>
    </body>
</html>
```
文件：a.js

```
define(function(){
    function fun1(){
      alert("it works");
    }

    fun1();
}) //注意这里增加了一个define关键词，给define关键词传进去一个函数
```
如果运行上述代码，你会发现，在`it works`弹出来之前，界面上的`Hello, RequireJS`已经呈现了。

## RequireJS基本使用

`require`会定义三个变量：`define`,`require`,`requirejs`，其中`require === requirejs`，一般使用`require`更简短。`define` 从名字就可以看出这个api是用来定义一个模块。require 加载依赖模块，并执行加载完后的回调函数

上述的a.js：
```
define(function(){
    function fun1(){
      alert("it works");
    }

    fun1();
})
```
通过`define`函数定义了一个模块，然后再页面中使用：

`require(["js/a"]);`

来加载该模块(注意`require`中的依赖是一个**数组**，即使只有一个依赖，你也**必须使用数组来定义**)，require API的第二个参数是`callback`，一个`function`，是用来处理加载完毕后的逻辑，如：
```
require(["js/a"],function(){
    alert("load finished");
})
```
* **加载文件**

之前的例子中加载模块都是本地js，但是大部分情况下网页需要加载的JS可能来自本地服务器、其他网站或CDN，这样就不能通过这种方式来加载了，我们以加载一个jquery库为例：
```
require.config({
    paths : {
        "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery"]   
    }
})
require(["jquery","js/a"],function($){
    $(function(){
        alert("load finished");  
    })
})
```
这边涉及了`require.config`，`require.config`是用来配置模块加载位置，简单点说就是给模块起一个更短更好记的名字，比如将百度的jquery库地址标记为jquery，这样在require时只需要写["jquery"]就可以加载该js，本地的js我们也可以这样配置：
```
require.config({
    paths : {
        "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery"],
        "a" : "js/a"   
    }
})
require(["jquery","a"],function($){
    $(function(){
        alert("load finished");  
    })
})
```
通过`paths`的配置会使我们的模块名字更精炼，`paths`还有一个**重要的功能**，就是可以**配置多个路径**，如果远程cdn库没有加载成功，可以加载本地的库，如：
```
require.config({
    paths : {
        "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery", "js/jquery"],
        "a" : "js/a"   
    }
})
require(["jquery","a"],function($){
    $(function(){
        alert("load finished");  
    })
})
```
这样配置后，当百度的`jquery`没有加载成功后，会加载本地js目录下的`jquery`在使用`requirejs`时，加载模块时不用写.js后缀的，当然也是**不能写后缀**
上面例子中的callback函数中发现有$参数，这个就是依赖的jquery模块的输出变量，如果你依赖多个模块，可以依次写入多个参数来使用：
```
require(["jquery","underscore"],function($, _){
    $(function(){
        _.each([1,2,3],alert);
    })
})
```
如果某个模块不输出变量值，则没有，所以尽量将输出的模块写在前面，防止位置错乱引发误解

* **全局配置**

上面的例子中重复出现了`require.config`配置，如果每个页面中都加入配置，必然显得十分不雅，`requirejs`提供了一种叫"主数据"的功能，我们首先创建一个main.js：
```
require.config({
    paths : {
        "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery", "js/jquery"],
        "a" : "js/a"   
    }
})
```
然后再页面中使用下面的方式来使用`requirejs`：
```
<script data-main="js/main" src="js/require.js"></script>
```
解释一下，加载`requirejs`脚本的`script`标签加入了`data-main`属性，这个属性指定的`js`将在加载完`reuqire.js`后处理，我们把`require.config`的配置加入到`data-main`后，就可以使每一个页面都使用这个配置，然后页面中就可以直接使用`require`来加载所有的短模块名。


`data-main`还有一个**重要的功能**，当`script`标签指定`data-main`属性时，`require`会默认的将`data-main`指定的js为根路径，是什么意思呢？如上面的`data-main="js/main"`设定后，我们在使用`require(['jquery'])`后(不配置jquery的paths)，`require`会自动加载`js/jquery.js`这个文件，而不是`jquery.js`，相当于默认配置了：
```
require.config({
    baseUrl : "js"
})
```
* **第三方模块**

通过require加载的模块一般**都需要符合AMD规范**即使用`define`来申明模块，但是部分时候需要加载非AMD规范的js，这时候就需要用到另一个功能：`shim`，`shim`解释起来也比较难理解，shim直接翻译为"垫"，其实也是有这层意思的，目前我主要用在两个地方

* * 非AMD模块输出，将非标准的AMD模块"垫"成可用的模块;

例如：在老版本的`jquery`中，是没有继承AMD规范的，所以不能直接`require["jquery"]`,这时候就需要`shim`，比如我要是用`underscore`类库，但是他并没有实现AMD规范，那我们可以这样配置
```
require.config({
    shim: {
        "underscore" : {
            exports : "_";
        }
    }
})
```
这样配置后，我们就可以在其他模块中引用underscore模块：
```
require(["underscore"], function(_){
    _.each([1,2,3], alert);
})
```
* * 插件形式的非AMD模块;
 
我们经常会用到jquery插件，而且这些插件基本都不符合AMD规范，比如`jquery.form`插件，这时候就需要将`form`插件"垫"到jquery中：
```
require.config({
    shim: {
        "underscore" : {
            exports : "_";
        },
        "jquery.form" : {
            deps : ["jquery"]
        }
    }
})
```
也可以简写为：
```
require.config({
    shim: {
        "underscore" : {
            exports : "_";
        },
        "jquery.form" : ["jquery"]
    }
})
```
这样配置之后我们就可以使用加载插件后的`jquery`了
```
require.config(["jquery", "jquery.form"], function($){
    $(function(){
        $("#form").ajaxSubmit({...});
    })
})
```

## RequireJS资源介绍
RequireJS虽然在浏览器端能提高代码加载速度和质量，但是在服务端（Node环境下）能否也同样出色呢，想想看RequireJS是严格遵照AMD规范的，而NodeJS的模块化管理却是遵从CMD规范的，这之间如何调和呢？是否需要在进行全栈式开发的过程中，使用不同的模块管理规范呢？想了解这些，[RequireJS的官方网站](http://www.requirejs.cn/home.html)就是最好的教程。另推荐一下[模块优化和高级配置](https://segmentfault.com/a/1190000002403806)。