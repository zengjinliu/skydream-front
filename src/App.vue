<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>

  export default {
    created() {
      //解决刷新state丢失数据问题
      window.addEventListener('beforeunload',()=>{
        localStorage.setItem('messageStore',JSON.stringify(this.$store.state))
      })
      localStorage.getItem("messageStore") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("messageStore"))));
    }
  }
</script>

<style scoped>

</style>
