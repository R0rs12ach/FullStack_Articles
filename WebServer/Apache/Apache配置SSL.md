# Apache如何使用HTTPS(CentOS7)
## 环境配置
* 禁止防火墙开机启动 `Systemctl disable firewall.service`
* 临时关闭防火墙 `Systemctl stop firewall.service`
* 关闭selinux `setenforce 0`
* 安装apache `yum install -y httpd`
* 查看是否安装mod_ssl模块， `ls /etc/httpd/modules/ | grep "mod_ssl"`
* 默认没有安装，那么安装该模块`yum install -y mod_ssl`
* 安装完成之后，查看mod_ssl配置文件的存放位置`/etc/httpd/conf.d/ssl.conf`

## 制作证书
* 打开含有`openssl.cnf`配置文件的目录`cd /etc/pki/tls`
* 生成密钥`openssl genrsa 1024 > server.key`
* 生成证书请求文件`openssl req -config openssl.cnf -new -key server.key > server.csr`
* 生成证书`openssl req -config openssl.cnf -x509 -days 365 -key server.key -in server.csr > server.crt`，这是利用密钥和证书请求文件生成证书，-days指明了证书的有效期，单位为天

## 配置apache的SSL
* 移动上一步生成的证书和密钥到目录`/etc/httpd/conf/`下
* 修改`/etc/httpd/conf.d/ssl.conf`文件中的证书和密钥位置

```
SSLCertificateFile /etc/httpd/conf/server.crt
SSLCertificateKeyFile /etc/httpd/conf/server.key
```
* 进一步修改`/etc/httpd/conf.d/ssl.conf`中的虚拟机设置

```
<VirtualHost _default_:443>
……
# 去掉如下两行的#号注释，并改写相关配置的值
DocumentRoot "/var/www/html/yeesan-1"
ServerName 192.168.12.118:443
……
</VirtualHost>
```
* 最后查看一下apache的`httpd.conf`中的配置文件是否引入了ssl配置文件和mod_ssl.so

```
IncludeOptional conf.d/*.conf
……
Include conf.modules.d/*.conf
```


