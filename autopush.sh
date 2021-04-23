#!/bin/bash
cd /home/ansel/webservers
git add .
msg=修改时间:$(date "+%Y-%m-%d,%H:%M")
echo $msg
git commit -m ${msg}
git push origin master

cd /home/ansel/STM32F103_HAL
git add .
msg=修改时间:$(date "+%Y-%m-%d,%H:%M")
echo $msg
git commit -m ${msg}
git push origin master

cd /home/ansel/rk3399
git add .
msg=修改时间:$(date "+%Y-%m-%d,%H:%M")
echo $msg
git commit -m ${msg}
git push origin master

cd /home/ansel/other
git add .
msg=修改时间:$(date "+%Y-%m-%d,%H:%M")
echo $msg
git commit -m ${msg}
git push origin master
#使用crontab -e 命令添加定时任务 github

