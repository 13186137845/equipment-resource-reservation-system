<template>
  <d2-container :filename="filename">
    <template slot="header">Page 4 header</template>
    lalala
  </d2-container>
</template>

<script>
export default {
  name: 'page2',
  data () {
    return {
      filename: __filename
    }
  }
}
</script>
