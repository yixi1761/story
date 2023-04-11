// def remoteConfig = [:]
// remoteConfig.name = "Ethernetserver"
// remoteConfig.host = "${REMOTE_HOST}"
// remoteConfig.port = 2222
// remoteConfig.allowAnyHosts = true

// def ucloudConfig = [:]
// ucloudConfig.name = "ucloud"
// ucloudConfig.host = "${REMOTE_HOST_Ucloud}"
// ucloudConfig.allowAnyHosts = true

pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: GIT_REPO_URL,
            credentialsId: CREDENTIALS_ID
          ]]])
      }
    }
      // stage('配置ssh环境') {
      //   steps {
      //     echo '生成ssh key...'
      //     sh 'cd ~/.ssh && ls'
      //     sh 'echo "" | ssh-keygen -t rsa -C admin@venuslight.site '
      //     sh 'cd ~/.ssh && ls'
      //     sh 'cat ~/.ssh/id_rsa.pub' 
      //   }
      // }
      stage('配置hexo环境') {
        steps {
          echo '安装nodejs，hexo ...'
          // 安装nodejs,无需关心npm版本
          sh 'sudo apt-get install nodejs && node -v && npm -v'
          // 使用n管理node的版本
          sh 'sudo npm install n -g'
          sh 'sudo n 16.13.0 && echo "Y" | sudo apt remove nodejs'
          sh 'npm install -g npm@9.5.0'
          sh 'sudo rm -rf node_modules && npm install --force'
          sh 'sudo npm install -g hexo-cli'
          sh 'npm -v && node -v && hexo -v'
        }
      }
      // stage('初始化github仓库') {
      //   steps {
      //     echo 'clone story & storypublic ...'
      //     sh 'git clone git@github.com:yixi1761/story.git'
      //     sh 'git clone git@github.com:yixi1761/storypublic.git'
      //     sh 'ls'
      //     sh 'cd story && git remote rename origin github && git remote add coding git@e.coding.net:justap/web/story.git'
      //     sh 'cd storypublic && git remote rename origin github'
      //   }
      // }
      stage('hexo渲染page') {
        steps {
          // 同步coding和GitHub中的story库
          sh 'cd story && git pull coding master && git push github master' 
          echo '构建中...'
          sh 'hexo g && ls'
          echo '构建完成——同步public目录到GitHub……'
          sh 'cd storypublic && git pull github main'
          sh 'cp ./public/* ./storypublic -r && hexo clean'
          sh 'cd storypublic && git add . && git commit -m"update posts"  && git push github main'
        }
      }
      // stage("通过sftp发行public目录") {
        // 本地创建一个 test.sh 脚本，用来发送到远端执行
        //writeFile(file: 'test.sh', text: 'ls')   
        // echo '开始sshPut'
        // sshCommand(remote: remoteConfig, command: 'pwd && ls')
        // sshPut(
        //   remote: remoteConfig,
        //   // 本地文件或文件夹
        //   from: 'public',
        //   // 远端文件或文件夹
        //   into: 'git/storypublic/'
        // )
        //put的是文件夹,在VPS上整理文件夹如何推到gitee和github page上
        // sshCommand(remote: remoteConfig, command: 'cd ~/git/storypublic && cp ./public/* . -r && rm public -r')   
        // sshCommand(remote: remoteConfig, command: 'cd ~/git/storypublic && git add . && git commit -m"update posts" && git push github main && git push gitee main')      
        // sshCommand(remote: remoteConfig, command: 'cd ~/git/story && git pull coding master && git push github master')
        // sshCommand(remote: remoteConfig, command: 'cd ~/git/crontab && ./ftp.sh')
        //sshScript(remote: remoteConfig, script: 'test.sh')        
        //sshCommand(remote: remoteConfig, command: 'chmod 755 ./Jenkinsfile/test.sh')
        //sshGet(remote: remoteConfig, from: 'test.sh', into: 'test_new.sh', override: true)
        //sshRemove(remote: remoteConfig, path: 'test.sh')
      // }

      // node {
//   // 使用当前项目下的凭据管理中的 用户名 + 密码 凭据
//   withCredentials([usernamePassword(
//     credentialsId: "${REMOTE_CRED_UCLOUD}",
//     passwordVariable: 'password',
//     usernameVariable: 'userName'
//   )]) {
//     // SSH 登陆用户名
//     ucloudConfig.user = userName
//     // SSH 登陆密码
//     ucloudConfig.password = password

//     stage("在ucloud中执行git命令") {
//       sshCommand(remote: ucloudConfig, command: 'cd ~/hexo/storypublic && git pull origin main && cp ./* ../story -r')
//     }
//   }
// }
      stage('部署') {
        steps {
          echo '部署中...'
          echo '部署完成'
        }
      }

    }
  }
