<template>
  <el-dialog
    title="修改密码"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :append-to-body="true">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit"
             label-width="80px">
      <el-form-item label="账号">
        <span>{{ username }}</span>
      </el-form-item>
      <el-form-item label="原密码" prop="password">
        <el-input type="password" v-model="dataForm.pwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="dataForm.npwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="dataForm.confirmPassword"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>

  import {updatePwd} from "../../api/login";
  import {clearLoginInfo} from "../../api/ajax";
  import {doLogout} from "../../api/login";

  export default {
    name: "UpdatePassword",
    data () {
      var validateConfirmPassword = (rule, value, callback) => {
        if (this.dataForm.npwd !== value) {
          callback(new Error('确认密码与新密码不一致'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        dataForm: {
          pwd: '',
          npwd: '',
          confirmPassword: ''
        },
        dataRule: {
          pwd: [
            { required: true, message: '原密码不能为空', trigger: 'blur' }
          ],
          npwd: [
            { required: true, message: '新密码不能为空', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { validator: validateConfirmPassword, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      username() {
        return this.$store.state.user.username;
      }
    },
    methods:{
      // 初始化
      init () {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      },
      dataFormSubmit(){

        this.$refs['dataForm'].validate((valid) =>{
          if(valid){
            updatePwd(this.dataForm).then(res =>{
              //更新密码成功后，清楚浏览信息，并重新登录
              if(res.code ===200){
                doLogout();
                clearLoginInfo()
              }
            }).catch(()=>{});
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
