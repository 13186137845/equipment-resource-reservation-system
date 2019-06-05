
<template>
    <d2-container>
        <!-- 条件查询搜索 -->
    <el-form :inline="true" :lable-position="lableposition" size="mini" label-width="130px" :model="dataForm">

        <el-form-item label="操作人姓名" :span="2">
            <el-input autocomplete="off" v-model="form.MI_NAME"></el-input>
        </el-form-item>
         <el-form-item label="操作时间：" :span="2">
          <el-date-picker v-model="form.value7" value-format="yyyy-MM-dd hh:mm:ss" type="daterange" align="right" unlink-panels range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
        </el-form-item>
        <!-- 添加 导入 -->
        <el-form-item>
        <el-button type="primary" @click="handle">查询</el-button>
        </el-form-item>

    
    </el-form>
    <!--  
    表格-->
    <el-table
        size="mini"
        :data="dataList&&dataList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%;"
    >
        <el-table-column type="selection" header-align="center" align="center" width="50"/>

        <el-table-column
        prop="MI_NAME"
        :label="tableHead.MI_NAME"
        header-align="center"
        align="center"
        ></el-table-column>
        <el-table-column
        prop="ML_DATE"
        :label="tableHead.ML_DATE"
        header-align="center"
        align="center"
        />
        <el-table-column
        prop="ML_IMFORMATION"
        :label="tableHead.ML_IMFORMATION"
        header-align="center"
        align="center"
        />
    
      


    </el-table>


<!-- 分页 -->
<el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[5, 10, 20, 40]" 
    :page-size="pagesize"         
    layout="total, sizes, prev, pager, next, jumper"
    :total="dataList.length">   
</el-pagination>
    </d2-container>
    </template>


<script>
//导入添加用户模块
import { PersonalCenter } from "@/common/api";
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
        role: [],
        formLabelWidth: "120px",

        dataForm: {
        username: ""
        },
        tableHead: {
        MI_NAME: "操作人姓名",  
        ML_DATE: "操作时间",
        ML_IMFORMATION: "日志详情",
    
    
     
        },
        dataList: [],

        form: {
        MI_NAME: "", 
        ML_DATE: "",
        ML_IMFORMATION: "",
        value7: ""

    
        },
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
    this.getDataList();
   

    },
    methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
        this.pagesize = size;
        console.log(this.pagesize);
      //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage);
      //点击第几页
    },
     handle() {
      console.log(this.form.value7[0], "color:green;");
      let params = new URLSearchParams();
   
      params.append("MI_NAME", this.form.MI_NAME);
      
      params.append("ML_START_DATE",this.form.value7[0] == undefined ? "" : this.form.value7[0]);
      params.append("ML_END_DATE",this.form.value7[1] == undefined ? "" : this.form.value7[1]);
    
     

      PersonalCenter.getPensEven(params)
        .then(res => {
          this.dataList = res;
          console.log(res,'color:yellow');
        })
        .catch(err => {
          console.log("获取用户信息失败：" + err);
        });
    },

    getDataList() {
         PersonalCenter 
      .getPensEven()
      .then(res => {
        this.dataList  = res;
        console.log(res,'color:yellow')
      })
      .catch(err => {
        this.$message({
          message: "系统初始化失败！",
          type: "error"
        });
      });
       }

    }
};
</script>
