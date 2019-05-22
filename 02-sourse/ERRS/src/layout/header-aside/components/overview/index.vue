<template>
  <el-tooltip effect="dark" content="大屏数据"
    placement="bottom">
    <el-button class="d2-mr btn-text can-hover" type="text" @click="handleClick">
      <d2-icon name="film" style="font-size: 18px;"/>
    </el-button>
  </el-tooltip>
</template>

<script>
import screenfull from 'screenfull'
export default {
  data () {
    return {
      count:0
    }
  },
  methods: {
    handleClick () {
        this.$router.push({path:'/overview'});
        if (screenfull.isFullscreen) {
              screenfull.exit()
          } else {
              screenfull.request()
          }
      }
  }
}
</script>
