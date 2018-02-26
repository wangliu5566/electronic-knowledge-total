<template>
  <div class="data-base-detail">
    <!-- 面包屑导航 -->
    <div class="container">
      <div class="data-base-column">
        数据库<i class="el-icon-arrow-right"></i>
        <span>人民日报全文数据库</span>
      </div>
      <div class="data-base-video">
        <div class="video-part fl ovh">
          <DefaultVideoPlayer  :videoHeight="712" :srcUrl="srcUrl"></DefaultVideoPlayer>
        </div>
        <div class="column-part fl">
          <p class="column-part-title">
            <img src="/static/images/mulu.png" alt=""> 目录
          </p>
          <ul class="column-part-ul">
            <li v-for="(item,index) in videoFiles" @click="selectVideo(item.path)">
              <span class="column-part-span-one">{{index+1}}.{{item.name}}</span>
              <!-- <span class="column-part-span-two">1.你好
								<img src="/static/images/jian.png" alt="">
							</span> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 数据详情 -->
    <div class="content-detail">
      <div class="container">
        <div class="content-detail-left fl">
          <div class="content-left-top">
            <div class="content-left-img fl" :style="{backgroundImage:'url('+ baseDetailData.coverImage +')'}">
              <!-- <img :src="baseDetailData.coverImage ? baseDetailData.coverImage : '/static/images/数据库详情1.png'" alt=""> -->
            </div>
            <div class="content-top-text fl">
              <ellipsis :data="baseDetailData.name"></ellipsis>
              <!-- <div>{{baseDetailData.name ? baseDetailData.name : '暂无'}}</div> -->
              <p>12345
                <!-- <ellipsis :data="baseDetailData.name"></ellipsis> -->
              </p>
              <p>
                <ellipsis :data="baseDetailData.subjectName"></ellipsis>
              </p>
            </div>
            <div class="content-top-share fr">
              <img src="/static/images/fenxiang.png" alt="">
              <span>分享</span>
            </div>
          </div>
          <div class="content-left-bottem" v-html="baseDetailData.intro">
          </div>
        </div>
        <div class="content-detail-right fr">
          <div class="content-right-all">
            <p class="content-title-p">相关文档</p>
            <ul class="list-item">
              <li v-for="(item,index) in docFiles" :key="index" v-if="docFiles.length!=0">
                <div class="cover-img" :style="{backgroundImage:'url('+item.path+')'}"></div>
                <p class="list-item-title">
                  {{item.name}}
                </p>
              </li>
              <p v-show="docFiles.length==0" style="padding:10px 0;color:#666;">暂无相关文档</p>
            </ul>

          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
    <!-- 推荐藏馆数据库 -->
    <div class="container section-title-another">
      <p class="section-title">馆藏数据库</p>
      <ul class="list-main">
        <li v-for="(item,index) in baseListData" :key="index" @click="toDbDetail(item.id)">
          <div class="cover">
            <div class="cover" :style="{backgroundImage:'url('+item.coverImage+')'}">
              <p :class="item.isTest==1?'flag-gray':item.isTest==2?'flag-green':''">{{dbFlag(item.isTest)}}</p>
            </div>
          </div>
          <p class="list-title">
            <ellipsis :data="item.name" :line-height="'44px'"></ellipsis>
          </p>
          <div class="info">
            <ellipsis :data="item.subjectName" :line-height="'26px'"></ellipsis>
            <ellipsis :data="item.intro" :line-clamp="2" :line-height="'26px'"></ellipsis>
          </div>
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
    <!-- 推荐活动 -->
    <div class="container data-base-activity">
      <p class="section-title">推荐活动</p>
      <ul class="list-main">
        <li v-for="(item,index) in tubeListData" :key="index">
          <a :href="item.detailUrl" target="_blank">
            <div class="cover">
              <div class="cover" :style="{backgroundImage:'url('+item.coverImage+')'}">
                <p :class="item.status==1?'flag-red':item.status==2?'flag-green':item.status==3?'flag-gray':''">{{acFlag(item.status)}}</p>
              </div>
            </div>
            <p class="list-title">
              <ellipsis :data="item.name" :line-height="'44px'"></ellipsis>
            </p>
          </a>
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
import DefaultVideoPlayer from 'web/dataBaseDetail/VideoPlayer.vue'
export default {
  data() {
    return {
      baseId: this.$route.query.id,
      baseDetailData: {},
      docFiles: [],
      videoFiles: [],
      baseListData: [],
      tubeListData: [],
      srcUrl:'',
    }
  },
  components: {
    DefaultVideoPlayer
  },
  methods: {
  	/**
  	 * [选择某个视频播放]
  	 * @作者     王柳
  	 * @日期     2018-02-09
  	 */
  	selectVideo(url){
  		this.srcUrl = url;
  	},
    /**
     * [获取数据库详情]
     * @作者     王柳
     * @日期     2018-02-07
     */
    getBaseDetail() {
      this.$http.get('/v1/frontend/data-base/getDetail', {
          params: {
            dbId: this.baseId,
          }
        })
        .then((res) => {
          console.log(res)
          if (res.data.status == 200) {
            this.baseDetailData = res.data.data.dataBase[0];
            this.docFiles = res.data.data.docFiles;
            this.videoFiles = res.data.data.videoFiles;
            this.srcUrl = res.data.data.videoFiles[0].path;
          }
        })
    },
    /**
     * [获取馆藏数据库数据列表]
     * @作者     王柳
     * @日期     2018-02-07
     */
    getBaseListData() {
      this.$http.get('/v1/frontend/index/getDb', {
          params: {
            page: 1,
            length: 4,
            key: '',
            isRc: 0,
          }
        })
        .then((res) => {
          // console.log(res)
          if (res.data.status == 200) {
            this.baseListData = res.data.data.db;
          } 
        })
    },
    /**
     * [获取馆内活动数据列表]
     * @作者     王柳
     * @日期     2018-02-07
     */
    getTubeListData() {
      this.$http.get('/v1/frontend/index/getAc', {
          params: {
            page: 1,
            length: 4,
            key: '',
            status: 0,
            type: 0
          }
        })
        .then((res) => {
          // console.log(res)
          if (res.data.status == 200) {
            this.tubeListData = res.data.data.ac;
          } 
        })
    },
  },
  mounted() {
    this.getBaseDetail();
    this.getBaseListData();
    this.getTubeListData();
  },
  watch: {
    baseId: function(val, oldVal) {
      if (val != oldVal) {
        this.getBaseDetail();
      }
    }
  }
}

