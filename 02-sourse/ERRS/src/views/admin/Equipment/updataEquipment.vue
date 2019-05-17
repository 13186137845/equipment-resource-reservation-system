<template>
<!-- 添加用户的弹出层 -->
<el-dialog
    title="修改设备"
    :visible.sync="updataEquipmentVisible"
    width="40%"
    style="margin-top:-60px"
>
    <el-form :model="form" style="margin-top:-20px">
    <el-form-item label="设备编号：" :label-width="formLabelWidth" :span="2">
        <el-col :span="colWinth">
        <el-input v-model="form.MI_NAME" autocomplete="off"></el-input>
        </el-col>
    </el-form-item>
    <el-form-item label="设备名称：" :label-width="formLabelWidth" :span="2">
        <el-select v-model="form.MD_NAME" placeholder="请选择设备名称">
        <el-option
            v-for="item in departmentList"
            :key="item.MD_ID"
            :label="item.MD_NAME"
            :value="item.MD_ID"
        ></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="设备地址：" :label-width="formLabelWidth" :span="2">
        <el-col :span="colWinth">
        <el-input v-model="form.MU_NO" autocomplete="off"></el-input>
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
    updataEquipmentVisible: false,
    form: {
        ME_ID: "",
        MD_NAME: "",
        ME_POSITION: "",
    
    },
    departmentList: [],
    role: [],
    formLabelWidth: "120px",
    colWinth: 12
    };
},
mounted() {
    //页面初始化获取下拉菜单
    // adminEquipmentService
    // .getAddUserMenu()
    // .then(res => {
    //     console.log(res);
    //     this.departmentList = res.Department;
    //     this.role = res.Role;
    // })
    // .catch(err => {
    //     console.log("菜单获取失败：" + err);
    // });
},
methods: {
    submit() {
    let params = new URLSearchParams();
    params.append("ME_ID", this.form.ME_ID);
    params.append("ME_NAME", this.form.ME_NAME);
    params.append("ME_POSITION", this.form.ME_POSITION);
    params.append("ME_STATE", this.form.ME_STATE);

    // adminUserService
    //     .addUser(params)
    //     .then(res => {
    //       //添加成功 刷新列表
    //     console.log("success");
    //     this.addUserVisible = false;
    //     this.$refs.adduser.getDataList();
    //     })
    //     .catch(err => {
    //       //添加失败 dosomething
    //     });
    }
}
};
</script>

<style scoped>
</style>