<template>
  <div class="sliders">
    <!-- 轮播 -->
    <div class="slider-box" @mouseenter="stopPlay()" @mouseleave="autoPlay()">
      <img id="img" :src="url" style="width:100%;">
      <!-- <div class="leftImg" @click="preImg()"><img src="../assets/left.png"  style="width:100%;"></div> -->
      <!-- <div class="rightImg" @click="nextImg()"><img src="../assets/right.png" style="width:100%;"></div> -->
      <ul id="sliderUl" class="sliderUl">
        <li @click='clickImgLi(0)' :class="{'activeImg':setIndex==3||setIndex==0}"></li>
        <li @click='clickImgLi(1)' :class="{'activeImg':setIndex==1}"></li>
        <li @click='clickImgLi(2)' :class="{'activeImg':setIndex==2}"></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      setIndex: 1,
      imgs: ["/static/images/banner1.jpg", "/static/images/banner2.jpg", "/static/images/banner3.jpg"],
      url: "/static/images/banner1.jpg",
      timer: ""

    }
  },
  mounted: function() {
    this.autoPlay()
  },
  methods: {
    autoPlay() {
      var _this = this
      _this.timer = setInterval(function() {
        if (_this.setIndex == 3) {
          _this.setIndex = 0;
        }
        _this.url = _this.imgs[_this.setIndex];
        _this.setIndex += 1;
      }, 4000)
    },
    stopPlay() {
      var _this = this
      clearInterval(_this.timer)
    },
    nextImg() {
      if (this.setIndex == 3) {
        this.setIndex = 0;
      }
      this.setIndex += 1;
      this.url = this.imgs[this.setIndex];
    },
    preImg() {
      if (this.setIndex == 0) {
        this.setIndex = 3;
      }
      this.url = this.imgs[this.setIndex];
      this.setIndex -= 1;
    },
    clickImgLi(thisIndex) {
      this.setIndex = thisIndex;
      this.url = this.imgs[this.setIndex];
    }

  }
}

</script>
<style lang='less'>
.sliders {
  .slider-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .leftImg,
  .rightImg {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 120px;
  }

  .leftImg {
    left: 100px;
  }

  .rightImg {
    right: 100px;
  }

  .sliderUl {
    position: absolute;
    left: 48%;
    left: 47%;
    bottom: 18px;
    overflow: hidden;
    text-align: center;
  }

  .sliderUl li {
    width: 12px;
    height: 12px;
    float: left;
    margin-right: 30px;
    background-color: #fff;
    opacity: 0.2;
    border-radius: 10px;
    cursor:pointer;
  }
  .sliderUl li:nth-child(3){
    margin-right: 0;
  }

  #sliderUl .activeImg {
    opacity: 1;
  }
}

</style>
