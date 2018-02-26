<template>
  <div class="recommend-activity">
    <div class="container ovh">
      <p class="section-title">推荐活动</p>
      <ul class="list-main">
        <li v-for="(item,index) in dataList" :key="index">
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
          if (res.data.status == 200) {
            this.dataList = res.data.data.ac;
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
.recommend-activity {
  background-color: #fff;
  padding: 50px 0 102px;
  box-sizing: border-box;
}

</style>
