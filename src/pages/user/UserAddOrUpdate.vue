<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "UserAddOrUpdate",
    data(){
      return {
        dialogFormVisible: false,
      }
    },
    methods:{
      init(){
        this.dialogFormVisible = true;
      }
    }
  }
</script>

<style scoped>

</style>
