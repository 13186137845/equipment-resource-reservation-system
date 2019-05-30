<template>
<!-- 添加用户的弹出层 -->
<el-dialog
    title="添加设备"
    :visible.sync="addDeparmentVisible"
    width="40%"
    style="margin-top:-60px"
    >
    <el-form :model="form" style="margin-top:-20px" :rules="dataRule" ref="form">

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
    <div slot="footer" class="dialog-footer" style="margin-top:-30px">
        <el-button @click="addDeparmentVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
    </div>
    </el-dialog>
</template>

<script>
import { adminUserService } from "@/common/api";

import { departmentService } from "@/common/api";
import { debounce } from "lodash"; //消抖功能引入
export default {
name: "addEquipment",
data() {
    return {
        // 弹窗可视化
        addDeparmentVisible: false,
       form: {
        MD_ID: "",
        MD_NAME: "",
        MD_INFORMATION: "",
 },
        // 设备名称
        departmentList: [],
        
        role: [],
        formLabelWidth: "120px",
        colWinth: 12
    };
},
mounted() {
    // 获取菜单
    adminUserService
      .getAddUserMenu()
      .then(res => {
        this.departmentList = res.Department;
        this.role = res.Role;
      })
      .catch(err => {
        this.$message({
          message: "系统初始化失败！",
          type: "error"
        });
      });
},
computed: {
    // 必填
    dataRule() {
        return {

        MD_NAME: [
            { required: true, message: "部门名称不能为空", trigger: "blur" }
        ],
     
        };
    }
},
methods: {
    submit: debounce(
        function() {
        //提交时消抖
        this.$refs["form"].validate(valid => {
          //校检表单
            if (valid) {
            //校检通过
            let params = new URLSearchParams();
        
            params.append("MD_NAME", this.form.MD_NAME);
            params.append("MD_INFORMATION", this.form.MD_INFORMATION);
    
            console.log();
            departmentService.addDepartment(params)
                .then(res => {
                //添加成功 刷新列表

                this.$message({
                    message: "添加成功",
                    type: "success"
                });
                this.addDeparmentVisible = false;
                this.$refs.addDepartment.getDataList();
                })
                .catch(err => {
                //添加失败 dosomething
                console.log(err);
                });
            } else {
            return false;
            }
        });
        },
        1000,
        { leading: true, trailing: false }
    )
    }
};
</script>

<style scoped>
</style>