# Chrome开发者工具高级使用

## Overview
* 快速定位到行
* 一次性展开所有子节点元素
* 通过CSS选择符进行DOM元素搜索
* 批量编辑与撤销
* 多列内容选择
* 使用$0获取当前选中元素
* 通过console面板获取元素并跳转到elements面板
* 查看事件的回调函数定义
* CSS3(Easing)渐入动画效果预览
* 资源加载快照
* 复制响应(Response)内容
* 在Sources面板中运行代码
* WorkSpace设置，直接在调试工具中写代码到源文件

## 快速定位到行
![快速定位到行](https://segmentfault.com/img/bVqSMa)

* 打开开发工具面板，快捷键`Ctrl+O` (Mac:`CMD+O`)
* 输入:`行号`:`列号` 来进行定位

## 一次性展开所有子节点元素
![一次性展开所有子节点元素](https://segmentfault.com/img/bVqSOn)

* 选择`Elements`面板
* 选择一个`DOM`元素，按下`Alt`键并且鼠标双击选择`DOM`元素前面的箭头，就会展开该`DOM`元素下的所有字节点元素

## 通过CSS选择符进行DOM元素搜索
![通过CSS选择符进行DOM元素搜索](https://segmentfault.com/img/bVqSW2)

* 快捷键`Ctrl + F`(Mac:`CMD+F`),试试在搜索栏输入`ID`选择符或者类选择符就可以定位到元素啦

## 批量编辑与撤销
![批量编辑与撤销](https://segmentfault.com/img/bVqSZr)

* 在`Sources`面板中选择一个资源文件进行编辑，如`css`文件，通过按住`Ctrl`键可以添加多个编辑光标，同时对多处进行编辑。按下`Ctrl + U`可以撤销编辑

## 多列内容选择
![多列内容选择](https://segmentfault.com/img/bVqS32)

* 选择`Sources`面板
* 选择一个资源文件
* 按住`Alt`键并拖动鼠标进行多列内容选择

## 使用$0获取当前选中元素
![使用$0获取当前选中元素](https://segmentfault.com/img/bVqS4s)

* 在`Elements`面板下选择一个`DOM`元素
* 切换到`Console`下，使用`$0`可以获取到选择的元素

## 通过console面板获取元素并跳转到elements面板
![通过console面板获取元素并跳转到elements面板](https://segmentfault.com/img/bVqS4K)

* 在`Console`面板中获取指定内容，比如：`document.getElementById('xxx')`
* 选择内容右键，选择`Reveal in Elements Panel`

## 查看事件的回调函数定义
![查看事件的回调函数定义](https://segmentfault.com/img/bVqTeG)

* 选择`Elements`面板
* 右侧面板选择`Event Listeners`导航，然后选择一个事件
* 对事件鼠标右键选择`Show Function Definition`，可定位到事件的函数定义

##  CSS3(Easing)渐入动画效果预览
![CSS3(Easing)渐入动画效果预览](https://segmentfault.com/img/bVqTf3)

* 点击渐入效果样式图标（紫色图标），可以预览动画效果
* 可对相应的贝塞尔曲线(`cubic-bezier`)进行调节动画效果

## 资源加载快照
![资源加载快照](https://segmentfault.com/img/bVqTg8)

* 选择`Network`面板
* 点击打开摄像机图标
* 重新加载页面

## 复制响应(Response)内容
![复制响应(Response)内容](https://segmentfault.com/img/bVqTiB)

* 选择`Network`面板
* 选择一个资源文件，右键`Copy Response`复制响应内容

## 在Sources面板中运行代码
![在Sources面板中运行代码](https://segmentfault.com/img/bVqTjh)

* 打开选择`Sources`面板，左侧选择导航菜单Snippets
* 右键新建一个代码片段，输入代码内容
* 右键代码片段，选择`Run`运行

## WorkSpace设置，直接在调试工具中写代码到源文件

* 选择`Sources`面板
* 在`Sources`面板中右键`Add Folder to Workspace`，添加相应的本地保存路径
* 选择你需要修改的文件，右键选择`Map to Network Resources`
* 然后改动文件，可以看到修改之后的效果。