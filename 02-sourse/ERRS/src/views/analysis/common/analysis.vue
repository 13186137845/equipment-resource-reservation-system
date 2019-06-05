<template>
  <div>
    <el-dialog :visible.sync="dialogAanlysis" width="30%" title="分析结果" :before-close="handleClose" style="margin:3% atuo">
      <el-table :data="tableData" style="width: 100%" border size="small" stripe="true"  :row-class-name="tableRowClassName">
        <el-table-column prop="type" label="分析项">
        </el-table-column>
        <el-table-column prop="result" align="center" label="分析结果">
        </el-table-column>
      </el-table>
      <el-col :span="24">
        <span style="color:red">*温馨提示：{{Tips}}</span>
      </el-col>
    </el-dialog>
  </div>
</template>

<script>
import curingData from "../curing/analysisData"
import tableData from '../curing/tableData';
export default {
  data() {
    return {
      tableData:[],
      Tips:curingData[curingData.length-1].title,
      dialogAanlysis: false
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  },
  mounted () {
    for(let i=0;i<curingData.length-1;i++){
      this.tableData.push(curingData[i]);
    }
    // console.log(curingData)
  }
};
</script>

<style scoped>
.el-table .warning-row {
  background: rgb(226, 148, 3);
}

.el-table .success-row {
  background: #4ec210;
}
</style>