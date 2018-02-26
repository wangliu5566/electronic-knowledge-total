search-main
<template>
  <div class="search-main">
    <div class="search-swiper"></div>
    <div class="container search-container">
      <router-view></router-view>
    </div>
    <RecommendDatabase></RecommendDatabase>
    <RecommendActivity></RecommendActivity>
  </div>
</template>
<script>
import RecommendDatabase from "web/search/RecommendDatabase"
import RecommendActivity from "web/search/RecommendActivity"
export default {

  data() {
    return {

    }
  },
  components: {
    RecommendDatabase,
    RecommendActivity
  },
  methods: {

  }
}

</script>
<style lang="less">
.search-main {
  .search-swiper {
    height: 500px;
    min-width: 1200px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url('/static/images/search_swiper.png');
  }
  .search-container {
    padding-top: 40px;
  }
  .search-header {
    height: 40px;
    width: 100%;
    display: table;
    margin-bottom: 44px;
    position: relative;
    >span {
      width: 418px;
      float: right;
    }

    &:after {
      content: '';
      display: inline-block;
      width: 100%;
      height: 1px;
      background-color: #dfdfdf;
      position: absolute;
      left: 0;
      bottom: -17px;
      z-index: 10;
    }
  }
  .search-nav {
    float: left;
    display: table-cell;

    >li {
      float: left;
      font-size: 16px;
      padding: 10px 16px;
      margin-right: 32px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .el-input__inner {
    height: 35px;
  }

  .search-icon {
    display: inline-block;
    width: 100%;
    height: 24px;
    background: url('/static/images/search_s.png') no-repeat center;
    background-size: contain;
    margin-top: 3px;
  }
  .el-input-group__append {
    width: 68px;
    padding: 0;
    text-align: center;
    vertical-align: middle;
    background-color: #20b391;
    border-color: #20b391;
    cursor: pointer;
  }

  .selected {
    background-color: #20b391;
    color: #fff;
    font-weight: bold;
  }

  .list-search {
    padding-top: 0;
    >li {
      margin-bottom: 36px;
    }
  }

  .page-control {
    text-align: center;
    margin-top: -10px;
    margin-bottom: 49px;
  }
}

</style>
