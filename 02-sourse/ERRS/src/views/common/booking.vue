<template>
  <div>
    <el-dialog title="设备预约" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="margin-top:-10px">
        <el-form-item label="预约设备编号：" :label-width="formLabelWidth">
          <el-col :span="5">
            <el-input :placeholder="form.id" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="预约设备名称：" :label-width="formLabelWidth">
          <el-col :span="5">
            <el-input :placeholder="form.name" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="预约设备地址：" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input :placeholder="form.dname" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="选择您的项目：" :label-width="formLabelWidth">
          <el-col :span="13">
            <el-select v-model="form.xname" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.MPR_ID"
                :label="item.MPR_NAME"
                :value="item.MPR_ID"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="选择使用日期：" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-date-picker
              v-model="form.day"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              value-format="yyyy-MM-dd hh:mm:ss"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="紧急预约：" style :label-width="formLabelWidth">
          <el-col :span="8">
            <el-switch v-model="form.delivery"></el-switch>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top:-60px">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false; submit() ;clear()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { type } from "os";
import { userBookingService } from "@/common/api";
import { all } from 'q';

export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id: "", //设备编号
        name: "", //设备名称
        dname: "", //设备地址
        xname: "", //设备项目
        day: "", //设备选择时间
        delivery: false //紧急预约状态（false关闭,true开启）
      },
      formLabelWidth: "120px",
      options: [], //存放初始化数据
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
    };
  },
  mounted() {
    //页面数据初始化
    userBookingService
      .addMpr()
      .then(res => {
        // console.log(res);
        this.options = res.Project;
      })
      .catch(err => {
        // console.log("数据初始化失败：" + err);
      });
  },
  methods: {
    //点击确定
    submit() {
      let params = new URLSearchParams();
      params.append("ME_ID", this.form.id);
      params.append("MPR_ID", this.form.xname);
      params.append("MA_START_DATE", this.form.day[0]);
      params.append("MA_END_DATE", this.form.day[1]);
      params.append("MA_STATE", this.form.delivery == true ? 1 : 0);
        userBookingService
        .addsystem(params)
        .then(result => {
          // console.log("okkkture");
          this.$message({
            message: "添加成功",
            type: "success"
          });
        })
        .catch(err => {
          // console.log("false");
          // this.$message.error("添加失败");
        });
    },
    clear() {
      this.form.day = "";
      this.form.xname= "";
    }
  }
};
</script>

