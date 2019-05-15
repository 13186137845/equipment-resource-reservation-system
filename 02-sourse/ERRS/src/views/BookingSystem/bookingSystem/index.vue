<template>
  <d2-container :filename="filename">
    <template slot="header">设备预约</template>
    <Bookings></Bookings>
  </d2-container>
</template>

<script>
import Bookings from './booking'

export default {
  name: 'bookingSystem',
  data () {
    return {
      filename: __filename
    }
  },
  components: {
    "Bookings": Bookings
  }
}
</script>
