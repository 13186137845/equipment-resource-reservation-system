<template>
    <d2-container :filename="filename">
    <template slot="header">管理后台的首页</template>
    Admin Index
  </d2-container>
</template>

<script>
export default{
  name: 'admin',
  data () {
    return {
      filename: __filename
    }
  }
}
</script>

<style scoped>

</style>