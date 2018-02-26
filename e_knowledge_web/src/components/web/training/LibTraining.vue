<template>
  <div class="training-main">
    <div class="training-swiper">
    </div>
    <div class="container training-container">
      <ul class="side-bar" ref="sideBar">
      	<li v-for="(item,index) in navList" :key="index" :class="defaultIndex==index?'selected':''" @click="navChange(item,index)">{{item.title}}</li>
      </ul>
      <div class="training-wrap" v-html="content" :style="{minHeight:'100px'}">
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sn: '',

      defaultIndex: 0,


      navList: [],
      content: '',
    }
  },
  methods: {
    navChange(item, index) {
      this.sn = item.id;
      this.defaultIndex = index;
    },
    getListData() {
      let params = {};
      if (this.sn) {
        params.sn = this.sn;
      }
      this.$http.get('/v1/frontend/index/getTrain', {
          params: params
        })
        .then((res) => {
          if (res.data.status == 200) {
            let data = res.data.data;
            this.navList = data.titles;
            this.content = data.content.content;

            this.$nextTick((item,index)=>{

            })
          }
        })
    }
  },
  created() {
    this.getListData();
  },
  watch: {
    'defaultIndex': function() {
      this.getListData();
    }
  }
}

</script>
<style lang="less">
.training-main {
  background-color: #f4f4f4;
  .training-swiper {
    height: 500px;
    min-width: 1200px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url('/static/images/lib_training.jpg');
  }

  .training-container {
    overflow: hidden;
    padding: 20px 0;

    .side-bar {
      width: 242px;
      float: left;
      background-color: #fff;
      padding: 10px 0;
      font-size: 16px;
      >li {
        line-height: 42px;
        text-indent: 20px;
        cursor: pointer;
        margin-top: 5px;

        &:first-child {
          margin-top: 0;
        }
      }

      .selected {
        color: #fff;
        background-color: #20b391;
      }
    }

    .training-wrap {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      background-color: #fff;
      padding: 24px;
      float: right;
      width: 942px;
    }
  }
}

</style>
