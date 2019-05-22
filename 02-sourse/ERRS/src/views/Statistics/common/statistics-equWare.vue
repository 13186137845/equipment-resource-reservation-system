<template>
   <ve-radar :data="chartData" :settings="chartSettings" width="400px" height="230px" :legend-visible="false"></ve-radar>
</template>

<script>
  export default {
    data () {
      this.chartSettings = {
        labelMap: {
          '设备': '综合使用效率',
          '设备完好率': '设备完好率',
          '表现性': '表现性',
          '稼动率': '稼动率',
          '质量指数':'质量指数'
        }
      }
      return {
        chartData: {
          columns: ['设备', '设备完好率', '表现性', '稼动率','质量指数'],
          rows: [
            { '设备': '综合使用效率', '设备完好率': 99, '表现性': 89, '稼动率': 73.21,'质量指数':98.88 },
          ]
        }
      }
    }
  }
</script>
<style scoped>
</style>