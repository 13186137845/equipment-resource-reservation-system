 <template>
  <d2-container>
    <el-form :inline="true" size="mini" :model="dataForm">
      <el-form-item>
        <el-input v-model="dataForm.username" placeholder="用户名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button>确定</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="adduser">添加</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="userExport">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table size="mini" :data="dataList" border @selection-change="dataListSelectionChangeHandle" @sort-change="dataListSortChangeHandle" style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50" />
      <el-table-column prop="MI_NAME" :label="tableHead.MI_NAME" header-align="center" align="center" />
      <el-table-column prop="MU_NO" :label="tableHead.MU_NO" header-align="center" align="center" />
      <el-table-column prop="MD_NAME" :label="tableHead.MD_NAME" header-align="center" align="center" />
      <el-table-column prop="MI_PHONE" :label="tableHead.MI_PHONE" header-align="center" align="center" />
      <el-table-column prop="MR_INFORMATION" :label="tableHead.MR_INFORMATION" header-align="center" align="center" />
      <el-table-column prop="Project" :label="tableHead.project" header-align="center" align="center" />
      <el-table-column prop="projectDuty" :label="tableHead.projectDuty" header-align="center" align="center" />
      <el-table-column :label="tableHead.handle" fixed="right" width="149">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="updateUser(scope.$index, scope.row.id)">编辑</el-button>
          <el-button type="text" size="mini" @click="deleuser(scope.$index,scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-user ref="adduser" @getMessage="getVal" />
    <update-user ref="updateuser" />
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="dataList.length">
    </el-pagination>
  </d2-container>
</template>

<script>
//暂时不用混合方法
// import mixinViewModule from '@/mixins/view-module'
//导入添加用户模块
import addUser from "../../common/addUser";
//导入修改用户模块
import updateUser from "../../common/updateUser";
//导入获取用户信息的方法
import { adminUserService } from "@/common/api";

export default {
  name: "users",
  data() {
    return {
      //分页
      currentPage: 1, //初始页
      pagesize: 5,
      dataForm: {
        username: ""
      },
      tableHead: {
        //表头参数
        MI_NAME: "姓名",
        MD_NAME: "部门",
        MU_NO: "工号",
        MI_PHONE: "手机号",
        MR_INFORMATION: "权限",
        project: "参与项目",
        projectDuty: "项目职责",
        handle: "操作"
        //获取的数据中有一个MU_ID，即用户id并没有在表格中展示
      },
      dataList: [],
      title: "标题"
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      adminUserService
        .getInfo()
        .then(res => {
          this.dataList = res.list;
        })
        .catch(err => {
          this.$message.error("获取用户信息失败！");
        });
    },
    adduser() {
      this.$refs.adduser.addUserVisible = true;
    },
    //修改用户数据
    updateUser(index, row) {
      this.$refs.updateuser.updateUserVisible = true;
      this.$refs.updateuser.form = this.dataList[index];
    },
    //删除用户数据
    deleuser(index, row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = new URLSearchParams();
          params.append("MI_ID", this.dataList[index].MI_ID);
          params.append("MU_ID", this.dataList[index].MU_ID);
          adminUserService
            .deleteUser(params)
            .then(res => {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.dataList.splice(index, 1);
            })
            .catch(err => {
              this.$message({
                message: "系统异常，删除失败",
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      //点击第几页
    },
    //得到子组件传来的值
    getVal(msg) {
      this.dataList.push(msg[0]);
    },
    dataListSelectionChangeHandle() {
      // console.log("数据操作");
    },
    dataListSortChangeHandle() {
      // console.log("数据排序");
    },
    userExport() {
      //导出功能
      //定义导出列
      const columns = [
        {
          label: "姓名",
          prop: "MI_NAME"
        },
        {
          label: "工号",
          prop: "MU_NO"
        },
        {
          label: "部门",
          prop: "MI_NAME"
        },
        {
          label: "手机号",
          prop: "MI_PHONE"
        },
        {
          label: "权限",
          prop: "MR_INFORMATION"
        },
        {
          label: "参与项目",
          prop: "project"
        },
        {
          label: "项目职责",
          prop: "projectDuty"
        }
      ];
      const data = this.dataList;
      this.$export.csv({
        columns,
        data,
        title: "用户信息表"
      });
    }
  },
  components: {
    addUser,
    updateUser
  }
};
</script>
