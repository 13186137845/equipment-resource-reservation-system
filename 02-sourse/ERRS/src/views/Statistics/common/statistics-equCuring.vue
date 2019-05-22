<template>
    <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" width="430px" height="280px"></ve-histogram>
</template>

<script>
export default{
    data(){
        this.chartSettings={
            stack: { '设备': ['已完成', '未完成'] }
        }
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
            color:['#EE2C2C','#912CEE','#1E90FF'],
            series:{
                barWidth:25
            }
        }
        return{
            chartData: {
                columns: ["设备所在地", "已完成", "未完成"],
                rows: [
                    { 设备所在地: "一号实验室", 已完成: 10, 未完成: 3},
                    { 设备所在地: "二号实验室", 已完成: 12, 未完成: 4},
                    { 设备所在地: "三号实验室", 已完成: 4, 未完成: 12},
                    { 设备所在地: "办公区", 已完成: 2, 未完成: 4},
                    { 设备所在地: "基础实验室", 已完成: 6, 未完成: 6},
                    { 设备所在地: "化验基地", 已完成: 12, 未完成: 0},
                    { 设备所在地: "采样基地", 已完成: 8, 未完成: 4}
                ]
            }
        }
    }
}
</script>

<style scoped>

</style>