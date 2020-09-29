<template>
  <div class="side-bar">
    <el-menu
      :default-active="onRoutes"
      class="sidebar-el-menu"
      :collapse="collapse"
      background-color="#334256"
      text-color="#ffffff"
      active-text-color="#20a0ff"
    >
      <el-menu-item index="info" @click="$router.push('/info')">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <nav-menu
        v-for="menu in items"
        :key="menu.menuId"
        :menu="menu"
        >
      </nav-menu>
    </el-menu>
  </div>
</template>

<script>

  import NavMenu from "./NavMenu";
  import {getAllMenus} from "@/api/menu";

  export default {
    name: "SideBar",
    data() {
      return {
        collapse: false,
        items: []
      }
    },
    components:{
      NavMenu,
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    created() {
      //事件总线与其他组件之间的通讯
      this.$bus.$on('collapse', msg => {
        this.collapse = msg;
      });
      //请求菜单
      this.requireItems();
    },
    methods: {
      requireItems() {
        getAllMenus().then(res => {
          if (res.code === 200) {
            this.items = res.datas;
          }
        })
      }
    }
  }
</script>

<style scoped>
  .side-bar {
    display: block;
    position: absolute;
    left: 0;
    top: 50px;
    bottom: 0;
    background-color: #334256;
    overflow-y: scroll;
  }

  .side-bar::-webkit-scrollbar {
    width: 0;
  }

  .side-bar > ul {
    height: 100%;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
  }


</style>
