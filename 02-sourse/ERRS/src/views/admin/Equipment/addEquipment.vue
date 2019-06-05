<template>
  <!-- 添加用户的弹出层 -->
  <el-dialog title="添加设备" :visible.sync="addEquipmentVisible" width="40%" style="margin-top:-60px">
    <el-form :model="form" style="margin-top:-20px" :rules="dataRule" ref="form">
      <el-form-item label="设备编号：" prop="ME_ID" :label-width="formLabelWidth" :span="2">
        <el-col :span="colWinth">
          <el-input v-model="form.ME_ID" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="设备名称：" :label-width="formLabelWidth" :span="2" prop="EN_NAME">
        <el-select v-model="form.EN_NAME" placeholder="请选择设备名称">
          <el-option v-for="item in departmentList" :key="item.ME_ID" :label="item.EN_NAME" :value="item.EN_ID"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备地址：" :label-width="formLabelWidth" prop="ME_POSITION" :span="2">
        <el-col :span="colWinth">
          <el-input v-model="form.ME_POSITION" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <!-- 设备负责人，设备购入时间 -->
      <el-form-item label="购入时间：" :label-width="formLabelWidth" :span="2">
        <el-col :span="colWinth">
          <el-date-picker v-model="form.BUY_DATE" type="date" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="购入负责人：" :label-width="formLabelWidth" :span="2">
        <el-col :span="colWinth">
          <el-input v-model="form.BUY_NAME" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item style="margin-left:21%">
      <!-- 文件上传 -->
        <el-upload :action="uploadPath" multiple accept="image/jpeg,image/png,image/gif" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :on-success="uploadSuccess" :on-error="uploadError" :limit="3" :file-list="fileList" ref="upload">
          <el-button slot="trigger" type="success" size="mini">上传设备图片</el-button>
          <!-- <el-button type="success" size="mini" @click="uploadSubmit" style="margin-left:30px">开始上传</el-button> -->
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-top:-30px">
      <el-button @click="addEquipmentVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { EquipmentService } from "@/common/api";
import { debounce } from "lodash"; //消抖功能引入
export default {
  name: "addEquipment",
  data() {
    return {
      // 弹窗可视化
      addEquipmentVisible: false,
      form: {
        ME_ID: "",
        EN_NAME: "",
        EN_ID: "",
        ME_POSITION: "",
        BUY_DATE: "",
        BUY_NAME: ""
      },
      // 设备名称
      departmentList: [],
      role: [],
      formLabelWidth: "120px",
      colWinth: 12,
      //上传文件
      uploadPath: process.env.VUE_APP_API + "/adminApi/uploadFile",
      fileList: [],
      equImg: ""
    };
  },
  mounted() {
    // 获取菜单
    EquipmentService.getEquipment()
      .then(res => {
        // console.log(res);
        this.departmentList = res.Equipment;
        this.role = res.Role;
      })
      .catch(err => {
        // console.log("菜单获取失败：" + err);
      });
  },
  computed: {
    // 必填
    dataRule() {
      return {
        ME_ID: [{ required: true, message: "编号不能为空", trigger: "blur" }],
        EN_NAME: [
          { required: true, message: "设备名称不能为空", trigger: "blur" }
        ],
        ME_POSITION: [
          { required: true, message: "地址不能为空", trigger: "blur" }
        ]
      };
    }
  },
  methods: {
    submit: debounce(
      function() {
        //提交时消抖
        this.$refs["form"].validate(valid => {
          //校检表单
          if (valid) {
            //校检通过
            let params = new URLSearchParams();
            params.append("ME_ID", this.form.ME_ID);
            params.append("EN_ID", this.form.EN_NAME);
            params.append("ME_POSITION", this.form.ME_POSITION);
            params.append("BUY_DATE", this.form.BUY_DATE);
            params.append("BUY_NAME", this.form.BUY_NAME);
            // console.log();
            EquipmentService.addEquipment(params)
              .then(res => {
                this.$message({
                  message: "添加成功,请刷新页面",
                  type: "success"
                });
                //给道具数组添加数据
                this.propsList = [
                  {
                    ME_ID: this.form.ME_ID,
                    EN_ID: this.form.EN_ID,
                    ME_POSITION: this.form.ME_POSITION,
                    ME_STATE: this.form.ME_STATE,
                    BUY_DATE: this.form.BUY_DATE,
                    BUY_NAME: this.form.BUY_NAME,
                    ME_IMG_NAME: this.form.ME_IMG_NAME
                  }
                ];
                //传值给父组件
                this.$emit("getMessage", this.propsList);
                this.addEquipmentVisible = false;
              })
              .catch(err => {
                //添加失败 dosomething
                // console.log(err);
              });
          } else {
            return false;
          }
        });
      },
      1000,
      { leading: true, trailing: false }
    ),
    // uploadSubmit() {
    //   this.$refs.upload.submit(); //上传文件
    // },
    handlePreview(file) {
      //点击选择文件之后的钩子函数
      // console.log(file)
    },
    handleRemove(file, fileList) {
      //文件列表移除文件时的钩子
      // console.log(file,fileList)
    },
    beforeRemove(file, fileList) {
      //删除文件之前的钩子
      // console.log(file,fileList)
    },
    uploadSuccess(res, file, fileList) {
      //文件上传成功钩子
      // this.$message.success("文件上传成功");
      this.equImg = res.data;
    },
    uploadError() {
      //文件上传失败钩子
      this.$message.error("文件上传失败");
    }
  }
};
</script>

<style scoped>
</style>