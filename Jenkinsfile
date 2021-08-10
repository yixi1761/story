def remoteConfig = [:]
remoteConfig.name = "my-remote-server"
remoteConfig.host = "${REMOTE_HOST}"
remoteConfig.allowAnyHosts = true

node {
  // 使用当前项目下的凭据管理中的 SSH 私钥 凭据
  withCredentials([sshUserPrivateKey(
    credentialsId: "${REMOTE_CRED}",
    keyFileVariable: "privateKeyFilePath"
  )]){
      // SSH 登陆用户名
    remoteConfig.user = "${REMOTE_USER_NAME}"
    // SSH 私钥文件地址
    remoteConfig.identityFile = privateKeyFilePath
      stage("git 检出+推送") {
          checkout([
              $class: 'GitSCM',
              branches: [[name: GIT_BUILD_REF]],
              userRemoteConfigs: [[url: GIT_REPO_URL,credentialsId: CREDENTIALS_ID]]
          ])        
          script {
              // 您可以在此执行任意的 groovy 脚本
              sh "ls"
              echo '自定义构建过程开始'
              sh 'cd .. && ls'
          }
      }
      stage('配置hexo环境，生成静态页面文件') {
          echo '安装npm node hexo-cli'
          //sh 'sudo apt-get install npm'
          sh 'npm -v'
          //sh 'sudo apt-get install nodejs'    
          sh 'node -v'      
          sh 'npm install -g hexo-cli'
          sh 'hexo -v'
          sh 'hexo clean'
          sh 'hexo g'
          sh 'cd public && ls -lh'
          echo '完成生成静态html页面~'
      }
      stage("通过sftp发行public目录") {
        // 本地创建一个 test.sh 脚本，用来发送到远端执行
        //writeFile(file: 'test.sh', text: 'ls')   
        echo '开始sshPut'
        sshCommand(remote: remoteConfig, command: 'pwd && ls')
        sshPut(
          remote: remoteConfig,
          // 本地文件或文件夹
          from: 'public',
          // 远端文件或文件夹
          into: 'git/storypublic/'
        )
        //put的是文件夹,在VPS上整理文件夹如何推到gitee和github page上
        sshCommand(remote: remoteConfig, command: 'cd ~/git/storypublic && cp ./public/* . -r && rm public -r')   
        sshCommand(remote: remoteConfig, command: 'cd ~/git/storypublic && git add . && git commit -m"update posts" && git push github main')      
        sshCommand(remote: remoteConfig, command: 'cd ~/git/story && git pull coding master && git push github master')
        // sshCommand(remote: remoteConfig, command: 'cd ~/git/crontab && ./git.sh')
        //sshScript(remote: remoteConfig, script: 'test.sh')        
        //sshCommand(remote: remoteConfig, command: 'chmod 755 ./Jenkinsfile/test.sh')
        //sshGet(remote: remoteConfig, from: 'test.sh', into: 'test_new.sh', override: true)
        //sshRemove(remote: remoteConfig, path: 'test.sh')
      }
  
  }
}

