---
title: cloudflare图床
date: 2026-05-14 12:20:34
tags:
---
&emsp;&emsp;&emsp;国内可用的存储需要域名备案，除腾讯阿里的对象存储之外：七牛的免费10G+10G流量，不支持https；又拍云联盟免费10G+15G流量，支持https；ucloud之前活动买的100多GB流量永久有效，但是只支持国内，无境外流量；123网盘的webdav 容量基本不限+10G流量，不支持自定义域名，且链接被改成一串字符无法组织，只能单个文件使用；所以就用cloudflare的免费图床，速度快，支持https，域名备案，免费；SM.MS已死，虽然没有直接跑路，改S.EE后没有免费额度了。</br>
<!---more--->
&emsp;&emsp;&emsp;优先选用cloudflare R2：10G+无限流量，支持https。</br>
&emsp;&emsp;&emsp;备用backblaze的对象存储，10G+套CF也是无限流量</br>
&emsp;&emsp;&emsp;综上，piclist设置4个存储云端</br>
![](piclist.png)
好用的图床工具有两种：客户端的piclist和浏览器的cloudflare imgbed。</br>
两者的共同点是使用的存储工具基本都是那几个，相册都只能显示通过前端上传的图片，不能显示后台上传的或者存储桶里面已有的文件。</br>
差异是：cloudflare imgbed基于浏览器，数据库用cloud flare的KV，可以做博客相册页面展示；piclist基于客户端，数据库存在本地，内置了一个云端管理，可以浏览存储桶后台上传的已有的文件。</br>这么看来，如果条件允许，用免安装版的piclist，放OneDrive里面同步更合适。另外，cloudflare的worker+KV速度明显慢很多，上传还需要通过worker中转，不及piclist直传快速。但是cloudflare imgbed有个huggingface的存储支持，永久免费不限流量的100GB，可以考虑（需要魔法上网注册）。
！[](cloudflare-imgbed.png)
cloudflare imgbed的上传路径和生成链接都不对，上传只能到存储桶根目录，上传页生成的链接还会多加桶名称；但是在移动操作中能正确移动到目标文件夹（第一次移动要手动输入文件夹路径），后台链接域名后缺少 / ；