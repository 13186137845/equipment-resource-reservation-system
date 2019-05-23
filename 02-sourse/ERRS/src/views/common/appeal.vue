<template>
<d2-container>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-steps :active="active" finish-status="success">
    <el-step title="步骤 1"></el-step>
    <el-step title="步骤 2"></el-step>
    <el-step title="步骤 3"></el-step>
    </el-steps>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
</d2-container>
</template>

<script>
export default {
    data(){
        return{
            active: 0,
            dialogVisible: false
        }
    },
    methods: {
    handleClose(done) {
    this.$confirm('确认关闭？')
        .then(res => {
            done();
        })
        .catch(err => {

        });
    },
    next() {
        if (this.active++ > 2) this.active = 0;
    }
    }
};
</script>

<style scoped>
</style>


