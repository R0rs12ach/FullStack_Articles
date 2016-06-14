# Gitbook的使用

## Overview
* 安装介绍
* 基本配置
* 使用方法
* 其他相关

## 安装介绍
	$ npm install -g gitbook-cli
通过上述命令即可安装gitbook工具。Gitbook是专门用来（个人觉得主要是为从事程序员职业的人群服务）产生如下类型的图书：

### 主要功能介绍
* 静态站点: 默认格式。创建一个完全交互式的静态站点，可以发布到Github Pages或者自己的web服务器上
* eBook: 图书完成后可以用对应文件夹生成电子书，创建命令是：

		gitbook ebook ./repo
	但是在输出之前，你还需要安装ebook-convert，输出格式可以为PDF，ePub或者MOBI
* 网页: 可以用来生成一个单页的HTML网页。这个格式可用来转为PDF或者eBook类型。创建命令为：
	
		gitbook build ./repo -f page
* JSON: 此格式用来调试或者抽取图书的元数据，创建命令为：

		gitbook build ./repo -f json
		
	
## 基本配置
GitBook作为一个结合Git和MarkDown语法的文章编写工具，编纂书籍实在是相当方便的，尤其是程序员搞搞翻译，写写段子，即能有效的进行版本化管理，又能完全脱离word、page、evernote一类的“重”工具。  
GitBook会从仓库中的（文件夹根目录下的）book.json文件加载默认的配置，前提是这个文件存在。具体的配置项如下：

```
{

    // 输出文件夹[注意: 它会覆盖命令行传入的参数，不建议在此文件中配置]
    "output": null,

    // 产生的书籍的类型[注意: 它会覆盖命令行传入的参数，不建议在此文件中配置]
    "generator": "site",
    
    // 图书标题和描述 (默认从README抽取)
    "title": null,
    "description": null,
    
    // ebook格式扩展名(epub/pdf/mobi)[注意: 它会覆盖命令行传入的参数，不建议在此文件中配置]
    "extension": null,
    
    // GitHub 信息(默认被git使用)
    "github": null,
    "githubHost": "https://github.com/",

    // 插件列表, 可以通过包含-name的方式移除默认的插件
    "plugins": [],
    
    // 插件通用配置
    "pluginsConfig": {
        "fontSettings": {
            "theme": "sepia", "night" or "white",
            "family": "serif" or "sans",
            "size": 1 to 4
        }
    },
    
    // 模版中的链接 (null: default, false: remove, string: new value)
    "links": {
    	// 边栏顶部的用户自己的域名链接
    	"sidebar": {
    	    "Custom link name": "https://customlink.com"
    	},
        // 分享链接
        "sharing": {
            "google": null,
            "facebook": null,
            "twitter": null,
            "weibo": null,
            "all": null
        }
    },
    
    // PDF 参数
    "pdf": {
        // 文件最后加上toc
        "toc": true,
        // 给每一页加上页号
        "pageNumbers": false,
        // 文件内容的字体大小
        "fontSize": 12,
        // 每一页的纸张大小
        // 可选值有 [u’a0’, u’a1’, u’a2’, u’a3’, u’a4’, u’a5’, u’a6’, u’b0’, u’b1’, u’b2’, u’b3’, u’b4’, u’b5’, u’b6’, u’legal’, u’letter’]
        "paperSize": "a4",
        // 边距margin (默认以pts为单位)[注意72pts等同于1inch]
        "margin": {
            "right": 62,
            "left": 62,
            "top": 36,
            "bottom": 36
        }
    }
}
```

## 使用方法
通过-h命令实际上并不能直接看到可用命令参数，使用help却可以看到一些有用的命令提示（切记）：
	
	$ gitbook help
通过该命令，会得到如下输出，也即是gitbook的使用方法了:

```
  build [book] [output] 	 构建一本书
    --format 	 构建书本的类型（默认为静态网站，可选值有website/json/ebook)
    --log 	 指定呈现的日志级别 (默认为info，可选值有debug/info/warn/error/disabled)

  pdf [book] [output] 	 生成一本pdf格式书籍
    --log 	 指定呈现的日志级别 (默认为info，可选值有debug/info/warn/error/disabled)

  epub [book] [output] 	 生成一本epub格式书籍
    --log 	 指定呈现的日志级别 (默认为info，可选值有debug/info/warn/error/disabled)

  mobi [book] [output] 	 生成一本mobi格式书籍
    --log 	 指定呈现的日志级别 (默认为info，可选值有debug/info/warn/error/disabled)

  serve [book] 	 从指定目录构建一个可访问网站
    --port 	 指定网站监听的端口 (默认是4000)
    --lrport 	 指定实时监听代码变动而刷新页面的端口（默认是35729）
    --watch 	 启用/禁用文件变化感知器 (默认是true)
    --format 	 指定格式化类型 (默认为静态网站，可选值有website/json/ebook)
    --log 	 指定呈现的日志级别 (默认为info，可选值有debug/info/warn/error/disabled)

  install [book] 	 安装插件依赖

  init [directory] 	 依据SUMMARY.md内容来构建文件和文件夹
```

