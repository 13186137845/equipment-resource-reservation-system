
<template>
  <d2-container :filename="filename">
    <template slot="header">设备信息</template>
        <!--  
          表格 -->
    <el-table
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%">
    <!-- 表格绑定全局搜索和分页 -->
    <el-table-column
      prop="date"
      label="设备编号"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="设备名称"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="设备状态"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="查看信息"
      >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
    
  </el-table>
        <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]" 
      :page-size="pagesize"         
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">   
    </el-pagination>

  </d2-container>
</template>

<script>
export default {
  name: 'page2',
  data () {
    return {
      
      filename: __filename,
      search: '',//全局查找
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '已预约'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '已预约'
        }, {
          date: '2016-05-01',
          name: '李小白',
          address: '已预约'
        }, {
          date: '2016-05-03',
          name: '猪小李',
          address: '已预约'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '未预约'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '未预约'
        }, {
          date: '2016-05-01',
          name: '李小白',
          address: '未预约'
        }, {
          date: '2016-05-03',
          name: '猪小李',
          address: '已预约'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '未预约'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '已预约'
        }, {
          date: '2016-05-01',
          name: '李小白',
          address: '未预约'
        }, {
          date: '2016-05-03',
          name: '猪小李',
          address: '已预约'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '已预约'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '未预约'
        }, {
          date: '2016-05-01',
          name: '李小白',
          address: '已预约'
        }, {
          date: '2016-05-03',
          name: '猪小李',
          address: '已预约'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '已预约'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '已预约'
        }, {
          date: '2016-05-01',
          name: '李小白',
          address: '已预约'
        }, {
          date: '2016-05-03',
          name: '猪小李',
          address: '已预约'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '已预约'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '已预约'
        }, {
          date: '2016-05-01',
          name: '李小白',
          address: '已预约'
        }, {
          date: '2016-05-03',
          name: '猪小李',
          address: '已预约'
        }],
          currentPage:1, //分页默认第几页
          pagesize:5,  //默认一页多少条数据

    }
    
  },
    methods: {
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
        handleClick(row) {
        this.$alert(JSON.stringify(row), '预约信息查看', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
      }
  
  
}
</script>
