<template>
  <el-dialog
    title="修改密码"
    :visible.sync="visible"
    :append-to-body="true">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="submitPassword()"
             label-width="80px">
      <el-form-item label="账号">
        <span>{{username}}</span>
      </el-form-item>
      <el-form-item label="原密码" prop="password">
        <el-input type="password" v-model="dataForm.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="dataForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="dataForm.confirmPassword"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitPassword()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {updatePwd} from "../../api/home";
  import {clearLoginInfo} from "../../api/ajax";

  export default {
    data() {
      let validateConfirmPassword = (rule, value, callback) => {
        if (this.dataForm.newPassword !== value) {
          callback(new Error('确认密码与新密码不一致'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        dataForm: {
          password: '',
          newPassword: '',
          confirmPassword: ''
        },
        dataRule: {
          password: [
            {required: true, message: '原密码不能为空', trigger: 'blur'}
          ],
          newPassword: [
            {required: true, message: '新密码不能为空', trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
            {validator: validateConfirmPassword, trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.username = this.$store.state.user.username;
    },
    methods: {
      init() {
        this.visible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      },
      submitPassword() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            //发送请求更新密码
            updatePwd(this.dataForm.newPassword,this.dataForm.newPassword).then(res=>{
              if(res.code === 200){
                this.$message({
                  message:'操作成功',
                  type:'success',
                  duration:1500,
                  onClose:()=>{
                    this.visible = false;
                    clearLoginInfo();
                    this.$router.replace('/login');
                  }
                })
              }else{
                this.$message.error(res.msg)
              }
            })
          }
        })
      }
    },

  }
</script>

