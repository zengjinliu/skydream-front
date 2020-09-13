<template>
  <el-submenu
    v-if="menu.childs && menu.childs.length >= 1"
    :index="menu.url"
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
  <el-menu-item v-else :index="menu.url">
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
    methods: {}
  }
</script>

<style scoped>

</style>
