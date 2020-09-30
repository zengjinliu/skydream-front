<template>
  <div class="user-area">
    <div class="search-form">
      <el-form
        :model="ruleForm"
        :inline="true"
        ref="ruleForm"
        label-width="100px"
        class="demo-form-inline"
      >
        <el-form-item label="姓名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
          <el-button
            type="success"
            @click="addOrUpdate()"
            v-if="Auth('user:add')"
            >添加</el-button
          >
          <el-button
            type="danger"
            @click="del()"
            :disabled="userIds.length <= 0"
            v-if="Auth('user:del')"
            >批量删除</el-button
          >
          <el-button
            type="info"
            @click="exportUserList()"
            v-if="Auth('user:add')"
            >导出</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="container-table">
      <!--用户列表-->
      <el-table
        v-loading="loading"
        :data="tableData"
        :stripe="true"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="pic"
          label="图片"
          width="180"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <img
              :src="scope.row.pic"
              alt=""
              style="width: 20px; height: 20px"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="180"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="日期"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="150"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="addOrUpdate(scope.row.userId)"
              v-if="Auth('user:edit')"
              >修改</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="del(scope.row.userId)"
              v-if="Auth('user:del')"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        class="page-area"
        background
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="this.ruleForm.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="this.ruleForm.rows"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
    <user-add-or-update
      v-if="showAddOrUpdate"
      ref="userAddOrUpdate"
      @refreshList="page"
    >
    </user-add-or-update>
  </div>
</template>

<script>
import UserAddOrUpdate from './UserAddOrUpdate';

import { getUserPage, delUser} from '@/api/user';
import {exportExcel} from '@/api/download'

export default {
  name: "User",
  data() {
    return {
      ruleForm: {
        username: "",
        phone: "",
        page: 1,
        rows: 10,
      },
      userIds: [],
      loading: false,
      total: 0, //总共多少条
      tableData: [],
      showAddOrUpdate: false, //是否展示添加或者修改页
      userId: "",
    };
  },
  components: {
    UserAddOrUpdate,
  },
  created() {
    //分页查询用户
    this.loading = true;
    this.page();
  },
  methods: {
    page() {
      //分页
      getUserPage(this.ruleForm).then((res) => {
        if (res.datas) {
          this.total = res.pageModel.total;
          this.tableData = res.datas;
        }
        this.loading = false;
      });
    },
    handleSelectionChange(val) {
      //事实监听选中的数据项
      this.userIds = val;
    },
    del(userId) {
      //类似Java中的map方法
      let userIds = userId
        ? [userId]
        : this.userIds.map((item) => {
            return item.userId;
          });
      //删除单个用户
      this.$confirm("确定进行删除操作,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser(userIds)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success("删除成功");
                this.page();
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
        })
        .catch(() => {});
    },
    doSearch() {
      //条件搜索
      this.page();
    },
    sizeChangeHandle(rows) {
      this.ruleForm.rows = rows;
      this.ruleForm.page = 1;
      this.page();
    },
    currentChangeHandle(val) {
      this.ruleForm.page = val;
      this.page();
    },
    addOrUpdate(userId) {
      //修改
      this.showAddOrUpdate = true;
      this.$nextTick(() => {
        this.$refs["userAddOrUpdate"].init(userId);
      });
    },
    exportUserList() {
      //导出 excel
      exportExcel('/user/export','用户列表');
    },
  },
};
</script>

<style scoped>
.container-table {
  margin-left: 20px;
  margin-bottom: 0;
}

.search-form {
  margin-left: 0;
  margin-top: 20px;
}
</style>
