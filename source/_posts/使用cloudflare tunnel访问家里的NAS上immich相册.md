---
layout: 
title: 使用cloudflaretunnel访问家里的NAS上immich相册
date: 2026-05-29 01:28:21
tags:
---
&emsp;&emsp;&emsp;备份几百KB的小图片没出现问题,相册里面手机拍照的十几MB的图片就直接报错了, 显示如下：
![alt text](23355e692e1fa73a82a8543d57816456.jpg)
&emsp;&emsp;&emsp;上面那条不用管，下面的，大概是Immich Android 客户端用 OkHttp + HTTP/2，和 Cloudflare 的 HTTP/2 + 压缩 / QUIC 组合不兼容，导致上传大文件时直接 RST_STREAM。可以在immich的安卓客户端设置网络自动切换，检测到WiFi连接家里网络的时候自动使用http://192.168.1.11:22283，其他时候用外网域名。这功能很好用，内网传输速度很快。外网域名连接需要关闭cloudflare的协议优化：
![alt text](image.png)   <br />
&emsp;&emsp;&emsp;路上十几分钟发现剩下的大概17GB图片已经通过tunnel上传完了，流量用掉17G也没提示，荣耀的系统设置不行啊，一点不灵，不过这tunnel速度真快。&emsp;&emsp;&emsp;笔记本用极空间双向同步，还有十几GB的时候想切荣耀手机的移动卡均摊点流量，同步卡了下，几分钟后再看已经同步下来完了，文件夹的确是增加了十几GB，但是做热点的联通和刚加了双V会员流量的移动卡都没消耗，奇怪
