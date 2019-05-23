<template>
<d2-container>
<el-table
    :data="database"
    
    style="width: 100%">
    <el-table-column type="expand">
    <template slot-scope="props">
        
    <el-table
    :data="props.row.two_power"
    :show-header="false"
    style="width: 100%">
    <el-table-column
        prop="MP_ID"
    
    >
    </el-table-column>
    <el-table-column
        prop="MP_NAME"

    >
    </el-table-column>
    <el-table-column
        prop="MP_ICON"

    >
    </el-table-column>
    <el-table-column
        prop="MP_PATH"
    >
    </el-table-column>
    <el-table-column
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
            >编辑</el-button
            >
            <el-button  type="danger"
            slot="reference" size="mini"
            @click="delEquipment(scope.$index,scope.row.id)">删除</el-button>
    
        </template>
        </el-table-column>
    </el-table>
    

    </template>
    </el-table-column>
    <el-table-column
    label="编号"
    prop="MP_ID">
    </el-table-column>
    <el-table-column
    label="名称"
    prop="MP_NAME">
    </el-table-column>
    <el-table-column
    label="图标"
    prop="MP_ICON">
    </el-table-column>
    
    <el-table-column
    label="路由"
    prop="MP_PATH">
    </el-table-column>
    <el-table-column
        :label="操作"
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
            >编辑</el-button
            >
            <el-button  type="danger"
            slot="reference" size="mini"
            @click="delEquipment(scope.$index,scope.row.id)">删除</el-button>
    
        </template>
        </el-table-column>
</el-table>
</d2-container>
</template>

<style>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>

<script>
export default {
    data() {
    return {
    database: [
        {
            "MP_FATHER_NAME": "设备预约",
            "MP_ID": 2,
            "MP_NAME": "设备预约",
            "MP_ICON": "calendar-minus-o",
            "MP_FATHER_ID": 2,
            "two_power": [
                {
                    "MP_PATH": "/bookingSystem",
                    "MP_ID": 3,
                    "MP_NAME": "设备预约",
                    "MP_FATHER_ID": 2
                },
                {
                    "MP_PATH": "/bookingInfo",
                    "MP_ID": 4,
                    "MP_NAME": "预约信息",
                    "MP_FATHER_ID": 2
                },
                {
                    "MP_PATH": "/bookingRecord",
                    "MP_ID": 5,
                    "MP_NAME": "预约记录",
                    "MP_FATHER_ID": 2
                }
            ]
        },
        {
            "MP_FATHER_NAME": "设备信息",
            "MP_ID": 6,
            "MP_NAME": "设备信息",
            "MP_ICON": "calendar-minus-o",
            "MP_FATHER_ID": 6,
            "two_power": [
                {
                    "MP_PATH": "/equipmentInfo",
                    "MP_ID": 7,
                    "MP_NAME": "设备信息",
                    "MP_FATHER_ID": 6
                },
                {
                    "MP_PATH": "/useRecord",
                    "MP_ID": 8,
                    "MP_NAME": "使用记录",
                    "MP_FATHER_ID": 6
                },
                {
                    "MP_PATH": "/equipmentRepaire",
                    "MP_ID": 9,
                    "MP_NAME": "设备报修",
                    "MP_FATHER_ID": 6
                },
                {
                    "MP_PATH": "/dataStatistics",
                    "MP_ID": 10,
                    "MP_NAME": "数据统计",
                    "MP_FATHER_ID": 6
                }
            ]
        },
        {
            "MP_FATHER_NAME": "申诉中心",
            "MP_ID": 11,
            "MP_NAME": "申诉中心",
            "MP_ICON": "calendar-minus-o",
            "MP_FATHER_ID": 11,
            "two_power": [
                {
                    "MP_PATH": "/launchAppeal",
                    "MP_ID": 12,
                    "MP_NAME": "发起申诉",
                    "MP_FATHER_ID": 11
                },
                {
                    "MP_PATH": "/appealRecord",
                    "MP_ID": 13,
                    "MP_NAME": "申诉记录",
                    "MP_FATHER_ID": 11
                },
                {
                    "MP_PATH": "/dadada",
                    "MP_ID": 22,
                    "MP_NAME": "xixi",
                    "MP_ICON": "dadada",
                    "MP_FATHER_ID": 11
                }
            ]
        },
        {
            "MP_FATHER_NAME": "个人中心",
            "MP_ID": 14,
            "MP_NAME": "个人中心",
            "MP_ICON": "calendar-minus-o",
            "MP_FATHER_ID": 14,
            "two_power": [
                {
                    "MP_ID": 15,
                    "MP_NAME": "个人信息",
                    "MP_FATHER_ID": 14
                },
                {
                    "MP_ID": 16,
                    "MP_NAME": "借还记录",
                    "MP_FATHER_ID": 14
                },
                {
                    "MP_ID": 17,
                    "MP_NAME": "我的日志",
                    "MP_FATHER_ID": 14
                },
                {
                    "MP_ID": 18,
                    "MP_NAME": "我的事件",
                    "MP_FATHER_ID": 14
                },
                {
                    "MP_ID": 19,
                    "MP_NAME": "我的文章",
                    "MP_FATHER_ID": 14
                }
            ]
        },
        {
            "MP_FATHER_NAME": "反馈中心",
            "MP_ID": 20,
            "MP_NAME": "反馈中心",
            "MP_ICON": "calendar-minus-o",
            "MP_FATHER_ID": 20,
            "two_power": [
                {
                    "MP_ID": 21,
                    "MP_NAME": "反馈信息",
                    "MP_FATHER_ID": 20
                }
            ]
            }
            ]
        }
    }
}
</script>