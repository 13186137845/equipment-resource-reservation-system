<template>
  <!-- 添加用户的弹出层 -->
  <el-dialog
    title="添加用户"
    :visible.sync="addUserVisible"
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
          <el-input v-model="form.MU_NO" autocomplete="off"></el-input>
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
      <el-button @click="addUserVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { adminUserService } from "@/common/api";
export default {
  name: "addUser",
  data() {
    return {
      addUserVisible: false,
      form: {
        MI_NAME: "",
        MD_NAME: "",
        MU_NO: "",
        MI_PHONE: "",
        MU_PASSWORD: "",
        project: "",
        projectDuty: "",
        MR_INFORMATION: "",
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
      params.append("MI_NAME", this.form.MI_NAME);
      params.append("MD_ID", this.form.MD_NAME);
      params.append("MU_NO", this.form.MU_NO);
      params.append("MI_PHONE", this.form.MI_PHONE);
      params.append("MU_PASSWORD", this.form.MU_PASSWORD);
      params.append("MR_ID", this.form.MR_INFORMATION);
      params.append("MU_ID", this.form.MU_ID);
      adminUserService
        .addUser(params)
        .then(res => {
          //添加成功 刷新列表
          console.log("success");
          this.addUserVisible = false;
          this.$refs.adduser.getDataList();
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