<template>
  <div class="header">
    <!--标题-->
    <div class="logo">智能调度平台</div>
    <div class="tools">
      <div class="collapse-btn" @click="handleCollapse">
        <i class="el-icon-menu"></i>
      </div>
      <div class="fullscreen-btn" @click="handleFullScreen">
        <el-tooltip :content="fullScreen?`取消全屏`:`全屏`" placement="bottom">
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
    </div>
    <div class="header-right">
      <div class="user-avator">
        <img src="../../assert/img/jay.png">
      </div>
      <el-dropdown class="user-name">
        <span class="el-dropdown-link">
          {{username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {doLogout} from "../../api/login";
  import {clearLoginInfo} from "../../api/ajax";

  export default {
    name: "Header",
    data() {
      return {
        collapse: false,
        fullScreen: false
      }

    },
    created() {
      //通过Bus进行组件之间的通讯

    },
    computed: {
      username() {
        return this.$store.state.user.username;
      }
    },
    methods: {
      //点击全屏处理(浏览器兼容处理)
      handleFullScreen() {
        let element = document.documentElement;
        if (this.fullScreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
        }
        this.fullScreen = !this.fullScreen;
      },
      //点击收缩菜单按钮
      handleCollapse() {
        //发出事件,让侧边栏收到讯息
        this.collapse = !this.collapse;
        this.$bus.$emit('collapse', this.collapse);
      },
      //退出登录
      logout() {
        doLogout();
        //清除cookie信息
        clearLoginInfo();
      }
    }
  }
</script>

<style scoped>
  .header {
    position: relative;
    background-color: #253041;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 22px;
    color: #ffffff;
  }

  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 50px;
  }

  .header .logo {
    position: relative;
    float: left;
    line-height: 50px;
    left: 20px;
  }

  .tools {
    float: left;
    display: flex;
    height: 50px;
    align-items: center;
    margin-left: 70px;
  }

  .fullscreen-btn {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 30px;

  }

  .header-right {
    float: right;
    padding-right: 50px;
    display: flex;
    height: 50px;
    align-items: center;
  }

  .user-avator {
    margin: 10px;

  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #ffffff;
    cursor: pointer;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
