<template>
<!-- 添加用户的弹出层 -->
<el-dialog

    :visible.sync="lookEquipmentVisible"
    width="60%"
    style="margin-top:-60px"
    >
    <el-tabs type="border-card">
    <el-tab-pane>
        <!-- 维修层 -->
        <span slot="label">维修</span>
<template>
<el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
    prop="xuhao"
    label="序号"
    >
    </el-table-column>
    <el-table-column
    prop="danhao"
    label="维修单号"
    >
    </el-table-column>
    <el-table-column
    prop="bianhao"
    label="设备编号">
    </el-table-column>
    <el-table-column
    prop="name"
    label="设备名称">
    </el-table-column>
    <el-table-column
    prop="time"
    label="保障时间">
    </el-table-column>
    <el-table-column
    prop="baozhangperson"
    label="报障人">
    </el-table-column>
    <el-table-column
    prop="baozhangtext"
    label="报障内容">
    </el-table-column>
    <el-table-column
    prop="dealperson"
    label="处理人">
    </el-table-column>
</el-table>
</template>
<el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[4, 8,12 , 16]"
    :page-size="4"
    layout="total, sizes, prev, pager, next, jumper"
    :total="4">
    </el-pagination>
</el-tab-pane>
        
        <!-- 养护表 -->
        <el-tab-pane label="养护">
<template>
<el-table
    :data="tableDatas"
    stripe
    style="width: 100%">
    <el-table-column
    prop="xuhao"
    label="序号"
    >
    </el-table-column>
    <el-table-column
    prop="danhao"
    label="养护计划编号"
    >
    </el-table-column>
    <el-table-column
    prop="bianhao"
    label="养护时间">
    </el-table-column>
    <el-table-column
    prop="name"
    label="设备名称">
    </el-table-column>
    <el-table-column
    prop="time"
    label="	存放地址">
    </el-table-column>
    <el-table-column
    prop="baozhangperson"
    label="	养护类型">
    </el-table-column>
    <el-table-column
    prop="baozhangtext"
    label="养护人">
    </el-table-column>
    <el-table-column
    prop="dealperson"
    label="养护费用">
    </el-table-column>
</el-table>
<el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[4, 8, 12, 16]"
    :page-size="4"
    layout="total, sizes, prev, pager, next, jumper"
    :total="4">
    </el-pagination>
</template>

        </el-tab-pane>
    
</el-tabs>
    </el-dialog>
</template>

<script>
import { EquipmentService } from "@/common/api";
import { debounce } from "lodash"; //消抖功能引入
export default {
name: "addEquipment",
data() {
    return {
        // 弹窗可视化
        lookEquipmentVisible: false,
        currentPage:4,
    tableData: [{
    
        xuhao: '1',
        danhao: 'BXD20190541',
        bianhao: 'zptc-fuhuahan',
        name: '显微镜',
        time: '2019-05-21 16:05:54',
        baozhangperson:'陈薇薇',
        baozhangtext:'通电后无法启动',
        dealperson:'傅化韩'
        }, {
        xuhao: '2',
        danhao: 'BXD20190548',
        bianhao: 'zptc-fuhuahan',
        name: '显微镜',
        time: '2019-05-21 16:05:54',
        baozhangperson:'傅化韩',
        baozhangtext:'无法启动',
        dealperson:'系统管理员'
        }, {
        xuhao: '3',
        danhao: 'BXD20190546',
        bianhao: 'zptc-fuhuahan',
        name: '显微镜',
        time: '2019-05-21 16:05:54',
        baozhangperson:'系统管理员',
        baozhangtext:'无法开机启动',
        dealperson:'傅化韩'
        }, {
        xuhao: '4',
        danhao: 'BXD20190547',
        bianhao: 'zptc-fuhuahan',
        name: '显微镜',
        time: '2019-05-21 16:05:54',
        baozhangperson:'一级保全',
        baozhangtext:'张天',
        dealperson:'车志伟'
        }]
        ,
        tableDatas: [{
    
        xuhao: '1',
        danhao: 'YHJH201921',
        bianhao: '2019-05-21',
        name: '显微镜',
        time: '2号设备厂',
        baozhangperson:'日常自主保全',
        baozhangtext:'车志伟',
        dealperson:'470.05'
        }, {
        xuhao: '2',
        danhao: 'YHJH201921',
        bianhao: '2019-05-07',
        name: '显微镜',
        time: '1号设备厂',
        baozhangperson:'日常自主保全',
        baozhangtext:'张天',
        dealperson:'470.05'
        }, {
        xuhao: '3',
        danhao: 'YHJH201921',
        bianhao: '2019-05-14',
        name: '显微镜',
        time: '1号设备厂',
        baozhangperson:'一级保全',
        baozhangtext:'车志伟',
        dealperson:'1215.70'
        }, {
        xuhao: '4',
        danhao: 'YHJH201921',
        bianhao: '2019-05-01',
        name: '显微镜',
        time: '2号设备厂',
        baozhangperson:'日常自主保全',
        baozhangtext:'张天',
        dealperson:'470.05'
        },, {
        xuhao: '5',
        danhao: 'YHJH201917',
        bianhao: '2019-05-22',
        name: '显微镜',
        time: '2号设备厂',
        baozhangperson:'日常自主保全',
        baozhangtext:'张天',
        dealperson:'470.05'
        }]
        
        
    };
},
mounted() {

},
computed: {
    // 必填
    
    
},
methods: {
    handleSizeChange(){
        console.log()
    },
    handleCurrentChange(){
        console.log()
    }
}
};
</script>

<style scoped>
</style>