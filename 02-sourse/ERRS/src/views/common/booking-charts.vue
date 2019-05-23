<template>
  <d2-container>
   <full-calendar :events="monthData" class="test-fc"
                     first-day='1' locale="cn"
                     @changeMonth="changeMonth"
                     @eventClick="eventClick"
                     @dayClick="dayClick"
                     @moreClick="moreClick"></full-calendar>
  </d2-container> 
</template>

<script>
import { FullCalendar } from 'vue-fullcalendar'
import {userBookingService} from '@/common/api'
export default{
  data () {
    return {
      monthData: []
    }
  },
  mounted () {
    let params = new URLSearchParams();
    params.append("ME_ID", 1);
    userBookingService.Initcalendar(params)
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      this.$message.error("初始化失败！");
    })
  },
  methods: {
      // 选择月份
      changeMonth (start, end, current) {
       console.log('changeMonth', start, end, current)
      },
      // 点击事件
      eventClick (event, jsEvent, pos) {
        this.$message.success("你点击了这个事件！")
      },
      // 点击当天
      dayClick (day, jsEvent) {
         console.log('dayClick', day, jsEvent)
      },
      // 查看更多
      moreClick (day, events, jsEvent) {
        console.log('moreCLick', day, events, jsEvent)
      }
  },
  components: {
      'full-calendar': require('vue-fullcalendar')
  }
}
</script>

<style scoped>

</style>