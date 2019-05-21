<template>
  <d2-container :filename="filename">
    <template slot="header">预约历史</template>
    <!-- 绑定数据表格 -->
    <el-table
      size="mini"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column label="设备编号" prop="ME_ID"></el-table-column>
      <el-table-column label="设备名称" prop="EN_NAME"></el-table-column>
      <el-table-column label="设备地址" prop="ME_POSITION" width="350"></el-table-column>
      <el-table-column label="设备状态" prop="ME_STATE"></el-table-column>
      <el-table-column label="预约人数" prop="MA_SIZE"></el-table-column>
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
            <el-button size="mini" type="primary"  slot="reference" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 按钮end -->
    </el-table>
    <bookingRecord ref="bookingRecord"/>
  </d2-container>
</template>

<script>
import bookingRecord from "./../../common/bookingRecord";
import { userBookingService } from "@/common/api";
export default {
  name: "page3",
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
      filename: __filename,
      currentPage: 1, //初始页
      pagesize: 5, //一页最多5条数据
      //数据start
      tableData: [],
      search: ""
      //模拟数据end
    };
  },
  mounted() {
    userBookingService
      .sendsystem()
      .then(res => {
        console.log(res);
        this.tableData = res.list;
        console.log(this.tableData);
      })
      .catch(err => {
        console.log("数据初始化失败：" + err);
      });
  },
  components: {
    bookingRecord
  },
  methods: {
    //点击查看start
    handleEdit(index, row) {
      console.log(index, row);
      this.$refs.bookingRecord.dialogFormVisible = true;
      this.$refs.bookingRecord.form.id = this.tableData[index].ME_ID;
      this.$refs.bookingRecord.form.name = this.tableData[index].EN_NAME;
      this.$refs.bookingRecord.form.dname = this.tableData[index].ME_POSITION;
      this.$refs.bookingRecord.form.gname = this.tableData[index].MU_NO;
      // this.$refs.bookingRecord.form.bname = this.tableData[index].ME_POSITION;
      // this.$refs.bookingRecord.form.day[0] = this.tableData[index].MA_START_DATE;
      // this.$refs.bookingRecord.form.day[1] = this.tableData[index].MA_END_DATE;
      
    },
    //点击查看end
  }
};
</script>
