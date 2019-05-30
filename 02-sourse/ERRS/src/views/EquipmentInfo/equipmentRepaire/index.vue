<template>
  <d2-container :filename="filename">
    <template slot="header">设备报修</template>
    <el-form :model="form" style="margin-top:-20px" :rules="dataRule" ref="form">
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">报修设备编号：</label>
          </el-col>
          <el-col :span="5">
            <el-select v-model="form.ME_ID" filterable placeholder="请选择设备报修编号">
            <el-option
                v-for="item in departmentList"
                :key="item.ME_ID"
                :label="item.ME_ID"
                :value="item.ME_ID"
            ></el-option>
            </el-select>
         
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab"  >报修设备地点：</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="form.MRE_LOCATION" clearable placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">申请报修人员姓名：</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="form.INS_USER"  readonly  :disabled="edit" clearable ></el-input>
          </el-col>
        </el-row>
      
        <el-row :gutter="20" class="bookings-dhk">
          <el-col :span="3">
            <label class="bookings-lab">请详细描述产品损坏信息：</label>
          </el-col>
          <el-col :span="15">
            <el-input type="textarea" clearable placeholder="请输入内容" v-model="form.MRE_EXPLAIN"></el-input>
          </el-col>
        </el-row>
        
        <el-row :gutter="20" class="bookings-dhk">
          <el-button type="primary" plain @click="bookingsopen">报修</el-button>
          <el-button type="primary" plain @click="bookingsclose">取消</el-button>
        </el-row>
       
           </el-form> 
  </d2-container>
</template>


<script>
import { mapState, mapActions } from "vuex";
import { getRepair } from "@/common/api";
import { EquipmentService } from "@/common/api";
import { debounce } from "lodash"; //消抖功能引入
export default {
  name: 'page2',
  data () {
    return {
      readonly: true,
      edit: true,
      input: "", //注册
      value1: "", //注册
      textarea2: "", //注册
      show3:"",
      filename: __filename,
        departmentList: [],
        form: {
        ME_ID: "",
        MRE_LOCATION: "",
        MRE_EXPLAIN : "",
        INS_USER:"" 
        }
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"]),
      dataRule() {
        return {

        ME_ID: [
            { required: true, message: "设备编号不能为空", trigger: "blur" }
        ],
        MRE_LOCATION: [
            { required: true, message: "设备地址不能为空", trigger: "blur" }
        ],
        MRE_EXPLAIN:[
            { required: true, message: "设备详情不能为空", trigger: "blur" }
        ]
     
        };
    }
  },
  mounted () {
    this.form.INS_USER = "fofo",//this.$store.state.d2admin.user.info.name
    EquipmentService.getEquipmentNumber()
        .then(res => {
        this.departmentList = res.ME_IDList;
     
        })
        .catch(err => {
        console.log("数据初始化失败：" + err);
        });
  },
  methods: {
 bookingsopen: debounce(
        function() {
        //提交时消抖
        this.$refs["form"].validate(valid => {
          //校检表单
            if (valid) {
            //校检通过
            let params = new URLSearchParams();
        
            params.append("ME_ID", this.form.ME_ID);
            params.append("MRE_LOCATION", this.form.MRE_LOCATION);
             params.append("MRE_EXPLAIN", this.form.MRE_EXPLAIN);
             params.append("INS_USER",this.form.INS_USER );

    
            console.log();
            getRepair.getRepair(params)
                .then(res => {
                //添加成功 刷新列表

                this.$message({
                    message: "报修成功",
                    type: "success"
                });
                
                })
                .catch(err => {
                //添加失败 dosomething
                console.log(err);
                });
            } else {
            return false;
            }
        });
        },
        1000,
        { leading: true, trailing: false }
    )
    ,

    //点击确定end
    //点击取消start
    bookingsclose() {
      this.$message({
        message: "取消报修",
        type: "warning"
      });
    
    }
  }
}
</script>
<style >

.bookings-dhk {
  padding: 15px;
  padding-left: 50px;
}
.bookings-lab {
  line-height: 40px;
}
</style>

