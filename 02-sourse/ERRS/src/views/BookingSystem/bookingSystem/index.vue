<template>
  <d2-container :filename="filename">
    <div class="block">
      <el-col :span="6">
        <span class="demonstration">请选择设备：</span>
        <el-select size="mini" v-model="equipments" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.EN_ID"
            :label="item.EN_NAME"
            :value="item.EN_ID"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-col>
      <el-button size="mini" @click="handle()">查看</el-button>
      <el-button size="mini" @click="handlrepl()">重置</el-button>
    </div>
    <br>
    <el-table
      size="mini"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)&&tableData"
      border
      style="width: 100%"
    >
      <el-table-column align="center" label="设备编号" prop="ME_ID"></el-table-column>
      <el-table-column align="center" label="设备名称" prop="EN_NAME"></el-table-column>
      <el-table-column align="center" label="设备地址" prop="ME_POSITION" width="450"></el-table-column>
      <el-table-column align="center" label="设备状态" prop="ME_STATE">
        <template slot-scope="scope">
          <span v-if="scope.row.ME_STATE==0">正常</span>
          <span v-if="scope.row.ME_STATE==1">维修</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预约人数" prop="MA_SIZE">
        <template slot-scope="scope">
          <span v-if="scope.row.MA_SIZE==0">空闲</span>
          <el-link
            v-if="scope.row.MA_SIZE!=0"
            @click="handleEd(scope.$index, scope.row)"
          >{{scope.row.MA_SIZE}}</el-link>
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
          >预约</el-button>
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
    <!-- 父组件向子组件传值start -->
    <booking ref="booking"/>
    <bookingchat ref="bookingchat"/>
    <!-- 父组件向子组件传值end -->
  </d2-container>
</template>

<script>
import booking from "./../../common/booking";
import bookingchat from "./../../common/bookingchat";
import { userBookingService } from "@/common/api";
import request from "@/plugin/axios";

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
      pagesize: 10, //每页的数据
      tableData: [], //初始化表
      defaultData: [], //重置表
      filename: __filename,
      options: [], //设备列表
      equipments: "", //选择设备,
      baseUrl: "/adminApi/v/equipmentList?EN_ID=" //固定地址
    };
  },
  components: {
    booking,
    bookingchat
  },
  mounted() {
    //用户表格初始化
    userBookingService
      .system()
      .then(res => {
        this.tableData = res.list;
        this.defaultData = res.list;
      })
      .catch(err => {});
    //获取设备列表
    userBookingService
      .addMpr()
      .then(res => {
        this.options = res.Equipment;
      })
      .catch(err => {});
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
    //点击查看（搜索）
    handle() {
      let url = this.baseUrl + this.equipments;
      let params = new URLSearchParams();
      params.append("EN_ID", this.equipments);
      request({
        url: url,
        method: "post",
        params
      })
        .then(res => {
          this.tableData = res.list;
        })
        .catch(err => {});
    },
    handlrepl() {
      userBookingService
      .system()
      .then(res => {
        this.tableData = this.defaultData;
      })
      .catch(err => {});
    },
    //点击预约
    handleEdit(index, row) {
      this.$refs.booking.dialogFormVisible = true; //弹框状态
      this.$refs.booking.form.id = this.tableData[index].ME_ID; //往子组件传设备id
      this.$refs.booking.form.name = this.tableData[index].EN_NAME; //往子组件传设备name
      this.$refs.booking.form.dname = this.tableData[index].ME_POSITION; //往子组件传设备地址
    },
    //点击查看（表格内）
    handleEd(index, row) {
      this.$refs.bookingchat.FormVisible = true; //弹框状态
      this.$refs.bookingchat.dex = index; //往子组件传索引
      this.$refs.bookingchat.getInfo(); //调用子组件 methods 内 getInfo 方法
    }
  }
};
</script>

<style scoped>
.bookings-lab {
  line-height: 40px;
}
.demonstration {
  font-size: 15px;
}
</style>

