<template>
  <d2-container :filename="filename">
    <div>
      <el-carousel :interval="4000" type="card" height="250px">
        <el-carousel-item>
          <img
            width="100%"
            height="100%"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559209260586&di=41fb4e765987ada0e84f068f64870d9f&imgtype=0&src=http%3A%2F%2Fi8.hexun.com%2F2017-01-10%2F187680228.jpg"
            alt
          >
        </el-carousel-item>
        <el-carousel-item>
          <img
            width="100%"
            height="100%"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559209402931&di=14ef37fb2b86028a7a32ec423a581f23&imgtype=0&src=http%3A%2F%2Ffile06.16sucai.com%2F2016%2F0706%2Fe05be4176410df47552fb362ed6489e4.jpg"
            alt
          >
        </el-carousel-item>
        <el-carousel-item>
          <img
            width="100%"
            height="100%"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559209402931&di=436bb33ba7980116964c5c0bd528458f&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM02%2F31%2F2B%2FwKhQplWSVECECUq6AAAAAG8X_yM220.jpg"
            alt
          >
        </el-carousel-item>
        <el-carousel-item>
          <img
            width="100%"
            height="100%"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559804148&di=ca8c6722e6d6fb1b28253feebd7362d4&imgtype=jpg&er=1&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180420%2F94241c98640642d6a9b915d716872ba8.jpeg"
            alt
          >
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <el-card class="box-card">
        <div v-for="o in 4" :key="o" class="text item">
          <label>物理诊断器具（体温计、血压表、显微镜、测听计、各种生理记录仪等）、影像类（X光机、CT扫描、磁共振、B超等）、分析仪器（各种类型的计数仪、生化、免疫分析仪器等）、电生理类（如心电图机、脑电图机、肌电图机等）。</label>
          <label class="lb">2019/5/30</label>
          <hr>
        </div>
      </el-card>
    </div>
  </d2-container>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
/* 轮播图 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* 卡片 */
.lb {
  float: right;
  color: darkgray;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
}
</style>


