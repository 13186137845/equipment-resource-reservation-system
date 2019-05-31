<template>
  <d2-container>
    <!-- 条件查询 -->
    <el-form
      :inline="true"
      :lable-position="lableposition"
      label-width="90px"
      size="mini"
    >
      <el-form-item>
        <el-form-item label="设备编号：" :span="2">
          <el-input autocomplete="off" v-model="form.ME_ID"></el-input>
        </el-form-item>

        <el-form-item label="设备名称：" :span="2">
          <el-select
            v-model="form.EN_NAME"
            clearable
            filterable
            placeholder="请选择设备名称"
          >
            <el-option
              v-for="item in departmentList"
              :key="item.ME_ID"
              :label="item.EN_NAME"
              :value="item.EN_ID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备地址：" :span="2">
          <el-input v-model="form.ME_POSITION" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备状态：" :span="2">
          <el-select
            v-model="form.ME_STATE"
            clearable
            filterable
            placeholder="请选择设备状态"
          >
            <el-option
              v-for="item in state"
              :key="item.value"
              :label="item.states"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="info" @click="handle()">查询</el-button>
      </el-form-item>
    </el-form>
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
          <el-button size="mini" type="warning" v-if="scope.row.COMPLETE_FLAG == 0">正在审核</el-button>
          <el-button size="mini" type="success" v-if="scope.row.COMPLETE_FLAG == 1">预约成功</el-button>
          <el-button size="mini" type="primary" v-if="scope.row.COMPLETE_FLAG == 2">归还成功</el-button>
          <el-button size="mini" type="primary" v-if="scope.row.COMPLETE_FLAG == 3">取消预约</el-button>
          <el-button size="mini" type="danger" v-if="scope.row.COMPLETE_FLAG == 4">审核失败</el-button>
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
    <bookingRecord ref="bookingRecord"/>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </d2-container>
</template>

<script>
import bookingRecord from "./../../common/bookingRecord";
import { userBookingService } from "@/common/api";
import { EquipmentService } from "@/common/api";
export default {
  name: "page3",
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
      },//设备列表
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
      currentPage: 1, //初始页
      pagesize: 5, //一页最多5条数据
      tableData: []//存放初始化数据
    };
  },
  mounted() {
    //页面数据初始化
    userBookingService
      .sendsystem()
      .then(res => {
        // console.log(res);
        this.tableData = res.list;
        // console.log(this.tableData);
      })
      .catch(err => {
        // console.log("数据初始化失败：" + err);
      });
    //查询条件--设备列表
    EquipmentService.getEquipment()
      .then(res => {
        this.departmentList = res.Equipment;
        this.role = res.Role;
      })
      .catch(err => {
        // console.log("数据初始化失败：" + err);
      });
  },
  components: {
    bookingRecord
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
    //点击查看
    handleEdit(index, row) {
      index = (this.currentPage-1)*this.pagesize+index
      // console.log(index, row);
      this.$refs.bookingRecord.dialogFormVisible = true;//弹框状态
      this.$refs.bookingRecord.form.id = this.tableData[index].ME_ID;//设备id
      this.$refs.bookingRecord.form.name = this.tableData[index].EN_NAME;//设备名字
      this.$refs.bookingRecord.form.dname = this.tableData[index].ME_POSITION;//设备地址
      this.$refs.bookingRecord.form.gname = this.tableData[index].MU_NO;//预约工号
      this.$refs.bookingRecord.form.onday = this.tableData[index].MA_START_DATE;//借用时间
      this.$refs.bookingRecord.form.endday = this.tableData[index].MA_END_DATE;//归还时间
    },
     //查询--重载表格
    handle() {
      let params = new URLSearchParams();
      params.append("ME_ID", this.form.ME_ID);
      params.append("EN_ID", this.form.EN_NAME);
      params.append("ME_POSITION", this.form.ME_POSITION);
      params.append("ME_STATE", this.form.ME_STATE);
      userBookingService.sentsystem(params)
        .then(res => {
          // console.log(res);
          this.tableData = res.list;
        })
        .catch(err => {
          // console.log("获取用户信息失败：" + err);
        });
    }
  }
};
</script>
