<template>
<!-- 添加用户的弹出层 -->
<el-dialog
    title="修改设备"
    :visible.sync="updataEquipmentVisible"
    width="40%"
    style="margin-top:-60px"
>
    <el-form :model="form" style="margin-top:-20px">
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
        <el-col :span="colWinth">
        <el-input v-model="form.ME_POSITION " autocomplete="off"></el-input>
        </el-col>
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
        <el-col :span="colWinth">
        <el-date-picker
        v-model="form.BUY_DATE"
        type="date"
        value-format="yyyy-MM-dd hh:mm:ss"
        placeholder="选择日期">
        </el-date-picker>
    </el-col>
    </el-form-item>
    <el-form-item label="设备购入负责人："   :span="2">
        <el-col :span="colWinth">
        <el-input v-model="form.BUY_NAME" autocomplete="off"></el-input>
        </el-col>
    </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-top:-30px">
    <el-button @click="addEquipmentVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
    </div>
</el-dialog>
</template>

<script>
import { EquipmentService } from "@/common/api";
export default {
name: "updataEquipment",
data() {
    return {
        // 可视化弹窗
    updataEquipmentVisible: false,
    form: {

        EN_NAME: "",
        EN_ID:"",
        ME_POSITION: "",
        ME_STATE: "",
        BUY_DATE: "",
        BUY_NAME: "",
    },
    // 设备名称
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
    colWinth: 12
    };
},
mounted() {
    // 获取菜单
    EquipmentService
    .getEquipment()
    .then(res => {
        console.log(res);
        this.departmentList = res.Equipment;

        this.role = res.Role;
        
    })
    .catch(err => {
        console.log("菜单获取失败：" + err);
    });
},
methods: {
    submit() {
        // 确定按钮
    let params = new URLSearchParams();
    params.append("ME_ID", this.form.ME_ID);
    params.append("EN_ID", this.form.EN_NAME);
    params.append("ME_POSITION", this.form.ME_POSITION);
    params.append("ME_STATE", this.form.ME_STATE);
    params.append("BUY_DATE", this.form.BUY_DATE);
    params.append("BUY_NAME", this.form.BUY_NAME);

EquipmentService
        .upEquipment(params)
        .then(res => {
          //添加成功 刷新列表
                this.$message({
                message: "恭喜你，修改成功",
                type: "success"
                });
        this.updataEquipmentVisible = false;
        this.$router.go(0);
        this.$refs.updataEquipment.getDataList();
        
        })
        .catch(err => {
          //添加失败 dosomething
        });
    }
}
};
</script>

<style scoped>
</style>