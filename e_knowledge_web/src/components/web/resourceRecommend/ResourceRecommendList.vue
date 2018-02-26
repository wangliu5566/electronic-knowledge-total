<template>
  <div class="resource-reconmmend-list">
    <div class="container ovh">
      <!-- 大图 -->
      <div class="banner-img">
        <img src="/static/images/资源推荐banner1.png" alt="">
      </div>
      <!-- 资源推荐列表 -->
      <div class="resource-recommend">
        <p class="section-title">资源推荐</p>
        <div class="resource-recommend-content">
          <div class="item-list fl" v-for="(item,index) in resourceListData">
            <a :href="item.link" target="_blank">
              <div class="item-list-all">
                <div class="cover">
                  <div class="cover" :style="{backgroundImage:'url('+item.bannerUrl+')'}"></div>
                </div>
                <div class="item-list-text">
                  <div class="item-list-title">
                    <ellipsis :data="item.name" :line-height="'46px'"></ellipsis>
                  </div>
                  <p class="item-list-publish">
                    <ellipsis :data="item.pubName"></ellipsis>
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div class="clearfix"></div>
      <div class="pagination-page" v-show="totalCount!=0">
        <el-pagination background :current-page.sync="page" layout="prev, pager, next" :total="totalCount" class="search-page" :page-size="pageSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      resourceListData: [],
      // 基本数据
      page: 1,
      pageSize: 16,
      totalCount: 0,
    }
  },
  methods: {
    /**
     * [获取资源推荐数据列表]
     * @作者     王柳
     * @日期     2018-02-07
     */
    getResourceListData() {
      this.$http.get('/v1/frontend/publish-company/getLists', {
          params: {
            page: this.page,
            length: this.pageSize,
            key: '',
          }
        })
        .then((res) => {
          console.log(res)
          if (res.data.status == 200) {
            this.resourceListData = res.data.data.rows;
            this.totalCount = parseInt(res.data.data.count);
          } else {
            this.$message.error(res.data.message);
          }
        })
    },
  },
  mounted() {
    this.getResourceListData();
  }
}

</script>
<style lang='less'>
.resource-reconmmend-list {
  .banner-img {
    height: 200px;
    width: 100%;
    margin-bottom: 32px;
    img {
      width: 100%;
    }
  }
  .resource-recommend-content {
    height: auto;
    margin-right: -48px;
    .item-list {
      margin-top: 30px;
      height: 282px;
      width: 264px;
      margin-bottom: 24px;
      margin-right: 48px;
      box-sizing: border-box;
      box-shadow: 0 5px 5px #efefef;
      transition: all 0.5s;
      .item-list-all {
        .item-list-img {
          width: 264px;
          height: 190px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .item-list-text {
          margin-left: 10px;
          .item-list-title {
            font-size: 16px;
            line-height: 46px;
          }
          .item-list-publish {
            color: #b7b7b7;
            margin-bottom: 14px;
          }
        }
      }
    }
    .item-list:hover {
      transform: translateY(-16px);
      border-bottom: 2px solid #21b290;
      .item-list-title {
        color: #21b290;
      }
    }
  }
}

</style>
