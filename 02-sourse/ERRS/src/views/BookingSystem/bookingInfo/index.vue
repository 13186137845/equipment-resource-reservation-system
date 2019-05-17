<template>
  <d2-container :filename="filename">
    <template slot="header">预约记录</template>
    <!-- 绑定数据表格 -->
    <el-table
      :data="tableData.filter(data => !search || data.state.toLowerCase().includes(search.toLowerCase()))&&tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
    >
      <el-table-column label="设备编号" prop="date"></el-table-column>
      <el-table-column label="设备名称" prop="name"></el-table-column>
      <el-table-column label="设备地址" prop="address" width="350"></el-table-column>
      <el-table-column label="设备状态" prop="state"></el-table-column>
      <el-table-column label="预约人数" prop="names"></el-table-column>
      <el-table-column align="right">
        <!-- 按钮start -->
        <template slot-scope="scope">
          <el-popover
              placement="top-start"
              :title="booktitle"
              width="400"
              trigger="hover"
              :content="'当前使用用户：'+hovr.bookpeople+'；当前使用项目：'+hovr.bookproject+'；当前使用者借用时间：'+hovr.bookontime">
              <el-button slot="reference" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </el-popover>
          <el-col :span="1">
          <el-button  @click="handleDel(scope.$index, scope.row)">取消</el-button>
          </el-col>
        </template>
      </el-table-column>
      <!-- 按钮end -->
    </el-table>
    <!-- 这是显示总共有多少数据start -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>
    <!-- 这是显示总共有多少数据end -->
    <bookinginfo ref="bookinginfo"/>
  </d2-container>
</template>

<script>
import bookinginfo from './../../common/bookinginfo'
export default {
  name: "page2",
  data() {
    return {
      hovr:{
        bookpeople:"车志伟",//预约按钮hover弹出的使用者
        bookproject:"智能预约系统",//预约按钮hover弹出的项目
        bookontime:"2019-5-7 12:20:22",//预约按钮hover弹出的使用者借用时间
      },
      filename: __filename,
      dialogFormVisible: false,
      currentPage: 1, //初始页
      pagesize: 5, //一页最多5条数据
      // tableData: [],
      //模拟数据start
      tableData: [
        {
          date: "20160502",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          state: "繁忙",
          names:"2"
        },
        {
          date: "20160504",
          name: "学校",
          address: "上海市普陀区金沙江路 1517 弄",
          state: "空闲",
          names:"2"
        },
        {
          date: "20160501",
          name: "所属",
          address: "上海市普陀区金沙江路 1519 弄",
          state: "空闲",
          names:"2"
        },
        {
          date: "20160503",
          name: "问问",
          address: "上海市普陀区金沙江路 1516 弄",
          state: "维修中",
          names:"2"
        },
        {
          date: "20160503",
          name: "问问",
          address: "上海市普陀区金沙江路 1516 弄",
          state: "维修中",
          names:"2"
        },
        {
          date: "20160503",
          name: "问问",
          address: "上海市普陀区金沙江路 1516 弄",
          state: "维修中",
          names:"2"
        },
        {
          date: "20160503",
          name: "问问",
          address: "上海市普陀区金沙江路 1516 弄",
          state: "维修中",
          names:"2"
        },
        {
          date: "20160503",
          name: "问问",
          address: "上海市普陀区金沙江路 1516 弄",
          state: "维修中",
          names:"2"
        },
        {
          date: "20160503",
          name: "问问",
          address: "上海市普陀区金沙江路 1516 弄",
          state: "维修中",
          names:"2"
        }
      ],
      search: ""
    };
  },
  components: {
    bookinginfo
  },
  methods: {
    //点击预约start
    handleEdit(index, row) {
      this.$refs.bookinginfo.dialogFormVisible = true;
      console.log(index, row);
    },
    handleDel(index, row) {
      this.$confirm('此操作将取消您预约, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '取消预约成功!'
          });
        }); 
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
    //
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    }
  }
};
</script>
