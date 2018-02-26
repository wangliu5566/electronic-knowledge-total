<template>
  <div class="lib-recommend">
    <div class="container ovh">
      <p class="section-title">电子资源推荐</p>
      <ul class="list-main recommend-main">
        <li v-for="(item,index) in dataList" :key="index">
          <a :href="item.link" target="_blank">
          	<div class="cover">
          		<div class="cover" :style="{backgroundImage:'url('+item.banner+')'}">
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
      this.$http.get('/v1/frontend/publish-company/getLists', {
          params: {
            page: 1,
            length: 4,
            isRc: 1
          }
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.dataList = res.data.data.rows;
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
.lib-recommend {
  background-color: #fff;
  padding: 87px 0 123px;
  box-sizing: border-box;
  border-top: 1px solid #e9e9e9;
  .recommend-main {
    padding-top: 34px;
  }
}

</style>
