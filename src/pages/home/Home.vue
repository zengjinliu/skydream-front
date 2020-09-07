<template>
  <div class="menu-demo">
    <v-header></v-header>
    <div class="side-menu">
      <div class="side-scroll">
        <div class="logo">
          <span class="title">skyDream team</span>
        </div>
      </div>
      <el-row>
        <el-col :span="12">
          <el-menu
            default-active="2"

            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>

  import vHeader from "../common/Header";

  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    components: {
      vHeader,
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>


<style scoped>
  .side-menu {
    width: 220px;
    top: 0;
    z-index: 1001;
    overflow-x: hidden;

    background-color: #20222A;
    color: #fff;
    box-shadow: 1px 0 2px 0 rgb(0, 0, 0, .05);
    position: fixed;
    left: 0;
    bottom: 0;
    display: block;
  }

  .side-scroll {
    width: 240px;
    height: 100%;
    overflow-x: hidden;
  }
  .logo{
    padding: 0;
    color: rgba(255,255,255,.8);
    background-color: #20222A;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.15);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1002;
    width: 220px;
    height: 49px;
    box-sizing: border-box;
    overflow: hidden;
    font-weight: 300;
    background-repeat: no-repeat;
    background-position: center center;
    line-height: 50px;
    font-size: 16px;
  }
  .title{
    font-size: 14px;
  }
</style>
