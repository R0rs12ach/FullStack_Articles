# Gulp 教程

## Overview
* Gulp介绍
* 如何安装Gulp
* Gulp的基本使用
* Gulp工作的基本原理
* Gulp资源

## Gulp介绍
`Gulp`是一种基于流的（`stream`概念和`pipe`概念）[^1]，代码优于配置（很明显，我个人感觉这是说给那些使用Grunt的童鞋滴）的新一代构建工具。`Gulp`和`Grunt`类似，但相比于`Grunt`频繁的`IO`操作，`Gulp`的流操作，能够更快的完成构建工作。

同样，在`gulp`的使用过程中，仅仅需要掌握`gulp`的五个命令，这个五个命令即使gulp提供给我们的一套`streamoing`构建框架，也就相当于是unix里的pipe功能。而至于说到pipe中各个组合命令的实际功能，则相当于是`gulp`下载的各个不同功能的插件或者自己构建函数定义的功能。

## 如何安装Gulp
`gulp`的安装也同样是利用npm：

```
$ npm install -g gulp  #全局安装gulp
$ npm install --save-dev gulp #将安装写入到工程目录下的package.json文件中
```
## Gulp的基本使用
刚才说过，gulp的使用，最主要的是知道五个常用命令即可：

```
* gulp.task(name, function)  #定义个task
* gulp.run(tasks....) #可以并行运行多个task
* gulp.watch(global, function)  #当global中的内容发生改变的时候，执行function
* gulp.src(global)  #返回一个可读的stream
* gulp.dest(global)  #返回一个可以写的steam
``` 

知道了这几个命令，那我们可以随便找一个gulpfile来看一下，看懂了，就可以自己写了，再然后就是去了解它包含哪些插件了。  
下面看个unix的例子和gulp使用的例子，立马会发现gulp的使用是如此的便捷

```
cat index.html | wc -l   #其中wc -l是用来统计index.html的行数的
```
在上面这个例子中，前一个命令的输出，利用“|”连起后面`wc -l`，就无形中，将其变成了后者的输入。同样我们发现在gulp中利用`.pipe()`即可形成这种可读性极强的流工作模式

```
gulp.src('js/app.js')
   .pipe(uglify())
   .pipe(gulp.dest('build'))
```

## Gulp工作的基本原理
* **STREAMS**

数据流能够通过一系列的小函数来传递数据，这些函数会对数据进行修改，然后把修改后的数据传递给下一个函数。在上面的例子中，gulp.src()函数用字符串匹配一个文件或者文件的编号（被称为“glob”）,然后创建一个对象流来代表这些文件，接着传递给uglify()函数，它接受文件对象之后返回有新压缩源文件的文件对象，最后那些输出的文件被输入gulp.dest()函数，并保存下来。

