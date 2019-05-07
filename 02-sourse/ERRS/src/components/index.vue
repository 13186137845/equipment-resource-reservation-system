<template>
  <div>
    {{msg}}
    <router-link class="test" to="/login"><button>登录</button></router-link>
    
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: '这里是项目的首页'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
