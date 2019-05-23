<template>
  <d2-container :filename="filename">
    <!-- 条件查询 -->
    <el-form :inline="true" :lable-position="lableposition" label-width="90px" size="mini">
      <el-form-item>
        <el-form-item label="申诉编号：" :span="2">
          <el-input autocomplete="off" v-model="form.ME_ID"></el-input>
        </el-form-item>
        <el-form-item label="申诉类型" :span="2">
          <el-input v-model="form.ME_POSITION" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="操作敏感度" :span="2">
          <el-select v-model="form.ME_STATE" clearable filterable placeholder="请选择设备状态">
            <el-option
              v-for="item in state"
              :key="item.value"
              :label="item.states"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="info" @click="handle()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      :data="tableData&&tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" label="申诉编号" prop="ME_ID"></el-table-column>
      <el-table-column align="center" label="申诉类型" prop="ME_POSITION"></el-table-column>
      <el-table-column align="center" label="申诉敏感度" prop="ME_STATE">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-if="scope.row.ME_STATE==0">0级敏感度</el-button>
          <el-button size="mini" type="warning" v-if="scope.row.ME_STATE==1">1级敏感度</el-button>
          <el-button size="mini" type="warning" v-if="scope.row.ME_STATE==2">2级敏感度</el-button>
          <el-button size="mini" type="warning" v-if="scope.row.ME_STATE==3">3级敏感度</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <!-- 按钮start -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            slot="reference"
            @click="handleEdit(scope.$index, scope.row)"
          >查看进度</el-button>
        </template>
      </el-table-column>
      <!-- 按钮end -->
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>
  </d2-container>
</template>

<script>
export default {
  name: "bookingSystem",
  data() {
    return {
      //样式规范
      lableposition: "left",
      //查询条件
      form: {
        ME_ID: "",
        ME_POSITION: "",
        ME_STATE: ""
      },
      state:[],
      dialogFormVisible: false,
      currentPage: 1, //初始页
      pagesize: 10, //每页的数据
      tableData: [], //初始化表
      defaultData: [], //重置表
      filename: __filename,
      //设备列表
      departmentList: []
    };
  },
  components: {},
  mounted() {},
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      //点击第几页
    }
  }
};
</script>

<style scoped>
.bookings-lab {
  line-height: 40px;
}
.demonstration {
  font-size: 15px;
}
</style>

