---
title: cyanstyle主题填坑
date: 2019-05-26 22:51:22
categories: web server
tags: [comment, hashover, 统计, 404]
---
<h3> 一 更换评论系统 </h3>
&emsp;&emsp;
 主题默认是的使用多说，当然没有开启，多说早就凉了，搜了一圈相中三款评论系统。原本使用静态博客工具是为了简单方便，这样加个后台反而比WordPress自带各种插件更麻烦了。不过还是装上了。 <br />
<!--more-->
1、isso python语言，sqlite做数据库，折腾了两轮，没有运行起来，换docker也不行，已停更两年，没有安装说明。甚至介绍与实际代码都不一致。
网上总结的优缺点：
支持邮件通知，每个评论都发给管理员，评论者可以接收别人回复自己的评论；
支持 Gravatar 头像显示（支持使用CDN镜像，你懂的），或者随机头像；
支持 MarkDown；
后台审核管理功能；
对评论进行n;
缺点：
邮件通知只有英文，已有人提交 pull request，还没合并。
只支持 2 级评论回复。
不支持回复评论时通知评论作者， Isso 的作者在考虑要不要 merge 这个 pull request。 已经支持。
avatar 头像不能关联 gravatar.com 的头像。 已经支持。
已有后台管理系统。评论不好管理 ，常规方法可以通过邮件提醒里面的链接来删除评论。非常规方法就要修改数据库了，sqlite 进入命令行:
2、Valine 无后端，使用Leancloud的serverless，有些兴趣，Leancloud的免费资源足够支撑我这没人看的blog。没空研究。
3、hashover-next。虽然尽量避开php，但是资源还是挺多又好用。网上免费的虚拟主机空间也都是php的，直接丢进去不需要折腾环境就能用。不过最开始还是放在外网服务器上的，以为几个php程序已经跑起来应该只要配个域名写个nginx就能用，浪费单休的周末最后还是丢到php空间里用了。
默认是放在引用这个评论系统的根目录里面，然后用相对路径来引用，不过hashover-next相对于旧版的hashover多了些功能，可以开启多站点支持。另外需要注意hashover-next所在的站点未开启https的话，在加了SSL的站点是无法引用的。
<h3> 二 添加不蒜子统计 </h3>
百度统计更新懒加载后说的是可以减少对网站打开速度的影响，但是就不能在页面上显示统计量了，只能登录百度统计后台查看。不蒜子算是最简单的展示访问数据的JS工具。代码如下，添加到需要统计的页面。但是虽然支持https，不蒜子的JS文件很少能正常加载出来~~~
```
buildoutcfg
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"> 
	</script>
<span id="busuanzi_container_site_pv">
本站总访问量<span id="busuanzi_value_site_pv"></span>次
</span>
<span id="busuanzi_container_site_uv">
本站访客数<span id="busuanzi_value_site_uv"></span>人次
</span>
<span id="busuanzi_container_page_pv">
本文总阅读量<span id="busuanzi_value_page_pv"></span>次
</span>
```
主题的各部分内容是分块用ejs文件写的，放在footer.ejs里面就可以了。
<h3> 三 删除百度分享 </h3>
虽然看不到，后台console一堆error： https://bdimg.share.baidu.com/static/api/js/share/share_api.js 这个JS文件加载不出来。config里面已经删了share还是有。
article.ejs里面注释掉：
```
buildoutcfg
<!--<div class="comments-link">
    <% if (post.comments && theme.duoshuo_shortname){ %>
    <a href="<%- url_for(post.path) %>#comments" class="leave-reply"><%= theme.reply %></a>
    <% } %>
    <a href="javascript:void(0);" data-url="<%- post.permalink %>" data-id="<%= post._id %>" class="leave-reply bdsharebuttonbox" data-cmd="more"><%= theme.share %></a>
        </div>--><!-- .comments-link -->
```
然后在after-footer.ejs里面注释掉首行的引用：
```
buildoutcfg
<!-- <script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"1","bdMiniList":false,"bdPic":"","bdStyle":"2","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='/js/share.js'];</script>
 -->
```
不知道哪里还有坑，先这样用着吧。simple and sinple，this is life。