<template>
  <div>
    <label v-for="menu in navMenus">
      <el-menu-item v-if="menu.childs == null" :key="menu.menuId" :data="menu" :index="menu.name">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
      <el-submenu v-if="menu.childs" :key="menu.menuId" :data="menu" :index="menu.name">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{menu.name}}</span>
        </template>
        <nav-menu :navMenus="menu.childs"></nav-menu>
      </el-submenu>
    </label>
  </div>
</template>

<script>
  export default {
    name: "NavMenu",
    props:['navMenus'],
    data(){

    },
    created() {
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
