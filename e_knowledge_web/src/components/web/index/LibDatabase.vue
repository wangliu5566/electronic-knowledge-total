<template>
  <div class="database-list">
    <div class="container database-main ovh">
      <p class="section-title">馆藏数据库</p>
      <ul class="list-main list-database">
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
            isRc: 0,
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
.database-list {
  .database-main {
    padding: 100px 0 50px;
  }
}

</style>
