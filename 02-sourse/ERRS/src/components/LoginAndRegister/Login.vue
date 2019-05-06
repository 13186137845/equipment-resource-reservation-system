<template>
  <div class="bd"><!--style="padding:260px 500px"-->
    <el-row style="padding-top:290px">
        <el-col :span="7" :push="8">
            <h1>登录</h1>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="工号" prop="pass">
                    <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="ruleForm.age"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-col :span="12" :push="5">
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    </el-col>
                    <el-col :span="12" :push="1">  
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-col>        
    </el-row>
  </div>

</template>

<script>
export default {
  name: 'login',
  data() {
       //判断表单是否为空-start
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入工号'));
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            callback();
            }
        };
        //判断表单是否为空-end

        //表单不为空时小图标变绿色-start
        return {
            ruleForm: {
            pass: '',
            checkPass: '',
            age: ''
            },
            rules: {
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ]
            }
        };
        //表单不为空时小图标变绿色-end
        
        },
        methods: {
        //验证表单填入信息-start
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid && this.ruleForm.pass == '123' && this.ruleForm.checkPass == '123') {
                alert('submit!');//提示成功
                alert(this.ruleForm.pass);//输入的工号
                alert(this.ruleForm.checkPass);//输入的密码
            } else {
                alert('error submit!!');//提示失败
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
        ////验证表单填入信息-end
    }
}
</script>

<style scoped>
    .bd{
        height: 100%;
        width: 100%;
        position: absolute;
        background: url("../../assets/backgroundIMG/1.jpg") center bottom;
        background-repeat:no-repeat ;
        background-size:100% 100%;
        background-attachment: fixed;
    }    
</style>
