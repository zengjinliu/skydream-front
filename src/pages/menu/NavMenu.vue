<template>
  <el-submenu
    v-if="menu.childs && menu.childs.length >= 1"
    :index="menu.menuId"
    >
    <template slot="title">
      <i :class="menu.icon"></i>
      <span>{{ menu.name }}</span>
    </template>
    <nav-menu
      v-for="item in menu.childs"
      :key="item.menuId"
      :menu="item"
      >
    </nav-menu>
  </el-submenu>
  <el-menu-item v-else :index="menu.menuId" @click="goRouterHandler(menu.url)">
    <i :class="menu.icon"></i>
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
  import NavMenu from './NavMenu'
  export default {
    name: "NavMenu",
    props: {
     menu:{
       type: Object,
       required: true
     }
    },
    data() {
      return {}
    },
    components:{
      NavMenu,
    },
    created() {
    },
    methods: {
      goRouterHandler(url){
        //不使用router属性，会以index作为路由路径，故在次添加点击事件，跳转到指定路由
        this.$router.push(url);
      }

    }
  }
</script>

<style scoped>

</style>
