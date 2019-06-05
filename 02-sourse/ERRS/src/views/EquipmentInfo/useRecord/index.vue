
<template>
  <d2-container>
    <el-form
      :inline="true"
      :lable-position="lableposition"
      label-width="130px"
      size="mini"
      :model="dataForm"
    >
      <el-form-item>
        <el-form-item label="设备编号：" :span="2">
          <el-input autocomplete="off" v-model="form.ME_ID"></el-input>
        </el-form-item>

        <el-form-item label="设备名称：" :span="2">
          <el-select v-model="form.EN_NAME" clearable filterable placeholder="请选择设备名称">
            <el-option
              v-for="item in departmentList"
              :key="item.ME_ID"
              :label="item.EN_NAME"
              :value="item.EN_ID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约时间：" :span="2">
          <el-date-picker
            v-model="form.value7"
            value-format="yyyy-MM-dd hh:mm:ss"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="设备地址：" :span="2">
          <el-input v-model="form.ME_POSITION " autocomplete="off"></el-input>
        </el-form-item>

        <el-button type="info" @click="handle()">查询</el-button>
      </el-form-item>
    </el-form>

    <!--  
    表格-->
    <el-table
      size="mini"
      :data="dataList&&dataList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
    >
      <el-table-column prop="ME_ID" :label="tableHead.ME_ID" header-align="center" align="center"/>
      <el-table-column
        prop="EN_NAME"
        :label="tableHead.EN_NAME"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="ME_POSITION"
        :label="tableHead.ME_POSITION"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="MI_NAME"
        :label="tableHead.MI_NAME"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column prop="MU_NO" :label="tableHead.MU_NO" header-align="center" align="center"/>
      <el-table-column
        prop="MD_NAME"
        :label="tableHead.MD_NAME"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="MPR_NAME"
        :label="tableHead.MPR_NAME"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="MA_START_DATE"
        :label="tableHead.MA_START_DATE"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="MA_END_DATE"
        :label="tableHead.MA_END_DATE"
        header-align="center"
        align="center"
      ></el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataList.length"
    ></el-pagination>
  </d2-container>
</template>


<script>
import request from "@/plugin/axios";
import { EquipmentService } from "@/common/api";
import { useRecordService } from "@/common/api";

export default {
  name: "page2",
  data() {
    return {
      //分页
      currentPage: 1, //初始页
      pagesize: 10,
      //文本规范
      lableposition: "left",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      //设备表
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
      role: [],
      formLabelWidth: "120px",

      dataForm: {
        username: ""
      },
      tableHead: {
        ME_ID: "设备编号",
        EN_NAME: "设备名称",
        ME_POSITION: "设备地址",
        MI_NAME: "使用用户",
        MU_NO: "用户工号",
        MD_NAME: "用户部门",
        MPR_NAME: "参与项目",
        MA_START_DATE: "预约开始时间",
        MA_END_DATE: "预约结束时间"
      },
      dataList: [],

      form: {
        ME_ID: "",
        EN_NAME: "",
        EN_ID: "",
        ME_POSITION: "",
        MI_NAME: "",
        MU_NO: "",
        MD_NAME: "",
        MPR_NAME: "",
        MA_START_DATE: "",
        MA_END_DATE: "",
        value7: ""
      },
      // 日期选择器
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
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value6: ""
    };
  },
  mounted() {
    //数据初始化
    this.getDataList();
    EquipmentService.getEquipment()
      .then(res => {
        this.departmentList = res.Equipment;
        this.role = res.Role;
      })
      .catch(err => {
        // console.log("数据初始化失败：" + err);
      });
    this.getDataList();
  },
  methods: {
    handle() {
    let params = new URLSearchParams();
      params.append("ME_ID", this.form.ME_ID);
      params.append("EN_ID", this.form.EN_NAME);
      params.append("ME_POSITION", this.form.ME_POSITION);
      params.append("COMPLETE_FLAG", 3);
      params.append(
        "MA_START_DATE",
        this.form.value7[0] == undefined ? "" : this.form.value7[0]
      );
      params.append(
        "MA_END_DATE",
        this.form.value7[1] == undefined ? "" : this.form.value7[1]
      );
      useRecordService
        .getRecordList(params)
        .then(res => {
          // console.log(res);
          this.dataList = res.list;
        })
        .catch(err => {
          // console.log("获取用户信息失败：" + err);
        });
        
    //   console.log(this.form.value7[0], "color:green;");
      
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      // console.log(this.pagesize);
      //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      // console.log(this.currentPage);
      //点击第几页
    },
    //获取历史记录信息
    getDataList() {
      let params = new URLSearchParams();
      params.append("COMPLETE_FLAG", 3);
      useRecordService
        .getRecordList(params)
        .then(res => {
          // console.log(res);
          this.dataList = res.list;
        })
        .catch(err => {
          // console.log("获取用户信息失败：" + err);
        });
    }
  },
  components: {
    //弹窗引入
  }
};
</script>
