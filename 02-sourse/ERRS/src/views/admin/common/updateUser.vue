<template>
  <!-- 添加用户的弹出层 -->
  <el-dialog
    title="修改用户"
    :visible.sync="updateUserVisible"
    width="40%"
    style="margin-top:-60px"
  >
    <el-form :model="form" style="margin-top:-20px">
      <el-form-item label="姓名：" :label-width="formLabelWidth" :span="2">
        <el-col :span="colWinth">
          <el-input v-model="form.MI_NAME" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="部门：" :label-width="formLabelWidth" :span="2">
        <el-select v-model="form.MD_NAME" placeholder="请选择部门">
          <el-option
            v-for="item in departmentList"
            :key="item.MD_ID"
            :label="item.MD_NAME"
            :value="item.MD_ID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号：" :label-width="formLabelWidth" :span="2">
        <el-col :span="colWinth">
          <el-input v-model="form.MU_NO" :disabled="true" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号：" :label-width="formLabelWidth" :span="2">
        <el-col :span="colWinth">
          <el-input v-model="form.MI_PHONE" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="参与项目" :label-width="formLabelWidth" :span="2">
        <el-col :span="colWinth">
          <el-input v-model="form.project" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="项目职责" :label-width="formLabelWidth" :span="2">
        <el-col :span="colWinth">
          <el-input v-model="form.projectDuty" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码：" :label-width="formLabelWidth" :span="2">
        <el-col :span="colWinth">
          <el-input type="password" v-model="form.MU_PASSWORD" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="权限" :label-width="formLabelWidth" :span="2">
        <el-col :span="colWinth">
          <el-select v-model="form.MR_INFORMATION" placeholder="选择用户权限">
            <el-option
              v-for="item in role"
              :key="item.MR_ID"
              :label="item.MR_INFORMATION"
              :value="item.MR_ID"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-top:-30px">
      <el-button @click="updateUserVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { adminUserService } from "@/common/api";
export default {
  name: "updateUser",
  data() {
    return {
      updateUserVisible: false,
      form: {
        MI_NAME: "",
        MD_NAME: "",
        MU_NO: "",
        MI_PHONE: "",
        project: "",
        projectDuty: "",
        MR_ID: "",
        MU_PASSWORD:"",
        MU_ID:"",
        MR_INFORMATION:"",
        MI_ID:"",
        MU_ID:""
      },
      departmentList: [],
      role: [],
      formLabelWidth: "120px",
      colWinth: 12
    };
  },
  mounted() {
    //页面初始化获取下拉菜单
    adminUserService
      .getAddUserMenu()
      .then(res => {
        console.log(res);
        this.departmentList = res.Department;
        this.role = res.Role;
      })
      .catch(err => {
        console.log("菜单获取失败：" + err);
      });
  },
  methods: {
    submit() {
      let params = new URLSearchParams();
      params.append("MI_ID",this.form.MI_ID);//个人详情表 MI
      params.append("MD_ID", this.form.MD_ID);//部门ID
      params.append("MR_ID", this.form.MR_ID);//权限
      params.append("MU_ID", this.form.MU_ID);//根据MU_ID查找要修改密码的用户
      params.append("MI_NAME",this.form.MI_NAME);//姓名
      params.append("MI_PHONE", this.form.MI_PHONE);
      params.append("MU_PASSWORD", this.form.MU_PASSWORD);//密码

      adminUserService
        .updateUser(params)
        .then(res => {
          //添加成功 刷新列表
          this.updateUserVisible = false;
          this.$message({
            message: '恭喜你，修改成功',
            type: 'success'
          });
          this.$router.go(0);
        })
        .catch(err => {
          //添加失败 dosomething’
            this.$message({
                message: '系统异常',
                 type: 'error'
            });
        });
    }
  }
};
</script>

<style scoped>
</style>