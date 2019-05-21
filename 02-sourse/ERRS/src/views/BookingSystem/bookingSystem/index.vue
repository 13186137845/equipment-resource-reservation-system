<template>
  <d2-container :filename="filename">
    <div class="block">
      <el-col :span="7">
        <span class="demonstration">请选择设备：</span>
        <el-select v-model="equipments" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.EN_ID"
            :label="item.EN_NAME"
            :value="item.EN_ID"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
        <span class="demonstration">请选择日期：</span>
        <el-date-picker
          v-model="day"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
          value-format="yyyy-MM-dd hh:mm:ss"
        ></el-date-picker>
      </el-col>
      <el-button @click="handle()">查看</el-button>
    </div>
    <br>
    <el-table
      size="mini"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column label="设备编号" prop="ME_ID" width="100"></el-table-column>
      <el-table-column label="设备名称" prop="EN_NAME" width="250"></el-table-column>
      <el-table-column label="设备地址" prop="ME_POSITION" width="450"></el-table-column>
      <el-table-column label="设备状态" prop="ME_STATE" width="100"></el-table-column>
      <el-table-column label="预约人数" prop="MA_SIZE" width="100"></el-table-column>
      <el-table-column align="center" label="操作">
        <!-- 按钮start -->
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
          <p>当前使用工号: {{ hovr.userid }}</p>
          <p>当前使用姓名: {{ hovr.name }}</p>
          <p>当前使用部门: {{ hovr.username }}</p>
          <p>当前使用项目: {{ hovr.project }}</p>
          <p>当前使用借用时间: {{ hovr.ontime }}</p>
          <p>当前使用规划时间: {{ hovr.endtime }}</p>
          <el-button size="mini" type="primary" slot="reference" @click="handleEdit(scope.$index, scope.row)">预约</el-button>
        </el-popover>
        </template>
      </el-table-column>
      <!-- 按钮end -->
    </el-table>
    
    <booking ref="booking"/>
  </d2-container>
</template>

<script>
import booking from "./../../common/booking";
import { userBookingService } from "@/common/api";
import request from "@/plugin/axios";

export const BookingService = {
  //根据设备名称重载表格
  addMprsb(data) {
    var url = "/adminApi/v/equipmentView?EN_ID=" + this.equipments;
    return request({
      url: url,
      method: "post",
      data
    });
  }
};
export default {
  name: "bookingSystem",
  data() {
    return {
      hovr: {
        userid: "1001",
        name: "车志伟", //预约按钮hover弹出的使用者
        username: "研发组",
        project: "智能预约系统", //预约按钮hover弹出的项目
        ontime: "2019-5-7 03:20:22",
        endtime: "2019-5-7 12:20:22" //预约按钮hover弹出的使用者借用时间
      },
      dialogFormVisible: false,
      currentPage: 1, //初始页
      pagesize: 5, //一页最多5条数据
      tableData: [],
      //模拟数据start
      search: "",
      //模拟数据end
      filename: __filename,
      day: "",
      options: [],
      equipments: "" //选择设备
    };
  },
  components: {
    booking
  },
  mounted() {
    //用户表格初始化
    userBookingService
      .system()
      .then(res => {
        console.log(res);
        this.tableData = res.list;
        // console.log(this.tableData);
      })
      .catch(err => {
        console.log("数据初始化失败：" + err);
      });
    //获取设备列表
    userBookingService
      .addMpr()
      .then(res => {
        console.log(res);
        this.options = res.Equipment;
      })
      .catch(err => {
        console.log("数据初始化失败：" + err);
      });
  },
  methods: {
    //点击查看start
    handle() {
      console.log(this.equipments + "&" + this.day[0] + "&" + this.day[1]);
      console.log("/adminApi/v/equipmentView?EN_ID=" + this.equipments);
      //发送设备名称请求重载表格
      BookingService.addMprsb()
        .then(res => {
          console.log(res);
          console.log("重载成功")
          this.tableData = res.list;
        })
        .catch(res => {
          console.log("设备筛选后数据初始化失败：" + err);
        });
    },
    //点击查看
    //点击预约start
    handleEdit(index, row) {
      this.$refs.booking.dialogFormVisible = true;
      this.$refs.booking.form.id = this.tableData[index].ME_ID;
      this.$refs.booking.form.name = this.tableData[index].EN_NAME;
      this.$refs.booking.form.dname = this.tableData[index].ME_POSITION;
      console.log(index, row);
    },
    //点击预约end
    //点击确定start
    bookingsopen() {
      this.$message({
        message: "预约成功",
        type: "success"
      });
      this.$router.go(-1);
    },
    //点击确定end
    //点击取消start
    bookingsclose() {
      this.$message({
        message: "取消预约",
        type: "warning"
      });
      this.$router.go(-1);
    },
    //点击取消end
  }
};
</script>

<style scoped>
.bookings-lab {
  line-height: 40px;
}
</style>

