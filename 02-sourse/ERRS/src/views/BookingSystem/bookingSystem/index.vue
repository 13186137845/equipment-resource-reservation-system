<template>
  <d2-container :filename="filename">
    <!-- 条件查询 -->
    <el-form :inline="true" :lable-position="lableposition" label-width="90px" size="mini">
      <el-form-item>
        <el-form-item label="设备编号：" :span="2">
          <el-input autocomplete="off" v-model="form.ME_ID"></el-input>
        </el-form-item>

        <el-form-item label="设备名称：" :span="2">
          <el-select v-model="form.EN_NAME" clearable filterable placeholder="请选择设备名称">
            <el-option v-for="item in departmentList" :key="item.ME_ID" :label="item.EN_NAME" :value="item.EN_ID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备地址：" :span="2">
          <el-input v-model="form.ME_POSITION" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备状态：" :span="2">
          <el-select v-model="form.ME_STATE" clearable filterable placeholder="请选择设备状态">
            <el-option v-for="item in state" :key="item.value" :label="item.states" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="info" @click="handle()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table size="mini" :data="tableData&&tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 542px" @row-click="handleBooking" :row-class-name="tableRowClassName">
      <el-table-column align="center" label="设备编号" prop="ME_ID" width="100"></el-table-column>
      <el-table-column align="center" label="设备名称" prop="EN_NAME" width="100"></el-table-column>
      <el-table-column prop="imgPath" label="设备图片" width="100" header-align="center" align="center">
        <!--插入图片链接的代码-->
        <template slot-scope="scope">
          <el-popover placement="right" title="" trigger="hover">
            <img :src="imgPath+scope.row.ME_IMG_NAME" style="width: 280px;height: 140px" />
            <img slot="reference" :src="imgPath+scope.row.ME_IMG_NAME" :alt="暂无图片" style="max-height: 50px;max-width: 130px">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备地址" prop="ME_POSITION" width="100"></el-table-column>
      <el-table-column align="center" label="设备状态" prop="ME_STATE" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-if="scope.row.ME_STATE==0">正常</el-button>
          <el-button size="mini" type="warning" v-if="scope.row.ME_STATE==1">维修</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预约人数" prop="MA_SIZE" width="60">
        <template slot-scope="scope">
          <span v-if="scope.row.MA_SIZE==0">空闲</span>
          <el-link v-if="scope.row.MA_SIZE!=0" @click="handleEd(scope.$index, scope.row)">{{scope.row.MA_SIZE}}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="80">
        <!-- 按钮start -->
        <template slot-scope="scope">
          <el-button size="mini" type="primary" slot="reference" @click="handleEdit(scope.$index, scope.row)">预约</el-button>
        </template>
      </el-table-column>
      <!-- 按钮end -->
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length"></el-pagination>
    <!-- 父组件向子组件传值start -->
    <booking ref="booking" />
    <bookingchat ref="bookingchat" />
    <!-- 父组件向子组件传值end -->
    <!-- 日期选择预约模块 -->
    <div>
      <booking-canle ref="bookingcanle" style="margin-left:600px; margin-top:80px;width:690px;height:600px;" />
    </div>
  </d2-container>
</template>

<script>
import booking from "./../../common/booking";
import bookingchat from "./../../common/bookingchat";
import { userBookingService } from "@/common/api";
import request from "@/plugin/axios";
import { EquipmentService } from "@/common/api";
import bookingCanle from "@/views/common/booking-charts";
export default {
  name: "bookingSystem",
  data() {
    return {
      //样式规范
      lableposition: "left",
      //查询条件
      form: {
        ME_ID: "",
        EN_NAME: "",
        EN_ID: "",
        ME_POSITION: "",
        ME_STATE: "",
        BUY_DATE: "",
        BUY_NAME: "",
        value7: ""
      },
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
      baseUrl: "/adminApi/v/equipmentList?EN_ID=", //固定地址
      //设备列表
      departmentList: [],
      //设备状态
      state: [
        {
          value: 0,
          states: "正常"
        },
        {
          value: 1,
          states: "维修中"
        }
      ],
      imgPath: process.env.VUE_APP_EQUURL
    };
  },
  components: {
    booking,
    bookingchat,
    bookingCanle
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
    //查询条件--设备列表
    EquipmentService.getEquipment()
      .then(res => {
        this.departmentList = res.Equipment;
        this.role = res.Role;
      })
      .catch(err => {
        this.$message.error("数据初始化失败");
      });
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
    // handle() {
    //   let url = this.baseUrl + this.equipments;
    //   let params = new URLSearchParams();
    //   params.append("EN_ID", this.equipments);
    //   request({
    //     url: url,
    //     method: "post",
    //     params
    //   })
    //     .then(res => {
    //       this.tableData = res.list;
    //     })
    //     .catch(err => {});
    // },
    handle() {
      let params = new URLSearchParams();
      params.append("ME_ID", this.form.ME_ID);
      params.append("EN_ID", this.form.EN_NAME);
      params.append("ME_POSITION", this.form.ME_POSITION);
      params.append("ME_STATE", this.form.ME_STATE);
      userBookingService
        .sentsystem(params)
        .then(res => {
          this.tableData = res.list;
        })
        .catch(err => {
          tihs.$message.error("数据初始化失败！");
        });
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
      // this.$refs.booking.form.delivery = this.tableData[index].MA_ID;
    },
    //点击查看（表格内）
    handleEd(index, row) {
      this.$refs.bookingchat.FormVisible = true; //弹框状态
      this.$refs.bookingchat.dex = index; //往子组件传索引
      this.$refs.bookingchat.getInfo(); //调用子组件 methods 内 getInfo 方法
    },
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    //点击设备查看详细预约信息
    handleBooking(row, event, column) {
      //row表格字段数据
      //event鼠标事件
      //column表格基础信息
      let index = row.index; //取索引
      let params = new URLSearchParams();
      params.append("ME_ID", row.ME_ID);
      userBookingService
        .getSingleEqu(params)
        .then(res => {
          //do something
          let data = [{ title: "", start: "", end: "" }];
          data[0].title = "已被预约";
          data[0].start = res[0].MA_START_DATE.split(" ")[0];
          data[0].end = res[0].MA_END_DATE.split(" ")[0];
          // this.$refs.bookingcanle.monthData.push(data[0])
          this.$refs.bookingcanle.monthData = data;
          this.$refs.bookingcanle.index = row.index; //索引
          this.$refs.bookingcanle.ME_ID = row.ME_ID;
        })
        .catch(err => {
          this.$message.success("该设备暂无人预约");
          let data = [{ title: "", start: "", end: "" }];
          this.$refs.bookingcanle.monthData = data;
        });
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

