#!/bin/bash
msg=修改时间:$(date "+%Y-%m-%d,%H:%M")
echo $msg
echo "story ————————————————————— "
#hexo g
git status
git add .
git commit -m ${msg}
git push origin master



