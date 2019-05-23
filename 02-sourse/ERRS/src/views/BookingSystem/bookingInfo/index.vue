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
      :data="
        tableData &&
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      border
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="设备编号"
        prop="ME_ID"
      ></el-table-column>
      <el-table-column
        align="center"
        label="设备名称"
        prop="EN_NAME"
      ></el-table-column>
      <el-table-column
        align="center"
        label="设备地址"
        prop="ME_POSITION"
      ></el-table-column>
      <el-table-column align="center" label="设备状态" prop="ME_STATE">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-if="scope.row.ME_STATE == 0"
            >正常</el-button
          >
          <el-button size="mini" type="warning" v-if="scope.row.ME_STATE == 1"
            >维修</el-button
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="预约状态" prop="COMPLETE_FLAG">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            v-if="scope.row.COMPLETE_FLAG == 0"
            >正在审核</el-button
          >
          <el-button
            size="mini"
            type="success"
            v-if="scope.row.COMPLETE_FLAG == 1"
            >预约成功</el-button
          >
          <el-button
            size="mini"
            type="primary"
            v-if="scope.row.COMPLETE_FLAG == 2"
            >归还成功</el-button
          >
          <el-button
            size="mini"
            type="danger"
            v-if="scope.row.COMPLETE_FLAG == 4"
            >取消预约</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="拟预约时间"
        prop="MA_START_DATE"
      ></el-table-column>
      <el-table-column
        align="center"
        label="拟归还时间"
        prop="MA_END_DATE"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            slot="reference"
            @click="handleEdit(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            slot="reference"
            @click="handledelite(scope.$index, scope.row)"
            >取消</el-button
          >
          <el-button
            size="mini"
            slot="reference"
            @click="handleback(scope.$index, scope.row)"
            >归还</el-button
          >
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
    <bookinginfo ref="bookinginfo" />
  </d2-container>
</template>

<script>
import bookinginfo from "./../../common/bookinginfo";
import { userBookingService } from "@/common/api";
import { EquipmentService } from "@/common/api";
export default {
  name: "page2",
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
      userList: [],
      dialogFormVisible: false,
      currentPage: 1, //初始页
      pagesize: 5, //一页最多5条数据
      tableData: [], //存放模拟数据
      search: "",
      COMPLETE: [], //存放设备状态
      baseUrl: "u/setComplete?COMPLETE_FLAG=", //存放后端地址
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
      ]
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
    //查询条件--设备列表
    EquipmentService.getEquipment()
      .then(res => {
        this.departmentList = res.Equipment;
        this.role = res.Role;
      })
      .catch(err => {
        console.log("数据初始化失败：" + err);
      });
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      //点击第几页
      this.currentPage = currentPage;
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
              message: "取消预约成功",
              type: "success"
            });
            this.tableData.splice(index, 1);
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
              this.tableData = res.list;
              this.$message.error("取消预约失败");
            })
            .catch(err => {
              this.$message({
                message: "归还成功！",
                type: "success"
              });
              this.tableData.splice(index, 1);
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
    },
    //查询--重载表格
    handle() {
      let params = new URLSearchParams();
      params.append("ME_ID", this.form.ME_ID);
      params.append("EN_ID", this.form.EN_NAME);
      params.append("ME_POSITION", this.form.ME_POSITION);
      params.append("ME_STATE", this.form.ME_STATE);
      userBookingService
        .sentsystem(params)
        .then(res => {
          console.log(res);
          this.tableData = res.list;
        })
        .catch(err => {
          console.log("获取数据失败：" + err);
        });
    }
  }
};
</script>
