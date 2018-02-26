<template>
  <div class="swiper-main">
    <div class="container pr">
      <swiper :options="swiperOption" ref="mySwiper" class="swiper-wrap">
        <swiper-slide class="cp" v-for="(item,index) in swiperData" :key="index" @click="linkPath(item)">
          <a :href="computedLink(item)" target="_blank">
            <div class="cover">
              <div class="cover" :style="{backgroundImage:'url('+item.coverImage+')'}">
                
              </div>
            </div>
          </a>
        </swiper-slide>
      </swiper>
      <div class="swiper-native-prev" slot="button-prev"></div>
      <div class="swiper-native-next" slot="button-next"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiperOption: {
        spaceBetween: 48,
        slidesPerView: 4,
        navigation: {
          nextEl: '.swiper-native-next',
          prevEl: '.swiper-native-prev'
        },
        slidesPerGroup: 4,
        // mousewheel: true,

        
      },
      swiperData: [],
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  methods: {
    getSwiperData() {
      this.$http.get('/v1/frontend/index/getBanner')
        .then((res) => {
          if (res.data.status == 200) {
            this.swiperData = res.data.data;
          }
        })
    },
    computedLink(item){
      switch (parseInt(item.bannerType)) {
        case 1:
          return item.detailUrl;
          break;
        case 2:
          return '/dataBaseDetail?id='+item.id
          break;
        case 3:
          return item.detailUrl;
          break;
        default:
          
          break;
      }
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
  },
  created() {
    this.getSwiperData();
  },
}

</script>
<style lang="less">
.swiper-main {
  height: 400px;
  overflow: hidden;
  background: url('/static/images/swiper_bg.png') no-repeat;
  background-size: cover;
  min-width: 1200px;
  background-position: center center;

  .swiper-wrap {
    height: 190px;
    margin-top: 110px;
    position: relative;

    a{
      display: inline-block;
      text-decoration: none;
      width: 100%;
      height: 100%;
    }
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
