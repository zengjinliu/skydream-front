<template>
  <div>
    <v-header></v-header>
    <side-bar></side-bar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import vHeader from "./Header";
  import SideBar from "../menu/SideBar";

  export default {
    name: "Home",
    data(){
      return {
        collapse: false
      }
    },

    components: {
      vHeader,
      SideBar
    },
    created() {
      this.$bus.$on('collapse', msg => {
        this.collapse = msg;
      });
    }
  }
</script>

<style scoped>

</style>
