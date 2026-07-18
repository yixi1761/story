---
title: 迁移为知笔记到NAS
date: 2026-06-06 09:32:32
tags:
---
&emsp;&emsp;&emsp;之前尝试过把为知笔记部署到NAS，但是没有固定IP无法外网访问作罢。虽然可以每天备份，VPS还是不适合一劳永逸。最近cloud flare的tunnel挺稳定，便迁移回NAS。<br />
![](image.png)
步骤如下：<br />
&emsp;&emsp;&emsp;1：在VPS上下载wiznote/wizserver最新版镜像，tag腾讯云的容器镜像空间里，然后在NAS上拉取镜像；（因为docker hub被墙，如果NAS上面能直接拉取，这一步麻烦便可以省略；需要注意阿里云太大的镜像会推送超时，腾讯云的容器命名空间定位到香港，速度快一点避免超时失败）<br />
&emsp;&emsp;&emsp;2:在CNB上面创建空的仓库，初始化NAS上面的wiznote文件夹推送到CNB上面，记得用LFS上传大文件，然后在本地或者NAS上面用git clone拉取CNB上面创建的仓库；（因为笔记用的久了，资料很多，git是速度最快的转移方式了）<br />
&emsp;&emsp;&emsp;3：编辑docker-compose.yml文件，运行容器：

```
version: '3.8'

services:
  wiz:
    image: wiznote/wizserver
    container_name: wiz
    restart: always
    tty: true
    volumes:
      - ./wizdata:/wiz/storage
      - /etc/localtime:/etc/localtime
    ports:
      - "10086:80"
      - "9269:9269/udp"
    stdin_open: true
    command: ""
```

&emsp;&emsp;&emsp;4:在之前的顺道上面新建个应用程序，添加域名：
![](image1.png)
<br />
&emsp;&emsp;&emsp;5:手机和PC上面的笔记重新登录，这次可以用域名而不是IP地址了