</script>
<style lang="less">
.data-base-detail {
  .data-base-column {
    height: 36px;
    padding-bottom: 16px;
    box-sizing: border-box;
  }
  .data-base-video {
    height: 716px;
    box-sizing: border-box;
    background-color: black;
    margin-bottom: 20px;
    .video-part {
      width: 940px;
      height: 100%;
      box-sizing: border-box;
      outline: none!important;
      /* background-color: #fff; */
     	display: table-cell;
     	vertical-align: middle;
    }
    .column-part {
      width: 240px;
      height: 680px;
      padding: 18px 20px 18px 0;
      .column-part-title {
        margin-bottom: 18px;
        color: white;
        img {
          vertical-align: middle;
        }
      }
      .column-part-ul {
        height: 636px;
        width: 100%;
        >li {
        	cursor: pointer;
          background-color: #bbb;
          color: white;
          height: 30px;
          line-height: 30px;
          width: 216px;
          padding: 0 12px;
          .column-part-span-one {
            display: inline-block;
            width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .column-part-span-two {
            display: inline-block;
            width: 90px;
            text-align: right;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            img {
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
  .content-detail {
    height: 688px;
    padding: 20px 0;
    box-sizing: border-box;
    background-color: #f4f4f4;
    .content-detail-left {
      width: 942px;
      .content-left-top {
        height: 100px;
        padding: 19px 0;
        background-color: #fff;
        .content-left-img {
          width: 160px;
          height: 100px;
          margin: 0 16px 16px 16px;
          position: relative;
          background: url('/static/images/default_bg.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
        }
        .content-top-text {
          height: 80px;
          margin: 10px 0;
          p {
            margin-top: 12px;
          }
          ;
        }
        .content-top-share {
          width: 220px;
          height: 100px;
          border-left: 1px solid #ccc;
          box-sizing: border-box;
          padding: 34px 58px;
          img {
            vertical-align: middle;
            margin-right: 16px;
          }
        }
      }
      .content-left-bottem {
        height: 480px;
        margin-top: 16px;
        background-color: #fff;
        padding: 16px 16px 0 16px;
        overflow-y: auto;
      }
    }
    .content-detail-right {
      width: 242px;
      margin-left: 16px;
      background-color: #fff;
      .content-right-all {
        width: 202px;
        padding: 18px;
        .content-title-p {
          border-bottom: 1px solid #ccc;
          padding-bottom: 8px;
        }
        .list-item {
          height: 586px;
          overflow-y: auto;
          >li {
            background-color: #f4f4f4;
            height: 176px;
            width: 176px;
            margin-top: 20px;
            .cover-img {
              width: 176px;
              height: 120px;
            }
            .list-item-title {
              margin: 8px 26px 0 26px;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
  .data-base-activity {
    height: 326px;
    margin-bottom: 40px;
    overflow: hidden;
  }
}

</style>
