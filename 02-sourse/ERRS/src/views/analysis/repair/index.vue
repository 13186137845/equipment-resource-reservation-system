<template>
  <d2-container>
    <!-- 条件查询搜索 -->
    <el-form :inline="true" :lable-position="lableposition" label-width="90px" size="mini" :model="dataForm">
      <el-form-item>
        <el-form-item label="设备编号：" :span="2">
          <el-input autocomplete="off" v-model="form.ME_ID"></el-input>
        </el-form-item>
        <el-form-item label="设备名称：" :span="2">
          <el-select v-model="form.EN_NAME" clearable filterable placeholder="请选择设备名称">
            <el-option v-for="item in departmentList" :key="item.ME_ID" :label="item.EN_NAME" :value="item.EN_ID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维修时间：" :span="2">
          <el-date-picker v-model="form.CuringDate" value-format="yyyy-MM-dd hh:mm:ss" type="daterange" align="right" unlink-panels range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
        </el-form-item>
        <el-form-item label="故障程度：" :span="2">
          <el-input v-model="form.CURINGTYPE " autocomplete="off"></el-input>
        </el-form-item>
        <el-button type="primary" @click="handle()">查询</el-button>
        <el-button type="success" @click="analysis()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="努力分析中...">智能分析</el-button>
      </el-form-item>
    </el-form>
    <!-- 养护表格 -->
    <el-table size="mini" :data="dataList&&dataList.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;margin-top:-2%">
      <el-table-column type="selection" header-align="center" align="center" width="50" />
      <el-table-column prop="ME_ID" :label="tableHead.ME_ID" header-align="center" align="center" />
      <el-table-column prop="EN_NAME" :label="tableHead.EN_NAME" header-align="center" align="center" />
      <el-table-column prop="ME_POSITION" :label="tableHead.ME_POSITION" header-align="center" align="center" />
      <el-table-column prop="CURINGTYPE" :label="tableHead.CURINGTYPE" header-align="center" align="center" />
      <el-table-column prop="CuringDate" :label="tableHead.CuringDate" header-align="center" align="center" />
      <el-table-column prop="people" :label="tableHead.people" header-align="center" align="center" />
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="dataList.length">
    </el-pagination>
    <!-- 统计图部分start -->
    <el-col>
      <el-col :span="12">
        <!-- 维修维度 -->
        <repair-task class="repair-task" style="margin:5%" />
      </el-col>
      <el-col :span="12">
        <!-- 费用维度 -->
        <repair-cost class="repair-cost" style="margin:5%" />
      </el-col>
    </el-col>
    <!-- 统计图部分end -->
    <!-- 智能分析 -->
    <!-- <analysis ref="analysis" /> -->
  </d2-container>
</template>

<script>
// import analysis from "../common/analysis"
import tableData from "./tableData";
import { EquipmentService } from "@/common/api";
import repairTask from "./repair-task";
import repairCost from "./repair-cost";
export default {
  data() {
    return {
      //分页
      currentPage: 1, //初始页
      pagesize: 5,
      dataForm: {},
      //文本规范
      lableposition: "left",
      //加载
      fullscreenLoading: false,
      form: {
        ME_ID: "", //设备编号
        EN_NAME: "", //设备名称
        EN_ID: "",
        CuringDate: "", //时间区间
        CURINGTYPE: "" //养护类型
      },
      //设备表
      departmentList: [],
      //日期选择器
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableHead: {
        //表头
        ME_ID: "设备编号",
        EN_NAME: "设备名称",
        ME_POSITION: "设备地点",
        CURINGTYPE: "维修详情",
        CuringDate: "任务日期",
        people: "责任人"
      },
      dataList: tableData
    };
  },
  mounted() {
    //数据初始化
    EquipmentService.getEquipment()
      .then(res => {
        this.departmentList = res.Equipment;
        this.role = res.Role;
      })
      .catch(err => {
        this.$message.error("数据初始化失败!");
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
    handle() {
      this.$message.error("测试中...");
    },
    analysis(){
      this.fullscreenLoading = true;
      setTimeout(() => {
          this.fullscreenLoading = false;
          this.$refs.analysis.dialogAanlysis = true;
        }, 2000);
    }
  },
  components: {
    repairTask,
    // analysis,
    repairCost
  }
};
</script>

<style scoped lang="scss">
</style>