<template>
  <d2-container :filename="filename">
    <template slot="header">个人信息</template>
    <el-form :model="form" style="margin-top:-20px" :rules="dataRule" ref="form">
      <el-row :gutter="20" class="bookings-dhk">
        <el-col :span="3">
          <label class="bookings-lab">姓名：</label>
        </el-col>
        <el-col :span="5">
          <el-input v-model="form.MI_NAME" clearable placeholder="请输入姓名"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="bookings-dhk">
        <el-col :span="3">
          <label class="bookings-lab">性别：</label>
        </el-col>
        <el-col :span="5">
          <el-radio v-model="form.MI_SEX" label="1">男</el-radio>
          <el-radio v-model="form.MI_SEX" label="2">女</el-radio>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="bookings-dhk">
        <el-col :span="3">
          <label class="bookings-lab">电话</label>
        </el-col>
        <el-col :span="5">
          <el-input v-model="form.MI_PHONE" clearable placeholder="请输入电话"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="bookings-dhk">
        <el-col :span="3">
          <label class="bookings-lab">身份证号码：</label>
        </el-col>
        <el-col :span="5">
          <el-input v-model="form.MI_ID_CARE" placeholder="请输入身份证号码" clearable></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="bookings-dhk">
        <el-col :span="3">
          <label class="bookings-lab">家庭住址：</label>
        </el-col>
        <el-col :span="5">
          <el-input v-model="form.USER_LOCAL" placeholder="请输入家庭住址" clearable></el-input>
        </el-col>

      </el-row>

      <el-row :gutter="20" class="bookings-dhk">
        <el-button type="primary" plain @click="bookingsopen">立即提交</el-button>
      </el-row>

    </el-form>
  </d2-container>
</template>



<script>
import { mapState, mapActions } from "vuex";
import { getRepair } from "@/common/api";
import { personnelService } from "@/common/api";
import { debounce } from "lodash"; //消抖功能引入
export default {
  name: "page2",
  data() {
    return {
      readonly: true,
      edit: true,
      input: "", //注册
      value1: "", //注册
      textarea2: "", //注册
      show3: "",
      filename: __filename,
      departmentList: [],
      form: {
        MI_NAME: null,
        MI_SEX: null,
        MI_PHONE: null,
        MI_ID_CARE: null,
        USER_LOCAL: null,
        MI_ID: null,
        MU_NO: null
      }
    };
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  mounted() {
    //this.form.INS_USER = "fofo",this.$store.state.d2admin.user.info.name
    personnelService
      .getPerList()
      .then(res => {
        this.form = res;
        console.log(this.form, "color:green");
      })
      .catch(err => {
        console.log("数据初始化失败：" + err);
      });
  },
  methods: {
    bookingsopen: debounce(
      function() {
        //提交时消抖
        this.$refs["form"].validate(valid => {
          //校检表单
          if (valid) {
            //校检通过
            let params = new URLSearchParams();

            params.append("MI_NAME", this.form.MI_NAME);
            params.append("MI_SEX", this.form.MI_SEX);
            params.append("MI_PHONE", this.form.MI_PHONE);
            params.append("MI_ID_CARE", this.form.MI_ID_CARE);
            params.append("USER_LOCAL", this.form.USER_LOCAL);
            params.append("MI_ID", this.form.MI_ID);

            console.log();
            personnelService
              .upPerList(params)
              .then(res => {
                //添加成功 刷新列表

                this.$message({
                  message: "修改成功",
                  type: "success"
                });
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
<style >
.bookings-dhk {
  padding: 15px;
  padding-left: 50px;
}
.bookings-lab {
  line-height: 40px;
}
</style>

