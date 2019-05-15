<template>
  <div>
    <div>
      <!-- 绑定数据表格 -->
      <el-table
        :data="tableData.filter(data => !search || data.state.toLowerCase().includes(search.toLowerCase()))&&tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
      >
        <el-table-column label="设备编号" prop="date"></el-table-column>
        <el-table-column label="设备名称" prop="name"></el-table-column>
        <el-table-column label="设备地址" prop="address"></el-table-column>
        <el-table-column label="设备状态" prop="state"></el-table-column>
        <el-table-column align="right">
          <!-- 搜索框start -->
          <template slot="header" slot-scope>
            <el-input v-model="search" size="mini" placeholder="输入设备状态搜索"/>
          </template>
          <!-- 搜索框end -->
          <!-- 按钮start -->
          <template slot-scope="scope">
            <el-button @click="show3 = !show3; handleEdit(scope.$index, scope.row)">预约</el-button>
            <el-button type="danger" @click="handleDelete(scope.$index, scope.row); show3 = !show3">紧急预约</el-button>
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
    </div>
    <!-- 预约信息填写表start -->
    <transition enter-active-class="animated fadeInDownBig " leave-active-class="animated fadeInUp">
      <div class="bookings-bd" v-show="!show3">
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">预约设备编号：</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="input" clearable placeholder></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">预约设备名称：</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="input" clearable placeholder></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">请输入你的工号：</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="input" clearable placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">请输入你的部门：</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="input" clearable placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">请输入你的项目：</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="input" clearable placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">请选择借用日期：</label>
          </el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">请输入使用描述：</label>
          </el-col>
          <el-col :span="15">
            <el-input type="textarea" placeholder="请输入内容" v-model="textarea2"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-button type="primary" plain @click="bookingsopen">确认</el-button>
          <el-button type="primary" plain @click="bookingsclose">取消</el-button>
        </el-row>
      </div>
    </transition>
    <!-- 预约信息填写表end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 5, //一页最多5条数据
      // tableData: [],
      show3: true,
      input: "", //注册
      value1: "", //注册
      textarea2: "", //注册
      //模拟数据start
      tableData: [
        {
          date: "20160502",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          state: "繁忙"
        },
        {
          date: "20160504",
          name: "学校",
          address: "上海市普陀区金沙江路 1517 弄",
          state: "空闲"
        },
        {
          date: "20160501",
          name: "所属",
          address: "上海市普陀区金沙江路 1519 弄",
          state: "空闲"
        },
        {
          date: "20160503",
          name: "问问",
          address: "上海市普陀区金沙江路 1516 弄",
          state: "维修中"
        },
        {
          date: "20160503",
          name: "问问",
          address: "上海市普陀区金沙江路 1516 弄",
          state: "维修中"
        },
        {
          date: "20160503",
          name: "问问",
          address: "上海市普陀区金沙江路 1516 弄",
          state: "维修中"
        },
        {
          date: "20160503",
          name: "问问",
          address: "上海市普陀区金沙江路 1516 弄",
          state: "维修中"
        },
        {
          date: "20160503",
          name: "问问",
          address: "上海市普陀区金沙江路 1516 弄",
          state: "维修中"
        },
        {
          date: "20160503",
          name: "问问",
          address: "上海市普陀区金沙江路 1516 弄",
          state: "维修中"
        },
        {
          date: "20160503",
          name: "问问",
          address: "上海市普陀区金沙江路 1516 弄",
          state: "维修中"
        }
      ],
      search: ""
      //模拟数据end
    };
  },
  methods: {
    //点击预约start
    handleEdit(index, row) {
      console.log(index, row);
    },
    //点击预约end
    //点击紧急预约start
    handleDelete(index, row) {
      console.log(index, row);
    },
    //点击紧急预约end
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

<style scoped>
.bookings-bd {
  height: 100%;
  width: auto;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgb(255, 255, 255);
}

.bookings-dhk {
  padding: 15px;
  padding-left: 50px;
}
.bookings-lab {
  line-height: 40px;
}
</style>
