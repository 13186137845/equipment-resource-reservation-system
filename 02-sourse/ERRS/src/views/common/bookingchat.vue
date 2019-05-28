<template>
  <div>
    <el-dialog title="预约记录" :visible.sync="FormVisible">
      <el-table
        :data="gridData&&gridData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        size="mini"
        border
        style="width: 100%"
      >
        <el-table-column property="ME_ID" label="预约设备编号"></el-table-column>
        <el-table-column property="EN_NAME" label="预约设备名称"></el-table-column>
        <el-table-column property="MI_NAME" label="预约人员"></el-table-column>
        <el-table-column property="MA_START_DATE" label="拟预约日期"></el-table-column>
        <el-table-column property="MA_END_DATE" label="拟归还日期"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="gridData.length"
      ></el-pagination>
    </el-dialog>
  </div>
</template>
<script>
import { userBookingService } from "@/common/api";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      dialogTableVisible: false,
      FormVisible: false,
      gridData: [], //单个设备预约记录（总）
      dex: "", //接收父组件传过来的索引
      currentPage: 1, //初始页
      pagesize: 10, //每页的数据
      ME_ID: "" //接收父组件传来的设备编号
    };
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      //点击第几页
    },
    //获取预约记录（）单个设备
    getInfo() {
      //张天
      //初始化预约记录（单个设备）
      userBookingService
        .system()
        .then(res => {
          this.gridData = res.list[this.dex].Appointment;
        })
        .catch(err => {});
    },
    getInfoData() {
      //车志伟
      let params = new URLSearchParams();
      params.append("ME_ID", this.ME_ID);
      userBookingService.getSingleEqu(params).then(res => {
        this.gridData = res;
      });
    }
  }
};
</script>

