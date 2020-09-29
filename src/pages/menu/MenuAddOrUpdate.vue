<template>
  <el-dialog title=""
    :close-on-click-modal="false"
    :visible.sync="visible">

    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="addMenu"
             label-width="80px" size="medium">

      <el-form-item label="类型">
        <el-select v-model="dataForm.type" :disabled="disabled" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentName">
        <el-input v-model="dataForm.parentName" v-popover:menuListPopover :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="菜单链接" prop="url">
        <el-input v-model="dataForm.url"></el-input>
      </el-form-item>
      <el-form-item label="排序号" prop="orderNum">
        <el-input-number v-model="dataForm.orderNum" :min="0" label="排序号"></el-input-number>
      </el-form-item>
      <el-form-item label="授权标识" prop="perms">
        <el-input v-model="dataForm.perms" placeholder="多个用逗号分隔, 如: user:list,user:create"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon">
        <el-input v-model="dataForm.icon" placeholder="菜单图标名称"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="addMenu">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import {addMenu,queryById,update} from "@/api/menu";

  export default {
    name: "MenuAddOrUpdate",
    data() {
      return {
        dataForm: {
          menuId: '',
          parentId: '0',
          name: '',
          url: '',
          perms: '',
          parentName: 'root',
          type: '0',//默然是目录
          icon: '',
          orderNum: '',

        },
        dataRule: {
          name: [
            {required: true, message: '菜单名称不能为空', trigger: 'blur'}
          ],
          parentName: [
            {required: true, message: '上级菜单不能为空', trigger: 'blur'}
          ],
        },
        options: [{
          value: '0',
          label: '目录'
        }, {
          value: '1',
          label: '菜单'
        }, {
          value: '2',
          label: '按钮'
        }],
        visible: false,
        opt:'',//操作（是新增还是修改）
        disabled: false,
        iconList: [],//图标列表
      }
    },
    created() {
     //TOOD 菜单图标待完成
    },
    methods: {
      init(menuId,opt) {
        this.visible = true;
        this.opt = opt;
        if(menuId!=undefined){
          //menuId，当前正在操作的菜单id
          if(this.opt==='add'){
            this.dataForm.parentId = menuId;
            //新增
            queryById(this.dataForm.parentId).then(res =>{
                if(res.code===200){
                  let parent = res.datas;
                  this.dataForm.parentName = parent.name;
                  this.dataForm.parentId = parent.menuId;
                }
            })
            this.$nextTick(()=>{
              this.$refs['dataForm'].resetFields();
            })
          } else{
            this.dataForm.menuId = menuId;
            //修改
            queryById(this.dataForm.menuId).then(res =>{
              if(res.code===200){
                let current = res.datas;
                this.dataForm.name = current.name || 'root';
                this.dataForm.parentName = current.parentName || 'root';
                this.dataForm.parentId = current.parentId;
                this.dataForm.orderNum = current.orderNum;
                this.dataForm.perms = current.perms;
                this.dataForm.url = current.url;
                //下拉值回显
                this.dataForm.type = current.type + '';
              }
            });
          }
        } else{
          this.$nextTick(()=>{
            this.$refs['dataForm'].resetFields();
          })
        }
      },
      addMenu() {
        if (this.dataForm.menuId && this.opt==='edit') {
          //修改
          this.$refs['dataForm'].validate((valid) =>{
            if(valid){
              update(this.dataForm).then(res =>{
                if(res.code === 200){
                  this.visible = false;
                  this.$message.success('修改成功')
                  this.$emit('refreshMenuList');
                }
              })
            }
          })
        } else if(this.dataForm.parentId && this.opt==='add'){
          //新增
          this.$refs['dataForm'].validate((valid) =>{
            if(valid){
              addMenu(this.dataForm).then(res => {
                if(res.code===200){
                  this.visible = false;
                  this.$message.success('添加成功')
                  this.$emit('refreshMenuList');
                }
              })
            }
          })
        }
      },
      iconActiveHandle (iconName) {
        //图标选中
        this.dataForm.icon = iconName
      },

    }
  }
</script>

<style scoped>

</style>
