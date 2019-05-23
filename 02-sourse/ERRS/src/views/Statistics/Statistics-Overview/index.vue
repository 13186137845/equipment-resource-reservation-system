<template>
  <div class="bg">
    <div class="container">
      <ul
        class="fh-ul"
        style="background: url(../../../assets/img/Statistics-Overview-bg.png) no-repeat; background-size:cover;"
      >
        <li class="li1 li3">
          <div class="li1-3-top">
            <div style="padding:2% 20px 4%;color:#fff;">今日报修情况</div>
            <ul class="li1-3-ul">
              <li>
                <img
                  src="../../../assets/img/img1.png"
                />
                <div class="text-absolute" style="color:#FD71AE;">
                  <h5 id="todayReportingFaults">0</h5>
                  <div>今日报修</div>
                </div>
              </li>
              <li>
                <img
                  src="../../../assets/img/img1.png"
                />
                <div class="text-absolute" style="color:#FFC422;">
                  <h5 id="todayReportingFaults1">0</h5>
                  <div>待分派</div>
                </div>
              </li>
              <li>
                <img
                  src="../../../assets/img/img1.png"
                />
                <div class="text-absolute" style="color:#6FB4F0;">
                  <h5 id="todayReportingFaults23">0</h5>
                  <div>待处理</div>
                </div>
              </li>
              <li>
                <img
                  src="../../../assets/img/img1.png"
                />
                <div class="text-absolute" style="color:#F29A74;">
                  <h5 id="todayReportingFaults4">0</h5>
                  <div>已完成</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="li1-3-footer">
            <div class="yibiao">
              <div
                id="yibiao1"
                style="width: 100%; height: 100%; -webkit-tap-highlight-color: transparent; user-select: none;"
                _echarts_instance_="ec_1558424606279"
              >
                <div
                  style="position: relative; overflow: hidden; width: 138px; height: 127px; padding: 0px; margin-top:-20px; border-width: 0px; cursor: default;"
                >
                 <!-- 调用仪表图组件 -->               
                  <maintenance />
                </div>
              </div>
              <div class="yibiao-title" style="color:#2AD2DF; margin-top:-5px">
                养护任务完成率
              </div>
            </div>
            <div class="yibiao">
              <div
                id="yibiao2"
                style="width: 100%; height: 100%; -webkit-tap-highlight-color: transparent; user-select: none;"
                _echarts_instance_="ec_1558424606278"
              >
                <div
                  style="position: relative; overflow: hidden; width: 200px; height: 200px; padding: 0px; margin-top:-30px; border-width: 0px; cursor: default;"
                >
                <!-- 调用仪表图组件 -->    
                  <repair />
                </div>
              </div>
              <div class="yibiao-title" style="color:#2992FD; margin-top:-5px">
                设备完好率
              </div>
            </div>
            <div class="yibiao">
              <div
                id="yibiao3"
                style="width: 100%; height: 100%; -webkit-tap-highlight-color: transparent; user-select: none;"
                _echarts_instance_="ec_1558424606277"
              >
                <div
                  style="position: relative; overflow: hidden; width: 138px; height: 127px; padding: 0px; margin-top:-20px; border-width: 0px; cursor: default;"
                >
                <!-- 调用仪表图组件 -->
                  <inspection />
                </div>
              </div>
              <div class="yibiao-title" style="color:#FDC21E; margin-top:-6px">
                巡检任务完成率
              </div>
            </div>
          </div>
        </li>
        <li
          class="li1 li4"
          style="position:relative;text-align:center;padding:2%;"
        >
          <p style="margin-top:-55px; margin-left:-300px">不同类型设备数量</p>
          <img
            src="../../../assets/img/bg2.png"
            style="max-width:100%;max-height:100%;margin-top:40px"
          />
          <div
            id="chart"
            style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px; -webkit-tap-highlight-color: transparent; user-select: none;"
            _echarts_instance_="ec_1558424606276"
          >
            <div
              style="position: relative; overflow: hidden; width: 458px; height: 371px; padding: 0px; margin-top: 30px; margin-left:12px; border-width: 0px; cursor: default;"
            >
            <!-- 调用玫瑰图组件 -->
              <equType />
            </div>
            <div
              style='position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px/21px "Microsoft YaHei"; padding: 5px; left: 225px; top: 191px; pointer-events: none;'
            >
              精整：9
            </div>
          </div>
        </li>
        <li class="li1 li5">
          <div class="li1-5-top">
            <ul>
              <li class="lia">
                设备总数：<span id="totalDeviceCount">45</span>
              </li>
              <li class="lia lic">
                总价值：<span id="totalDeviceValue">44811341.18</span>
              </li>
              <li class="lib" style="color:#FF70B1;">
                报废：<span id="scrappedDeviceCount">1</span>
              </li>
              <li class="lib" style="color:#6FB4F0;">
                故障：<span id="failureDeviceCount">11</span>
              </li>
              <li class="lib" style="color:#F39B77;">
                变卖：<span id="soldDeviceCount">1</span>
              </li>
            </ul>
          </div>
          <div class="li1-5-footer">
            <p>综合设备使用效率</p>
            <div
              id="circle"
              style="width: 100%; height: 100%; -webkit-tap-highlight-color: transparent; user-select: none;"
              _echarts_instance_="ec_1558424606280"
            >
              <div
                style="position: relative; overflow: hidden; width: 376px; height: 254px; padding: 0px; margin-top: -24px; border-width: 0px;"
              >
              <!-- 调用雷达图组件 -->
                <equ-ware />
              </div>
            </div>
          </div>
        </li>
        <li class="li2 li3">
          <p>设备价值，维修费用、养护费用统计</p>
          <div
            id="line2"
            style="width: 100%; height: 100%; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;"
            _echarts_instance_="ec_1558424606281"
          >
            <div
              style="position: relative; overflow: hidden; width: 510px; height: 276px; padding: 0px; margin-top:-3%; border-width: 0px; cursor: default;"
            >
            <!-- 调用柱形图组件 -->
              <equmoney />
            </div>
          </div>
        </li>
        <li class="li2 li4">
          <p>近7个月采购成本，养护成本，维修成本</p>
          <div
            id="line1"
            style="width: 100%; height: 100%; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;"
            _echarts_instance_="ec_1558424606282"
          >
            <div
              style="position: relative; overflow: hidden; width: 438px; height: 276px; padding: 0px; margin-top:-3%; margin-left:6%; border-width: 0px; cursor: default;"
            >
            <!-- 使用折线图组件 -->
            <equ-near />
            </div>
          </div>
        </li>
        <li class="li2 li5">
          <p>近一个月养护完成情况</p>
          <div
            id="bar1"
            style="width: 100%; height: 100%; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;"
            _echarts_instance_="ec_1558424606283"
          >
            <div
              style="position: relative; overflow: hidden; width: 600px; height: 276px; padding: 0px; margin-top:-3%; margin-left:-2%; border-width: 0px;"
            >
            <!-- 调用柱形图组件 -->
            <equ-curing />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import repair from "../common/statistics-repair"
