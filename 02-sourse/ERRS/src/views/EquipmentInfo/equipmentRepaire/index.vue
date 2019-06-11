<template>
    <d2-container>
        <!-- 条件查询搜索 -->
    <el-form :inline="true" :lable-position="lableposition" size="mini" label-width="130px" :model="dataForm">
  
      <el-form-item
        label="报修编号"
        :label-width="formLabelWidth"
        :span="2"
        prop="MD_NAME"
      > 
      <el-input autocomplete="off" v-model="form.ME_ID"></el-input>
      </el-form-item>
        
        <el-form-item label="设备编号：" :span="2">
          <el-input autocomplete="off" v-model="form.ME_ID"></el-input>
        </el-form-item>

        <el-form-item label="设备名称：" :span="2">
          <el-select v-model="form.EN_NAME" filterable placeholder="请选择设备名称">
            <el-option v-for="item in departmentList" :key="item.ME_ID" :label="item.EN_NAME" :value="item.EN_ID"></el-option>
          </el-select>
        </el-form-item>
      
        
        <el-form-item label="设备状态：" :span="2">
         
        </el-form-item>
        <el-form-item label="报障人：" :span="2">
          <el-input v-model="form.BUY_NAME" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 添加 导入 -->
        <el-form-item>
        <el-button type="primary" @click="handle">查询</el-button>
        <el-button type="danger" @click="lookpensonalRecord()">报修</el-button>
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
        prop="MRE_ID"
        :label="tableHead.MRE_ID"
        header-align="center"
        align="center"
        ></el-table-column>
          <el-table-column
        prop="ME_ID"
        :label="tableHead.ME_ID"
        header-align="center"
        align="center"
        />
        <el-table-column
        prop="EN_NAME"
        :label="tableHead.EN_NAME"
        header-align="center"
        align="center"
        />
        <el-table-column
        prop="MRE_STATE"
        :label="tableHead.MRE_STATE"
        header-align="center"
        align="center"
        >
          <template slot-scope="scope">
          <el-button v-if="scope.row.MRE_STATE == 0"  size="mini" type="info" >申报中</el-button>
          <el-button v-if="scope.row.MRE_STATE == 1"  size="mini" type="success">分配任务</el-button>
           <el-button v-if="scope.row.MRE_STATE == 2"  size="mini" type="warning">维修中</el-button>
           <el-button v-if="scope.row.MRE_STATE == 3"  size="mini" type="success">维修结束</el-button>
                 <el-button v-if="scope.row.MRE_STATE == 4"   size="mini" type="primary">已验收</el-button>
          <el-button v-if="scope.row.MRE_STATE == 5"  size="mini" type="danger">撤销</el-button>
        </template>
        </el-table-column>
        <el-table-column
        prop="MRE_EXPLAIN"
          width="200"
        :label="tableHead.MRE_EXPLAIN"
        header-align="center"
        align="center"
        />
        <el-table-column
        prop="INS_USER"
        :label="tableHead.INS_USER "
        header-align="center"
        align="center"
        />
      
        <el-table-column
        prop="INS_DATE"
        :label="tableHead.INS_DATE "
        header-align="center"
        align="center"
         width="150"
        />
         <el-table-column
        prop="DISTRIBUTION_USER"
        :label="tableHead.DISTRIBUTION_USER "
        header-align="center"
        align="center"
        />
  
        <el-table-column
        :label="tableHead.handle"
      
        header-align="center"
        align="center"
        width="200"
        >
        <!-- 编辑悬浮标签 -->
        <template slot-scope="scope" >
      
          <el-button               
            size="mini"
            type="primary"
            slot="reference"
         
              v-if="scope.row.MRE_STATE == 0"
             @click="updatapensonalRecord(scope.$index, scope.row.MRE_STATE,value6='1')"
            >分配</el-button
            >
            <el-button  
            type="danger"
            slot="reference" 
            size="mini"
             v-if="scope.row.MRE_STATE == 0"
            @click="updatapensonalRecord(scope.$index,scope.row.MRE_STATE,value6='5')">撤销</el-button>
            
            
            <el-button               
            size="mini"
            type="success"
            slot="reference"
            
            v-if="scope.row.MRE_STATE == 1"
             @click="updatapensonalRecord(scope.$index, scope.row.MRE_STATE,value6='1')"
            >重新分配</el-button>
             
              
            <el-button               
            size="mini"
            type="warning"
            slot="reference"
    
            v-if="scope.row.MRE_STATE == 1"
             @click="updatapensonalRecord(scope.$index, scope.row.MRE_STATE,value6='2')"
            >开始维修</el-button>
             
             <el-button               
            size="mini"
            type="info"
            slot="reference"
        
            v-if="scope.row.MRE_STATE == 2"
             @click="updatapensonalRecord(scope.$index, scope.row.MRE_STATE,value6='3')"
            >维修结束</el-button>
          
            <el-button               
            size="mini"
            type="primary"
            slot="reference"
            v-if="scope.row.MRE_STATE == 3"
             @click="updatapensonalRecord(scope.$index, scope.row.MRE_STATE,value6='4')"
            >验收</el-button>
          
         </template>
        </el-table-column>
        


    </el-table>

        <!-- 导入弹窗 -->
    <lookpensonal-record ref="lookpensonalRecord" />

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
// import { departmentService } from "@/common/api";
// import { adminUserService } from "@/common/api";
import lookpensonalRecord from "../equipmentRepaire/lookpensonalRecord";
import { getRepair } from "@/common/api";


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
        MRE_ID:"维修编号",
        ME_ID:"设备编号",
        EN_NAME:"设备名称", 
        MRE_STATE:"报修状态",
       MRE_EXPLAIN:"维修说明 ", 
        INS_USER:"报障人", 
        INS_DATE:"报障时间", 
        DISTRIBUTION_USER :"处理人",
        handle: "操作"
        },
        dataList: [],
        caozuo:"",

        form: {
        MRE_ID:"", 
        EN_NAME:"", 
        ME_ID:"", 
        MRE_STATE:"",
        MRE_EXPLAIN:"", 
        INS_USER:"", 
        INS_DATE:"", 
        DISTRIBUTION_USER :"",
        ACCEPTANCE_USER:""


    
        },
      // 日期选择器

        value6: ""
    };
    },
     updated () {
      this.form.ACCEPTANCE_USER = this.$store.state.d2admin.user.info.name
  },
    mounted() {
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
    // //查询按钮
   handle() {
        
    },
    //获取用户信息
    getDataList() {
        getRepair.getRepairInfo()
        .then(res => {
            
            this.dataList = res;
           console.log(res,"style:red");
            
        })
        .catch(err => {
            // console.log("获取用户信息失败：" + err);
        });
        },
//     },
   // 增加用户弹框
    lookpensonalRecord() {
        this.$refs.lookpensonalRecord.addPersonVisible = true;
        
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
    updatapensonalRecord(index, row,value6) {
       

         
       
          let params = new URLSearchParams();
          params.append("MRE_STATE", value6);
          params.append("ME_ID",this.dataList[index].ME_ID);
           params.append("MRE_ID",this.dataList[index].MRE_ID);
           params.append("ACCEPTANCE_USER", this.form.ACCEPTANCE_USER);
    
            // console.log();
      // params.append("file",this.fileList);
      getRepair.upRepair(params)
        .then(res => {
          //添加成功 刷新列表
          this.$message({
            message: "修改成功",
            type: "success"
          });
       
        })
        .catch(err => {
          //添加失败 dosomething
        });
         
     
        // this.$refs.updataDeparment.updataDeparmentVisible = true;
        // this.$refs.updataDeparment.form = this.dataList[index];
    },
//     },

    },
     components: {
        //弹窗引入
    lookpensonalRecord
   
}
};
</script>
