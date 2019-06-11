<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:bottom">
      {{time}}
    </div>
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:center box:justify">
        <div class="page-login--content-header">
        
        </div>
        <div
          class="page-login--content-main"
          flex="dir:top main:center cross:center">
          <!-- logo -->
          <!-- <img class="page-login--logo" src="./image/logo@2x.png"> -->
          <!-- 表单 -->
          <div class="logo">
            <img src="../login/image/logo@2x.png">
            
          </div>
          <div class="page-login--form">
            <el-card shadow="never">
              <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="default">
                <el-form-item prop="username">
                  <el-input type="text" v-model="formLogin.MU_NO" placeholder="用户名">
                    <i slot="prepend" class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="formLogin.MU_PASSWORD" placeholder="密码">
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input type="text" v-model="formLogin.code" >
                    <template slot="prepend">验证码</template>
                    <template slot="append">
                      <div class="login-code">
                      <s-identify :identifyCode="identifyCode"></s-identify>
                      </div>
                    </template>
                  </el-input>
                </el-form-item>
                <el-button size="default" @click="submit" type="primary" class="button-login">登录</el-button>
              </el-form>
            </el-card>
            <p
              class="page-login--options"
              flex="main:justify cross:center">
              <span><d2-icon name="question-circle"/>忘记密码</span>
              <!-- <span>注册用户</span> -->
            </p>
            <!-- 快速登录按钮 -->
           
          </div>
        </div>
        <div class="page-login--content-footer">
          <!-- <p class="page-login--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p>
          <p class="page-login--content-footer-copyright">
            Copyright <d2-icon name="copyright"/> 2018 D2 Projects 开源组织出品 <a href="https://github.com/FairyEver">@FairyEver</a>
          </p> -->
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
import {sysAccountService} from '@/common/api'
import {sysMenuService} from '@/common/api'
import SIdentify from '../login/identify' //验证码文件
export default {
  data () {
    return {
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      // 快速选择用户
        identifyCodes: "1234567890",
      identifyCode: "",
      dialogVisible: false,
      users: [
        {
          name: '管理员',
          MU_NO: 'admin',
          MU_PASSWORD: 'admin'
        },
        {
          name: '编辑',
          MU_NO: 'editor',
          MU_PASSWORD: 'editor'
        },
        {
          name: '用户1',
          MU_NO: '95927',
          MU_PASSWORD: '123456'
        }
      ],
      // 表单
      formLogin: {
        MU_NO: '95927',
        MU_PASSWORD: '123456',
        code: ''
      },
      // 校验
      rules: {
        MU_NO: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        MU_PASSWORD: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入4位数验证码', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    SIdentify
  },
  mounted () {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
    , 
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
     randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    }
  ,
    ...mapActions('d2admin/account', [
      'login'
    ]),
    refreshTime () {
      this.time = dayjs().format('HH:mm:ss')
    },
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick (user) {
      this.formLogin.MU_NO = user.MU_NO
      this.formLogin.MU_PASSWORD = user.MU_PASSWORD
      this.submit()
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit () {
   console.log(this.identifyCode+"zheshidenglu")
    console.log(this.formLogin.code+"zheshiyanzheng")
   
      let param = new URLSearchParams();
      param.append("MU_NO", this.formLogin.MU_NO);
      param.append("MU_PASSWORD", this.formLogin.MU_PASSWORD);
      if(this.identifyCode==this.formLogin.code){
      this.$refs.loginForm.validate((valid) => {
 
        if(!valid)return
        sysAccountService.login(param)
          .then(async res=>{
            await this.login(res)
            await sysMenuService.getNav().then(res=>{
              // console.log(res)
              let defmenu = {path: '/index', title: '首页', icon: 'home'}
              res.MU_POWER.unshift(defmenu)
              this.$store.commit('d2admin/menu/asideSet', res.MU_POWER)//动态菜单
            }).catch(err=>{
              // this.$message.error("菜单初始化失败");
            })
            this.$router.replace(this.$route.query.redirect || '/')
          })
          .catch(err=>{
            // console.log(err)
          })
          
        
       })
       }else{ this.$message.error("验证码错误");}
    }
    }
  
}
</script>

<style lang="scss">
.page-login {
  @extend %unable-select;
  $background-image:linear-gradient(to top,rgba(167, 157, 241, 0.741),rgba(167, 157, 241, 0.441),rgba(243, 217, 247, 0.19));
  // ---
  background-image: $background-image;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 12em;
    font-weight: bold;
    color: rgba(249, 249, 250, 0.147);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
      span {
        color: $color-text-sub;
      }
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  .logo{
    margin-bottom: 30px;
   margin-right: 50px;
  }
  // 登录表单
  .page-login--form {
    width: 280px;
    opacity:1;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      width: 80px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  .code {

  width: 50px;
  
 
}
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 14px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: rgb(168, 184, 201);
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0%{
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100%{
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
