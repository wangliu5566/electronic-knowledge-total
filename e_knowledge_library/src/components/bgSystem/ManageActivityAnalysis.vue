<template>
  <div>
    <Row>
      <Spin fix v-show="loadingData">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>数据加载中...</div>
      </Spin>
      <Row class="pt10 pb10" v-show="!loadingData">
        <Table :columns="accountColumns" :data="accountDatas" highlight-row></Table>
      </Row>
    </Row>
    <Row class="tr pt5 pb10">
      <Page :total="tp" :current='cp' :page-size="ep" size="small" show-total show-sizer show-elevator :page-size-opts='[10,20,30]' @on-change="currentPageChange" @on-page-size-change="eachPageChange"></Page>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {

    	loadingData:false,
      //分页信息
      cp: 1,
      ep: 10,
      tp: 0,

      //表格数据
      accountDatas: [],
      //表格配置
      accountColumns: [{
        title: '活动名称',
        key: 'name'
      }, {
        title: '参加用户数',
        key: 'signCount'
      }, {
        title: '新增注册用户数',
        key: 'registerCount'
      }, {
        title: '提交作品数',
        key: 'auditCount',
      }, {
        title: '审核通过作品数',
        key: 'worksCount',
      }, {
        title: '总点赞量',
        key: 'hits',
      }, {
        title: '总分享量',
        key: 'share',
      }, {
        title: '总点击量',
        key: 'click',
      }]
    }
  },
  methods: {
    getDataList() {
      this.$http.get('/v1/admin/data/active', {
        params: {
          uid: JSON.parse(window.sessionStorage.getItem('bg_user_info')).id,
          page: this.cp,
          pageSize: this.ep,
        }
      }).then((res) => {
        this.loadingData = false;
        this.tp = parseInt(res.data.data.total);
        this.accountDatas = res.data.data.rows;
      })
    },

    //分页方法
    currentPageChange(value) {
      this.cp = value;
      this.getDataList();
    },
    eachPageChange(value) {
      this.ep = value;
      this.getDataList();
    }
  },
  created() {
    this.getDataList();
  }
}

</script>
<style lang="less">


</style>
