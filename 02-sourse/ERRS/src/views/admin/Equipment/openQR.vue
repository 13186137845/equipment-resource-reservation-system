<template>
  <d2-container>
    <el-row>
      <el-button type="primary" @click="downloadResult()" >二维码下载</el-button>
    </el-row>
    <div class="flexWrapper">
      <div class="wrapperRight" ref="resultCanvas" >
        <div class="rightContent" style="display:flex;flex-direction: row;flex-wrap:wrap;padding: 10px;">
          <template>
            <el-row>
              <el-col :span="8" v-for="(item,index) in departmentList" :key="index" style="padding: 3px;border:1px dashed #999;; ">
                <el-card :body-style="{ padding: '0px' }">
                  <qriously :value="item.ME_ID+''" :size="150"/>
                  <time class="id">设备ID：{{ item.ME_ID }}</time>
                  <time class="date">设备购进日期：{{ item.BUY_DATE }}</time>
                  <time class="name">设备购买者：{{ item.BUY_NAME }}</time>
                  <time class="position">设备地址：{{ item.ME_POSITION }}</time>
                  <time class="time">设备名称：{{ item.EN_NAME }}</time>
                </el-card>
              </el-col>
            </el-row>
          </template>
        </div>
      </div>
    </div>
  </d2-container>
</template>
<script>
import { EquipmentService } from "@/common/api";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      departmentList: "",
      value: ""
    };
  },
  mounted() {
    EquipmentService.getEquipmentInfo()
      .then(res => {
        console.log(res);
        this.departmentList = res.list;
      })
      .catch(err => {
        console.log("获取用户信息失败：" + err);
      });
  },
  methods: {
    dataURLToBlob(dataurl) {
      //ie 图片转格式
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    downloadResult() {
      let canvasID = this.$refs.resultCanvas;
      let that = this;
      let a = document.createElement("a");
      html2canvas(canvasID).then(canvas => {
        let dom = document.body.appendChild(canvas);
        dom.style.display = "none";
        a.style.display = "none";
        document.body.removeChild(dom);
        let blob = that.dataURLToBlob(dom.toDataURL("image/png"));
        a.setAttribute("href", URL.createObjectURL(blob));
        a.setAttribute("download", "xxxxxx.png");
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(blob);
        document.body.removeChild(a);
      });
    }
  }
};
</script>
<style scoped>
.position {
  padding: 10px;
  font-size: 16px;
  float: right;
  margin-top: -25%;
  color: #999;
}

.id{
  padding: 10px;
  font-size: 17px;
  color: #999;
  float: right;
  margin-top: -31%;
}

.date{
  padding: 10px;
  font-size: 13px;
  color: #999;
  float: right;
  margin-top: -10%;
  
}

.name{
  padding: 10px;
  font-size: 13px;
  color: #999;
  float: right;
  margin-left: 150px;
  margin-top: -15%;
}

.time {
  padding: 10px;
  font-size: 17px;
  float: right;
  margin-top: -37%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>



