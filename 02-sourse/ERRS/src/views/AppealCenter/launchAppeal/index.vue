<template>
  <d2-container :filename="filename">
    <template slot="header">Page 1 header</template>
      {{msg}}
    <button @click="test">测试api</button>
  </d2-container>
</template>

<script>
import {GetMenuList} from '@/api/news/list'

export default {
  name: 'page1',
  data () {
    return {
      filename: __filename,
      msg:'123'
    }
  },
  methods: {
    test(){
      GetMenuList({
        name:''
      }).then(res => {
          // 返回数据
          console.log(res);
          this.msg = res.MU_POWER;
        })
        .catch(err => {
          //console.log(err)
          // 异常情况
        })
    }
  }
}
</script>
