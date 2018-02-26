<template>
  <div>
    <header-common/>
    <router-view></router-view>
    <footer-common/>
  </div>
</template>
<script>
import HeaderCommon from "common/Header"
import FooterCommon from "common/Footer"
export default {
  data() {
    return {
      
    }
  },
  components: {
    HeaderCommon,
    FooterCommon
  },
  methods: {

   },
}

</script>
<style lang='less'>
.command-title{
  height: 30px;
  margin: 32px 0 26px 0;
  font-size: 26px;
}

</style>
