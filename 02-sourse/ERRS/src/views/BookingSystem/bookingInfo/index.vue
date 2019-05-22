<template>
  <d2-container :filename="filename">
    <template slot="header">预约记录</template>
    <!-- 绑定数据表格 -->
    <el-table
      size="mini"
      :data="tableData&&tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" label="设备编号" prop="ME_ID"></el-table-column>
      <el-table-column align="center" label="设备名称" prop="EN_NAME"></el-table-column>
      <el-table-column align="center" label="设备地址" prop="ME_POSITION"></el-table-column>
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
      <el-table-column align="center" label="拟预约时间" prop="MA_START_DATE"></el-table-column>
      <el-table-column align="center" label="拟归还时间" prop="MA_END_DATE"></el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" slot="reference" @click="handledelite(scope.$index, scope.row)">取消</el-button>
          <el-button size="mini" slot="reference" @click="handleback(scope.$index, scope.row)">归还</el-button>
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
    ></el-pagination>
    <bookinginfo ref="bookinginfo"/>
  </d2-container>
</template>

<script>
import bookinginfo from "./../../common/bookinginfo";
import { userBookingService } from "@/common/api";
export default {
  name: "page2",
  data() {
    return {
      userList: [],
      filename: __filename,
      dialogFormVisible: false,
      currentPage: 1, //初始页
      pagesize: 10, //一页最多5条数据
      tableData: [], //存放模拟数据
      search: "",
      COMPLETE: [], //存放设备状态
      baseUrl: "u/setComplete?COMPLETE_FLAG=" //存放后端地址
    };
  },
  components: {
    bookinginfo
  },
  mounted() {
    //页面初始化数据
    userBookingService
      .sentsystem()
      .then(res => {
        this.tableData = res.list;
      })
      .catch(err => {});
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      //点击第几页
    },

    //点击取消按钮
    handledelite(index, row) {
      //弹出提示框
      this.$confirm("此操作将取消您预约, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //取消预约操作
        let params = new URLSearchParams();
        params.append("COMPLETE_FLAG", 3);
        params.append("MA_ID", this.tableData[index].MA_ID);
        params.append("ME_ID", this.tableData[index].ME_ID);
        userBookingService
          .delsystem(params)
          .then(res => {
            this.$message.error("取消预约失败");
            this.tableData = res.list;
          })
          .catch(err => {
            this.$message({
              message: "取消预约成功，请刷新页面",
              type: "success"
            });
          });
      });
    },

    //点击归还按钮
    handleback(index, row) {
      if (this.tableData[index].COMPLETE_FLAG == 1) {
        //状态是成功时，操作点击归还按钮
        this.$confirm("此操作将归还您所借用的设备, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          //点击确定按钮start
          let params = new URLSearchParams();
          params.append("COMPLETE_FLAG", 2);
          params.append("MA_ID", this.tableData[index].MA_ID);
          params.append("ME_ID", this.tableData[index].ME_ID);
          userBookingService
            .delsystem(params)
            .then(res => {
              console.log("ss :", res);
              this.tableData = res.list;
              this.$message.error("取消预约失败");
            })
            .catch(err => {
              this.$message({
                message: "取消预约成功，请刷新页面",
                type: "success"
              });
            });
        });
      } else {
        this.$message({
          message: "您当前未预约成功,不能归还！",
          type: "success"
        });
      }
    },
    //点击查看
    handleEdit(index, row) {
      this.$refs.bookinginfo.dialogFormVisible = true;
      this.$refs.bookinginfo.form.id = this.tableData[index].ME_ID; //设备id
      this.$refs.bookinginfo.form.name = this.tableData[index].EN_NAME; //设备名字
      this.$refs.bookinginfo.form.dname = this.tableData[index].ME_POSITION; //设备地址
      this.$refs.bookinginfo.form.gname = this.tableData[index].MU_NO; //预约工号
      this.$refs.bookinginfo.form.onday = this.tableData[index].MA_START_DATE; //预约时间
      this.$refs.bookinginfo.form.endday = this.tableData[index].MA_END_DATE; //归还时间
    }
  }
};
</script>
