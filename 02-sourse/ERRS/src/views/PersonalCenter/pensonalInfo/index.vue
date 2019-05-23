<template>
  <d2-container :filename="filename">
    <template slot="header">个人信息</template>
    <div class="bookings-bd" v-show="!show3">
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">姓名：</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="input" clearable placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">性别：</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="input" clearable placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">年龄：</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="input" clearable placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">家庭住址：</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="input" clearable placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
      
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">个人概况：</label>
          </el-col>
          <el-col :span="15">
            <el-input type="textarea" placeholder="请输入内容" v-model="textarea2"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-button type="primary" plain @click="bookingsopen">保存</el-button>
          <el-button type="primary" plain @click="bookingsclose">取消</el-button>
        </el-row>
        </div>
  </d2-container>
</template>

<script>
export default {
  name: 'page2',
  data () {
    return {
      input: "", //注册
      value1: "", //注册
      textarea2: "", //注册
      filename: __filename,
      show3:''
    }
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
