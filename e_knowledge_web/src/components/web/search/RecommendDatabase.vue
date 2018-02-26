<template>
  <div class="recommend-database">
    <div class="container database-main">
      <p class="section-title">推荐馆藏数据库</p>
      <ul class="list-main">
        <li v-for="(item,index) in dataList" :key="index"  @click="toDbDetail(item.id)">
          <div class="cover">
            <div class="cover" :style="{backgroundImage:'url('+item.coverImage+')'}">
              <p :class="item.isTest==1?'flag-gray':item.isTest==2?'flag-green':''">{{dbFlag(item.isTest)}}</p>
            </div>
          </div>
          <p class="list-title">
            <ellipsis :data="item.name" :line-height="'44px'"></ellipsis>
          </p>
          <div class="info">
            <ellipsis :data="item.subjectName + '-' + item.languageName" :line-height="'26px'"></ellipsis>
            <ellipsis :data="item.intro" :line-clamp="2" :line-height="'26px'"></ellipsis>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: []
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
    }
  },
  created() {
    this.getListData();
  }
}

</script>
<style lang="less">
.recommend-database {
  .database-main {
    padding: 50px 0 0;
  }
  .recommend-list {
    padding-top: 23px;

    >li {
      margin-bottom: 20px;
    }
  }
}

</style>
