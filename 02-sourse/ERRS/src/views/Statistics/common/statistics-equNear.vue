<template>
    <ve-line :data="chartData" :extend="chartExtend" width="430px" height="260px"></ve-line>
</template>

<script>
export default{
    data(){
        this.chartExtend={
            legend : {
                right : '0%',
                itemWidth : 12,
                itemHeight : 8,
                itemGap : 3,
                textStyle : {
                    color : '#fff',
                    fontSize : 11
                }
            },
            tooltip : {
                trigger : 'axis',
                axisPointer : { // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid : {
                left : '0%',
                right : '3%',
                bottom : '0%',
                containLabel : true
            },
            xAxis : {
                type : 'category',
                axisLabel : {
                    interval : 0,
                    rotate: 40,
                    show : true,
                    textStyle : {
                        color : '#fff',/* 修改字体颜色 */
                        fontSize : 12
                    /* 修改字体大小 */
                    }
                }
            },
            yAxis : {//y轴
                axisLabel : {
                    show : true,
                    textStyle : {
                        color : '#6DBCF5',
                        fontSize : 9
                    }
                }
            },
            color:['#EE4000','#9B30FF','#436EEE']
        }
        return{
            chartData: {
                columns: ["时间", "采购成本", "维修成本","养护成本"],
                rows: [
                    { 时间: "11月", 采购成本: 0, 维修成本: 430,养护成本:0},
                    { 时间: "12月", 采购成本: 0, 维修成本: 50,养护成本:0},
                    { 时间: "1月", 采购成本: 0, 维修成本: 0,养护成本:770},
                    { 时间: "2月", 采购成本: 0, 维修成本: 0,养护成本:0 },
                    { 时间: "3月", 采购成本: 0, 维修成本: 500,养护成本:0},
                    { 时间: "4月", 采购成本: 11000, 维修成本: 0,养护成本:800},
                    { 时间: "5月", 采购成本: 9800, 维修成本: 70,养护成本:110},
                ]
            }
        }
    }
}
</script>

<style scoped>

</style>