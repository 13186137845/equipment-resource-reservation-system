<template>
  <d2-container>
    <!-- 条件查询搜索 -->
    <el-form :inline="true" :lable-position="lableposition" size="mini" label-width="100px" :model="dataForm">
      <el-form-item>
        <el-form-item label="设备编号：" :span="2">
          <el-input autocomplete="off" v-model="form.ME_ID"></el-input>
        </el-form-item>

        <el-form-item label="设备名称：" :span="2">
          <el-select v-model="form.EN_NAME" filterable placeholder="请选择设备名称">
            <el-option v-for="item in departmentList" :key="item.ME_ID" :label="item.EN_NAME" :value="item.EN_ID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购入时间：" :span="2">
          <el-date-picker v-model="form.value7" value-format="yyyy-MM-dd hh:mm:ss" type="daterange" align="right" unlink-panels range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
        </el-form-item>
        <el-form-item label="设备地址：" :span="2">
          <el-input v-model="form.ME_POSITION" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备状态：" :span="2">
          <el-select v-model="form.ME_STATE" filterable placeholder="请选择设备状态">
            <el-option v-for="item in state" :key="item.value" :label="item.states" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人：" :span="2">
          <el-input v-model="form.BUY_NAME" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 添加 导入 -->
        <el-form-item>
          <el-button @click="handle()">查看</el-button>
          <el-button type="primary" @click="addEquipment">添加</el-button>
  
    
          
        </el-form-item>
        <el-form-item>
  <el-upload
  class="upload-demo"
  ref="upload"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :auto-upload="false">
  <el-button slot="trigger" size="mini"  type="success">导入</el-button>
 
</el-upload>
        
</el-form-item>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table size="mini" :data="
                dataList &&
                    dataList.slice(
                        (currentPage - 1) * pagesize,
                        currentPage * pagesize
                    )
            " border style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50" />
      <el-table-column prop="ME_ID" :label="tableHead.ME_ID" header-align="center" align="center" />
      <el-table-column prop="EN_NAME" :label="tableHead.EN_NAME" header-align="center" align="center" />
      <el-table-column prop="imgPath" :label="tableHead.EN_IMG" width="100" header-align="center" align="center">
        <!--插入图片链接的代码-->
        <template slot-scope="scope">
          <el-popover placement="right" title="" trigger="hover">
            <img :src="imgPath+scope.row.ME_IMG_NAME" style="width: 280px;height: 140px" />
            <img slot="reference" :src="imgPath+scope.row.ME_IMG_NAME" alt="暂无图片" style="max-height: 50px;max-width: 130px">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="ME_POSITION" :label="tableHead.ME_POSITION" header-align="center" align="center"></el-table-column>
      <el-table-column prop="ME_STATE" :label="tableHead.ME_STATE" header-align="center" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.ME_STATE == 0">正常</span>
          <span v-if="scope.row.ME_STATE == 1">维修中</span>
        </template>
      </el-table-column>
      <el-table-column prop="BUY_DATE" :label="tableHead.BUY_DATE" header-align="center" align="center" />
      <el-table-column prop="BUY_NAME" :label="tableHead.BUY_NAME" header-align="center" align="center" />
      <el-table-column prop="REPAIR_SIZE" :label="tableHead.REPAIR_SIZE" header-align="center" align="center" />
      <el-table-column :label="tableHead.handle"  header-align="center" align="center" width="149">
        <!-- 编辑悬浮标签 -->
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div>
              <p>设备编号: {{ scope.row.ME_ID }}</p>
              <p>设备名称: {{ scope.row.EN_NAME }}</p>
              <p>
                设备状态:
                <span v-if="scope.row.ME_STATE == 0">正常</span>
                <span v-if="scope.row.ME_STATE == 1">维修中</span>
              </p>
              <p>设备地址: {{ scope.row.ME_POSITION }}</p>
              <p>设备购入时间: {{ scope.row.BUY_DATE }}</p>
              <p>设备购入负责人: {{ scope.row.BUY_NAME }}</p>
              <p>维修次数: {{ scope.row.REPAIR_SIZE }}</p>
              <template>
                <qriously :value="scope.row.ME_ID" :size="138" />
              </template>
            </div>
            <el-button size="mini" type="primary" slot="reference" @click="updataEquipment(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" slot="reference" size="mini" @click="delEquipment(scope.$index, scope.row.id)">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!-- 导入弹窗 -->
    <add-equipment ref="addEquipment" @getMessage="getVal" />
    <updata-equipment ref="updataEquipment" @getMessage="getVal" />
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="dataList.length">
    </el-pagination>
  </d2-container>
