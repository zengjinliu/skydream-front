<template>
  <el-dialog :title="!roleForm.roleId ? '新增' : '修改'"
             :visible.sync="dialogShow"
             :close-on-click-modal="false"
             :append-to-body="true">

    <el-form ref="roleForm" :model="roleForm"
             :rules="roleFormRule" label-width="80px"
             @keyup.enter.native="doAddRole"
    >

      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="roleForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="password">
        <el-input type="textarea" :rows="2" v-model="roleForm.remark"></el-input>
      </el-form-item>
      <!--树形控件-->
      <el-form-item label="菜单树">
        <el-tree
          :check-strictly="checkStrictly"
          :data="treeData"
          show-checkbox
          default-expand-all
          node-key="menuId"
          ref="menuTree"
          highlight-current
          :default-checked-keys="this.roleForm.menuIds"
          :props="defaultProps">
        </el-tree>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogShow = false">取 消</el-button>
      <el-button type="primary" @click="doAddRole">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>

  import {getTreeMenu} from "@/api/menu";
  import {addRole, queryById, update} from "@/api/role";

  export default {
    name: "RoleAddOrUpdate",
    data() {
      return {
        roleForm: {
          roleId: '',
          roleName: '',
          remark: '',
          menuIds: []
        },
        roleFormRule: {
          roleName: [
            {required: true, message: '角色名称不能为空', trigger: 'blur'}
          ]
        },
        defaultProps: {
          children: 'childs',
          label: 'name',
          id: 'menuId'
        },
        dialogShow: false,
        treeData: [],
        checkStrictly:false,

      }
    },
    created() {
      //获取整个菜单树
      getTreeMenu().then(res => {
        if (res.code === 200) {
          this.treeData = res.datas;
        }
      })
    },
    methods: {
      init(roleId) {
        this.dialogShow = true;
        //修改信息回显
        if (roleId != undefined) {
          this.roleForm.roleId = roleId;
          queryById(roleId).then(res => {
            if (res.code === 200) {
              this.roleForm.roleName = res.datas.roleName;
              this.roleForm.remark = res.datas.remark;
              let that = this;
              this.checkStrictly = true;
              this.$nextTick(() => {
                setTimeout(()=>{
                  that.$refs.menuTree.setCheckedKeys(res.datas.menuIds);
                  // res.datas.menuIds.forEach(e => {
                  //   that.$refs.menuTree.setChecked(e, true, false);
                  // })
                  this.checkStrictly = false
                },10)
              })
            }
          })
        } else {
          this.clearData();
        }
      },
      doAddRole() {
        //获取选中的节点信息
        let menuIds = this.$refs.menuTree.getHalfCheckedKeys();
        this.$refs.menuTree.getCheckedKeys().forEach(e => {
          menuIds.push(e);
        });
        this.roleForm.menuIds = menuIds;
        if (this.roleForm.roleId) {
          //修改
          this.$refs['roleForm'].validate((valid) => {
            if (valid) {
              update(this.roleForm).then(res => {
                if (res.code === 200) {
                  this.dialogShow = false;
                  this.$message.success('修改成功')
                  this.$emit('refreshList');
                } else {
                  this.$message.error('修改失败')
                }
              })
            }
          });
        } else {
          //新增
          this.$refs['roleForm'].validate((valid) => {
            if (valid) {
              addRole(this.roleForm).then(res => {
                if (res.code === 200) {
                  this.dialogShow = false;
                  this.$emit('refreshList')
                  this.$message.success('添加成功');
                  this.clearData();
                }
              })
            }
          });
        }

      },
      clearData(){
        //TODO 数据回显的问题
        this.$nextTick(() => {
          this.$refs['roleForm'].resetFields();
          this.roleForm.remark = '';
          this.$refs.menuTree.setCheckedKeys([])
        })
      }
    }
  }
</script>

<style scoped>
</style>
