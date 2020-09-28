<template>
  <el-dialog :title="userForm.userId?`修改用户`:`新增用户`"
             :visible.sync="dialogFormVisible"
             :close-on-click-modal="false"
             :append-to-body="true">

    <el-form ref="userForm" :model="userForm"
             :rules="userFormRule" label-width="80px"
             @keyup.enter.native="doAddUser">

      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input v-model="userForm.confirmPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="userForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="pic">
        <single-upload v-model="userForm.pic"></single-upload>
      </el-form-item>
      <el-form-item label="角色" prop="roleIds">
        <el-select v-model="userForm.roleIds" placeholder="请选择"
                   multiple size="medium" filterable clearable
        >
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doAddUser">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {checkNameExist,add,update,queryUserById} from "../../api/user";
  import {getAllRoles} from "../../api/role";
  import SingleUpload from "../upload/SingleUpload";

  export default {
    name: "UserAddOrUpdate",
    components:{
      SingleUpload
    },
    data() {
      let checkName = (rule, value, callback) => {
        if(this.userForm.userId){
          callback();
        }else{
          checkNameExist(value).then(res=>{
            if(res.datas){
              callback(new Error('该用户名已存在'));
            }else{
              callback();
            }
          })
        }
      };
      let checkPwd = (rule,value,callback) =>{
        if(this.userForm.password!=value){
          callback(new Error('2次输入密码不一致'))
        }else {
          callback();
        }
      };
      return {
        dialogFormVisible: false,
        userForm: {
          username: '',
          password: '',
          confirmPwd: '',
          phone: '',
          pic: '',
          roleIds: [],
          userId:''
        },
        userFormRule: {
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {validator: checkName, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          confirmPwd: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
            {validator: checkPwd, trigger: 'blur'},
          ],
          phone:[
            {required: true,message:'电话不能为空',trigger:'blur'}
          ]
        },
        roleList:[],
      }
    },
    created() {
      //获取所有的角色
      getAllRoles().then(res => {
        if(res.code===200){
          this.roleList = res.datas;
        }
      })
    },
    methods: {
      init(userId) {
        //初始化
        this.dialogFormVisible = true;
        if(userId!=undefined){
          this.userForm.userId = userId;
          //数据回显
          queryUserById(userId).then(res =>{
            if(res.code===200){
              this.userForm.username = res.datas.username;
              this.userForm.password = res.datas.password;
              this.userForm.confirmPwd = res.datas.password;
              this.userForm.pic = res.datas.pic;
              this.userForm.phone = res.datas.phone;
            }
          })
        }else {
          this.$nextTick(()=>{
            this.$refs['userForm'].resetFields();
          })
        }
      },
      doAddUser(){
        //TODO 准备图片上传和下载采用阿里oss对象存储
        if(this.userForm.userId){
          //修改
          this.$refs['userForm'].validate((valid) =>{
            if(valid){
              update(this.userForm).then(res =>{
                if(res.code===200){
                  this.dialogFormVisible = false;
                  this.$emit('refreshList');
                  this.$message.success('修改成功')
                }else{
                  this.dialogFormVisible = true;
                  this.$message.error('修改失败')
                }
              })
            }
          })
        }else{
          //新增
          this.$refs['userForm'].validate((valid) =>{
            if(valid){
              add(this.userForm).then(res=>{
                if(res.code===200){
                  this.dialogFormVisible = false;
                  this.$message.success('添加成功');
                  //刷新列表
                  this.$emit('refreshList')
                }else{
                  this.dialogFormVisible = true;
                  this.$message.error('添加失败')
                }
              })
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
.el-select--medium{
  width: 60%;
}
</style>
