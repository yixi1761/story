---
title: 使用免费空间创建博客网站（2）
date: 2021-06-07 00:31:47
categories: CDN
tags: [comment, hashover, 统计, 404]
---
byet.host的主页上有对比各个免费虚拟主机的速度对比，当然是他们家最快，鉴于byet的不完美，试了其他几家的php空间。
<h3> freehostia </h3>
<!--more-->

<div>250MB存储，6GB月流量，1个数据库10MB，支持memcache还支持Python，面板看起来比cpanel精致，但是没那么好用。WordPress的插件失灵了，上传的onemanager打开首页只有两行注释，其他空白。对比下Profreehost，貌似用的CGI/FASTCGI，没有Apache。或者哪里有设置问题。也就只有速度快这一点了，其实还挺想用，后台文件管理可以直接当编辑器了。</div>
<h3> Profreehost </h3>

<div>除了迁移麻烦外，不限制空间大小的话可以用后台的媒体库管理照片之类的，加上文件夹分类功能，比本地更实用。前段时间绑定域名和addon域名都是404，连带byethost也是。这几天又好了。看来是折腾太多被临时屏蔽掉了。有自己的域名呢，就试着用国内的CDN，之前买的ucloud的100G不限时的，结果CDN指向IP呢，不知道转哪去了，指向unaux的域名呢，加载不到静态文件。Ucloud的CDN又没有cname的方式。百度云加速不知道如何，先解析过来，等过几天404消了看看吧，cname方式应该跟DNS直接Cname没区别。</div>
<div>刚发现的一家，hyperphp，看到那条绿色的龙和cpanel面板就知道也是byet分销了。加上infinityfree就是4家一模一样的了。</div>
<<div>刚发现的一家，hyperphp，看到那条绿色的龙和cpanel面板就知道也是byet分销了。加上infinityfree就是4家一模一样的了。</div>
> 注册freehostia的账号，地址 https://www.freehostia.com/ ，然后登陆cpanel控制面板，地址 https://cp.freehostia.com/，然后寄存自己已有的域名，也可以在这里注册，不过价格没优势。 </br>
<p> 以下域名扩展 (.TLDs)不能寄存在我们这里: .co.cc, .vv.cc, .tk, .cf, .ga, .ml, .uni.me, .gq, .cu.cc, .co.vu, .men, .party, .click, .link, .work, .gdn, .my.id, .official-id.xyz, .rasasa.ga </br>

为了让您的域名可以操作,这个域名的主机名 (NS)是必要的. </br>
NS1: dns1.freehostia.com / 162.210.102.205  </br>
NS2: dns2.freehostia.com / 198.23.52.5  </br>
默认路线
162.210.102.233 
</p>    </div>
<div> 先去解析域名，地址试过这里的两个NS，都无效貌似，默认线路也不通，点开已寄存域名列表后面的指令栏，有个小齿轮的编辑域名，可以看到真实的IP地址，就填这个地址就行了。
</div>