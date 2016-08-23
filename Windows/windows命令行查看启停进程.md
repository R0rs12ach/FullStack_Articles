# Windows命令行查找启停进程
## 查看进程
* 进入cmd之后，通过`netstat -ano`可以查看端口占用情况
* 通过`netstat -ano | findstr '9050'`查看指定端口9050的占用情况，最终输出  
  		```
		  TCP 127.0.0.1:9050 0.0.0.0:0 LISTENING 2016
		```  
	那么我们知道端口为9050的进程号为2016

## 停止进程
* 通过cmd命令`tasklist | findstr '2016'`查看进程号为2016的进程名称为`javaw.exe`，最终输出  
		```
		javaw.exe 2016 Console 0 16,064k
		```
* 通过`taskkill /f /t /im javaw.exe`即可杀掉该进程


