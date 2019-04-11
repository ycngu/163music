# jquery仿网易云音乐

包含管理端（admin 页面）

# 预览

https://ycngu.github.io/163music-show/

本预览不提供上传歌曲功能
# 使用 

用git clone此仓库 使用yarn或npm初始化

然后进入src目录使用parcel打包，在gitbash运行以下命令
```
parcel index.html playlist.html song.html --no-chache -d ../dist
```

最后安装http-server 进入dist目录在gitbash使用如下命令
``
http-server . -c-1
``

打开网址就能看到

# 关于上传歌曲

若使用admin功能上传歌曲，需要拥有七牛账号，并在根目录创建 qiniu-key.json, 内容如下

```json
{
    "accessKey": "你的accessKey",
    "secretKey": "你的secretKey"
}
```



