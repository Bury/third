<template>
    <div class="login">
      <div class="sub-title">杭州知己中央管理系统</div>
      <div class="title">登录</div>
      <div class="form">
        <div class="name">
          <el-input placeholder="账号" auto-complete="off" name="username" v-model="user.username"></el-input>
        </div>
        <div class="password">
          <el-input @keydown.enter.native="show($event)" placeholder="密码" type="password" auto-complete="off" v-model="user.password"></el-input>
        </div>
        <div class="remember-forget">
          <div class="remember-me">
            <el-checkbox v-model="user.rememberMe">记住我</el-checkbox>
          </div>
        </div>
        <div class="login-button enabled">
          <a @click="login">登录</a>
        </div>
      </div>
    </div>
</template>

<script>
import userApi from '../../api/user'
import storage from '../../utils/storage'

export default {
  name: 'login',
  data () {
    return {
      user: {
        username: '',
        password: '',
        rememberMe: false
      }
    }
  },
  created: function () {
    // this.$router.replace({name: 'Login'})
    this.cookieSet();
  },
  mounted: function () {
  },
  methods: {
    show:function (ev) {
      if(ev.keyCode == 13){
        this.login();
      }
    },
    cookieSet(){
      let username = localStorage.getItem('name');
      let password = localStorage.getItem('password');
      if(username != '' && username != null && password != ''){
        this.$data.user.username = username;
        this.$data.user.password = password;
        this.$data.user.rememberMe = true;
      }else{
        this.$data.user.username = '';
        this.$data.user.password = '';
        this.$data.user.rememberMe = false;
      }
    },
    login () {
      // 登录逻辑
      storage.setLocalStorage('userName',this.user.username);
      let qs = require('querystring')
      userApi.login(qs.stringify(this.user)).then((response) => {
        console.log(response)
        localStorage.setItem('knock_knock',response.data.data.access_token);

        if (response.data.errno === 0) {
          this.menu();
          // this.$router.replace({name: 'Dashboard'})
          // 判断是否记住我
          if (this.user.rememberMe) {
            // storage.setLocalStorage('user-token',response.data.data.access_token)
            localStorage.setItem('name',this.$data.user.username);
            localStorage.setItem('password',this.$data.user.password);
          } else {
            // storage.setSessionStorage('user-token',response.data.data.access_token)
            localStorage.setItem('name',"");
            localStorage.setItem('password',"");
          }
        }else if(response.data.msg === '此账号被禁用'){
          this.$message.error(response.data.msg);
          this.$data.status = 0;
        } else {
          this.$alert(response.data.msg, {
            type: 'error',
            callback: action => {
            }
          })
        }
      })


    },
    menu() {
      userApi.menu().then((res) => {
        if(res.data.errno === 0){
          if(res.data.data === null){
            this.$message("此账号暂无权限！");
            localStorage.setItem('knock_knock',null);
            localStorage.setItem('username', '');
            return false;
          };
          for(let i=0;i<res.data.data.length;i++){
            if(res.data.data[i].no_child === true){
              if(res.data.data[0].front_url == '1'){
                this.$data.routeName = 'Dashboard';
              }else if(res.data.data[0].front_url == '9'){
                this.$data.routeName = 'tags/tagManage';
              }
              // this.$data.routeName = res.data.data[0].front_url;
              break
            }else if(res.data.data[i].no_child === false){
              if(res.data.data[i].children[0].front_url == '2-1'){
                this.$data.routeName = 'business/';
              }else if(res.data.data[i].children[0].front_url == '6-1'){
                this.$data.routeName = 'faceDataTest/FaceSampleGrouping';
              }else if(res.data.data[i].children[0].front_url == '6-2'){
                this.$data.routeName = 'faceDataTest/RecognitionList';
              }else if(res.data.data[i].children[0].front_url == '3-3'){
                this.$data.routeName = 'equipment/face';
              }else if(res.data.data[i].children[0].front_url == '5-1'){
                this.$data.routeName = 'worklog/loginlist';
              }else if(res.data.data[i].children[0].front_url == '5-2'){
                this.$data.routeName = 'worklog/activelist';
              }else if(res.data.data[i].children[0].front_url == '4-1'){
                this.$data.routeName = 'setup/accountNumber';
              }else if(res.data.data[i].children[0].front_url == '4-2'){
                this.$data.routeName = 'setup/role';
              }else if(res.data.data[i].children[0].front_url == '7-0'){
                this.$data.routeName = 'dataCollect/ActualArgument';
              }else if(res.data.data[i].children[0].front_url == '7-1'){
                this.$data.routeName = 'dataCollect/DataSetting';
              }else if(res.data.data[i].children[0].front_url == '7-9'){
                this.$data.routeName = 'dataCollect/ObservationSetting';
              }else if(res.data.data[i].children[0].front_url == '7-2'){
                this.$data.routeName = 'dataCollect/DataList';
              }else if(res.data.data[i].children[0].front_url == '7-3'){
                this.$data.routeName = 'dataCollect/AbnormalDataList';
              }else if(res.data.data[i].children[0].front_url == '7-4'){
                this.$data.routeName = 'dataCollect/DataStatistics';
              }else if(res.data.data[i].children[0].front_url == '7-10'){
                this.$data.routeName = 'dataCollect/DistinguishStatistics';
              }else if(res.data.data[i].children[0].front_url == '7-6'){
                this.$data.routeName = 'dataCollect/ErrorDataList';
              }else if(res.data.data[i].children[0].front_url == '7-7'){
                this.$data.routeName = 'dataCollect/DataRecyleBin';
              }else if(res.data.data[i].children[0].front_url == '7-8'){
                this.$data.routeName = 'eyeData/EyeDataList';
              }else if(res.data.data[i].children[0].front_url == '10-1'){
                this.$data.routeName = 'clearData/merchantList';
              }
              // this.$data.routeName = res.data.data[i].children[0].front_url;
              break
            }
          }
          this.$router.replace(this.$data.routeName);
        }
      })
    },
  }
}
</script>

<style scoped>
*{
  text-align:center;
}
.login {
  position: relative;
  height: 350px;
  top: 30px;
}

.login .sub-title {
  font-size: 14px;
  color: #888888;
  height: 17px;
}

.login .title {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 24px;
  color: #000000;
  height: 24px;
}

/* 登录表单样式 start */
.login .form {
  width: 260px;
}

.login .form .name {
  margin-bottom: 10px;
  height: 40px;
}

.login .remember-forget {
  color: #898989;
  font-size: 12px;
  margin-top: 20px;
}

/* 记住我 */
.login .remember-me {
  float: left;
}

/* 忘记密码 */
.login .forget-password {
  float: right;
}

.login .forget-password a {
  color: #898989;
  font-size: 12px;
}
/* 登录表单样式 end */

.login .login-button{
  margin-top: 54px;
  width: 180px;
  height: 40px;
  border-radius: 100px;
  background-color: rgba(0, 159, 232, 0.3);
  margin-bottom: 20px;
  font-size: 14px;
  color: white;
  display:table;
}

.login .enabled {
  background-color: #00a0e9;
  box-shadow: 1px 3px 8px 0 rgba(0, 159, 233, 0.5);
}

.login .login-button a {
  display: table-cell;
  vertical-align: middle;
}

.login .register-button {
  font-size: 12px;
  color: #898989;
}
</style>
