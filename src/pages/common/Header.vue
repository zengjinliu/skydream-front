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
        <el-menu-item index="1-1">修改密码</el-menu-item>
        <el-menu-item index="1-2">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>

</template>

<script>


  export default {
    name: "Header",
    data() {
      return {
        userName: 'zhangsan'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
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
  .user-info img{
    width: 36px;
    height: auto;
    margin-right: 5px;
    border-radius: 100%;
    vertical-align: middle;
  }
</style>
