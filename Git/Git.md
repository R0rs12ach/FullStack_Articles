## Git
作为目前市面上最为优秀的代码版本管理工具，Git绝对是程序员必备技能之一，当然git博大精深，完整的掌握所有命令的使用，我个人感觉是不现实且不必要的。所谓二八定则，百分之八十的业务往往只需要那百分之二十的技能包即可完美解决了。在这个栏目中，我将搜罗各种Git工作流，并呈现各种常见的问题处理方法，方便你我他。

## Install
* **系统环境**  
`CentOS6.x`（windows图像化安装没什么好说的）
* **目标**  
安装`Git1.9.0`（git的1.7版本太落后，常常会出现无法clone等相关问题）
* **安装流程** 
	* 确保有编译环境
		
		```
	# yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel gcc perl-ExtUtils-MakeMaker		
		```
	
 
	* 下载`Git 1.9.0`的安装包
		
		```
	# cd /usr/src
	# wget http://distfiles.macports.org/git-core/git-1.9.0.tar.gz
 # tar xzf git-1.9.0.tar.gz
# cd git-1.9.0
		```
	* 编译`Git`

			# make prefix=/usr/local/git all
			# make prefix=/usr/local/git install
			# echo "export PATH=$PATH:/usr/local/git/bin" >> /etc/bashrc
			# source /etc/bashrc			
	* 检查`Git`版本号

			# git --version

[备注：git的各种版本的安装包这里给个靠谱稳定的[链接]((http://distfiles.macports.org/git-core/))，切记，最好不要使用低版本的Git]