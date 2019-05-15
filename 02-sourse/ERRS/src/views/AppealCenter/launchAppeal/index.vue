<template>
  <d2-container :filename="filename">
    <template slot="header">Page 1 header</template>
    hello world
  </d2-container>
</template>

<script>

export default {
  name: 'page1',
  data () {
    return {
      filename: __filename,
    }
  },
  methods: {

  }
}
</script>
