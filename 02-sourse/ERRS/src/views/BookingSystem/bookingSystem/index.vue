<template>
  <d2-container :filename="filename">
    <div class="block">
      <el-col :span="7">
      <span class="demonstration">请选择设备：</span>
      <el-select v-model="equipments" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
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
        :data="tableData.filter(data => !search || data.state.toLowerCase().includes(search.toLowerCase()))&&tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
      >
        <el-table-column label="设备编号" prop="ME_ID"></el-table-column>
        <el-table-column label="设备名称" prop="EN_NAME" ></el-table-column>
        <el-table-column label="设备地址" prop="ME_POSITION" width="350"></el-table-column>
        <el-table-column label="设备状态" prop="ME_STATE"></el-table-column>
        <el-table-column label="预约人数" prop="MA_SIZE"></el-table-column>
        <el-table-column align="right">
          <!-- 按钮start -->
          <template slot-scope="scope">
            <!-- <el-button slot="reference" @click="handleEdit(scope.$index, scope.row)">预约</el-button> -->
            <el-popover
              placement="top-start"
              :title="booktitle"
              width="400"
              trigger="hover"
              :content="'当前使用用户：'+hovr.bookpeople+'；当前使用项目：'+hovr.bookproject+'；当前使用者借用时间：'+hovr.bookontime">
              <el-button slot="reference" @click="handleEdit(scope.$index, scope.row)">预约</el-button>
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
      <booking ref="booking"/>
  </d2-container>
</template>

<script>
import booking from './../../common/booking'
import { adminAccountService } from "@/common/api";
export default {
  name: "bookingSystem",
  data() {
    return {
      booktitle:"当前使用者信息",//预约按钮hover弹出的标题
      hovr:{
        bookpeople:"车志伟",//预约按钮hover弹出的使用者
        bookproject:"智能预约系统",//预约按钮hover弹出的项目
        bookontime:"2019-5-7 12:20:22",//预约按钮hover弹出的使用者借用时间
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
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      equipments: "",//选择设备
    };
  },
  components: {
    booking
  },
  mounted(){
    //用户表格初始化
    adminAccountService
      .system()
      .then(res => {
        console.log(res);
        this.tableData = res.list;
        console.log(this.tableData);
      })
      .catch(err => {
        console.log("数据初始化失败：" + err);
      });
  },
  methods:{
    //获取数据start
    //获取数据end
    //点击查看start
    handle(){
      console.log(this.equipments+"&"+this.day[0]+"&"+this.day[1])
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
.bookings-lab {
  line-height: 40px;
}
</style>

