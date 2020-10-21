<template>
  <div class="register-wrap">
    <div class="register-title">注册</div>
    <div class="register-area">
      <el-form
        :model="user"
        :rules="rules"
        ref="registerForm"
        @keyup.enter.native="register()"
        status-icon
      >
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="user.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            v-model="user.phone"
            placeholder="填写常用手机号"
            class="phone-input"
          ></el-input>
          <el-button type="text" class="btn-msg" @click="requiredMsgCode">
            {{ btnValue }}
          </el-button>
        </el-form-item>
        <el-form-item prop="msgCode">
          <el-input v-model="user.msgCode" placeholder="验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-register" type="primary" @click="register()"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-link type="primary" :underline="false" @click="gotoLogin"
          >已有账号直接登录></el-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      user: {
        username: "",
        password: "",
        phone: "",
        msgCode: "",
      },
      rules:{
         username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          phone:[
            {required: true, message: '手机号不能为空', trigger: 'blur'}
          ],
          msgCode:[
            {required: true, message: '验证码不能为空', trigger: 'blur'}
          ]
      },
      btnValue: "获取验证码",
    };
  },
  methods: {
    register() {
      this.$refs['registerForm'].validate((valid) =>{
        if(valid){
          //注册
          console.log('--------register');
        }
      })
    },
    requiredMsgCode() {},
    gotoLogin(){
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.register-wrap {
  background: url("~@/assert/img/login_bg.jpg") fixed center;
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
.register-title {
  width: 100%;
  margin-top: 80px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #ffffff;
}
.register-area {
  position: absolute;
  left: 0;
  right: 0;
  top: 20%;
  margin: auto;
  width: 300px;
  padding: 40px 40px 10px 40px;
  border-radius: 5px;
  background: #ffffff;
}
.phone-input {
  border-radius: 0;
  width: 100%;
  height: 30px;
}
.btn-msg {
  float: right;
  margin-right: 10%;
  cursor: pointer;
  position: absolute;
  left: 65%;
  top: 5%;
}
.btn-register {
  width: 100%;
}
.footer {
  float: right;
}
</style>
