<template>
  <div class="bg-system-view">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
    
    }
  },
  methods: {
    
  },
  mounted() {
  }

}

</script>
<style lang="less">
.bg-system-view {
  .view-main {
    width: 800px;
    margin: 0 auto;
    .view-type {
      width: 40px;
      display: inline-block;
    }
    .view-header,
    .view-container {
      border: 1px solid #dddee1;
      border-radius: 4px;
      padding: 10px 20px;
      margin: 20px 0 0 0;
    }
    .view-container {
      padding: 20px;
    }
    .ivu-col {
      text-align: center;
      padding: 5px 0;
    }
    .show-view-data {
      height: 500px;
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .data-up {
      color: red;
    }
    .data-down {
      color: green;
    }
  }
}

</style>
