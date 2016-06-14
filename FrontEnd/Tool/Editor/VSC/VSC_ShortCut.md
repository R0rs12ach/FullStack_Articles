## 欧路
* `command + shift + L` : 切换是否开启欧路的划词
* `shift + space` : 直接打开欧路搜索框

## VSC
* `code` : 在shell情况下直接打开VSC
* `command + ctrl + f` : 全屏幕
* `command + p` : 搜寻任何一个文件（sublime 里面用的是cmd + t）
* `command + b` : 开启关闭siderbar 
* `alt + 鼠标选择` : 同时多选
* `command + k r` : 可以直接打开finder找到当前文件的所在地 
* `ctrl + /` : 直接获取提示
* `command + shift + alt + 方向键` : 同时产生多个光标
* `command + shift + alt + PageUp/PageDown` : 一次性产生一条cursor线到最顶/底部
* `ctrl + shift + a` : 把选中的内容的行号按照递增序排列
* `ctrl + shift + d` : 把选中的内容的行号按照递减序排列
* `**shift + alt + a**` : 添加一个注释，强烈推荐使用
* `shift + command + [` : 折叠一个代码段
* `shift + command + ]` : 展开一个代码段
* `f9` : 开启关闭一个断点
* `command + 0` : focus到了边栏操作区
* `command + 1~3` : 直接切换光标所在的编辑窗口（ctrl+command+左右方向键也可以移动）
* `command + k + 左右方向键` : 可以将窗口左右移动置换 
* `command + k v` : 使用markdown 语法的时候可以打开预览（对应的shift + cmd +v进行开关预览）
* `shift + commadn + m` : 查看错误和警告
* `shift + command + c` : 直接打开一个当前文件所在路径的console，好屌
* ```ctrl + ` ``` : 就可以直接打开当前文件所在的shell（内嵌的shell）  
* `command + \\` : 可以用来分屏
***
###### 自己定义的一些快捷键
* `ctrl + alt + e` : 快速切到explore面板
* `ctrl + alt + g` : 快速切到git面板
* `ctrl + alt + d` : 快速切到debug面板
* `ctrl + alt + f` : 快速切到search面板
* `ctrl + alt + i` : 快速打开安装插件弹窗
* `ctrl + alt + l` : 快速罗列已经安装的插件
* `ctrl + alt + r` : 快速打开推荐安装插件的弹窗
***
###### 如下这几个快捷键要是不记得，可以通过`shift + f10`呼出上下文提示用来辅助
* `**alt + f12**` : 查看一个对象的定义
* `**shift + f12**` : 查看一个对象的引用情况
* `**f2**` : 针对选中的变量，一次性全局替换，相当有用啊
* `**f12**` : 跳转到定义位置（譬如函数定义的位置







  
    
      
      

***
  
    
    
###### Debug模式下
首先区分一下StepOver StepInto StepReturn
* `Step Over` : 就是单步执行的时候，在函数内遇到子函数就不会进入子函数内进行单步执行，而将子函数整个执行完在停止，也就是把子函数整个当做一步
* `Step Into` : 单步执行的时候，遇到子函数就进入并且继续单步执行
* `Step Return` : 在单步执行到函数内部的时候，用step return就可以直接执行完子函数余下部分，并返回上层

* `cmd + k cmd + i` : 在debug模式下，可以迅速查看debug信息
* `f5` : 继续(开始)debug
* `shift + cmd + f5` : restart debug
* `cmd + f5` : run debug
* 
***
* `shift + cmd + \\` : 直接跳转到对应的Bracket
* `shift + left` : 以字符为粒度向左选中一个字符
* `shift + left + alt` : 以单词为粒度向左选中一串字符
* `left + alt` : 以单词为粒度光标向左移动
* `shift + right` : 以字符为粒度向右选中一个字符
* `shift + right + alt` : 以单词为粒度向右选中一串字符
* `right + alt` : 以单词为粒度光标向右移动
* `shift + down` : 向下选中一行
* `shift + up` : 向上选中一行
* `shift + home` : 从当前位置向上选中所有内容
* `shift + end` : 从当前位置向下选中所有内容
* `command + backspace` : 从当前位置向左删除当前行内容
* `command + delete` : 从当前位置向右删除当前行内容
* `command + PageDown` : 向下翻一页
* `command + PageUp` : 向上翻一页
* `alt + backspace` : 从当前位置直接以单词为粒度向左删除
* `alt + delete` : 从当前位置直接以单词为粒度向右删除
* `shift + ctrl + k` : 直接删除当前光标所在行
* `ctrl + alt + down` : 光标不滚动的情况下，一行行的向下翻阅代码
* `ctrl + alt + up` : 光标不滚动的情况下，一行行的向上翻阅代码
* `command + g` : 选中下一个匹配对象



## Sublime
* `shift + left` : 以字符为粒度向左选中一个字符
* `shift + left` : 以字符为粒度向左选中一个字符
* `shift + left + alt` : 以单词为粒度向左选中一串字符
* `left + alt` : 以单词为粒度光标向左移动
* `shift + right` : 以字符为粒度向右选中一个字符
* `shift + right + alt` : 以单词为粒度向右选中一串字符
* `right + alt` : 以单词为粒度光标向右移动
* `shift + down` : 向下选中一行
* `shift + up` : 向上选中一行
* `shift + home` : 从当前位置向上选中所有内容
* `shift + end` : 从当前位置向下选中所有内容
* `command + backspace` : 从当前位置向左删除当前行内容
* `command + delete` : 从当前位置向右删除当前行内容
* `command + PageDown` : 向下翻一页
* `command + PageUp` : 向上翻一页
* `alt + backspace` : 从当前位置直接以单词为粒度向左删除
* `alt + delete` : 从当前位置直接以单词为粒度向右删除
* `shift + ctrl + k` : 直接删除当前光标所在行
* `ctrl + alt + down` : 光标不滚动的情况下，一行行的向下翻阅代码
* `ctrl + alt + up` : 光标不滚动的情况下，一行行的向上翻阅代码
* `command + g` : 选中下一个匹配对象