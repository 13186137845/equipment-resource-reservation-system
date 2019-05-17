<template>
  <div>
    <el-dialog title="设备预约" :visible.sync="dialogFormVisible" >
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
          <el-col :span="5">
            <el-input :placeholder="form.dname" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="选择您的项目：" :label-width="formLabelWidth">
          <el-col :span="8">
            <!-- <el-input v-model="form.xname" clearable placeholder="请输入内容"></el-input> -->
            <el-select v-model="form.xname" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
        <el-button type="primary" @click="dialogFormVisible = false; submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { type } from "os";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id: "",//设备编号
        name: "",//设备名称
        dname: "",//设备地址
        xname: "",//设备项目
        day: "",//设备选择时间
        delivery: false//紧急预约状态（false关闭,true开启）
      },
      formLabelWidth: "120px",
      //项目名称列表
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
    };
  },
  methods:{
    // submit(){
    //   let params = new URLSearchParams();
    //   params.append("form.id",this.form.MA_ID);
    //   // params.append("form.xname",this.form.MPR_ID);
    //   params.append("form.day[0]",this.form.MA_START_DATE);
    //   params.append("form.day[1]",this.form.MA_END_DATE);
    //   params.append("form.delivery",this.form.MA_STATE);
    //   adminAccountService
    //   .addsystem(params)
    //   .then((result) => {
    //     this.$message({
    //       message: '添加成功',
    //       type: 'success'
    //     });
    //   }).catch((err) => {
    //     this.$message.error('添加失败');
    //   });
    // }
  }
};
</script>

