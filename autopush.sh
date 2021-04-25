#!/bin/bash
msg=修改时间:$(date "+%Y-%m-%d,%H:%M")
echo $msg
echo "story ————————————————————— "

git add .
git commit -m ${msg}
git push origin master



