---
title: coding的持续集成功能
date: 2021-11-04 15:19:09
categories: CDN
tags: [coding, git, 自动]
---

&emsp;&emsp;阿里的codeup也有持续集成，资源给的更多，但是并不好用。webIDE限制那么多，持续集成不知道会不会有啥坑。coding的呢每月1000min,单个并发，单次30min，足够个人用。缓存功能减少每次的运行时间。 
<!--more-->
&emsp;&emsp;目前用到的是：
&emsp;&emsp;coding代码同步到github，原本的方法是 coding ——> vps ——> github，现在是coding ——> CI ——> github，省去VPS中转，速度上应该节约几秒钟； </br>
&emsp;&emsp;hexo的generate，这里原本是把生成的public目录通过sftp发到VPS固定目录上，然后在push到gitee和GitHub上。sftp不检测更改，每次全部传输，耗时3~4min，严重浪费资源。更新后check out到workspace内，hexo g生成public，git clone winterpublic和winter仓库，然后winter通过上面方式直接coding ——> CI ——> github，public通过cp命令更新，再推到github和gitee；<p> hexo可以自动部署，但是不同的地方对根目录的地址格式不一样，如果把站点放在多个server上面还是自己生成public目录再直接部署最清楚明了，如果哪天不做这么多备份了，可以不用hexo g这一步了。</p>  </br>
&emsp;&emsp;又拍云的ftp同步：原本comments也是coding ——> vps ——> github，但是jsdelivr毕竟是公共资源，又想把静态文件集中管理迁移到又拍云。filezilla无法登录又拍云，页面方式每次上传麻烦。ncftp的话是可以上传，但是又像之前一样每次耗费时间浪费资源。没有找到支持git方式同步的云存储，有些连客户端或者命令行的ftp都不支持，像unicloud。幸好又拍云自己开发了upx工具，可以增量同步。只支持增加不支持删减。第一次上传创建目录，后面同步只上传有变更的部分，耗时几秒钟。wordpress的目录后面也可以用这种方式。   </br>
&emsp;&emsp;目前薅羊毛到这种程度，适可而止，cloud studio因为时间限制每天4h，放在买的ucloud的VPS上刚刚好。有空还是试试薅GitHub的资本主义羊毛吧。   </br>
&emsp;&emsp;   </br>
