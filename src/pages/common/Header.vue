<template>
    <div class="header">
      <p>this is header</p>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
  .header{
    border-bottom: 1px solid #f6f6f6;
    box-sizing: border-box;
    background-color: grey;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: block;
    z-index: 1000px;
  }
</style>
