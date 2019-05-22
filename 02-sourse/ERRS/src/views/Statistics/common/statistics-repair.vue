<template>
<div>
  <ve-gauge :data="chartData" :extend="chartExtend" width="200px" height="230px"></ve-gauge>
</div>    
</template>
<script>
export default {
  data () {
   this.chartExtend = {
      series:{
        //仪表盘样式，[半径]、[颜色]等
        axisLine:{
          show: true,
          lineStyle: {
              color: [
                  [0.2, '#ff4500'],
                  [0.8, '#48b'],
                  [1, '#228b22']
              ],
              width: 10
          }
        },
        //仪表盘坐标轴小标记
        axisTick:{
          show:true,
          splitNumber:5,//分割大小
          lenght:3,
          lineStyle:{//样式相关
            color:"#eee",
            width:1,
            type:'solid'
          }
        },
        //坐标轴文本标签
        axisLabel:{
          show:true,
          formatter:null,
          textStyle:{
            color:"auto",
            fontSize:10
          }
        },
        //主分割线
        splitLine:{
          show:true,
          length:15
        },
        //指针样式
        pointer:{
          lenght:'40%',//长度
          width:3,//宽度
          color:"auto"
        },
        //仪表盘标题
        title:{
          show:true,
          offsetCenter:[0,'-40%'],
          textStyle:{
            color:"#333",
            fontSize:12
          }
        },
        //仪表盘详情
        detail:{
          show : true,
          backgroundColor: 'rgba(0,0,0,0)',
          borderWidth: 0,
          borderColor: '#ccc',
          width: 100,
          height: 40,
          offsetCenter: [0, '30%'],
          // formatter: "设备完好率",
          textStyle: {
              color: 'auto',
              fontSize : 10
          }
        }
      }
    }
    return {
      chartData: {
        name:"设备完好率",
        columns: ['type','value'],
        rows: [
          { type: '设备完好率', value: 99.4 }
        ]
      }
    }
  }
}
</script>
<style scoped>

</style>