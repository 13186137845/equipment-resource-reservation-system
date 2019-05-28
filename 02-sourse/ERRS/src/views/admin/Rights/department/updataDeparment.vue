<template>
  <!-- 编辑用户的弹出层 -->
  <el-dialog
    title="编辑部门"
    :visible.sync="updataDeparmentVisible"
    width="40%"
    style="margin-top:-60px"
  >
    <el-form
      :model="form"
      style="margin-top:-20px"
      :rules="dataRule"
      ref="form"
    >
     <el-form-item label="部门编号：" :label-width="formLabelWidth" :span="2" prop="MD_ID">
       <el-col :span="colWinth">
        <el-input v-model="form.MD_ID" autocomplete="off"   readonly  :disabled="edit"></el-input>
        </el-col>
        </el-form-item>
 
      <el-form-item label="部门名称：" :label-width="formLabelWidth" :span="2" prop="MD_NAME">
       <el-col :span="colWinth">
        <el-input v-model="form.MD_NAME" autocomplete="off"></el-input>
        </el-col>
        </el-form-item>
  

        <el-form-item label="部门职责：" :label-width="formLabelWidth" prop="MD_INFORMATION" :span="2">
        <el-col :span="colWinth">
        <el-input v-model="form.MD_INFORMATION" autocomplete="off"></el-input>
        </el-col>
        </el-form-item>
    
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="margin-top:-30px"
    >
      <el-button @click="updataDeparmentVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="submit"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { departmentService } from "@/common/api";

export default {
  name: "updataEquipment",
  data() {
    return {
   readonly: true,
   edit: true,
      // 可视化弹窗
      updataDeparmentVisible: false,
       form: {
        MD_ID: "",
        MD_NAME: "",
        MD_INFORMATION: "",


    
        },
   
      fileList: [],
      // 设备名称
      departmentList: [],
     
      role: [],
      formLabelWidth: "120px",
      colWinth: 12
    };
  },
  computed: {
    // 必填
    dataRule() {
      return {
        MD_NAME: [{ required: true, message: "部门名称不能为空", trigger: "blur" }],
        
      };
    }
  },
  mounted() {
    // 获取菜单
    
  },
  methods: {
    submit() {
      // 确定按钮

     let params = new URLSearchParams();
            params.append("MD_ID", this.form.MD_ID);
            params.append("MD_NAME", this.form.MD_NAME);
            params.append("MD_INFORMATION", this.form.MD_INFORMATION);
    
            console.log();
      // params.append("file",this.fileList);
      departmentService.updateDepartment(params)
        .then(res => {
          //添加成功 刷新列表
          this.$message({
            message: "恭喜你，修改成功",
            type: "success"
          });
          this.updataDeparmentVisible = false;
          this.$refs.updataEquipment.getDataList();
        })
        .catch(err => {
          //添加失败 dosomething
        });
    }
  }
};
</script>

<style scoped>
</style>