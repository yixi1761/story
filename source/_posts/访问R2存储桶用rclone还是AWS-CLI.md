---
title: 访问R2存储桶用rclone还是AWS CLI
date: 2026-07-18 04:11:48
tags:
---
&emsp;&emsp;&emsp;要在cnb的自动构建里面把仓库里面的pdf上传到R2 bucket里面，方便在选择元件的时候随时点开datasheet查看参数。<br/>
&emsp;&emsp;&emsp;rclone是以前在Ubuntu上用过的，在Windows上面要麻烦一点。还一种工具是aws cli：s3cmd。如果流水线每次运行都要配置环境就是每次重新安装工具，应该是有保留环境的功能吧。<br/>
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
![alt text](image.png){% asset_img image.png "rclone功能" %}
s3cmd功能：
![alt text](image1.png)