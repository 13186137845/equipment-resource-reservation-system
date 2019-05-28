<template>
  <d2-container :filename="filename">
    <template slot="header">设备报修</template>
    <div class="bookings-bd" v-show="!show3">
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">报修设备编号：</label>
          </el-col>
          <el-col :span="5">
            <el-select v-model="form.ME_ID" filterable placeholder="请选择设备报修编号">
            <el-option
                v-for="item in departmentList"
                :key="item.ME_ID"
                :label="item.ME_ID"
                :value="item.ME_ID"
            ></el-option>
            </el-select>
         
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">报修设备名称：</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="form.EN_NAME"  clearable placeholder></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">报修设备地点：</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="input" clearable placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">申请报修人员姓名：</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="input" clearable placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
      
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">请详细描述产品损坏信息：</label>
          </el-col>
          <el-col :span="15">
            <el-input type="textarea" placeholder="请输入内容" v-model="textarea2"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-button type="primary" plain @click="bookingsopen">报修</el-button>
          <el-button type="primary" plain @click="bookingsclose">取消</el-button>
        </el-row>
        </div>
  </d2-container>
</template>


<script>
import { EquipmentService } from "@/common/api";
export default {
  name: 'page2',
  data () {
    return {
      input: "", //注册
      value1: "", //注册
      textarea2: "", //注册
      show3:"",
      filename: __filename,
        departmentList: [],
        form: {
        ME_ID: "",
        EN_NAME: "",
        EN_ID: "",
        ME_POSITION: "",
     
        }
    }
  },
  mounted () {
   
    EquipmentService.getEquipmentNumber()
        .then(res => {
        this.departmentList = res.ME_IDList;
     
        })
        .catch(err => {
        console.log("数据初始化失败：" + err);
        });
  },
  methods: {
    bookingsopen() {
      this.$message({
        message: "报修成功",
        type: "success"
      });
    
    },
    //点击确定end
    //点击取消start
    bookingsclose() {
      this.$message({
        message: "取消报修",
        type: "warning"
      });
    
    }
  }
}
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

