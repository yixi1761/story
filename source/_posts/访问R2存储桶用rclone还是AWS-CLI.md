---
title: 访问R2存储桶用rclone还是AWS CLI
date: 2026-07-18 04:11:48
tags:
---
&emsp;&emsp;&emsp;要在cnb的自动构建里面把仓库里面的pdf上传到R2 bucket里面，方便在选择元件的时候随时点开datasheet查看参数。<br/>
&emsp;&emsp;&emsp;rclone是以前在Ubuntu上用过的，在Windows上面要麻烦一点。还一种工具是aws cli：s3cmd。如果流水线每次运行都要配置环境就是每次重新安装工具，应该是有保留环境的功能吧。<br/>
<!--more-->
rclone功能：
```
S3工具生态全景
├── 通用多协议同步工具		rclone（支持50+云存储）
├── 传统S3CLI工具		s3cmd（Python，老牌稳定）
├── MinIO生态客户端		mc（MinIO官方，体验最佳）
├── 极速并行CLI工具		s5cmd（Go，比aws-cli快40x）
├── S3API网关/适配层		versitygw（把任意存储变成S3）
├── 专项高效数据复制		S3Copy（断点续传，流式传输）
```
![alt text](image.png)
s3cmd功能：
![alt text](image1.png) <br/>
还是rclone更好用:
···
rclone sync /local/path remote:mybucket/prefix
···
<br/>
1、先创建存储桶datasheet，设置为公开访问，绑定域名，公共域名有限速 <br/>
2、在管理账户里面创建API密钥，可以只访问这个bucket的权限，然后把ID和secret保存到cnb的密码仓库的文件里面<br/>
![alt text](image2.png)
3、在cnb的云原生构建里面写好步骤，设置环境变量——安装rclone——sync同步。关键步骤就是环境变量的设置，因为rclone的配置默认写在配置文件里面。这个错误：<br/>
···
Config file "/root/.config/rclone/rclone.conf" not found
···
![alt text](image3.png)
<br/>
以下是可用的构建脚本：
···
master:
  push:
    - imports:
        - https://cnb.cool/code2025/password/-/blob/main/envs.yml
      env:
        RCLONE_CONFIG_MYREMOTE_TYPE: s3
        RCLONE_CONFIG_MYREMOTE_PROVIDER: cloudflareR2
        RCLONE_CONFIG_MYREMOTE_ACCESS_KEY_ID: $S3ID
        RCLONE_CONFIG_MYREMOTE_SECRET_ACCESS_KEY: $S3secret
        RCLONE_CONFIG_MYREMOTE_ENDPOINT: $S3endpoint
        RCLONE_CONFIG_MYREMOTE_FORCE_PATH_STYLE: 'true'
      stages:
        - name: 查看构建环境目录
          script: pwd && ls
        - name: 测试配置文件引用
          script: echo $S3ID
        - name: install
          script: apt-get update && apt-get install -y rclone
        - name: 上传PDF文件
          script: rclone sync ./output_pdf myremote:datasheet

···
&emsp;&emsp;&emsp;env要放到stages外面不然不生效；RCLONE_CONFIG_MYREMOTE_xxx这里MYREMOTE对应rclone命令行的myremote <br/>
&emsp;&emsp;&emsp;首次同步600多MB的文件上传只用了3分钟，速度很快