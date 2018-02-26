<template>
  <div class="recommend-database">
    <div class="container  main">
      <p class="section-title">推荐馆藏数据库</p>
      <div class="recommend-swiper pr">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper-wrap" v-if="dataList!=0">
          <swiper-slide class="cp" style="height:312px;" v-for="(item,index) in dataList" :key="index" @click.native="toDbDetail(item.id)">
            <div class="cover">
              <div class="cover" :style="{backgroundImage:'url('+item.coverImage+')'}">
                <p :class="item.isTest==1?'flag-gray':item.isTest==2?'flag-green':''">{{dbFlag(item.isTest)}}</p>
              </div>
            </div>
            <p class="list-title">
              <!-- <ellipsis :data="item.name+item.name+item.name+item.name" :line-height="'44px'"></ellipsis> -->
              {{sliceTitle(item.name)}}
            </p>
            <div class="info" ref="listInfo">
              <ellipsis :data="item.subjectName + '-' + item.languageName" :line-height="'26px'"></ellipsis>
              <p>{{sliceInfo(item.intro)}}</p>
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-native-prev" slot="button-prev" v-if="dataList!=0"></div>
        <div class="swiper-native-next" slot="button-next" v-if="dataList!=0"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiperOption: {
        spaceBetween: 11,
        slidesPerView: 4,
        navigation: {
          nextEl: '.swiper-native-next',
          prevEl: '.swiper-native-prev'
        },
        slidesPerGroup: 4,
        // mousewheel: true,
      },

      dataList: []
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    getListData() {
      this.$http.get('/v1/frontend/index/getDb', {
          params: {
            page: 1,
            length: 8,
            key: '',
            isRc: 1,
          }
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.dataList = res.data.data.db;
          }
        })
    },

    sliceTitle(data){
      let limit = 13;
      if (data.length>=limit) {
        return data.slice(0,limit-1)+'...'
      }else{
        return data;
      }
    },

    sliceInfo(data){
      let limit = 30;
      if (data.length>=limit) {
        return data.slice(0,limit-1)+'...'
      }else{
        return data;
      }
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
  },
  created() {
    this.getListData();
  }
}

</script>
<style lang="less">
.recommend-database {
  background-color: #f4f4f4;

  .main {
    padding: 42px 0 10px;
  }
  .recommend-swiper {
    width: 1090px;
    margin: 0 auto;
    padding-top: 33px;
  }
  .swiper-native-prev,
  .swiper-native-next {
    height: 64px;
    width: 64px;
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    top: 50%;
    margin-top: -32px;
    z-index: 100;
    cursor: pointer;
  }
  .swiper-native-prev {
    left: -80px;
    background-image: url('/static/images/swiper_l.png');
  }
  .swiper-native-next {
    right: -80px;
    background-image: url('/static/images/swiper_r.png');
  }
  .swiper-native-prev.swiper-button-disabled{
    background-image: url('/static/images/swiper_l_d.png');
    cursor: default;
  }
  .swiper-native-next.swiper-button-disabled{
    background-image: url('/static/images/swiper_r_d.png');
    cursor: default;
  }
  img {
    height: 100%;
    width: 100%;
  }
}

</style>
