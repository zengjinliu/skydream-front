<template>
  <div class="menu-area">
    <div class="add-form">
      <el-button type="primary" @click="addOrUpdate()">添加</el-button>
    </div>
    <div class="container-table">
      <!--菜单列表-->
      <el-table
        :data="dataList"
        row-key="menuId"
        v-loading="loading"
        border
        :tree-props="{children: 'childs', hasChildren: 'hasChildren'}"
        style="width: 100%; ">
        <el-table-column prop="name" header-align="center" min-width="150" label="名称"></el-table-column>
        <el-table-column prop="icon" header-align="center" align="center" label="图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="type" header-align="center" align="center" label="类型">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === '0'" size="small">目录</el-tag>
            <el-tag v-else-if="scope.row.type === '1'" size="small" type="success">菜单</el-tag>
            <el-tag v-else-if="scope.row.type === '2'" size="small" type="info">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderNum" header-align="center" align="center" label="排序号"></el-table-column>
        <el-table-column prop="url" header-align="center" align="center" width="150" :show-overflow-tooltip="true" label="菜单URL"></el-table-column>
        <el-table-column prop="perms" header-align="center" align="center" width="150" :show-overflow-tooltip="true" label="授权标识"></el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addOrUpdate(scope.row.menuId,'add')">添加</el-button>
            <el-button type="text" size="small" @click="addOrUpdate(scope.row.menuId,'edit')">修改</el-button>
            <el-button type="text" size="small" @click="deleteHandle(scope.row.menuId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <menu-add-or-update v-if="showDialog" ref="menuAddOrUpdate" @refreshMenuList="getMenuList"></menu-add-or-update>
  </div>
</template>

<script>

  import MenuAddOrUpdate from "./MenuAddOrUpdate";

  import {getTreeMenu,deleteMenu} from "../../api/menu";

  export default {
    name: "Menu",
    data() {
      return {
        dataList: [],
        loading:false,
        showDialog: false,
      }
    },
    components:{
      MenuAddOrUpdate,
    },
    created() {
      this.loading = true;
      this.getMenuList();
    },
    methods: {
      getMenuList(){
        getTreeMenu().then(res => {
          if (res.code === 200) {
            this.dataList = res.datas;
          }
          this.loading = false;
        })
      },
      addOrUpdate(menuId,opt) {
        //新增或者修改
        this.showDialog = true;
        this.$nextTick(()=>{
          this.$refs['menuAddOrUpdate'].init(menuId,opt);
        })
      },
      deleteHandle(menuId) {
        //删除
        this.$confirm('确定进行删除操作,是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          deleteMenu(menuId).then(res =>{
            if(res.code ===200){
              this.$message.success('删除成功')
              this.getMenuList();
            } else{
              this.$message.error(res.msg);
            }
          })
        })

      }
    },
  }
</script>

<style scoped>
  .container-table {
    margin-left: 20px;
    margin-bottom: 0;
  }

  .add-form {
    margin-left: 20px;
    padding: 5px;
    margin-top: 20px;
  }
</style>
