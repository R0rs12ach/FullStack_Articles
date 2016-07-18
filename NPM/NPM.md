# NPM
## 更新nodejs到最新版本
```
npm update -g
npm install -g n
n latest
```

## npm查看当前配置
```
npm config ls -l //可以显示当前的npm配置
npm config set options_key options_value //options_key可以通过上头一个命令得出
```

## NPM更新源的三种方式
* 通过config命令
    ```
    npm config set registry https://registry.npm.taobao.org
    npm info underscore（如果上面配置正确，那么这个命令会有字符串的response）
    ```
* 命令行指定
    ```
    npm --registry https://registry.npm.taobao.org info underscore
    ```
* 编辑 `~/.npmrc`加入如下内容即可
    ```
    registry = https://registry.npm.taobao.org
    ```

