#!/bin/bash
msg=修改时间:$(date "+%Y-%m-%d,%H:%M")
echo $msg
echo "story ————————————————————— "
#hexo g
git status
git lfs track *.jpg *.jpeg *.mov *.png *.gif *.bmp *.webp *.psd *.ico *.mp4 *.zip *.rar *.gz
git add .
git commit -m ${msg}
git push cnb master
git push github master



