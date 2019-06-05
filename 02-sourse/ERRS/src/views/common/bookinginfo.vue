<template>
  <div>
    <el-dialog title="设备预约" :visible.sync="dialogFormVisible">
      <el-form :model="form">
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
          <el-col :span="5">
            <el-input :placeholder="form.dname" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="预约工号：" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input v-model="form.gname" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="预约使用日期：" :label-width="formLabelWidth" v-if="this.form.saze!=1">
          <el-col :span="8" v-if="this.form.saze!=1">
            <el-date-picker
              v-model="form.time"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              value-format="yyyy-MM-dd hh:mm:ss"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false; submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userBookingService } from "@/common/api";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
        nameid: "",
        dname: "",
        gname: "",
        xname: "",
        time: "",
        onday: "",
        endday: "",
        speak: "",
        indes: "",//存索引
        delivery: false,
        saze: ""
      },
      formLabelWidth: "120px",
      nowday: "",
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
    };
  },
  mounted(){
    this.nowday = new Date();
  },
  methods:{
    submit() {
      let params = new URLSearchParams();
      params.append("ME_ID", this.form.id);
      params.append("MA_ID", this.form.nameid);
      params.append("MA_START_DATE", this.form.time[0]);
      params.append("MA_END_DATE", this.form.time[1]);
      userBookingService.addsys(params)
        .then(result => {
          if(this.form.time[0]==this.form.onday && this.form.time[1]==this.form.endday){
            this.$message({
              message: "预约时间无更改",
              type: "error"
            });
          }else{
            this.$message({
              message: "更改成功",
              type: "success"
            });
          }
        })
        .catch(err => {
          // console.log("false");
          this.$message.error("更改失败");
        });
        this.$emit("contentToggle",this.form.time);
        this.form.time = ""; 
        this.$router.go(0);
    }
  }
};
</script>

