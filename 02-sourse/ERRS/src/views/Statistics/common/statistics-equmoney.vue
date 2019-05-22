<template>
    <ve-histogram :data="chartData" :extend="chartExtend" width="430px" height="280px"></ve-histogram>
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
            color:['#EE2C2C','#912CEE','#1E90FF']
        }
        return{
            chartData: {
                columns: ["设备所在地", "设备价值", "维修费用","养护费用"],
                rows: [
                { 设备所在地: "一号实验室", 设备价值: 12872, 维修费用: 2300,养护费用:700 },
                { 设备所在地: "二号实验室", 设备价值: 11872, 维修费用: 1800,养护费用:600},
                { 设备所在地: "三号实验室", 设备价值: 2872, 维修费用: 0,养护费用:720},
                { 设备所在地: "办公区", 设备价值: 9012, 维修费用: 600,养护费用:110},
                { 设备所在地: "基础实验室", 设备价值: 12003, 维修费用: 1100,养护费用:980},
                { 设备所在地: "化验基地", 设备价值: 7623.2, 维修费用: 1340,养护费用:620},
                { 设备所在地: "采样基地", 设备价值: 12324, 维修费用: 1220,养护费用:770},
                ]
            }
        }
    }
}
</script>

<style scoped>

</style>