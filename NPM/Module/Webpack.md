# Webpack 教程
## Overview
* webpack简介
* 如何安装webpack
* webpack的基本使用
* VS RequireJS
* webpack资源

## webpack简介
先看下官方给出的一张流程图，基本反应了webpack的本质工作
![webpack工作流程图](http://ww1.sinaimg.cn/bmiddle/7045568dgw1f1rrb4abxoj21kw0sf78u.jpg)
现有的模块加载器，不能很好适配大型项目（大型单页面应用程序）开发。开发这样一款加载器最大原因，就是为了代码分离以及静态资源模块化无缝接合。

**webpack这款模块加载器的目标：  **

* 分离现有依赖树，按需加载
* 高效保证第一次加载
* 静态资源模块化 （区别于requirejs）
* 第三方库模块化加载
* 实现加载器所有环节的可配置性
* 适配大项目开发

而实际中，webpack确实具备这个实力。（尽管有童鞋认为webpack在server side端的表现很狗屎，报错太多，而且不好发现错误的根本原因），它有如下几个**基本功能特性**：  

* **代码分离**
	
	Webpack有两种依赖声明方式：同步与异步。异步方式，将依赖分割成多个节点，然后每个节点形成一个新的文件块。经过优化后的文件块树，会以一个个文件形式分发出去（仅仅打包成一个大文件形式是很低效的，详见）。
	
* **加载器插件**

	原生的Webpack只能处理JS文件，使用加载器插件，可以将其他资源专为JS资源。通过这种方式来加载，每一种资源都可以被Webpack看作是一个模块来加载。
	
* **智能模块解析**

	Webpack内置一个智能加载模块，可以用于处理几乎所有的第三方库。它甚至可以解析依赖声明的表达式，比如 require("./templates" + name + ".jade")。Webpack会处理最常见的JS模块标准：CommonJS 和 AMD。
	
* **插件系统**

	Webpack的最大特点，就是配套了非常丰富的插件系统。大部分内置特性功能都是基于这套插件系统。它可以让你根据需要自定义Webpack，将一般插件作为开源项目发布出去。
	
## 如何安装webpack
跟其他NPM包管理器下的模块安装没什么两样：

```
$ npm install -g webpack
$ npm install webpack --save-dev  #直接写入package.json文件
```

## webpack的基本使用
安装完成之后，就可以使用webpack了，但是使用之前还的先作配置。

* **配置**

每个项目下都必须配置有一个 webpack.config.js ，它的作用如同常规的 gulpfile.js/Gruntfile.js ，就是一个配置项，告诉 webpack 它需要做什么。我们先看个示例：

```
var webpack = require('webpack'); #发现没有，是同步模式
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js'); #启用同步模式
 
module.exports = {
    //插件项
    plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        index : './src/js/page/index.js'
    },
    //入口文件输出配置
    output: {
        path: 'dist/js/page',
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其它解决方案配置
    resolve: {
        root: 'D:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};
```
我们大致说一下上述代码段中的内容：

* * *plugins* 

它是插件项，这里我们使用了一个`CommonsChunkPlugin`的插件，它用于提取多个入口文件的公共脚本部分，然后生成一个`common.js`来方便多页面之间进行复用。

* * *entry*

它是页面的入口文件配置，`output`是对应输出项配置(也即为入口文件最终要生成什么样名字的文件、存放到哪里)，其语法规则可以总结为：

```
{
    entry: {
        page1: "./page1",
        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        page2: ["./entry1", "./entry2"]
    },
    output: {
        path: "dist/js/page",
        filename: "[name].bundle.js"
    }
}
```
该段代码最终会生成一个 page1.bundle.js 和 page2.bundle.js，并存放到 ./dist/js/page 文件夹下。

* * *module.loaders*

它是webpack配置文件中，最为关键的一块儿。它将告诉webpack每一种文件都需要使用什么加载器来处理：

```
module: {
        //加载器配置
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 jsx-loader 来编译处理
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }
```
如上，`-loader`其实是可以省略不写的，多个`loader`之间用“!”连接起来。注意所有的加载器都需要通过 `npm`来加载，并建议查阅它们对应的`readme`来看看如何使用。也就是说，这份配置文件中使用的插件，需要先通过npm下载。

* * *resolve*

这一块配置基本没什么难的，直接看注释就明白：

```
resolve: {
        //查找module的话从这里开始查找
        root: 'E:/github/flux-example/src', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
```
* **运行**
运行webpack跟运行grunt之类的命令基本一致：```$ webpack --display-error-details```，注意，这里我强烈建议带上`--display-error-details`这个参数，因为webpack在刚开始使用的时候，不熟悉的情况下，配置错误很正常，这时候如果没有详细的错误细节反馈，用户很容易觉得webpack很难搞，实际上，学习和使用任何一种工具，都有一个过渡，不是么？

其他主要的运行参数：

```
$ webpack --config XXX.js   //使用另一份配置文件（比如webpack.config2.js）来打包
$ webpack --watch   //监听变动并自动打包
$ webpack -p    //压缩混淆脚本，这个非常非常重要
$ webpack -d    //生成map映射文件，告知哪些模块被最终打包到哪里了
```
其中的 -p 是很重要的参数，曾经一个未压缩的 700kb 的文件，压缩后直接降到 180kb（主要是样式这块一句就独占一行脚本，导致未压缩脚本变得很大）。

* **具体的使用**

前面的基本配置和运行，那么具体的应用操作环节是怎样的呢？

* * *HTML*

直接在页面引入webpack最终生成的脚本即可，不用再像requirejs那样写什么data-main之类的。

```
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>demo</title>
</head>
<body>
  <script src="dist/js/page/common.js"></script>
  <script src="dist/js/page/index.js"></script>
</body>
</html>
```
上面的代码连基本的样式都没有？其实，webpack会自动生成相关标签注入到`<head>`标签中。

* * *JS*

各脚本模块可以直接使用`commonJS`来书写，并可以直接引入未经编译的模块，比如`JSX`、`sass`、`coffee`等（只要你在`webpack.config.js`里配置好了对应的加载器）。

我们再来看看变迁的页面入口文件(index.js)

```
require('../../css/reset.scss'); //加载初始化样式
require('../../css/allComponent.scss'); //加载组件样式
var React = require('react');
var AppWrap = require('../component/AppWrap'); //加载组件
var createRedux = require('redux').createRedux;
var Provider = require('redux/react').Provider;
var stores = require('AppStore');
 
var redux = createRedux(stores);
 
var App = React.createClass({
    render: function() {
        return (
            <Provider redux={redux}>
                {function() { return <AppWrap />; }}
            </Provider>
        );
    }
});
 
React.render(
    <App />, document.body
);
```

## webpack资源
* [webpack详细的配置参数](http://webpack.github.io/docs/configuration.html)

题外话：webpack的黑魔法太多了，建议不要一上来就因为它新，就把它放在生产环境中使用，否则，会因为不熟悉而遇到莫名其妙的坑，一时半会儿解决不了，影响了工作进度。切记切记！