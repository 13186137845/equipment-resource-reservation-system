<template>
  <d2-container :filename="filename">
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
        <el-form-item label="预约人：" :span="2">
          <el-input autocomplete="off" v-model="form.MI_NAME"></el-input>
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
      <el-table-column align="center" label="设备地址" prop="ME_POSITION"></el-table-column>
      <el-table-column align="center" label="设备状态" prop="ME_STATE">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-if="scope.row.ME_STATE==0">正常</el-button>
          <el-button size="mini" type="warning" v-if="scope.row.ME_STATE==1">维修</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预约人" prop="MI_NAME"></el-table-column>
      <el-table-column align="center" label="预约描述" prop="MA_STATE">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-if="scope.row.MA_STATE==0">正常</el-button>
          <el-button size="mini" type="warning" v-if="scope.row.MA_STATE==1">紧急预约</el-button>
        </template>
      </el-table-column>      
      <el-table-column align="center" label="拟预约时间" prop="MA_START_DATE"></el-table-column>
      <el-table-column align="center" label="拟归还时间" prop="MA_END_DATE"></el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="success" slot="reference" @click="handleAdobt(scope.$index, scope.row)">通过审核</el-button>
          <el-button size="mini" type="warning" slot="reference" @click="handleRefuse(scope.$index, scope.row)">打回</el-button>
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
        MI_NAME:""
      },
      departmentList:[],
      userList: [],
      filename: __filename,
      dialogFormVisible: false,
      currentPage: 1, //初始页
      pagesize: 5, //一页最多5条数据
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
      .examine()
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
    handleAdobt(index, row) {
      //弹出提示框
      this.$confirm("此操作将通过该用户的预约, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      }).then(() => {
        //取消审核操作
        let params = new URLSearchParams();
        params.append("COMPLETE_FLAG", 1);
        params.append("MA_ID", this.tableData[index].MA_ID);
        params.append("ME_ID", this.tableData[index].ME_ID);
        userBookingService
          .delsystem(params)
          .then(res => {
            this.$message.erro("系统故障，审核失败");
            this.tableData = res.list;
          })
          .catch(err => {
            this.$message({
              message: "审核成功！",
              type: "success"
            });
            this.tableData.splice(index, 1);
          });
      });
    },
    //点击打回按钮
    handleRefuse (index,row){
      //弹框提示
      this.$confirm("此操作将打回用户的审核, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(()=>{
        //点击确定按钮
        let params = new URLSearchParams();
        params.append("COMPLETE_FLAG", 4);
        params.append("MA_ID", this.tableData[index].MA_ID);
        params.append("ME_ID", this.tableData[index].ME_ID);
        userBookingService
          .delsystem(params)
          .then(res => {
            this.$message.erro("系统故障,打回失败");
            this.tableData = res.list;
          }).catch(err=>{
            this.$message.success("打回操作成功,请刷新页面");
            this.tableData.splice(index, 1);
          })
      })
    },
      //查询--重载表格
    handle() {
      let params = new URLSearchParams();
      params.append("ME_ID", this.form.ME_ID);
      params.append("EN_ID", this.form.EN_NAME);
      params.append("ME_POSITION", this.form.ME_POSITION);
      params.append("MI_NAME", this.form.MI_NAME);
      userBookingService
        .examine(params)
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
