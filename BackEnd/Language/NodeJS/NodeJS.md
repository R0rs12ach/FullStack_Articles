## NodeJS
NodeJS目前已经火的一塌糊涂，个人感觉主要原因在于JavaScript的全栈式应用场景和呈爆炸性增长的包，良好的生态环境必然会让JavaScript变得越来越强大。而且，随着ES6和模块化概念的普及，感觉今后大型应用使用NodeJS开发也未尝不可。

## Install
* **系统环境**  
`CentOS6.x`（windows上安装没什么好说的）
* **目标**  
**直接**将`NodeJS`安装在**全局环境**里，而无需作软连接
* **安装步骤**  
	* 检查python是否安装及版本号

			# rpm -qa | grep python
			# python -V //python推荐安装>=v2.5.0&<3.0.0，否则会影响nodejs运行


	* 从官网下载`NodeJS`二进制安装包到指定位置（注意不是源码包）

			# cd /usr/local/
			//如果已经安装过node，建议删除掉，否则跳过下面两步
			# rm -rf node
			# rm -rf node-v0.12.1-linux-x64
			
			# wget https://nodejs.org/dist/v4.3.1/node-v4.3.1-linux-x64.tar.xz
			# tar -zxv node-v4.3.1-linux-x64.tar.xz

	* 修改目录

			# mv node-v4.3.1-linux-x64 node //及形成了/usr/local/node路径

	* 添加环境变量并使添加操作立即生效
		
			# vim /etc/profile
			# export PATH=$PATH:/usr/local/node/bin //添加到打开文件profile的最后一行，并保存
			# source /etc/profile

	* 查看`node`和`npm`版本号

			# node -v
			# npm -v
				