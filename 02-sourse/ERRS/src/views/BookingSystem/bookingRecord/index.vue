<template>
  <d2-container :filename="filename">
    <template slot="header">预约历史</template>
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
    <bookingRecord ref="bookingRecord"/>
  </d2-container>
</template>

<script>
import bookingRecord from './../../common/bookingRecord'
export default {
  name: "page3",
  data() {
    return {
      hovr:{
        bookpeople:"车志伟",//预约按钮hover弹出的使用者
        bookproject:"智能预约系统",//预约按钮hover弹出的项目
        bookontime:"2019-5-7 12:20:22",//预约按钮hover弹出的使用者借用时间
      },
      filename: __filename,
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
      //模拟数据end
    };
  },
  components: {
    bookingRecord
  },
  methods: {
    //点击查看start
    handleEdit(index, row) {
      console.log(index, row);
      this.$refs.bookingRecord.dialogFormVisible = true;
    },
    //点击查看end
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
