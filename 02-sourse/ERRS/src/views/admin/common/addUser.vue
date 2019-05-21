<template>
  <!-- 添加用户的弹出层 -->
  <el-dialog
    title="添加用户"
    :visible.sync="addUserVisible"
    width="40%"
    style="margin-top:-60px"
  >
    <el-form
      :model="form"
      style="margin-top:-20px"
      :rules="dataRule"
      ref="form"
    >
      <el-form-item
        label="姓名："
        :label-width="formLabelWidth"
        :span="2"
        prop="MI_NAME"
      >
        <el-col :span="colWinth">
          <el-input v-model="form.MI_NAME" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item
        label="部门："
        :label-width="formLabelWidth"
        :span="2"
        prop="MD_NAME"
      >
        <el-select v-model="form.MD_NAME" placeholder="请选择部门">
          <el-option
            v-for="item in departmentList"
            :key="item.MD_ID"
            :label="item.MD_NAME"
            :value="item.MD_ID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="工号："
        :label-width="formLabelWidth"
        :span="2"
        prop="MU_NO"
      >
        <el-col :span="colWinth">
          <el-input
            v-model.number="form.MU_NO"
            placeholder="请输入数字工号"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item
        label="手机号："
        :label-width="formLabelWidth"
        :span="2"
        prop="MI_PHONE"
      >
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
      <el-form-item
        label="密码："
        :label-width="formLabelWidth"
        :span="2"
        prop="MU_PASSWORD"
      >
        <el-col :span="colWinth">
          <el-input
            type="password"
            v-model="form.MU_PASSWORD"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item
        label="权限"
        :label-width="formLabelWidth"
        :span="2"
        prop="MR_INFORMATION"
      >
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
import { isMobile } from "@/common/validate"; //导入校检规则
import { debounce } from "lodash"; //消抖功能引入
export default {
  name: "addUser",
  data() {
    return {
      addUserVisible: false,
      form: {
        MI_NAME: "", //姓名
        MD_NAME: "", //部门
        MU_NO: "", //工号
        MI_PHONE: "", //电话
        MU_PASSWORD: "123456", //密码
        project: "", //项目
        projectDuty: "", //项目职责
        MR_INFORMATION: "", //权限
        MU_ID: ""
      },
      departmentList: [],
      role: [],
      formLabelWidth: "120px",
      colWinth: 12
    };
  },
  computed: {
    dataRule() {
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          return callback(new Error("请输入正确的手机号"));
        }
        callback();
      };
      //表单验证
      return {
        MI_NAME: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        MD_NAME: [{ required: true, message: "未选择部门", trigger: "change" }],
        MU_NO: [
          { required: true, message: "工号不能为空", trigger: "blur" },
          { type: "number", message: "工号必须为数字值" }
        ],
        MI_PHONE: [
          // { required: true, message: "电话号码不能为空", trigger: "blur" },
          // { validator: validateMobile, trigger: "blur" }
        ],
        MR_INFORMATION: [
          { required: true, message: "权限不能为空", trigger: "blur" }
        ],
        MU_PASSWORD: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      };
    }
  },
  mounted() {
    //页面初始化获取下拉菜单
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
  methods: {
    submit: debounce(
      function() {
        //提交时消抖
        this.$refs["form"].validate(valid => {
          //校检表单
          if (valid) {
            //校检通过
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
                this.addUserVisible = false;
                this.$message({
                  message: "恭喜你，添加成功",
                  type: "success"
                });
              })
              .catch(err => {
                //添加失败 dosomething
                this.$message({
                  message: "系统异常,添加失败",
                  type: "error"
                });
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