<template>
  <d2-container :filename="filename">
    <template slot="header">预约记录</template>
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
            <el-button size="mini" type="primary" slot="reference" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </el-popover>         
            <el-button size="mini" slot="reference" @click="handleDel(scope.$index, scope.row)">取消</el-button>
        </template>
      </el-table-column>
      <!-- 按钮end -->
    </el-table>
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
      hovr: {
        userid: "1001",
        name: "车志伟", //预约按钮hover弹出的使用者
        username: "研发组",
        project: "智能预约系统", //预约按钮hover弹出的项目
        ontime: "2019-5-7 03:20:22",
        endtime: "2019-5-7 12:20:22" //预约按钮hover弹出的使用者借用时间
      },
      filename: __filename,
      dialogFormVisible: false,
      currentPage: 1, //初始页
      pagesize: 5, //一页最多5条数据
      // tableData: [],
      //模拟数据start
      tableData: [],
      search: ""
    };
  },
  components: {
    bookinginfo
  },
  mounted() {
    userBookingService
      .sentsystem()
      .then(res => {
        console.log(res);
        this.tableData = res.list;
        console.log(this.tableData);
      })
      .catch(err => {
        console.log("数据初始化失败：" + err);
      });
  },
  methods: {
    //点击预约start
    handleEdit(index, row) {
      this.$refs.bookinginfo.dialogFormVisible = true;
      console.log(index, row);
    },
    handleDel(index, row) {
      this.$confirm("此操作将取消您预约, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //取消预约操作
        this.$message({
          type: "success",
          message: "取消预约成功!"
        });
      });
      console.log(index, row);
    },
    //点击预约end
  }
};
</script>
