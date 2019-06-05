<template>
  <d2-container>
    <template>
      <el-table :data="listData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="设备名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="设备地址">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="设备ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="借用者">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="操作敏感度">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="消息反馈">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="具体描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="id"></el-table-column>
        <el-table-column label="设备" prop="name"></el-table-column>
        <el-table-column label="描述" prop="desc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </d2-container>
</template>
<script>
import tableData from "./feedBackEX/tableData";
export default {
  data() {
    return {
      listData: tableData
    };
  },
  methods: {
    handleDelete(index, row) {
      //   console.log(index, row);
      this.listData.splice(index, 1);
      this.$message({
        message: "删除成功",
        type: "success"
      });
    }
  }
};
</script>
<style scoped>
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