整个数据流动过程如下图所示：
![单任务数据流图](http://ww2.sinaimg.cn/bmiddle/7045568dgw1f1rjc0mbyhj20nx0kut9i.jpg)
 

当只有一个任务的时候，函数并不会起太大的作用。然而，仔细思考下面的代码：

```
gulp.task('js', function () {
   return gulp.src('js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('build'));
});
```
在运行这段程序之前，你需要先安装`gulp`,`gulp-jshint`,`gulp-uglify`和`gulp-concat`。

这个任务会让所有的文件匹配`js/*.js`（比如`js`目录下的所有`JavaScript`文件），并且执行`JSHint`，然后打印输出结果，取消文件缩进，最后把他们合并起来，保存为`build/app.js`，整个过程如下图所示：   
![串行任务流程图](http://ww1.sinaimg.cn/bmiddle/7045568dgw1f1rjc95mijj20sy0hw0ty.jpg)

* **GULP.SRC()**

`gulp.src()`方法输入一个`glob`(比如匹配一个或多个文件的字符串)或者`glob`数组，然后返回一个可以传递给插件的数据流。

`Gulp`使用`node-glob`来从你指定的`glob`里面获取文件，这里列举下面的例子来阐述，方便大家理解：

```
js/app.js 精确匹配文件
js/*.js 仅匹配js目录下的所有后缀为.js的文件
js/*/.js 匹配js目录及其子目录下所有后缀为.js的文件
!js/app.js 从匹配结果中排除js/app.js，这种方法在你想要匹配除了特殊文件之外的所有文件时非常管用
*.+(js|css) 匹配根目录下所有后缀为.js或者.css的文件
```

`js`目录下包含了压缩和未压缩的`JavaScript`文件，现在我们想要创建一个任务来压缩还没有被压缩的文件，我们需要先匹配目录下所有的`JavaScript`文件，然后排除后缀为`.min.js`的文件:

```
gulp.src(['js/**/*.js', '!js/**/*.min.js'])
```

* **DEFINING TASKS**

`gulp.task()`函数通常会被用来定义任务。当你定义一个简单的任务时，需要传入任务名字和执行函数两个属性。

```
gulp.task('greet', function () {
   console.log('Hello world!');
});
```
执行`gulp greet`的结果就是在控制台上打印出“Hello world”.

一个任务有时也可以是一系列任务。假设要定义一个任务`build`来执行`css`、`js`、`imgs`这三个任务，我们可以通过指定一个任务数组而不是函数来完成。

```
gulp.task('build', ['css', 'js', 'imgs']);
```
这些任务**不是同时进行**的，所以你不能认为在`js`任务开始的时候css任务已经结束了，也可能还没有结束。为了确保一个任务在另一个任务执行前已经结束，可以将函数和任务数组结合起来指定其依赖关系。例如，定义一个css任务，在执行前需要检查`greet`任务是否已经执行完毕，这样做就是可行的:

```
gulp.task('css', ['greet'], function () {
   // Deal with CSS here
});
```
**现在，当执行css任务时，Gulp会先执行greet任务，然后在它结束后再调用你定义的函数。**

* **DEFAULT TASKS**

你可以定义一个在`gulp`开始运行时候默认执行的任务，并将这个任务命名为`default`：

```
gulp.task('default', function () {
   // Your default task
});
```
* **PLUGINS**

`Gulp`上有超过600种插件供你选择，你可以在插件页面或者`npm`上搜索`gulpplugin`来浏览插件列表。有些拥有`gulpfriendly`标签的插件，他们不能算插件，但是能在`Gulp`上正常运行。 需要注意的是，当直接在`npm`里搜索时，你无法知道某一插件是否在**黑名单**上（你需要滚动到插件页面底部才能看到）。[*注意：黑名单意味着不要使用*]

大多数插件的使用都很方便，它们都配有详细的文档，而且调用方法也相同（通过传递文件对象流给它），它们通常会对这些文件进行修改（但是有一些插件例外，比如`validators`），最后返回新的文件给下一个插件。

让我们用前面的js任务来详细说明一下：

```
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('js', function () {
   return gulp.src('js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('build'));
});
```

这里使用了三个插件，`gulp-jshint`,`gulp-uglify`和`gulp-concat`。开发者可以参考插件的`README`文档，插件有很多配置选项，而且给定的初始值通常能满足需求。细心的读者可能会发现，程序中`JSHint`插件执行了2次，这是因为第一次执行`JSHint`只是给文件对象附加了jshint属性，并没有输出。你可以自己读取`jshint`的属性或者传递给默认的JSHint的接收函数或者其他的接收函数,比如`jshint-stylish`.

其他两个插件的作用很清楚：`uglify()`函数压缩代码，`concat(‘app.js’)`函数将所有文件合并到一个叫app.js的文件中。

* **GULP-LOAD-PLUGINS**

我发现`gulp-load-plugin`模块十分有用，它能够自动地从`package.json`中加载任意Gulp插件然后把它们附加到一个对象上。它的基本用法如下所示：

```
var gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();
```
你可以把所有代码写到一行，但是我并不推荐这样做。

在执行那些代码之后，插件对象就已经包含了插件，并使用“驼峰式”的方式进行命名（例如，`gulp-ruby-sass`将被加载成`plugins.rubySass`），这样就可以很方便地使用了。例如，前面的js任务简化为如下：

```
var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

gulp.task('js', function () {
   return gulp.src('js/*.js')
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('default'))
      .pipe(plugins.uglify())
      .pipe(plugins.concat('app.js'))
      .pipe(gulp.dest('build'));
});
```
假设package.json文件如下面所示：

```
{
   "devDependencies": {
      "gulp-concat": "~2.2.0",
      "gulp-uglify": "~0.2.1",
      "gulp-jshint": "~1.5.1",
      "gulp": "~3.5.6"
   }
}
```
这个例子虽然已经够短了，但是使用更长更复杂的Gulp文件会把它们简化成一两行代码。

三月初发布的`Gulp-load-plugins0.4.0`版本**添加了延迟加载功能**，提高了插件的性能，因为插件在使用的时候才会被加载进来，你不用担心`package.json`里未被使用的插件影响性能（但是你需要把他们清理掉）。换句话说，如果你在执行任务时只需要两个插件，那么其他不相关的插件就不会被加载。

* **WATCHING FILES**

`Gulp`可以监听文件的修改动态，然后在文件被改动的时候执行一个或多个任务。这个特性十分有用（对我来说，这可能是Gulp中最有用的一个功能）。你可以保存`LESS`文件，接着Gulp会自动把它转换为CSS文件并更新浏览器。

使用`gulp.watch()`方法可以监听文件，它接受一个`glob`或者`glob`数组（和`gulp.src()`一样）以及一个任务数组来执行回调。

让我们看看下面，`build`任务可以将模板转换成`html`格式，然后我们希望定义一个`watch`任务来监听模板文件的变化，并将这些模板转换成`html`格式。`watch`函数的使用方法如下所示：

```
gulp.task('watch', function () {
   gulp.watch('templates/*.tmpl.html', ['build']);
});
```
现在，当改变一个模板文件时，`build`任务会被执行并生成`HTML`文件，也可以给`watch`函数一个回调函数，而不是一个任务数组。在这个示例中，回调函数有一个包含触发回调函数信息的`event`对象：

```
gulp.watch('templates/*.tmpl.html', function (event) {
   console.log('Event type: ' + event.type); // added, changed, or deleted
   console.log('Event path: ' + event.path); // The path of the modified file
});
```
`Gulp.watch()`的另一个非常好的特性是返回我们熟知的`watcher`。利用`watcher`来监听额外的事件或者向`watch`中添加文件。例如，在执行一系列任务和调用一个函数时，你就可以在返回的`watcher`中添加监听`change`事件:

```
var watcher = gulp.watch('templates/*.tmpl.html', ['build']);
watcher.on('change', function (event) {
   console.log('Event type: ' + event.type); // added, changed, or deleted
   console.log('Event path: ' + event.path); // The path of the modified file
});
```
除了`change`事件，还可以监听很多其他的事件:

```
* * end 在watcher结束时触发（这意味着，在文件改变的时候，任务或者回调不会执行）
* * error 在出现error时触发
* * ready 在文件被找到并正被监听时触发
* * nomatch 在glob没有匹配到任何文件时触发
```
Watcher对象也包含了一些可以调用的方法：

```
watcher.end() 停止watcher（以便停止执行后面的任务或者回调函数）
watcher.files() 返回watcher监听的文件列表
watcher.add(glob) 将与指定glob相匹配的文件添加到watcher（也接受可选的回调当第二个参数）
watcher.remove(filepath) 从watcher中移除个别文件
Reloading Changes In The Browser
```
当一个文件被修改或者`Gulp`任务被执行时可以用`Gulp`来加载或者更新网页。`LiveReload`和`BrowserSync`插件就可以用来实现在游览器中加载更新的内容。

* **LIVERELOAD**

`LiveReload`结合了浏览器扩展（包括`Chrome extension`），在发现文件被修改时会实时更新网页。它可以和`gulp-watch`插件或者前面描述的`gulp-watch()`函数一起使用。下面有一个`gulp-livereload`仓库中的`README`文件提到的例子:

```
var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch');

gulp.task('less', function() {
   gulp.src('less/x.less')
      .pipe(watch())
      .pipe(less())
      .pipe(gulp.dest('css'))
      .pipe(livereload());
});
```
这会监听到所有与`less/x.less`相匹配的文件的变化。一旦监测到变化，就会生成css并保存，然后重新加载网页.

* **BROWSERSYNC**

`BroserSync`在浏览器中展示变化的功能与`LiveReload`非常相似，但是它有更多的功能。

当你改变代码的时候，`BrowserSync`会重新加载页面，或者如果是`css`文件，会直接添加进`css`中，**页面并不需要再次刷新**。这项功能在网站是**禁止刷新的时候是很有用的**。假设你正在开发单页应用的第4页，刷新页面就会导致你回到开始页。使用`LiveReload`的话，你就需要在每次改变代码之后还需要点击四次，而当你修改`CSS`时，插入一些变化时，`BrowserSync`会直接将需要修改的地方添加进CSS，就不用再点击回退。

`BrowserSync`也可以在**不同浏览器之间同步点击翻页、表单操作、滚动位置**。你可以在电脑和iPhone上打开不同的浏览器然后进行操作。所有设备上的链接将会随之变化，当你向下滚动页面时，所有设备上页面都会向下滚动（通常还很流畅！）。当你在表单中输入文本时，每个窗口都会有输入。当你不想要这种行为时，也可以把这个功能关闭。
![良好的同步性](http://p4.qhimg.com/t011034e5a90ce13015.gif)

`BrowserSync`**不需要使用浏览器插件**，因为它本身就可以给你提供文件(如果文件是动态的，则为他们提供代理服务）和用来开启浏览器和服务器之间的socket的脚本服务。到目前为止这个功能的使用都十分顺畅。

实际上`BrowserSync`对于`Gulp`并不算一种插件，因为`BrowserSync`并不像一个插件一样操作文件。然而，npm上的`BrowserSync`模块能在`Gulp`上被直接调用。

首先，需要通过npm安装一下：```npm install --save-dev browser-sync```

然后gulpfile.js会启动BrowserSync并监听文件：

```
var gulp = require('gulp'),
    browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
   var files = [
      'app/**/*.html',
      'app/assets/css/**/*.css',
      'app/assets/imgs/**/*.png',
      'app/assets/js/**/ * .js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: './app'
      }
   });
});
```

执行`gulp browser-sync`后会监听匹配文件的变化，同时为`app`目录提供文件服务。

## VS Grunt

如果你对`Grunt`足够熟悉，就会注意到，`Gulp`和`Grunt`的工作方式很不一样。`Grunt`不使用数据流，而是使用文件，**对文件执行单个任务然后保存到新的文件中**，每个任务都会重复执行所有进程，文件系统频繁的处理任务会导致`Grunt`的运行速度比`Gulp`慢。

前面提到过，`Gulp`是为数不多的使用JavaScript开发的构建工具之一，也有其他不是用JavaScript开发的构建工具，比如Rake，那么我们为什么要选择Gulp呢?

目前最流行的两种使用`JavaScript`开发的构建工具是`Grunt`和`Gulp`。`Grunt`在2013年非常流行，因为它彻底改变了许多人开发网站的方式，它有上千种插件可供用户使用，从linting、压缩、合并代码到使用`Bower`安装程序包,启动`Express`服务都能办到。这些和`Gulp`的很不一样，`Gulp`只有执行单个小任务来处理文件的插件，因为任务都是`JavaScript`（和`Grunt`使用的大型对象不同），根本不需要插件，你只需用传统方法启动一个`Express`服务就可以了。

`Grunt`任务拥有大量的配置，会引用大量你实际上并不需要的对象属性，但是`Gulp`里同样的任务也许只有几行。让我们看个简单的`Gruntfile.js`，它规定一个将LESS转换为`CSS`的任务，然后执行`Autoprefixer`:

```
grunt.initConfig({
   less: {
      development: {
         files: {
            "build/tmp/app.css": "assets/app.less"
         }
      }
   },

   autoprefixer: {
      options: {
         browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      multiple_files: {
         expand: true,
         flatten: true,
         src: 'build/tmp/app.css',
         dest: 'build/'
      }
   }
});

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-autoprefixer');

grunt.registerTask('css', ['less', 'autoprefixer']);
```

与Gulpfile.js文件进行对比，它们执行的任务相同：

```
var gulp = require('gulp'),
   less = require('gulp-less'),
   autoprefix = require('gulp-autoprefixer');

gulp.task('css', function () {
   gulp.src('assets/app.less')
      .pipe(less())
      .pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
      .pipe(gulp.dest('build'));
});
```

因为`Grunt`比`Gulp`更加频繁地操作文件系统，所以使用数据流的`Gulp`总是比`Grunt`快。对于一个小的`LESS文件`，`gulpfile.js`通常需要6ms，而`gruntfile.js`则需要大概50ms——慢8倍多。这只是个简单的例子，对于长的文件，这个数字会增加得更显著。

## Gulp资源
* [通过stream工厂来共享stream](http://www.gulpjs.com.cn/docs/recipes/sharing-streams-with-stream-factories/)

* [拥有实时重载（live-reloading）和 CSS 注入的服务器](http://www.gulpjs.com.cn/docs/recipes/server-with-livereload-and-css-injection/)

* [指定一个新的当前工作目录(cwd)](http://www.gulpjs.com.cn/docs/recipes/specifying-a-cwd/)

* [改变版本号以及创建一个 git tag](http://www.gulpjs.com.cn/docs/recipes/bump-version-and-create-git-tag/)


[^1]:所谓的`stream`，实际上是把构建流程想象成一个个连接的管道（PIPE）。这样做的原因，不得不说一下Unix的一些概念。`Unix`系统本身提供的命令相对较少，但是用户可以自己组合命令形成更为强大的功能。命令和命令的衔接通常用的就是`pipe`。