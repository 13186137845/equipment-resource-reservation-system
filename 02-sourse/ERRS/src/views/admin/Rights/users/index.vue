<template>
  <d2-container>
    <el-form :inline="true" size="mini" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.username" placeholder="用户名" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">确定</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateHandle()">添加</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="deleteHandle()">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="exportHandle()">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      size="mini"
      :data="dataList"
      border
      @selection-change="dataListSelectionChangeHandle"
      @sort-change="dataListSortChangeHandle"
      style="width: 100%;"
    >
      <el-table-column type="selection" header-align="center" align="center" width="50"/>
      <el-table-column
        prop="MI_NAME"
        :label="tableHead.MI_NAME"
        sortable="custom"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="MD_NAME"
        :label="tableHead.MD_NAME"
        header-align="center"
        align="center"
      />
      <el-table-column prop="MU_NO" :label="tableHead.MU_NO" header-align="center" align="center"/>
      <el-table-column
        prop="MI_PHONE"
        :label="tableHead.MI_PHONE"
        sortable="custom"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="project"
        :label="tableHead.project"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="projectDuty"
        :label="tableHead.projectDuty"
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
          <el-button type="text" size="mini" @click="addOrUpdateHandle(scope.row.id)">编辑</el-button>
          <el-button type="text" size="mini" @click="deleteHandle(scope.row.id)">删除</el-button>
          <el-button type="text" size="mini" @click="updatePassword(scope.row.id)">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>
  </d2-container>
</template>

<script>
// import mixinViewModule from '@/mixins/view-module'
// import AddOrUpdate from '../../common/user-add-or-update'
import { adminAccountService } from "@/common/api";

export default {
  name: "users",
  data() {
    return {
      dataForm: {
        username: ""
      },
      tableHead: {
        MI_NAME: "姓名",
        MD_NAME: "部门",
        MU_NO: "工号",
        MI_PHONE: "手机号",
        project: "参与项目",
        projectDuty: "项目职责",
        handle: "操作"
        //获取的数据中有一个MU_ID，即用户id并没有在表格中展示
      },
      dataList: []
    };
  },
  mounted() {
    //用户表格初始化
    adminAccountService
      .init()
      .then(res => {
        console.log(res);
        this.dataList = res.list;
      })
      .catch(err => {
        console.log("数据初始化失败：" + err);
      });
  },
  methods: {
    dataListSelectionChangeHandle() {
      console.log("数据操作");
    },
    dataListSortChangeHandle() {
      console.log("数据排序");
    }
  }
};
</script>

<style scoped>
</style>