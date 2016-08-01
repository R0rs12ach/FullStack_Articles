# find 命令

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


SED:
=====
sed [options] sedcommand inputfile >outputfile
sed不接触初始输入文件，对其不做修改，若想保存改动，重要将输出重定向到一个文件即可
a\: 当前行后面加入一行或者文本
c\: 用信文本替换本行的文本
d: 删除一行
D: 删除模板块的第一行
i\: 在当前行上面插入文本
h: 拷贝模板块的内容到内存缓冲区
H: 追加模板块的内容到内存缓冲区
g: 获得内存缓冲区内容，并替换当前模板中的文本
G: 获得内存缓冲区内容，并追加到当前模版块文本的后面
n: 读取下一个输入行，用下一个命令处理新行而不是第一个命令
N: 追加下一个输入行到模版块后面，并在二者间插入一个新行，改变当前行的号码
p: 打印模板块的行
P: 打印模板块的地一行
q: 退出sed
r file: 从file中读行
!: 表示后面的命令对所有没有选中的行起作用
s/re/strint/: 用string替换正则表达式re
=: 打印当前行号
#command: 把注释扩展到下一个换行符号前
l 打印匹配行，包括显示控制符号
**替换标记
g: 行内全部替换
p: 打印行
w: 把行写入一个文件
x: 互换模板块和缓冲区中的文本
y: 把一个字符翻译成另外一个字符
**sed中元字符可以使用正则表达式中所有的
新加：
& 保存搜索字符 s/love 用**love**代替love
**sed定位文本的方式
x 行号
x-y 从x行到y行
/patern/ 查询包括patern的行
x,y! 不包括指定x-y行号的行
ex:
sed ‘/Tom/d’ file
删除包含Tom的行；
sed ‘/Tom/!d’ file
删除所有不包含Tom的行；
sed -n /north/p’ file
打印包含north的行；
sed ‘3d’ file
删除第三行；
sed ’3,$d’ file
删除第三行到最后一行；
sed ‘$d’ file
删除最后一行；
sed ‘/north/d’ file
删除包含north的行；
sed -n ‘s/west/north/g’ file
替换所有west为north；
sed -n ‘s/^west/north/p’ file
一行的开头的west用north替换，并打印发生替换的行；
sed ‘s/[0-9][0-9]$/&.5/’ file
所有以两个数字结尾的行，最后两个数字被他们自己替换并附加.5；
sed -n ‘s/\(Mar\)got/\1ianne/p’ file
将Margot替换为Marianne，并打印发生替换的行；
sed ‘s#abc#ABC#g’ file
所有abc由ABC替换，（所有s后面紧跟的字符都被认为是新的分隔符）；
sed ‘/west/,/east/p’ file
打印包含west行和包含east行中间的所有行；
sed ’1,/east/s/$’ file
地一行和包含east行之间的所有行的行尾加上字符串**A**；
sed -e ’1,3d’ -e ‘s/aa/bb/’ file
先删除1到3行，然后用bb替换aa；
sed ‘/Sam/r file1′ file
将文件file1中的内容附加在包含Sam的行后面；
sed ‘/Sam/w file1′ file
将还有Sam行写入文件file1中；
sed ‘/^north /a\new line second line’ file
所有以north加空格开头的行后面附加上两行文本，a\表示追加文本，\表示换行(tcsh中需要，bash中不需要)；
sed ‘/^north/i\new line’ file
在行首为north的行前面插入一个新行；
sed ‘/norht/{n; s/aa/bb/;}’ file
首先匹配含有north的行，然后执行一组命令，n表示移到下一行，并用bb代替aa；
sed ’1,3g/abcdefghijklmnopqrstuvwxyz/ABCDEFGHIJKLMNOPQRSTUVWXYZ/’ file
将1到3行中的所有小写字母用大写字母替换；
sed ‘/Lewis/{s/Lewis/bbb;q;}’ file
首先找到匹配Lewis的行，然后用bbb代替Lewis，接着q退出seq；
sed -e ‘/north/h’ -e ‘$G’ file
首先找到包含norht的行，h拷贝到内存缓冲区，然后到文件随后一行($)，G附加在最后一行后面；
sed -e ‘/we/{h;d;}’ -e ‘/ct/{G:}’ file
查找包含we的行，拷贝并且删除他，然后查找包含ct的行，将拷贝内容附加到他后面；
sed -e ‘/north/h’ -e ‘$g’ file
首先找到包含norht的行，h拷贝到内存缓冲区，然后到文件随后一行并覆盖他；
sed -n ‘l’ file
打印所有包含不能打印字符的行。
sed -n ‘/.*ing/p’ file
显示含有以ing结尾单词的行；
sed -n ‘/music/=’ file
打印含有music的行号；
sed ‘^$d’ file
删除空行
sed ‘s/^/abcd/g’ file
在行首填加abcd
sed ‘s/$/abcd/g’ file
在行尾填加abcd
sed ‘s/rm$/played &/g’ file
&表示在替换的时候保留被替换的词(rm–played rm)
sed ‘s/^M//g’ file
去掉行尾的^M (^M的输入，先按ctrl+v然后按enter即可即可)
—————————————————————————
—————————————————————————
gawk程序：
awk [-F 域分隔符] ‘commands’ inputfile
awk执行时，其域标志符为$1,$2,$3………$n，$0表示所有的域
awk -v var=value 赋值给一个用户定义的变量
awk ‘pattern’ file
awk ‘{action}’ file
awk ‘pattern {action}’ file
ex：
awk ‘{print $0}’ file
打印所有的域
awk ‘/Mary/’ file
打印包含file中包含Mary的行；
awk ‘{print $1}’ file
打印文件的第一列（第一个域）；
awk ‘/Mary/ {print $1,$2}’ file
打印文件file包含Mary的行的第一和第二个域；
df | awk ‘S4>75000′
打印可用空间大于75000的文件系统
date | awk ‘{print ” month:”, $2, “\n year:” $6}’
格式化date的输出；
awk ‘BEGIN{OFMT=”%.2f”; print 1.25463}’
指定数字输出格式，小数点后面保留两位有效数(1.25)；
awk ‘/[ab]cdef/’ file
打印匹配acdef或者bcdef的行；
awk ‘{print NR, $0}’ file
awk ‘{print $0, NR}’ file
NR当前记录数，每处理一个记录NR就加1
上面的命令相当于在每一行后面加上一个行号；
NF则记录每一行的域的个数；
awk -F ‘[ :\t]‘ ‘{print $0}’ file
指定域分隔符为空格、:或者tab
awk ‘/^[A-Z][a-z]+/’ file
打印所有以一个大写字母开头，然后是一个或者多个小写字母的行；
awk ‘$1~/[Bb]ill/’ file
第一个域匹配Bill或者bill的行；
awk ‘$1!~/ly$/’ file
第一个域末尾不是ly的行；
awk ‘/^(No|no)/’ file
打印行首为No或者no的行；
awk ‘BEGIN {print “file head \n”} {print $1 \t $4}’ file
awk ‘BEGIN {print “file head \n”} {print $1 \t $4}’ file |tee out.file
打印文件的时候附加一个文件头
awk ‘BEGIN {print “file head \n”} {print $1 \t $4} END {print “end of file”}’ file
打印文件的时候附加一个文件头和文件尾
awk中使用正则表达式
awk ‘{if($1~/hello/) print $0}’ file
如果域1中包含hello，就打印所有的域
~//表示匹配正则表达式，!~//表示不匹配正则表达式
awk ‘{if($6,>=,==,!=,~,!~（匹配，不匹配）
awk ‘$3==5346′ file
第三个域等于5346，就打印出该行；
awk ‘$3>5000 {print $1}’ file
第三个域大于5000就打印该行第一个域
awk ‘{max={$1>$2}?$1:$2; print max}’ file
如果第一个域大于第二个域，max=$1否则=$2，打印最大值
awk ‘{print ($1==11?”high\t” $2:”low\t” $2)}’ file
&&逻辑和，||逻辑或，!逻辑非
awk ‘$2==$5 && $3>5′ file
awk ‘/Tom/,/Jary/’ file
Tom第一次出现和Jary第一次出现之间的所有行；
awk ‘/north/ {print $3+10}’ file
包含north行的地三个域加10；
awk ‘$3==”aa” {$2=”dd”; print $0}’ file
将地三个域为aa的行的第二域变成dd，并打印该行；
**awk编程：
使用变量
awk ‘$1~/Tom/ {wage=$2+$3; print wage}’ file
先扫描第一个域，如果匹配Tom，就将第二和第三域的总和赋值给变量wage并输出；
awk ‘BEGIN{FS=”:”; OFS=”\t”;ORS=”\n\n”}{print $0}’ file
处理文件前设置
域分隔符(FS)为(:)
输出域分隔(OFS)为(\t)
输出记录分隔符(ORS)为(\n\n)
awk ‘END{print “The number of record is:’ NR}’ file
处理完文件后执行END语句
输出总记录数
awk ‘/Mary/{count++} END{print “Mary was found” count “times”}’ file
计数文件中Mary出现的次数；
**awk输入输出重定向
awk ‘$4>=70 {print $1, $2 >”outfile”}’ file
结果重定向到文件outfile中
awk ‘BEGIN{“date” |getline d; print d}’
将date结果输给getline函数，并打印
(getline从标准输出，管道等获得输入)
awk ‘BEGIN{“date” |getline d; split(d,mon); print mon[1] mon[2]}’
将date结果输给getline函数，slpit将d分解成数组，打印数组第2个变量
**split函数：split(string,array,field seperator)
awk ‘BEGIN{while(“ls”|getline) print}’
依次输出ls的每一项
awk
‘BEGIN{print “what is your name?”; getline name 0) {lc++; print lc ” ” a}}’
awk ‘BEGIN{while(getline a 0) {lc++; print lc}}’
如果文件不存在，getline返回-1
到达文件尾返回0
读到一行返回1
读取文件/etc/passwd，计数行数
**awk控制语句
if语句：
awk ‘{if($6>50) print $1 “too high”}’ file
awk ‘{if($6>20 && $250}{x++; print x} else {y++;print y}’ file
awk ‘{if($1~/peter/){next} else {print}}’ file
如果第一个域包含peter，awk就忽略这一行，读取文件的下一行，脚本从头开始执行；
循环语句：
awk ‘{i=1; while(i file
cat -v file 显示文件，包括其中的控制符(-v)
cat -n file 为每一行编号
cat -b file 每个非空行编号
cat -T file 以^I显示tab
3.
管道 | 把一个命令的输出传递给另外一个命令为输入
ex:
ls | grep file.doc
查找文件file.doc
who | awk ‘{print $1 “\t” $2}’ 只显示用户名和所在终端
df -h | awk ‘{print $1}’ |grep -v “filesystem” (-v表示输出不包括filesystem的项目)
df -h | awk ‘{print $1}’ |grep -v “filesystem” |sed ‘s/\/dev\///g’ 显示设备的时候不显示/dev/
4.tee
who | tee who.txt 输出到屏幕的同时输出到文件
who | tee -a who.txt 附加在文件的后面
5.文件重定向
ls -l |grep ^d >file.out 所有目录名字重定向到一个文件
cat /etc/passwd | awk -F: ‘{print $1}’ |sort >a.out (-F:指定分隔符为:)
cat >file.out reboot
at> ctrl+D
3小时后reboot
3.
bc – 计算器
scale=3 设置小数点后数字为数
ibase=2 二进制运算
4.
ls -d dir
只显示目录而不显示其下面的文件。
5.
sync
更新superblock并把它写入硬盘
6.
scp user@host:/path/file1 user@host:/path/file
服务器间拷贝文件
****************************************************************************************
当我们要查找文件中某些内容，或者在显示文件名时过滤出某一种类的文件，这时就需要用到grep。因为支持正则表达式，使得grep命令的搜索功能非常强大，它是使用好linux必须掌握的一个命令。


