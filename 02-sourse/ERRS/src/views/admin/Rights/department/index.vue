
<template>
    <d2-container>
        <!-- 条件查询搜索 -->
    <el-form :inline="true" :lable-position="lableposition" size="mini" label-width="130px" :model="dataForm">
  
      <el-form-item
        label="部门名称："
        :label-width="formLabelWidth"
        :span="2"
        prop="MD_NAME"
      >
        <el-select v-model="form.MD_NAME" placeholder="请选择部门">
          <el-option
            v-for="item in departmentList"
            :key="item.MD_ID"
            :label="item.MD_NAME"
            :value="item.MD_ID"
          ></el-option>
        </el-select>
        </el-form-item>
        <!-- 添加 导入 -->
        <el-form-item>
        <el-button type="primary" @click="handle">查询</el-button>
        <el-button type="danger" @click="addDeparment">增加部门</el-button>
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

        <el-table-column
        prop="MD_ID"
        :label="tableHead.MD_ID"
        header-align="center"
        align="center"
        ></el-table-column>
        <el-table-column
        prop="MD_NAME"
        :label="tableHead.MD_NAME"
        header-align="center"
        align="center"
        />
        <el-table-column
        prop="MD_INFORMATION"
        :label="tableHead.MD_INFORMATION"
        header-align="center"
        align="center"
        />
  
        <el-table-column
        :label="tableHead.handle"
        fixed="right"
        header-align="center"
        align="center"
        width="149"
        >
        <!-- 编辑悬浮标签 -->
        <template slot-scope="scope">
        
            <el-button               
            size="mini"
            type="primary"
            slot="reference"
             @click="updataDeparment(scope.$index, scope.row.id)"
            >编辑</el-button
            >
            <el-button  type="danger"
            slot="reference" size="mini"
            @click="delEquipment(scope.$index,scope.row.id)">删除</el-button>
    
        </template>
        </el-table-column>


    </el-table>

        <!-- 导入弹窗 -->
    <add-deparment ref="addDeparment" />
<updata-deparment ref="updataDeparment" />
<!-- 分页 -->
<el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[5, 10, 20, 40]" 
    :page-size="pagesize"         
    layout="total, sizes, prev, pager, next, jumper"
    :total=dataList.length>   
</el-pagination>
    </d2-container>
    </template>


<script>
//导入添加用户模块
import { departmentService } from "@/common/api";
import { adminUserService } from "@/common/api";
import addDeparment from "../department/addDeparment";
import updataDeparment from "../department/updataDeparment";

export default {
    name: "page2",
    data() {
    return {
        //分页
      currentPage: 1, //初始页
        pagesize: 10,
        //文本规范
        lableposition: "left",
      departmentList:[],
        role: [],
        formLabelWidth: "120px",

        dataForm: {
        username: ""
        },
        tableHead: {
        MD_ID: "部门编号",
        MD_NAME: "部门名称",
        MD_INFORMATION: "部门职责",
      
        handle: "操作"
        },
        dataList: [],

        form: {
        MD_ID: "",
        MD_NAME: "",
        MD_INFORMATION: "",


    
        },
      // 日期选择器

        value6: ""
    };
    },
    mounted() {
    this.getDataList();
    adminUserService
      .getAddUserMenu()
      .then(res => {
        this.departmentList = res.Department;
        this.role = res.Role;
      })
      .catch(err => {
        this.$message({
          message: "系统初始化失败！",
          type: "error"
        });
      });

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
    // //查询按钮
    handle() {
   
        let params = new URLSearchParams();
        params.append("MD_ID", this.form.MD_NAME);
   console.log(params,"style:black");
       
        departmentService.getDepartment(params)
        .then(res => {
            console.log(res);
           this.dataList = res;
        })
        .catch(err => {
            console.log("获取用户信息失败：" + err);
        });
    },
    //获取用户信息
    getDataList() {
        departmentService.getDepartment()
        .then(res => {
            
            this.dataList = res;
            console.log(res,"style:red");
            
        })
        .catch(err => {
            console.log("获取用户信息失败：" + err);
        });
        },
//     },
   // 增加用户弹框
    addDeparment() {
        this.$refs.addDeparment.addDeparmentVisible = true;
        console.log(this.$refs.addDeparment.addDeparmentVisible,"style:green");
    },
//      // 删除弹框
    delEquipment(index, row) {
    
//         this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
//         confirmButtonText: "确定",
//         cancelButtonText: "取消",
//         type: "warning"
//         })
//         .then(() => {
//             let paramst = new URLSearchParams();
//             paramst.append("ME_ID", this.dataList[index].ME_ID);//获取当前行编号
//             EquipmentService.delEquipment(paramst)
//             .then(res => {
//                 console.log(res);
//                 this.dataList = res.list;
//             })
//             .catch(err => {
//                 console.log("获取用户信息失败：" + err);
//             });
//             this.$message({
//             type: "success",
//             message: "删除成功!"
//             });
//             this.$router.go(0);
//         })
//         .catch(() => {
//             this.$message({
//             type: "info",
//             message: "已取消删除"
//             });
//         });
    },
// //编辑弹窗
    updataDeparment(index, row) {
        this.$refs.updataDeparment.updataDeparmentVisible = true;
        this.$refs.updataDeparment.form = this.dataList[index];
    },
//     },

    },
     components: {
        //弹窗引入
    addDeparment,
    updataDeparment
}
};
</script>
