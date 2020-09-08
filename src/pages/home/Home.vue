<template>
  <div class="menu-demo">
    <v-header></v-header>
    <div class="side-menu">
      <div class="side-scroll">
        <div class="logo">
          <span class="title">skyDream team</span>
        </div>
        <el-menu
          :default-active="menuActiveName || 'home'"
          @select="handleSelect"
          class="nav-menu"
          background-color="#20222A"
          text-color="#D8D8D8"
          active-text-color="#40FF00">
          <el-menu-item index="home" @click="$router.push({name:'homeIndex'})">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <NavMenu :navMenus="menuList"></NavMenu>
        </el-menu>
      </div>
    </div>

  </div>
</template>


<script>

  import vHeader from "../common/Header";
  import NavMenu from "./NavMenu";

  import {getNavMenuList} from "../../api/home";

  export default {
    data() {
      return {
        menuList: [],
        menuActiveName:'系统管理'
      }
    },
    created() {
      getNavMenuList().then(res => {
        this.menuList = res.datas;
      })
    },
    components: {
      vHeader,
      NavMenu,
    },
    methods: {
      handleSelect(index, indexPath) {

      },
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

  .logo {
    padding: 0;
    color: rgba(255, 255, 255, .8);
    background-color: #20222A;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .15);
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

  .logo span {
    padding-left: 40px;
  }

  .title {
    font-size: 14px;
  }

  .nav-menu {
    margin-top: 50px;
    width: 220px;
    background: 0 0;
  }

</style>