你可以将一个repo（即一个git仓库）作为一个站点，直接其服务（默认访问端口是**4000**）：

	$ gitbook serve ./repo
又可以将仓库直接生成为静态网页，导出到某web服务器（譬如Apache、Nginx等）可访问目录下：

	$ gitbook build ./repo --output=./Static_Web_File_Folder_Path
本身build命令和serve命令是可以带参数的：

	-o, --output <directory> 输出文件，默认为./_book
	-f, --format <name> 生成的书籍格式，默认为静态站点，可选项有：site/page/ebook/json
	--config <config file> 配置文件，默认为book.js或者book.json
	
## 其他相关
一个目录就是一本书的所有构建原材料，而这些原材料中至少必须包含如下两个文件：`README.md`和`SUMMARY.md`。然后还可以（可选项）包含一些其他配置文件信息，譬如实现**多语言**、**自动索引**、**插件**、**图书封面**等等。  
#### README.md
它是你编纂书籍的一个基本介绍，它可以自动的被加载到SUMMARY.md中
#### SUMMARY.md
这个文件非常重要，它定义了咱们的图书内容结构，它相当于一本图书的目录。**我通常建议是，直接构建SUMMARY.md文件后，利用该文件自动生成图书的基本目录结构（文件和文件夹）**，而不是手动构建图书目录结构，然后再手动改写SUMMARY.md文件。举个例子，首先编写SUMMARY.md内容如下：

```
# FullStack.live
这是我的图书目录结构
* [浏览器](浏览器/README.md)
	* [Chrome](浏览器/Chrome.md)
	* [FireFox](浏览器/firefox.md)
* [编辑器](编辑器/README.md)
	* [Sublime](编辑器/Sublime.md)	
	* [Vim](编辑器/vim.md)
```
保存好如上内容的SUMMARY.md文件之后，只需在拥有SUMMARY.md文件的根目录下要执行：

	$ gitbook init
即可构造一个如下结构的文件夹。[**注意：SUMMARY的文件内容格式一定要正确，否则会构建失败，或者无法构建出正确的目录结构**]

```
	.根目录
		|————浏览器
		|      |___README.md
		|      |___Chrome.md
		|	   |___firefox.md
		|
		|————编辑器
			   |___README.md
			   |___sublime.md
			   |___vim.md
```
#### 实现多语言
GitBook支持使用多种语言来编写自己图书，每种语言都应该有一个自己的子目录（不要把多种语言包放在同一个子目录），遵循gitbook的格式，`LANGS.md`文件应该和`SUMMARY.md`文件一样放在根目录下。而`LANGS.md`文件的内容很简单，只需要声明一下语言包的位置即可：

```
	* [English](en/)
	* [Chinese](zh/)
	* [Japanese](jp/)
```
#### 词汇表
词汇表`GLOSSARY.md`格式也很简单，它允许用户自行定义词汇的含义。而且基于这些词汇定义，gitbook会自动构建一个索引，同时如果在你的文章中出现这些词汇条目，gitbook会自动高亮这些条目：

```
	# 五毛
	不论缘由，歌颂祖国
	# 美分
	不讲道理，粉饰美帝
```
#### 封面
封面文件为`./cover.jpg`,尺寸为`1800*2360`，利用插件`autocover`可以自动创建一个封面文件
#### 插件
本身由gitbook生成的网站为静态的，交互性虽然有，但是太过单一，那么加入一些插件可以有效提高用户交互性体验，同时也可以辅助书籍作者跟踪网站的浏览情况等，下面介绍一些常用的插件：  

Plugin Name               | 插件基本用途简介
------------------------- | ------------------------------
[Google Analytics](link1) | 这个就不用我多说了吧，但是要自备梯子
[AutoCover](link2)        | 自动生成一个书籍封面
[Disqus](link3)           | 给你的静态网站嵌入评论系统
[JSBin](link4)            | 给文章中的JS代码更好看的样式


[link1]:https://github.com/GitbookIO/plugin-ga
[link2]:https://github.com/GitbookIO/plugin-autocover
[link3]:https://github.com/GitbookIO/plugin-disqus
[link4]:https://github.com/jcouyang/gitbook-plugin-jsbin

#### Git忽略文件和文件夹
GitBook读取`.gitignore`，`。bookignore`和`.ignore`来获取需要忽略的文件或文件夹列表。（这几个隐藏配置文件的文件格式和`.gitignore`一样）。`.gitignore`[最佳实践](https://github.com/github/gitignore/blob/master/Node.gitignore)是忽略node在build过程中产生的文件(node_module一类)以及gitbook在构建过程中产生的文件(`_book`,`*.epub`,`*.mobi`)。


