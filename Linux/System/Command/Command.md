# 常用命令

## netstat
* 常用`netstat -plnt`
	* -p 表示显示进程号
	* -t 表示显示tcp网络情况
	* -n 直接显示ip，不通过域名服务器
	* -u 表示显示udp网络情况
	* -s 表示显示网络工作统计表
* `netstat` 查看到state是在统计和排除故障中最经常被关心的数据。通常我们会使用如下shell命令来计算服务器当前的80端口网络连接数

	```
	$ `netstat -tan | awk '$4~/:80$/{++state[$NF]} END {for(key in state) print key,"\t",state[key]}'`
	```
* `netstat -st | grep conn` 直接以服务器的全部连接数进行估算

## vmstat
* vmstat常用来查看机器内存的使用情况，当然我们最常用的是free，但是free能看到swap的使用情况，但看不到io的情况。所以free和vmstat需要配合起来使用
* vmstat中看到的swap的si和so如果都是0，则说明swap没有真正的I/O动作，设备性能不会受影响

## sysstat套件
* 首先需要安装`sysstat`(`yum install sysstat`)，完成后，你就可以使用`iostat`,`sar`,`mpstat`,`sa`等命令
* `iostat`
	* `rrqm/s`：合并后每秒发出到设备的读入请求数
	* `wrqm/s`：合并后每秒发送到设备的写入请求数
	* `r/s`：每秒发送到设备的读入请求数
	* `w/s`：每秒发送到设备的写入请求数
	* `rsec/s`：每秒从设备读入的扇区数
	* `wsec/s`：每秒向设备写入的扇区数
	* `rKB/s`：每秒从设备读入的数据量，单位为KB
	* `wKB/s`：每秒向设备写入的数据量，单位为KB
	* `avgrq-sz`：发送到设备的请求的平均大小，单位是扇区
	* `avgqu-sz`：发送到设备的请求的平均队列长度
	* `await`：I/O请求平均执行时间，包括发送请求和执行时间，单位是毫秒
	* `svctm`：发送到设备的I/O请求的平均执行时间。单位是毫秒
	* `%util`：在I/O请求发送到设备期间，占用CPU时间的百分比
一般来说，我们关心每秒的读写请求数、队列长度、请求执行时间和I/O时间占CPU的百分比
* `sar` （能够查看一段时间内的系统使用情况的统计报表，所以刚下载完sysstat之后，需要等一段时间才能使用[本质上是一个收集信息的过程]）