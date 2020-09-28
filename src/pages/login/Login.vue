<template>
  <div class="login-wrap">
    <div class="login-title">skydream team</div>
    <div class="main-login">
      <div class="login-type">
        <span class="pwd-login" :class="{blue:!loginType}" @click="handlePwd">密码登录</span>
        <span class="msg-login" :class="{blue:loginType}" @click="handleMsg">短信登录</span>
      </div>
      <div class="login-area">
        <el-form :model="user" v-show="!loginType" :rules="rules" ref="loginForm" @keyup.enter.native="login()"
                 status-icon>
          <el-form-item prop="username">
            <el-input v-model="user.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="user.password" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-row :gutter="20">
              <el-col :span="14">
                <el-input v-model="user.captcha" placeholder="验证码"></el-input>
              </el-col>
              <el-col :span="10" class="login-captcha">
                <img :src="captchaPath" @click="requireCaptcha()" alt="">
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn-submit" type="primary" @click="login()">登录</el-button>
          </el-form-item>
        </el-form>

        <el-form :model="msgUser" v-show="loginType" :rules="msgLoginRule" ref="msgLoginForm" class="msg-login-form"
                 @keyup.enter.native="msgLogin()"
                 status-icon>
          <el-form-item prop="phone">

            <el-input v-model="msgUser.phone" placeholder="填写常用手机号" class="phone-input"></el-input>
            <el-button
              type="text"
              class="msg-btn"
              :disabled="msgBtn"
              @click="requiredMsgCode"
            >
              {{btnValue}}
            </el-button>
          </el-form-item>
          <el-form-item prop="msgCode">
            <el-input v-model="msgUser.msgCode" placeholder="验证码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn-submit" type="primary" @click="msgLogin()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--第三方登录-->
      <div class="third-party-login" :class="{adjust:loginType}">
        <a href="#">
          <img src="../../assert/img/qq.png">
        </a>
        <a href="#">
          <img src="../../assert/img/wechat.png">
        </a>
        <a :href="`https://api.weibo.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`">
          <img src="../../assert/img/weibo.png">
        </a>
      </div>
    </div>

  </div>


</template>

<script>
  import {doLogin, getCaptchaPath, getUUID, requireMsgCode, msgLogin,requireAccessToken} from "../../api/login";
  import {getAllPerms} from "../../api/user";
  import router from "../../router";

  export default {
    name: "Login",
    data() {
      return {
        user: {
          username: '',
          password: '',
          captcha: '',
          uuid: ''
        },
        msgUser: {
          phone: '',
          msgCode: ''
        },
        rules: {
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: '验证码不能为空', trigger: 'blur'}
          ]
        },
        msgLoginRule: {
          phone: [
            {required: true, message: '请填写手机号', trigger: 'blur'},
          ]
        },
        captchaPath: '',//图片验证码
        loginType: false,
        msgBtn: false,
        btnValue: '获取验证码',
        clientId:'3075657313',//微博appkey
        redirectUri:'http://skydream.com/skydream/third/weibo/success',//登录成功回调地址
      }

    },
    created() {
      //获取验证码
      this.requireCaptcha(); 
    },
    methods: {
      login() {
        //登录
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            doLogin(this.user).then(res => {
              if (res.code === 200) { 
                this.$cookie.set('token', res.datas.token);
                let user = {username: res.datas.username, 
                            id: res.datas.userId,
                            pic: res.datas.pic};
                this.$store.dispatch('saveUserInfo', user)
                this.$router.replace('/info');
                //登陆成功后将权限信息保存
                this.getAllPerms();
              } else {
                this.requireCaptcha();
                this.$message.error(res.msg);
              }
            })
          }
        });
      },
      requireCaptcha() {
        //请求验证码
        this.user.uuid = getUUID();
        this.captchaPath = getCaptchaPath(this.user.uuid);
      },
      getAllPerms() {
        getAllPerms().then(res => {
          if (res.code === 200) {
            //将权限信息进行缓存
            sessionStorage.setItem('permissions', res.datas);
          }
        }).catch(err => {
          router.push('/login')
        })
      },
      handlePwd() {
        this.loginType = false;
        this.requireCaptcha();
      },
      handleMsg() {
        this.loginType = true;
      },
      requiredMsgCode() {
        //1.给指定手机号码发送验证码
        this.$refs['msgLoginForm'].validate((valid) => {
          if (valid) {
            requireMsgCode(this.msgUser).then(res => {
              if (res.code != 200) {
                this.$message.error(res.msg)
              }
            }).catch(err => {
            });
            //2.倒计时功能
            this.timeoutChangeStyle()
          }
        })
      },
      timeoutChangeStyle() {
        //倒计时60秒获取验证码
        this.msgBtn = true;//禁用发送验证码按钮
        let num = 60;
        let timer = window.setInterval(() => {
          if (num === 0) {
            this.btnValue = '获取验证码';
            num = 60;
            this.msgBtn = false;
            clearInterval(timer)
          } else {
            this.btnValue = num + 's后再次发送';
            num--;
          }
        }, 1000)
      },
      msgLogin() {
        //短信登录
        this.$refs['msgLoginForm'].validate((valid) => {
          if (valid) {
            //登录
            if (this.msgUser.msgCode == '') {
              this.$message.error('填写短信验证码');
              return false;
            } else {
              msgLogin(this.msgUser).then(res => {
                if (res.code == 200) {
                  this.$cookie.set('token', res.datas.token);
                  let user = {username: res.datas.username, id: res.datas.userId};
                  this.$store.dispatch('saveUserInfo', user)
                  this.$router.replace('/info');
                  //登陆成功后将权限信息保存
                  this.getAllPerms();
                } else {
                  //返回错误信息
                  this.$message.error(res.msg);
                }
              })
            }
          }
        });
      },
    }

  }
</script>

<style>
  .login-wrap {
    background: url("../../assert/img/login_bg.jpg") fixed center;
    /*background: #142a63;*/
    width: 100%;
    position: absolute;
    overflow: hidden;
    margin: 0 auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .login-title {
    width: 100%;
    margin-top: 50px;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: #ffffff;
  }

  .main-login {
    position:absolute;
    left:0;
    right:0;
    top:20%;
    margin:auto;
    width: 300px;
    padding: 40px 40px 10px 40px;
    border-radius: 5px;
    background: #ffffff;
  }

  .login-captcha {
    overflow: hidden;
  }

  .login-captcha img {
    width: 100%;
    cursor: pointer;
  }

  .login-btn-submit {
    width: 100%;
  }

  .login-type {
    margin-top: -20px;
    margin-bottom: 10%;
  }

  .msg-login {
    float: right;
    margin-right: 10%;
    cursor: pointer;
  }

  .login-area {
    padding-top: 5px;
    margin-bottom: -13px;
  }


  .pwd-login {
    cursor: pointer;
    float: left;
    margin-left: 10%;
  }

  .blue {
    color: #409EFF;
    cursor: pointer;
  }

  .phone-input {
    border-radius: 0;
    width: 100%;
    height: 30px;
  }

  .msg-btn {
    position: absolute;
    left: 65%;
    top: 5%;
  }

  .third-party-login {
    display: flex;

  }

  .third-party-login img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
  }
</style>
