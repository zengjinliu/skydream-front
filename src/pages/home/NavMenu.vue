<template>
  <div class="navMenu">
    <label v-for="navMenu in navMenus" :key="navMenu.name">
      <el-menu-item v-if="navMenu.childs==null"
                    :key="navMenu.menuId" :data="navMenu" :index="navMenu.name">
        <i :class="navMenu.icon"></i>
        <span slot="title">{{navMenu.name}}</span>
      </el-menu-item>

      <el-submenu v-if="navMenu.childs" @click.native="goto(navMenu.url)"
                  :key="navMenu.menuId" :data="navMenu" :index="navMenu.name">
        <template slot="title">
          <i :class="navMenu.icon"></i>
          <span> {{navMenu.name}}</span>
        </template>
        <NavMenu :navMenus="navMenu.childs"></NavMenu>
      </el-submenu>
    </label>

  </div>
</template>

<script>


  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data() {
      return {

      }
    },

    methods: {
      goto (url) {
        console.log("------>跳转路由url",url)
        // 通过菜单URL跳转至指定路由
        if(url){
          this.$router.push(url)
        }
      }
    },

  }
</script>

<style scoped>

</style>
