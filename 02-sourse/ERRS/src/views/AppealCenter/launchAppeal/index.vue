<template>
  <d2-container>
    <!-- <el-steps :active="active" finish-status="success">
      <el-step title="提交申诉"></el-step>
      <el-step title="正在申诉"></el-step>
      <el-step title="申诉成功"></el-step>
    </el-steps> -->
    <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
    
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="申诉名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="申诉类型" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="设备维修" value="wx"></el-option>
          <el-option label="违规操作" value="cz"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作敏感度" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="零级敏感度"></el-radio>
          <el-radio label="一级敏感度"></el-radio>
          <el-radio label="二级敏感度"></el-radio>
          <el-radio label="三级敏感度"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="申诉详情" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即申诉</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      active: 0, //申诉状态0、1、2
      ruleForm: {
        name: "",
        region: "",
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      // if (this.active++ > 2) this.active = 0;
      this.$refs[formName].validate(valid => {
        if (valid) {
          //成功操作
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
