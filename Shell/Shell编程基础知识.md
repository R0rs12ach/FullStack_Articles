- 脚本开始需要以`#!`开头，这样内核才会扫描该行其余的部分，看是否存在可用来执行程序的解释器的完整路径。  

- 行与行之间不需要使用分号，不过在同一行使用分号可以分隔多条命令，shell会依次执行这些命令。  

- 变量的赋值方式为：先写变量名称，紧接着=字符，最后是新值，这中间完全没有任何空格，当你想取出Shell变量的值，需于变量名称前加上`$`字符。  

- '<'符可以改变标准输入，'>'可以改变标准输出，'>>'可以附加到文件  

- `/dev/null`，位桶。传送到此文件的数据都会被系统丢掉，也就是说，当程序将数据写到此文件时，会认为它已经成功完成写入数据操作，但实际上什么事都没有做。  

- `/dev/tty`，UNIX会自动将它重定向到一个终端(一个实体的控制台或串行端口)，这个程序如果需要读取用户的输入时，这个文件就相当有用。

```
printf “Enter your password: "
stty -echo                              关闭自动打印输入字符的功能
read pass < /dev/tty
printf “Enter again: "
read pass2 < /dev/tty
stay echo                              重新开启自动打印输入字符的功能
……
```

- 基本命令的查找时，冒号的位置决定了优先查找位置

```
PATH=:/bin:/usr/bin:/usr/local/bin          先找当前目录是否存在命令
PATH=/bin:/usr/bin:/usr/local/bin:          最后查找当前目录是否存在命令
```

- 所谓的位置参数指的也就是Shell脚本的命令行参数。在Shell函数里，它们同时也可以是函数的参数。各参数都由整数来命名。基于历史原因，当它超过9，就应该用大括号把数字框起来。  

- 简单的执行跟踪。有时候我们执行一个命令的时候，直接蹦出个结果，是不是觉得都不知道人家干了啥。实际上，我们只需要在这个命令执行的时候，使用`sh -x command_name`就可以简单的跟踪一个程序是如何执行的，这对于学习人家写的Shell脚本非常有用。（如果是在脚本内部，也可以使用`set -x`开启跟踪，`set +x`关闭跟踪）  

- 每一条命令，不管是内置的，Shell函数，还是外部的，当它退出时，都会返回一个整数值给引用它的程序，这就是大家所熟知的程序退出状态。以惯例来说，在Shell中，退出状态值为0表示“成功”。  

- 替换运算符：
    - `${varname:-word}`；如果`varname`存在且非`null`，则返回其值，否则返回`word`。示例：如果`count`未定义，则`${count:-0}`值为0
    - `${varname:=word}`；如果`varname`存在且非`null`，则返回其值，否则设置它为`word`，并返回其值。示例：如果`count`未定义，则`${count=0}`会设置`count`为0
    - `${varname:?message}`；如果`varname`存在且非`null`，则返回其值，否则会显示`varname:message`，主要用来捕捉变量未定义所导致的错误
    - `${varname:+word}`；如果`varname`存在且非`null`，则返回`word`，否则返回`null`，主要用来测试变量的存在。示例：如果`count`已定义，则`${count:+1}`返回1  

- 位置参数：
    - `$#`：提供传递到`Shell`脚本的参数总数
    - `$*`, `$@`：一次表示所有的命令行参数，这两个参数把命令行参数传递给脚本或函数所执行的程序
    - `"$*"`：将所有命令行参数是为单个字符串，注意，加了引号，等同于"$1 $2 $3 ……"
    - `"$@"`：将所有命令行参数视为单独的个体，也就是单独字符串，等同于"$1", "$2"……
- 特殊变量：
    - `#`：目前进程的参数个数
    - `@`：传递给当前进程的命令行参数
    - `*`：当前进程的命令行参数
    - `—`：在引用时给予Shell的选项
    - `?`：前一命令的退出状态
    - `$`：Shell进程的进程编号
- 逻辑控制：
    - `$(（）)`的算术展开提供完整的算术运算能力，且使用与C相同的运算符和优先级
    - Shell脚本使用`exit`命令来提供退出状态的整数值，而Shell函数则使用`return`命令
    - bash的`source`命令等同于点号命令
- if-elif-else-if：

```
if pipeline
	[pipeline ……]
then
	statements-if-true-1
[elif pipeline]
	[pipeline……]
then
	statements-if-true-2
	…]
[else
	statements-if-all-else-false]
fi
```

- case语句：(注意这种不对称的右圆括号形式，虽然有点奇怪，但基本算是shell语言里唯一的不对称定界符实例)

```
case $1 in
-f)
     ...
     ;;
-d | —directory)
     ...
     ;;
*)
     ...
     ;;
esac
```
- for循环：

```
for i in atlbronhure*.xml
do
     echo $i
     mv $i $i.old
     sed ’s/Atlanta/&, the capital of the South/‘ < $i.old > $i
done
```

- while循环（只要condition是成功退出，while就会继续循环）

```
while condition
do
     statements
done
```

- until循环（只要condition未成功结束，until则会执行循环）

```
until condition
do
     statements
done
```

- 函数：

```
wait_for_user ( ) {
         until who | grep “$1” > /dev/null
         do
               sleep ${2:-30}
          done
}
wait_for_user tolstoy    #等待用户tolstoy，每30秒检查一次
wait_for_user tolstoy 60 #等待用户tolstoy，每60秒检查一次
```