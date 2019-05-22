<template>
  <div>
    <ve-pie :data="chartData"  :extend="chartExtend" :settings="chartSettings" width="492px" height="463px"></ve-pie>
  </div>
</template>
<script>
export default {
  data() {
    this.chartSettings = {
      roseType: "radius" 
    };
    this.chartExtend = {
      legend:{
        textStyle:{
          color:"#fff"
        }
      }
    };
    return {
      chartData: {
        columns: ["设备", "数量"],
        rows: [
          { 设备: "生产设备", 数量: 6 },
          { 设备: "办公设备", 数量: 12 },
          { 设备: "UTC", 数量: 2 },
          { 设备: "实验室设备", 数量: 6},
          { 设备: "细胞仪", 数量: 1 },
          { 设备: "测试设备", 数量: 3 },
          { 设备: "剪切设备", 数量: 4 },
          { 设备: "辅助设备", 数量: 9 },
          { 设备: "轴流风机", 数量: 2 },
          { 设备: "化验设备", 数量: 7 }
        ]
      }
    };
  }
};
</script>
<style scoped>
</style>