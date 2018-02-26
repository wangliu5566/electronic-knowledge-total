<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
}

</script>
<style lang='less'>
body,
p,
span,
ul,
li,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

#app {
  font-family: "Microsoft YaHei", "微软雅黑", 'Avenir', Helvetica, Arial, sans-serif;
  /*  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;*/
  height: auto;
  color: #333;
  outline: none;
}

a {
  color: #333333;
  text-decoration: none;
}



/*清浮动*/

.clearfix:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0
}

.pagination-page {
  margin: 30px 0 46px 0;
  text-align: center;
}

.dtc {
  display: table-cell;
}

.dt {
  display: table;
}

.dib {
  display: inline-block;
}

.pr {
  position: relative;
}

.ovh {
  overflow: hidden;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.mr20 {
  margin-right: 20px;
}

.ml20 {
  margin-left: 20px;
}

.mt20 {
  margin-top: 20px;
}

.mb20 {
  margin-bottom: 20px;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 30px;
  position: relative;
  margin-bottom: 26px;
  line-height: 1;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: -26px;
    width: 34px;
    height: 1px;
    background-color: #22b38f;
  }
}

.section-title-another {
  margin-top: 72px;
  margin-bottom: 72px;
  height: 428px;
  overflow: hidden;
}

.section-title-another-one {
  padding-top: 32px;
}

.flag-gray,
.flag-green,
.flag-red {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  display: inline-block;
  height: 24px;
  padding: 0 2px 0 10px;
  line-height: 24px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  font-size: 12px;
  &:after {
    content: '';
    position: absolute;
    right: -21px;
    top: 0;
    display: inline-block;
    width: 21px;
    height: 24px;
    z-index: 20;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
}

.flag-gray {
  background-color: #9c9c9c;
  &:after {
    content: '';
    background-image: url('/static/images/flag_g.png');
  }
}

.flag-green {
  background-color: #21b290;
  &:after {
    content: '';
    background-image: url('/static/images/flag_gr.png');
  }
}

.flag-red {
  background-color: #f32a2a;

  &:after {
    content: '';
    background-image: url('/static/images/flag_r.png');
  }
}

.list-main {
  padding-top: 20px;
  overflow: hidden;
  margin-right: -48px;

  >li {
    float: left;
    width: 264px;
    margin-right: 48px;
    margin-bottom: 48px;
    cursor: pointer;
    transition: all .5s;
    /* &:hover {
      transform: translateY(-16px);
    } */
  }
}

.list-database {
  >li {
    height: 312px;
  }
}

.cover {
  width: 264px;
  height: 190px;
  position: relative;
  background: url('/static/images/default_bg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.list-title {
  font-size: 18px;
  line-height: 44px;
  word-wrap: break-word
}

.info {
  font-size: 16px;
  color: #666666;
  line-height: 26px;
  word-wrap: break-word
}

.search-page {
  .el-pager {
    li {
      border-radius: 0!important;
      background-color: #fff!important;
      border: 1px solid #c3c3c3!important;
      font-weight: normal;
    }
  }
  .el-pager li.active {
    background-color: #20b391!important;
    border-color: #20b391!important;
  }
  .btn-prev,
  .btn-next {
    color: #fff!important;
    background-color: #20b391!important;
    border: 1px solid #20b391!important;
  }

  .btn-prev.disabled,
  .btn-next.disabled {
    color: #20b391!important;
    background-color: #fff!important;
    border: 1px solid #20b391!important;
  }
}

.cp {
  cursor: pointer;
}

.no-result{
  height: auto;
  position: relative;

  &:after{
    content: '';
    display: inline-block;
    width: 100px;
    height: 100px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url('/static/images/no_result.png');
  }
}

.search-no{
  height: 160px;
}

</style>
