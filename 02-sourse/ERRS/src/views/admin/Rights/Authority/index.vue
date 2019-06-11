
<template>
    <d2-container>
        <!-- 条件查询搜索 -->
    <el-form :inline="true" :lable-position="lableposition" size="mini" label-width="130px" :model="dataForm">
        <el-form-item>
        <el-form-item label="权限编号：" :span="2">
            <el-input autocomplete="off" v-model="form.MP_ID"></el-input>
        </el-form-item>

        <el-form-item label="权限名称：" :span="2">
            <el-input v-model="form.MP_NAME " autocomplete="off"></el-input>
        </el-form-item>  
        </el-form-item>
        <!-- 添加 导入 -->
        <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="danger" >添加</el-button>
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
        prop="MP_ID"
        :label="tableHead.MP_ID"
        header-align="center"
        align="center"
        ></el-table-column>
        <el-table-column
        prop="MP_NAME"
        :label="tableHead.MP_NAME"
        header-align="center"
        align="center"
        />
        <el-table-column
        prop="MP_FATHER_ID"
        :label="tableHead.MP_FATHER_ID"
        header-align="center"
        align="center"
        />
        <el-table-column
        prop="MP_FATHER_NAME"
        :label="tableHead.MP_FATHER_NAME"
        header-align="center"
        align="center"
        />
        <el-table-column
        prop="MP_PATH"
        :label="tableHead.MP_PATH"
        header-align="center"
        align="center"
        />
        <el-table-column
        :label="tableHead.handle"
      
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
            >编辑</el-button
            >
            <el-button  type="danger"
            slot="reference" size="mini"
            @click="delEquipment(scope.$index,scope.row.id)">删除</el-button>
    
        </template>
        </el-table-column>


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
import { useAuthorityService } from "@/common/api";
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
        MP_ID: "权限编号",
        MP_NAME: "权限名称",
        MP_FATHER_ID: "父权限ID",
        MP_FATHER_NAME: "父权限名称",
        MP_PATH: "权限链接",
        handle: "操作"
        },
        dataList: [],

        form: {
        MP_ID: "",
        MP_NAME: "",
        MP_FATHER_ID: "",
        MP_FATHER_NAME: "",
        MP_PATH: "",

    
        },
      // 日期选择器

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
        // console.log(this.pagesize);
      //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage;
        // console.log(this.currentPage);
      //点击第几页
    },
    // //查询按钮
    // handle() {
    //     console.log(this.form.value7[0], "color:green;");
    //     let params = new URLSearchParams();
    //     params.append("ME_ID", this.form.ME_ID);
    //     params.append("EN_ID", this.form.EN_NAME);
    //     params.append("ME_POSITION", this.form.ME_POSITION);
    //     params.append("ME_STATE", this.form.ME_STATE);
    //     params.append(
    //     "BUY_DATE_START",
    //     this.form.value7[0] == undefined ? "" : this.form.value7[0]
    //     );
    //     params.append(
    //     "BUY_DATE_END",
    //     this.form.value7[1] == undefined ? "" : this.form.value7[1]
    //     );
    //     params.append("BUY_NAME", this.form.BUY_NAME);
    //     console.log(params, "color:red");

    //     EquipmentService.getEquipmentInfo(params)
    //     .then(res => {
    //         console.log(res);
    //         this.dataList = res.list;
    //     })
    //     .catch(err => {
    //         console.log("获取用户信息失败：" + err);
    //     });
    // },
    //获取用户信息
    getDataList() {
        useAuthorityService.getAuthority()
        .then(res => {
            
            this.dataList = res.list;
            console.log(res.list,"style:red");
            
        })
        .catch(err => {
            console.log("获取用户信息失败：" + err);
        });},
//     },
//     //增加用户弹框
//     addEquipment() {
//         this.$refs.addEquipment.addEquipmentVisible = true;
//         console.log(this.$refs.addEquipment.addEquipmentVisible);
//     },
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
//     updataEquipment(index, row) {
//         this.$refs.updataEquipment.updataEquipmentVisible = true;
//         this.$refs.updataEquipment.form = this.dataList[index];
//     }
//     },
//     components: {
//         //弹窗引入
//     addEquipment,
//     updataEquipment
// }
    }
};
</script>
