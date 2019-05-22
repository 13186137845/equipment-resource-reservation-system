<template>
  <div>
    <el-dialog title="设备预约" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="预约设备编号：" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input :placeholder="form.id" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="预约设备名称：" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input :placeholder="form.name" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="预约设备地址：" :label-width="formLabelWidth">
          <el-col :span="15">
            <el-input :placeholder="form.dname" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="预约工号：" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input v-model="form.gname" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="预约日期：" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input v-model="form.onday" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="归还日期：" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-input v-model="form.endday" :disabled="true"></el-input>
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
        id: "",
        name: "",
        dname: "",
        gname: "",
        bname: "",
        xname: "",
        onday: "",
        endday: "",
        speak: "",
        delivery: false,
      },
      formLabelWidth: "120px"
    };
  }
};
</script>

