<template>
  <div class="login-wrap">
    <div class="login-title">skydream team</div>
    <div class="main-login">
      <el-form :model="user" :rules="rules" ref="loginForm" @keyup.enter.native="login()" status-icon>
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
    </div>
  </div>


</template>

<script>
  import {doLogin,getCaptchaPath,getUUID} from "../../api/login";

  export default {
    name: "Login",
    data() {
      return {
        user: {
          username: '',
          password: '',
          captcha: '',
          uuid:''
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
        captchaPath: '',//图片验证码
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
                this.$cookie.set('token',res.datas);
                let user = {username:this.user.username,id:this.user.uuid};
                this.$store.dispatch('saveUserInfo',user)
                this.$router.replace('/info');
              } else {
                this.requireCaptcha();
                this.$message.error(res.msg);
              }
            })
          }
        });
      },
      requireCaptcha(){
        //请求验证码
        this.user.uuid= getUUID();
        this.captchaPath = getCaptchaPath(this.user.uuid);
      }
    }

  }
</script>

<style>
  .login-wrap {
    background: url("../../assert/img/login_bg.jpg") fixed center;
    background-color: rgba(38, 50, 56, .6);
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .login-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: #ffffff;
  }

  .main-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin-left: -190px;
    margin-top: -150px;
    padding: 40px;
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
</style>
