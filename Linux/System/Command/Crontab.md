# Crontab
## 概览
> crontab命令常见于Unix和类Unix的操作系统之中，用于设置周期性被执行的指令。该命令从标准输入设备读取指令，并将其存放于“crontab”文件中，以供之后读取和执行。该词来源于希腊语chronos(χρόνος)，原意是时间。
　　通常，crontab储存的指令被守护进程激活， crond常常在后台运行，每一分钟检查是否有预定的作业需要执行。这类作业一般称为cron jobs。

## 安装
* CentOS6上
```
yum install vixie-cron
或者
yum install cronie
```
* CentOS7上
```
yum install cronie
```

## 服务
* 查看crontab服务状态：`service crond status`
* 查看crontab服务是否已设置为开机启动，执行命令：`ntsysv`
* 没有加入开机自动启动，就手动加入一下：`chkconfig --level 35 crond on`

## 使用
* *说明*
```
crontab 是用来让使用者在固定时间或固定间隔执行程序之用，换句话说，也就是类似使用者的时程表。-u user 是指设定指定 user 的时程表，这个前提是你必须要有其权限(比如说是 root)才能够指定他人的时程表。如果不使用 -u user 的话，就是表示设定自己的时程表。
```
* *语法*
```
crontab [-e [UserName] | -l [UserName] -r [UserName] -v [UserName] | File]
```
* *参数*
```
-e [UserName]: 执行文字编辑器来设定时程表，内定的文字编辑器是 VI，如果你想用别的文字编辑器，则请先设定 VISUAL 环境变数来指定使用那个文字编辑器(比如说 setenv VISUAL joe)
-r [UserName]: 删除目前的时程表
-l [UserName]: 列出目前的时程表
-v [UserName]: 列出用户cron作业的状态
时程表的格式:
   f1  f2  f3  f4  f5  program 
   分　时　日　月　周　 命令
  f1表示分钟,1～59 每分钟用*或者 */1表示
  f2表示小时,1～23（0表示0点）
  f3表示日期即一个月份中的第几日,1～31
  f4表示月份,1～12
  f5标识星期,0～6（0表示星期天）
  program要执行的程序
```
* *示例*
    * `30 21 * * * /usr/local/apache/bin/apachectl restart` 上面的例子表示每晚的21:30重启apache。
    * `45 4 1,10,22 * * /usr/local/apache/bin/apachectl restart` 上面的例子表示每月1、10、22日的4 : 45重启apache。
    * `10 1 * * 6,0 /usr/local/apache/bin/apachectl restart` 上面的例子表示每周六、周日的1 : 10重启apache。
    * `0,30 18-23 * * * /usr/local/apache/bin/apachectl restart` 上面的例子表示在每天18 : 00至23 : 00之间每隔30分钟重启apache。
    * `0 23 * * 6 /usr/local/apache/bin/apachectl restart` 上面的例子表示每星期六的11 : 00 pm重启apache。
    * `* */1 * * * /usr/local/apache/bin/apachectl restart` 每一小时重启apache
    * `23-7/1 * * * /usr/local/apache/bin/apachectl restart` 晚上11点到早上7点之间，每隔一小时重启apache
    * `0 11 4 * mon-wed /usr/local/apache/bin/apachectl restart` 每月的4号与每周一到周三的11点重启apache
    * `0 4 1 jan * /usr/local/apache/bin/apachectl restart` 一月一号的4点重启apache
