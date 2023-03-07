def remoteConfig = [:]
remoteConfig.name = "Ethernetserver"
remoteConfig.host = "${REMOTE_HOST}"
remoteConfig.port = 2222
remoteConfig.allowAnyHosts = true

def ucloudConfig = [:]
ucloudConfig.name = "ucloud"
ucloudConfig.host = "${REMOTE_HOST_Ucloud}"
ucloudConfig.allowAnyHosts = true

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
              // sh "ls"
          }
      }
      stage('生成ssh key,用于gitee或者github认证，clone两个仓库，只需执行一次') {
          // sh 'cd ~/.ssh && ls'
          // sh 'echo "" | ssh-keygen -t rsa -C admin@venuslight.site '
          // sh 'cd ~/.ssh && ls'
          // sh 'cat ~/.ssh/id_rsa.pub' 

          //添加git remote仓库，上面执行后再GitHub添加公钥再执行下面的关联
          //单独建winter仓库和winterpublic仓库，避免git冲突
          // sh 'git clone git@github.com:yixi1761/story.git'
          // sh 'cd story && git remote rename origin github && git remote add coding git@e.coding.net:justap/web/story.git'
          // sh 'cd story && git remote -v '
          //下面处理public仓库，子仓库比较麻烦就放到外边单独仓库,从github clone,然后关联gitee
          // sh 'git clone git@github.com:yixi1761/storypublic.git '
          // sh 'cd storypublic && git remote rename origin github && git remote add gitee git@gitee.com:yixi1761/storypublic.git'
          // sh 'cd storypublic && git remote -v '
      }
      stage('配置hexo环境，缓存前执行一次') {
          echo '安装npm node hexo-cli'
          sh 'sudo apt-get update'
          sh 'sudo apt-get upgrade -Y' 
          sh 'npm install -g hexo-cli'
          sh 'npm -v'  
          sh 'node -v'      
          sh 'hexo -v'
          sh 'cd public && ls -lh'
      }
      stage("通过sftp发行public目录") {
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
      }

      stage('推送到remote 仓库') {
          sh 'cd story && git pull coding master &&  git push github master'
          sh 'hexo g'
          sh 'cd storypublic && git pull origin main'
          sh 'cp ./public/* ./storypublic -r && hexo clean'
          sh 'cd storypublic && git add . && git commit -m"update posts" &&  git push origin main'
      }
  
  }
}

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
