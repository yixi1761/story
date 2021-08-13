---
title: 静态页面托管站-cloudflare pages
date: 2021-06-07 23:53:40
categories: page 
tags: [static, 免费, html, 静态, 网站]
---
&emsp;&emsp; 新发现个好用的静态站点托管网站，cloudflare的pages，比他家主业CDN还快一些，可能是少了回源这个步骤。免费分配的 .pages.dev域名还没被强，也不会随时抽风。构建功能支持的挺多的，可惜没有hexo。不过我都是本机渲染然后公开public目录。目前只支持github的仓库代码
If you are not using a framework, you may input exit 0 into the Build command field.
<!--more-->

```
Framework/tool	Build command	Build output directory

Angular (Angular CLI)	ng build	dist
Brunch	brunch build --production	public
Docusaurus	npm run build	build
Eleventy	eleventy	_site
Ember.js	ember build	dist
Expo	expo build:web	web-build
Gatsby	gatsby build	public
GitBook	gitbook build	_book
Gridsome	gridsome build	dist
Hugo	hugo	public
Jekyll	jekyll build	_site
Mkdocs	mkdocs build	site
Next.js (Static HTML Export)	next build && next export	out
Nuxt.js	nuxt generate	dist
Pelican	pelican $content [-s settings.py]	output
React (create-react-app)	npm run build	build
React Static	react-static build	dist
Slate	./deploy.sh	build
Svelte	npm run build	public
Umi	umi build	dist
Vue	npm run build	public
VuePress	vuepress build $directory	$directory/.vuepress/dist	
```
静态网站托管最方便的还是github，无限站点，可绑定域名，免费安全证书。只可惜github已经无法正常使用了。经常访问不了，或者慢到等于不能用。虽然有CDN可以上。国内替代品gitee的page现在已经关停了，不能用自己的域名还有各种限制。
</br>

&emsp;&emsp;虽然放到VPS上面也不会占用多少资源，但是能长期稳定免费使用的，cloudflare pages算是一个优先的选项。而且，cloudflare的CDN免费账户必须设置转移到他家的域名解析服务器上，pages功能却并没有这个限制。此外，cloudflare pages会自动检测你的仓库的代码变动，自动更新页面，而不必去手动点击更新。</br>

&emsp;&emsp;   </br>






