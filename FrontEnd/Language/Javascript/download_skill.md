### 如果你要，HTML5可以下载的，不需要后端，纯前端支持。HTML5的一个例子：

```
var content = "file content!";
var data = new Blob([content],{type:"text/plain;charset=UTF-8"});
var downloadUrl = window.URL.createObjectURL(data);
var anchor = document.createElement("a");
anchor.href = downloadUrl;
anchor.download = "文件名.txt";
anchor.click();
window.URL.revokeObjectURL(data); 
```

### 以上代码chrome下亲测，运行即下载一个txt文件，内容就是file content！
LZ通过json获得的二进制，应该不是实际意义上的二进制吧？
json中的数组不是TypedArray，需要转化一下。
再来一个代码保存二进制的

```
var binaryData = [0,0,1,1,1,0,0,0,1,1]; //普通数组
//要保存的数据是10个二进制位，但是一个字节是8位，so，需要16位,2个字节
var binLen = binaryData.length;
var byteLen = Math.ceil(binLen/8);
var buffer = new ArrayBuffer(byteLen ); // 开辟两个字节的缓冲区
var byteData = new Uint8Array(buffer);
for(var i=0; i<byteLen ; i++) { //开始转化为8进制
  byteData[i] = 0;
  for(var j=i*8,k=7; k>=0&&j<binLen; j++,k--) {
    byteData[i] |= binaryData[j] << k;  
    //用按位或运算，将8个二进制一组地组合到byteData中
  }
}
var data = new Blob([buffer],{type:"application/octet-stream"});
var downloadUrl = window.URL.createObjectURL(data);
var anchor = document.createElement("a");
anchor.href = downloadUrl;
anchor.download = "二进制测试.bin";
anchor.click();
window.URL.revokeObjectURL(data);

```