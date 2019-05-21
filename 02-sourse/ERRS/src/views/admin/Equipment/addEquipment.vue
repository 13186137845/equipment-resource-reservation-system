<template>
<!-- 添加用户的弹出层 -->
<el-dialog
    title="添加设备名称"
    :visible.sync="addEquipmentVisible"
    width="40%"
    style="margin-top:-60px"
>
    <el-form :model="form" style="margin-top:-20px"   :rules="dataRule"  ref="form">
    <el-form-item label="设备编号："  prop="ME_ID" :label-width="formLabelWidth" :span="2" >
        <el-col :span="colWinth">
        <el-input v-model="form.ME_ID" autocomplete="off" ></el-input>
        </el-col>
    </el-form-item>
    <el-form-item label="设备名称：" :label-width="formLabelWidth" :span="2" prop="EN_NAME">
        <el-select v-model="form.EN_NAME"  placeholder="请选择设备名称" >
        <el-option
            v-for="item in departmentList"
            :key="item.ME_ID"
            :label="item.EN_NAME"
            :value="item.EN_ID"
        ></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="设备地址：" :label-width="formLabelWidth" prop="ME_POSITION"  :span="2">
        <el-col :span="colWinth">
        <el-input v-model="form.ME_POSITION"  autocomplete="off"></el-input>
        </el-col>
    </el-form-item>
    <!-- 设备负责人，设备购入时间 -->
    <el-form-item label="设备购入时间：" :label-width="formLabelWidth" :span="2">
        <el-col :span="colWinth">
        <el-date-picker
        v-model="form.BUY_DATE"
        type="date"
        value-format="yyyy-MM-dd hh:mm:ss"
        placeholder="选择日期">
    </el-date-picker>
        </el-col>
    </el-form-item>
    <el-form-item label="设备购入负责人：" :label-width="formLabelWidth" :span="2">
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
name: "addEquipment",
data() {
    return { 
    
    addEquipmentVisible: false,
    form: {
        
        ME_ID: "",
        EN_NAME: "",
        EN_ID: "",
        ME_POSITION: "",
        BUY_DATE: "",
        BUY_NAME: "",
        
    },
    departmentList: [],
    role: [],
    formLabelWidth: "120px",
    colWinth: 12
    };
},
mounted() {
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

    
}
,
computed: {
    dataRule() {
        return{
        ME_ID: [{ required: true, message: "编号不能为空", trigger: "blur" }],
        EN_NAME: [{ required: true, message: "设备名称不能为空", trigger: "blur" }],
        ME_POSITION: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        }
    }
    }
    ,

methods: {
submit() {
    let params = new URLSearchParams();
    params.append("ME_ID", this.form.ME_ID);
    params.append("EN_ID", this.form.EN_NAME);
    params.append("ME_POSITION", this.form.ME_POSITION);
    params.append("BUY_DATE", this.form.BUY_DATE);
    params.append("BUY_NAME", this.form.BUY_NAME);

    console.log()
    EquipmentService
        .addEquipment(params)
        .then(res => {
          //添加成功 刷新列表

                this.$message({
                message: "恭喜你，添加成功",
                type: "success"
                });
        this.addEquipmentVisible = false;
        this.$router.go(0);
        this.$refs.addEquipment.getDataList();
        })
        .catch(err => {
          //添加失败 dosomething
        console.log(err);

        });

    }
}
};
</script>

<style scoped>
</style>