<template>
  <d2-container :filename="filename">
    <template slot="header">预约历史</template>
    <!-- 绑定数据表格 -->
    <el-table
      size="mini"
      :data="tableData&&tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" label="设备编号" prop="ME_ID"></el-table-column>
      <el-table-column align="center" label="设备名称" prop="EN_NAME"></el-table-column>
      <el-table-column align="center" label="设备地址" prop="ME_POSITION" width="350"></el-table-column>
      <el-table-column align="center" label="设备状态" prop="ME_STATE">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-if="scope.row.ME_STATE==0">正常</el-button>
          <el-button size="mini" type="warning" v-if="scope.row.ME_STATE==1">维修</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预约状态" prop="COMPLETE_FLAG">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" v-if="scope.row.COMPLETE_FLAG==0">正在审核</el-button>
          <el-button size="mini" type="success" v-if="scope.row.COMPLETE_FLAG==1">预约成功</el-button>
          <el-button size="mini" type="primary" v-if="scope.row.COMPLETE_FLAG==2">归还成功</el-button>
          <el-button size="mini" type="danger" v-if="scope.row.COMPLETE_FLAG==4">取消预约</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <!-- 按钮start -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            slot="reference"
            @click="handleEdit(scope.$index, scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
      <!-- 按钮end -->
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >//这是显示总共有多少数据，</el-pagination>
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
      filename: __filename,
      currentPage: 1, //初始页
      pagesize: 10, //一页最多5条数据
      tableData: []//存放初始化数据
    };
  },
  mounted() {
    //页面数据初始化
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
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      //点击第几页
    },
    //点击查看
    handleEdit(index, row) {
      console.log(index, row);
      this.$refs.bookingRecord.dialogFormVisible = true;//弹框状态
      this.$refs.bookingRecord.form.id = this.tableData[index].ME_ID;//设备id
      this.$refs.bookingRecord.form.name = this.tableData[index].EN_NAME;//设备名字
      this.$refs.bookingRecord.form.dname = this.tableData[index].ME_POSITION;//设备地址
      this.$refs.bookingRecord.form.gname = this.tableData[index].MU_NO;//预约工号
      this.$refs.bookingRecord.form.onday = this.tableData[index].MA_START_DATE;//借用时间
      this.$refs.bookingRecord.form.endday = this.tableData[index].MA_END_DATE;//归还时间
    }
  }
};
</script>
