## find 命令

* 在某个路径下查文件，例如在/etc下查找“*.log”的文件  
`find /etc -name “*.log”`

* 扩展，列出某个路径下所有文件，包括子目录  
`find /etc -name “*”`

* 在某个路径下查找所有包含“hello abcserver”字符串的文件  
`find /etc -name “*” | xargs grep “hello abcserver”`  
`find /etc -name “*” | xargs grep “hello abcserver” > ./cqtest.txt`

## 使用find和xargs

1. `find pathname -options [-print -exec -ok]
	* `-options`
		* `-name`: 按照文件名查找 
			```
			find ~ -name “*.txt” -print
			find ~ -name “[a-z][0-9].txt” -print
			```
		* `-perm`: 按照权限查找文件
			```
			find ~ -perm 755 -print 查找权限为755的文件
			find ~ -perm 007 -print 查找o位置上具有7权限的文件
			find ~ -perm 4000 -print 查找具有suid的文件
			```
		* `-type`: 按照类型查找(d表示目录，f表示文件)
			```
			find ~ -type d -print 查找所有目录
			```
		* `-size`: 按照数据的大小找
			```
			find ~ -size +1000000C -print 查找文件大小大于1000000字节(1M)的文件
			```
2. xargs
	```
	find ~ -type f | xargs ls -l
	find / -name “*.log” -type f -print| xargs grep -i DB0
	find . -type f |xargs grep -i “Mary”
	```

