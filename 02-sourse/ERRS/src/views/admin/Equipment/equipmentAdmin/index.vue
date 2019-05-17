
<template>
<d2-container>
    <el-form :inline="true" size="mini" :model="dataForm">
    <el-form-item>
        <el-input  placeholder="用户名" clearable /> <!--v-model="dataForm.username" -->
    </el-form-item>
    <el-form-item>
        <el-button>确定</el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="addEquipment">添加</el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="danger">删除</el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="info">导出</el-button>
    </el-form-item>
    </el-form>
        <!--  
        表格 -->
    <el-table
    size="mini"
    :data="dataList"
    border
    style="width: 100%;"
    >
    <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
    />
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
        prop="ME_POSITION"
        :label="tableHead.ME_POSITION"
        header-align="center"
        align="center"
        />
        <el-table-column
        prop="ME_STATE"
        :label="tableHead.ME_STATE"
        header-align="center"
        align="center"
        />


        <el-table-column
        prop="BUY_DATE"
        :label="tableHead.BUY_DATE"
        header-align="center"
        align="center"
    />
    <el-table-column
        prop="BUY_NAME"
        :label="tableHead.BUY_NAME"
        header-align="center"
        align="center"
    />
    <el-table-column
        prop="REPAIR_SIZE"
        :label="tableHead.REPAIR_SIZE"
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
        <template slot-scope="scope">
            <el-button
            type="text"
            size="mini"
            @click="updataEquipment(scope.$index, scope.row.id)"
            >编辑</el-button
            >
            <el-button type="text" size="mini" 
            >删除</el-button
            >
        </template>
        </el-table-column>
    </el-table>
<add-equipment ref="addEquipment" />
<updata-equipment ref="updataEquipment" />


</d2-container>
</template>

<script>
//导入添加用户模块
import addEquipment from "../../Equipment/addEquipment";
//导入修改用户模块
import updataEquipment from "../../Equipment/updataEquipment";
import { EquipmentService } from "@/common/api";
export default {    
name: 'page2',
data() {
    return {
    dataForm: {
        username: ""
    },
    tableHead: {
        ME_ID: "设备编号",
        EN_NAME: "设备名称",
        ME_POSITION: "设备地址",
        ME_STATE: "状态",
        BUY_DATE: "设备购入时间",
        BUY_NAME: "设备购入负责人",
        REPAIR_SIZE: "维修次数",
        handle: "操作"
        
    },
    dataList: []
    };
},
mounted() {
    this.getDataList();
},
methods: {
    getDataList() {
    EquipmentService
        .getEquipmentInfo()
        .then(res => {
        console.log(res);
        this.dataList = res.list;
        })
        .catch(err => {
        console.log("获取用户信息失败：" + err);
        });
    },
    
    addEquipment() {
    this.$refs.addEquipment.addEquipmentVisible = true;
    },
    updataEquipment(index, row) {
    this.$refs.updataEquipment.updataEquipmentVisible = true;
    this.$refs.updataEquipment.form = this.dataList[index];
    }
    
},
components: {
    addEquipment,
    updataEquipment
}    

}
</script>