</template>


<script>
//导入添加设备模块
import addEquipment from "../../Equipment/addEquipment";
//导入修改设备模块
import request from "@/plugin/axios";

import updataEquipment from "../../Equipment/updataEquipment";
import { EquipmentService } from "@/common/api";
export default {
  name: "page2",
  data() {
    return {
      //分页
      currentPage: 1, //初始页
      pagesize: 10,
      //文本规范
        fileList: [{}, {}],
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
        EN_IMG: "设备图片",
        ME_POSITION: "设备地址",
        ME_STATE: "状态",
        BUY_DATE: "设备购入时间",
        BUY_NAME: "设备购入负责人",
        REPAIR_SIZE: "维修次数",
        handle: "操作"
      },
      dataList: [],

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
      value6: "",
      imgPath: process.env.VUE_APP_EQUURL
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
  },
  methods: {
       submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
    //查询按钮
    handle() {
        if (!this.form.value7 && typeof(this.form.value7)!="undefined" && this.form.value7!=0){ 
    this.form.value7=""
}
    
      // console.log(this.form.value7[0], "color:green;");
      let params = new URLSearchParams();
      params.append("ME_ID", this.form.ME_ID);
      params.append("EN_ID", this.form.EN_NAME);
      params.append("ME_POSITION", this.form.ME_POSITION);
      params.append("ME_STATE", this.form.ME_STATE);
      params.append(
        "BUY_DATE_START",
        this.form.value7[0] == undefined ? "" : this.form.value7[0]
      );
      params.append(
        "BUY_DATE_END",
        this.form.value7[1] == undefined ? "" : this.form.value7[1]
      );
      params.append("BUY_NAME", this.form.BUY_NAME);
      // console.log(params, "color:red");

      EquipmentService.getEquipmentInfo(params)
        .then(res => {
          // console.log(res);
          this.dataList = res.list;
        })
        .catch(err => {
          // console.log("获取用户信息失败：" + err);
        });
    },
    //获取用户信息
    getDataList() {
      EquipmentService.getEquipmentInfo()
        .then(res => {
          // console.log(res);
          this.dataList = res.list;
        })
        .catch(err => {
          // console.log("获取用户信息失败：" + err);
        });
    },
    //增加用户弹框
    addEquipment() {
      this.$refs.addEquipment.addEquipmentVisible = true;
      // console.log(this.$refs.addEquipment.addEquipmentVisible);
    },
    // 删除弹框
    delEquipment(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let paramst = new URLSearchParams();
          paramst.append("ME_ID", this.dataList[index].ME_ID); //获取当前行编号
          EquipmentService.delEquipment(paramst)
            .then(res => {
              this.dataList = res.list;
            })
            .catch(err => {
              // console.log("获取用户信息失败：" + err);
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.dataList.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑弹窗
    updataEquipment(index, row) {
      index = (this.currentPage - 1) * this.pagesize + index;
      this.$refs.updataEquipment.updataEquipmentVisible = true;
      this.$refs.updataEquipment.form = this.dataList[index];
    },
    getVal(msg) {
      this.dataList.push(msg[0]);
    },
  },
  components: {
    //弹窗引入
    addEquipment,
    updataEquipment
  }
};
</script>