import maintenance from "../common/statistics-maintenance"
import inspection from "../common/statistics-inspection"
import equType from "../common/statistics-equType"
import equWare from "../common/statistics-equWare"
import equmoney from "../common/statistics-equmoney"
import equNear from  "../common/statistics-equNear"
import equCuring from "../common/statistics-equCuring"
export default {
  data() {
    return {
      equCount: 52,
      equPrise: 52599541.18,
      scarp: 1,
      fault: 2,
      sellof: 0
    };
  },
  components: {
    repair,
    maintenance,
    inspection,
    equType,
    equWare,
    equmoney,
    equNear,
    equCuring
  },
  mounted() {
    //全局监听键盘事件
    var _this = this;
    document.onkeydown = function(e) {
      let key = window.event.keyCode;
      if (key == 27) {
        //监听的键盘码
        window.event.preventDefault(); //关闭浏览器快捷键
        _this.KeyUpEsc(); //调用methods中的方法
      }
    };
  },
  methods: {
    KeyUpEsc() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
input {
  display: none;
}
p {
  padding: 1%;
  color: aliceblue;
}
.bg {
  width: 100%;
  height: 100%;
  background: #0a0f25;
}
.container {
  width: 100%;
  height: 100%;
  background: url("../../../assets/img/Statistics-Overview-bg.png") no-repeat;
  background-size: cover;
}
.fh-ul {
  overflow: hidden;
  height: 100%;
  background-size: cover;
}
html {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  width: 100%;
  height: 100%;
  padding: 1% 1%;
  background: #0a0f25;
  min-width: 1366px;
  min-height: 640px;
}
li {
  list-style: none;
}
.fh-ul {
  overflow: hidden;
  height: 100%;
  padding: 6.5% 0% 0%;
}
.fh-ul > li {
  float: left;
  margin: 1%;
  padding: 0.7%;
}
.fh-ul > .li1 {
  height: 50%;
}
.fh-ul > .li2 {
  height: 40%;
  background: #0c132d;
  border: 1px solid #5868a6;
}
.fh-ul > .li3 {
  width: 32%;
}
.fh-ul > .li4 {
  width: 34%;
}
.fh-ul > .li5 {
  width: 28%;
}
.fh-ul .li1,
.li5 {
  padding: 0px;
}
.fh-ul .li1-5-top {
  width: 100%;
  background: #0c132d;
  border: 1px solid #5868a6;
  display: inline-block;
  height: 26%;
  margin-bottom: 5%;
}
.fh-ul .li1-5-footer {
  width: 100%;
  background: #0c132d;
  border: 1px solid #5868a6;
  display: inline-block;
  height: 69%;
}
.fh-ul .li1.li3 {
  width: 34%;
  height: 52%;
  margin: 0px;
}
.fh-ul .li1-3-top {
  width: 100%;
  display: inline-block;
  height: 36%;
}
.fh-ul .li1-3-footer {
  width: 100%;
  display: inline-block;
  height: 60%;
  position: relative;
}
.li1-3-footer .yibiao {
  position: absolute;
  display: inline-block;
  border-radius: 50%;
}
.li1-3-footer .yibiao:nth-child(1) {
  left: 5%;
  bottom: 4%;
  height: 55%;
  width: 30%;
}
.li1-3-footer .yibiao:nth-child(2) {
  left: 31.25%;
  top: 0%;
  height: 65%;
  width: 37.5%;
}
.li1-3-footer .yibiao:nth-child(3) {
  right: 5%;
  bottom: 4%;
  height: 55%;
  width: 30%;
}
.yibiao-title {
  text-align: center;
  color: #fff;
  margin-top: -14%;
  font-size: 12px;
}
.li1-3-ul {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.li1-3-ul li {
  float: left;
  position: relative;
  height: 100%;
  width: 25%;
  text-align: center;
}
.li1-3-ul li img {
  max-height: 100%;
  max-width: 100%;
  animation-fill-mode: forwards;
}
@keyframes myfirst1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
.li1-3-ul li .text-absolute {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  padding: 12%;
  animation-fill-mode: forwards;
}
@keyframes myfirst2 {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.text-absolute > h5 {
  font-size: 34px;
  padding-top: 8px;
}
.text-absolute > div {
  font-size: 12px;
}
.li1-5-top ul {
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 4% 3%;
}
.li1-5-top ul li {
  float: left;
}
.li1-5-top ul .lia {
  width: 40%;
  color: #94f1ff;
  font-size: 1.2em;
  padding-bottom: 3%;
}
.li1-5-top ul .lia > span {
  color: yellow;
  font-weight: 600;
}
.li1-5-top ul .lia.lic {
  width: 60%;
}
.li1-5-top ul .lib {
  width: 33.33%;
  color: #44e3ff;
  font-size: 1em;
}
</style>
