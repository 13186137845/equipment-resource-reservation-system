<template>
  <div class="bd">
    <el-form
      ref="AccountFrom"
      :model="account"
      :rules="rules"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="account.username"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          type="password"
          v-model="account.pwd"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember"
        >记住密码</el-checkbox
      >
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      logining: false,
      account: {
        username: "admin",
        pwd: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleLogin() {
      //post中的第一个参数及为url地址
      this.axios
        .post("http://api.komavideo.com/news/list", { username:this.username,password:this.pwd})
        .then(response => {
          //这里写成功的逻辑语句
          console.log(response.data);
        }).catch(error=>{
          //这里写失败的逻辑语句
          console.log(error);
        })
    }
  }
};
</script>

<style scoped>
.bd {
  height: 100%;
  width: 100%;
  position: absolute;
  background: rgb(176, 199, 241);
}
.login-container {
  width: 350px;
  margin-left: 37%;
  margin-top: 15%;
}
.title {
  font-size: 2em;
  text-align: center;
}
.remember {
  margin-bottom: 10px;
  margin-left: 130px;
}
</style>
