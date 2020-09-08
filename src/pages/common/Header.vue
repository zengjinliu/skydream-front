<template>
  <div class="header">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">
          <div class="user-info">
            <span>
              <img src="../../assert/img/jay.png" :alt="userName">{{userName}}
            </span>
          </div>
        </template>
        <el-menu-item index="1-1" @click.native="modifyPassword()">修改密码</el-menu-item>
        <el-menu-item index="1-2" @click.native="logout()">退出</el-menu-item>
      </el-submenu>
    </el-menu>
    <!--修改密码-->
    <update-password v-if="visiable" ref="updatePassword"></update-password>
  </div>

</template>

<script>

  import updatePassword from './UpdatePassowrd'

  import {logout} from "../../api/home";
  import {clearLoginInfo} from "../../api/ajax"


  export default {
    name: "Header",
    data() {
      return {
        userName: '',
        visiable: false
      };
    },
    components: {
      updatePassword,
    },
    created(){
      this.userName=this.$store.state.user.username;
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout() {
        //退出登录
        this.$confirm('确定进行退出操作?', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(res =>{
          logout().then((data) =>{
            if(data.code ===200){
              clearLoginInfo()
              this.$router.replace("/login");
            }
          })
        }).catch(() =>{
        })
      },
      modifyPassword(){
        //修改密码
        this.visiable = true;
        this.$nextTick(() =>{
          //dom异步更新
          this.$refs.updatePassword.init();
        })

      }
    }

  }
</script>

<style scoped>
  .header {
    border-bottom: 1px solid #f6f6f6;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: block;
    z-index: 1000px;
  }

  .el-menu-demo {
    margin-top: -10px;
    margin-left: 220px;
    width: 18%;
    margin-left: 1100px;
  }

  .user-info {
    display: inline-block;
    position: relative;
    color: #606266;
    font-size: 14px;
  }

  .user-info img {
    width: 36px;
    height: auto;
    margin-right: 5px;
    border-radius: 100%;
    vertical-align: middle;
  }
</style>
