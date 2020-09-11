<template>
  <div>
    <v-header></v-header>
    <side-bar></side-bar>
    <div class="content-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import vHeader from "./Header";
  import SideBar from "./SideBar";

  export default {
    name: "Home",

    components: {
      vHeader,
      SideBar
    }
  }
</script>

<style scoped>

</style>
