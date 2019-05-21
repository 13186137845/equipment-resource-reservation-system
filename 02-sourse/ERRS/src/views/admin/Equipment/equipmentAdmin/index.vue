
<template>
<d2-container>
    <el-form :inline="true" size="mini" :model="dataForm">
    <el-form-item>
    <div class="block">
    <el-form-item label="设备编号：" :label-width="formLabelWidth" :span="2">
    
    <el-input  autocomplete="off" v-model="form.ME_ID"></el-input>
    </el-form-item>
    <!-- <el-form-item label="设备名称："  :span="2">
        <el-select v-model="equipments" placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.EN_ID"
            :label="item.EN_NAME"
            :value="item.EN_ID"
            :disabled="item.disabled"
        ></el-option>
        </el-select>

    </el-form-item>
    <el-form-item label="设备地址："  :span="2">
    
        <el-input  v-model="address"  autocomplete="off"></el-input>
    
    </el-form-item> 
    <el-form-item  label="设备状态："  :span="2">
    <el-select v-model="value" placeholder="请选择">
    <el-option
    v-for="item in optionst"
    :key="item.value"
    :label="item.label"
    :value="item.value">
    </el-option>
    </el-select>
    </el-form-item>     
    <el-form-item label="设备购入时间："  :span="2">
    
    <el-date-picker
        v-model="value7"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2">
    </el-date-picker>

    
    </el-form-item>
    <el-form-item v-model="person"  label="设备购入负责人："  :span="2">
    
        <el-input autocomplete="off"></el-input>
    
    </el-form-item>      -->
    <el-form-item label="设备名称："  :span="2">
        <el-select v-model="form.EN_NAME" placeholder="请选择设备名称">
        <el-option
            v-for="item in departmentList"
            :key="item.ME_ID"
            :label="item.EN_NAME"
            :value="item.EN_ID"
        ></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="设备地址：" :span="2">

        <el-input v-model="form.ME_POSITION " autocomplete="off"></el-input>
    
    </el-form-item>
    <el-form-item label="设备状态："  :span="2">
        <el-select v-model="form.ME_STATE" placeholder="请选择设备状态">
        <el-option
            v-for="item in state"
            :key="item.value"
            :label="item.states"
            :value="item.value"
        ></el-option>
        </el-select>
    </el-form-item>

    <el-form-item label="设备购入时间："  :span="2">
    <el-date-picker
        v-model="form.value7"
        value-format="yyyy-MM-dd hh:mm:ss"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2">
    </el-date-picker>

    </el-form-item>
    <el-form-item label="设备购入负责人："   :span="2">

        <el-input v-model="form.BUY_NAME" autocomplete="off"></el-input>

    </el-form-item>

    <el-button @click="handle()">查看</el-button>
    </div>
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
        >
    
        </el-table-column>
        <el-table-column
        prop="ME_STATE"
        :label="tableHead.ME_STATE"
        header-align="center"
        align="center"
        >
        <template slot-scope="scope">
            <span v-if="scope.row.ME_STATE==0">正常</span>
            <span v-if="scope.row.ME_STATE==1">维修中</span>
        </template>
        </el-table-column>
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
    <el-popover trigger="hover" placement="top">
            <p>设备编号: {{ scope.row.ME_ID }}</p>
            <p>设备名称: {{ scope.row.EN_NAME }}</p>
            <p>设备状态:   
            <span v-if="scope.row.ME_STATE==0">正常</span>
            <span v-if="scope.row.ME_STATE==1">维修中</span>
            </p>
            <p>设备地址: {{ scope.row. ME_POSITION}}</p>
            <p>设备购入时间: {{ scope.row. BUY_DATE}}</p>
            <p>设备购入负责人: {{ scope.row. BUY_NAME}}</p>
            <p>维修次数: {{ scope.row.REPAIR_SIZE }}</p>
            <template>
            <qriously :value="scope.row.ME_ID" :size="138"/>
</template>
        <el-button               
            size="mini"
            type="primary"
            slot="reference"
            @click="updataEquipment(scope.$index, scope.row.id)"
            >编辑</el-button
            >
            <el-button  type="danger"
            slot="reference" size="mini" @click="deleteHandle(scope.row.id)">删除</el-button>
        </el-popover>
        
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
import request from "@/plugin/axios";

import updataEquipment from "../../Equipment/updataEquipment";
import { EquipmentService } from "@/common/api";
export default {    
name: 'page2',
data() {
    return {
    departmentList: [],
    state:[{
        value:0,
        states:"正常"
    },{
        value:1,
        states:"维修中"
    }],
    role: [],
    formLabelWidth: "120px",


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
    dataList: [],
    
        
    form: {
        ME_ID: "",
        EN_NAME: "",
        EN_ID:"",
        ME_POSITION: "",
        ME_STATE: "",
        BUY_DATE: "",
        BUY_NAME: "",
        value7: '',
    },
    // 日期选择器
    pickerOptions2: {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
            const end = new Date();
            const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
            const end = new Date();
            const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
            const end = new Date();
            const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
            }
        }]
        },
        value6: ''
    };
},
mounted() {
this.getDataList();
    EquipmentService
    .getEquipment() 
    .then(res => {
        this.departmentList = res.Equipment;
        this.role = res.Role;
    
    })
    .catch(err => {
        console.log("数据初始化失败：" + err);
    });
},
methods: { 

handle() {
    console.log(this.form.value7[0]);
let params = new URLSearchParams();
    params.append("ME_ID", this.form.ME_ID);
    params.append("EN_ID", this.form.EN_NAME);
    params.append("ME_POSITION", this.form.ME_POSITION);
    params.append("ME_STATE", this.form.ME_STATE);
    params.append("BUY_DATE_START", this.form.value7[0]);
    params.append("BUY_DATE_END", this.form.value7[1]);
    params.append("BUY_NAME", this.form.BUY_NAME);
    console.log(params,"color:red");

EquipmentService
        .getEquipmentInfo(params)
        .then(res => {
        console.log(res);
        this.dataList = res.list;
        })
        .catch(err => {
        console.log("获取用户信息失败：" + err);
        });
    }
,

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
    console.log(this.$refs.addEquipment.addEquipmentVisible )
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
