<template>
  <div>
    <div>
      <el-form :inline="true" size="mini">
        <label style="font-size:22px;font-weight:bold;">费用情况</label>&nbsp;
        <el-form-item style="margin-top:3px;">
          <el-form-item label="统计维度:" :span="2">
            <el-select v-model="value" placeholder="请选择" @change="chooseTask">
              <el-option v-for="item in taskOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
      </el-form>
      <ve-line :data="chartData" :extend="chartExtend" width="430px" height="280px"></ve-line>
    </div>
  </div>
</template>

<script>
import degreeData from "./costData/degreeData";
import dateData from "./costData/dateData";
import typeData from "./costData/typeData";
import curingData from "./costData/curingData";
export default {
  data() {
    this.chartExtend = {
      legend: {
        right: "0%",
        itemWidth: 12,
        itemHeight: 8,
        itemGap: 3,
        textStyle: {
          color: "black",
          fontSize: 11
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "0%",
        right: "3%",
        bottom: "0%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        axisLabel: {
          interval: 0,
          rotate: 40,
          show: true,
          textStyle: {
            color: "black" /* 修改字体颜色 */,
            fontSize: 12
            /* 修改字体大小 */
          }
        }
      },
      yAxis: {
        //y轴
        axisLabel: {
          show: true,
          textStyle: {
            color: "#6DBCF5",
            fontSize: 9
          }
        }
      },
      color: ["#EE2C2C", "#912CEE", "#1E90FF"],
      series: {
        barWidth: 25
      }
    };
    return {
      taskOptions: [
        {
          value: "1",
          label: "日期"
        },
        {
          value: "2",
          label: "设备类别"
        },
        {
          value: "3",
          label: "养护类型"
        },
        {
          value: "4",
          label: "地点"
        }
      ],
      value: "1",
      chartData: dateData
    };
  },
  methods: {
    chooseTask() {
      switch (this.value) {
        case "1":
          this.chartData = dateData;
          break;
        case "2":
          this.chartData = typeData;
          break;
        case "3":
          this.chartData = curingData;
          break;
        case "4":
          this.chartData = degreeData;
          break;
        default:
          this.chartData = "";
      }
    }
  }
};
</script>

<style scoped>
</style>