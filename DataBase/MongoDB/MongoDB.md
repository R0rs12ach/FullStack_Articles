## MongoDB
作为key-value存储的典型非关系型数据库，MongoDB绝对值得一用。姑且不谈它作分布式数据库到底好不好，就冲着开源和文档健全这两点，你就应该掌握它。就眼下而言，用它来做Web Application的数据存储，通常都能满足需求。
## Install
* **系统环境**  
`CentOS 6.x`
* **目标**  
直接将`mongodb`安装到全局变量
* **安装流程**
	* 关闭防火墙，配置端口可通过防火墙（这一步可以根据应用场景酌情省略）
	
	```
# vim /etc/selinux/config 
# SELINUX=disabled //将打开文件中的SELINUX值设置为disabled
# wq! //保存退出
# setenforce 0 //使配置即时生效，set enforce哦
# vim /etc/sysconfig/iptables
# -A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 27017 -j ACCEPT //允许27017端口通过防火墙
# wq! //保存退出
# service iptables restart //重启防火墙使配置生效 
	```
	
	* 下载MongoDB安装包到指定目录，并解压，配置到全局变量
	
	```
# wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel62-3.2.3.tgz
# tar zxvf mongodb-linux-x86_64-rhel62-3.2.3.tgz
# mv mongodb-liunx-x86_64-rhel62-3.2.3 /usr/local/mongodb
# vim /etc/profile
# export PATH=$PATH:/usr/local/mongodb/bin
# wq!
# source /etc/profile //使配置立即生效
	```
* **添加基本配置文件**  

	```
# mkdir -p /root/mongodb/db/ //创建MongoDB数据库的存放路径，下面的配置文件要用到
# mkdir -p /root/mongodb/logs/ //创建MongoDB数据库的日志存放路径，下面的配置文件要用到
# cd /usr/local/mongodb/bin
# vi /usr/local/mongodb/bin/mongodb.conf //编辑配置文件mongodb.conf
# port=27017 //端口号指定
# dbpath=/root/mongodb/db/
# logpath=/root/mongodb/logs/mongodb.logs //注意，这里指定的是一个文件
# pidfilepath=/usr/local/mongodb/mongo.pid
# fork=true //设置mongodb在后台运行
# logappend=true //设置log输出方式为追加
# wq! 
	```
* **基本操作**  
	* **启动**  

	```
# mongod --config /usr/local/mongodb/bin/mongodb.conf
	``` 	
	* **进入控制台**
	 
	```
# mongo //进入MongoDB的console
# show dbs //查看默认数据库
# use dbname //切换到dbname数据库
# exit //退出MongoDB的console
	```