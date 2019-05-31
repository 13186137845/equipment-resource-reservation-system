<template>
  <d2-container>
    <full-calendar
      :events="monthData"
      class="test-fc"
      first-day="1"
      lang="zh"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick"
    ></full-calendar>
    <bookingchat ref="bookingchat"/>
  </d2-container>
</template>

<script>
import { FullCalendar } from "vue-fullcalendar";
import bookingchat from "@/views/common/bookingchat";
// import {userBookingService} from '@/common/api'
export default {
  data() {
    return {
      monthData: [],
      index: "",
      ME_ID: ""
    };
  },
  mounted() {},
  methods: {
    // 选择月份
    changeMonth(start, end, current) {
      //do something
      //  console.log('changeMonth', start, end, current)
    },
    // 点击事件
    eventClick(event, jsEvent, pos) {
      console.log(event.name)
      this.$refs.bookingchat.FormVisible = true; //弹框状态
      this.$refs.bookingchat.ME_ID = this.ME_ID; //往子组件传索引
      let data = [{EN_NAME:event.EN_NAME,MA_END_DATE:event.end,MA_START_DATE:event.start,ME_ID:event.ME_ID,MI_NAME:event.MI_NAME}]
      this.$refs.bookingchat.gridData = data;
      // this.$refs.bookingchat.getInfoData(); //调用子组件 methods 内 getInfo 方法
    },
    // 点击当天
    dayClick(day, jsEvent) {
      //  console.log(day.format('YYYY-MM-DD'))
      console.log();
    },
    // 查看更多
    moreClick(day, events, jsEvent) {
      //do something
      // console.log('moreCLick', day, events, jsEvent)
    }
  },
  components: {
    bookingchat,
    "full-calendar": require("vue-fullcalendar")
  }
};
</script>

<style scoped>
</style>