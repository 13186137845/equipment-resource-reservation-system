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
        <el-form-item label="预约部门：" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input v-model="form.bname" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="预约使用日期：" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-date-picker
              v-model="form.day"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              value-format="yyyy-MM-dd hh:mm:ss"
            ></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id: "1001",
        name: "显微镜",
        dname: "1楼401",
        gname: "",
        bname: "",
        xname: "",
        day: "",
        speak: "",
        delivery: false,
      },
      formLabelWidth: "120px"
    };
  }
};
</script>

