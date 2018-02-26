<template>
  <div class="Synchronization">
    <div class="top">
      <Button type="primary" size="large">上传</Button>
      <Row class="search">
        <DatePicker :value="value2" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width:250px"></DatePicker>
        <Button type="primary">筛选</Button>
        <Button type="primary">导出</Button>
      </Row>
    </div>
    <Table border :loading="loading" ref="selection" :columns="columns4" :data="data1"></Table>
    <Row class='page'>
      <Page :total="tp" :current='cp' :page-size="ep" size="small" show-total show-sizer show-elevator :page-size-opts='[10,20,30]' @on-change="currentPageChange" @on-page-size-change="eachPageChange"></Page>
    </Row>
    <!-- 详情模态框 -->
    <Modal v-model="detailModal" title="图书信息">
      <Row>
        <Col span="8">
        <div>
          <img src="detalObj.cover">
        </div>
        </Col>
        <Col span="16">
        <h4>{{detalObj.bookName}}</h4>
        <Row>
          <Col span="5">
          <p>ISBN:</p>
          <p>作者:</p>
          <p>出版日期:</p>
          <p>页面:</p>
          </Col>
          <Col span="7">
            <p>{{detalObj.number}}</p>
            <p>{{detalObj.author}}</p>
            <p>{{secondsToNormalDate(detalObj.publishTime)}}</p>
            <p>{{detalObj.page}}</p>
          </Col>
          <Col span="5">
          <p>电子书价格:</p>
          <p>纸质书价格:</p>
          <p>开本:</p>
          <p>装帧:</p>
          <p>出版社:</p>
          </Col>
          <Col span="7">
            <p>{{formatPrice(detalObj.price)}}</p>
            <p>{{formatPrice(detalObj.paperPrice)}}</p>
            <p>{{secondsToNormalDate(detalObj.publishTime)}}</p>
            <p>{{detalObj.page}}</p>
            <p>{{detalObj.pubName}}</p>
          </Col>
        </Row>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="primary" @click="detailModal=false">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tp: 0,
      cp: 1,
      ep: 10,
      value2: ['2016-01-01', '2016-02-15'],
      loading: false,
      detailModal: false,
      detalObj: {},
      columns4: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: 'ISBN',
        key: 'number',
      }, {
        title: '书名',
        key: 'bookName',
      }, {
        title: '作者',
        key: 'author',
      }, {
        title: '出版社',
        key: 'pubName',
        render: (h, params) => {
          return h("span", params.row.pubName ? params.row.pubName : '-')
        }
      }, {
        title: '出版日期',
        key: 'name',
        render: (h, params) => {
          return h("span", this.secondsToNormalDate(params.row.publishTime))
        }
      }, {
        title: '电子书价格',
        key: 'price',
        render: (h, params) => {
          return h('div', [
            h("span", this.formatPrice(params.row.price, 2))
          ])
        }
      }, {
        title: '纸质书价格',
        key: 'price',
        render: (h, params) => {
          return h("span", this.formatPrice(params.row.paperPrice, 2))
        }
      }, {
        title: '操作',
        key: 'name',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary'
              },
              on: {
                click: () => {
                  this.detailModal = true;
                  this.detalObj = this.data1[params.index];
                }
              }
            }, '详情')
          ])
        }
      }],
      data1: [],
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      this.loading = true;
      this.$http.get('http://eknowledge.jqweike.com/v1/admin/book/list', {
        params: this.token({
          startTime: '',
          endTime: '',
          page: this.cp,
          pageSize: this.ep,
        })
      }).then((res) => {
        if (res.data.status == 200) {
          this.data1 = res.data.data.rows;
          this.tp = res.data.data.total ? parseInt(res.data.data.total) : 0;
        }
        this.loading = false;
      })
    },
    currentPageChange(val) {
      this.cp = val;
      this.getlist()
    },
    eachPageChange(val) {
      this.cp = 1;
      this.ep = val;
      this.getlist()
    },
  },
}

</script>
<style lang="less">
.Synchronization {
  .top {
    margin-bottom: 25px;
    .search {
      float: right
    }
  }
  .page {
    margin-top: 15px;
    & {
      float: right
    }
  }
}

</style>
