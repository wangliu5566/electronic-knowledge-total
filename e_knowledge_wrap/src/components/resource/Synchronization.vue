<template>
  <div class="Synchronization">
    <div class="top">
      <Button type="primary" size="large" @click="openModal">上传</Button>
      <Row class="search">
        <DatePicker :value="dateValue" type="daterange" placement="bottom-end" placeholder="请选择时间" style="width: 240px" confirm @on-change="handleChange" @on-clear="clearData" @on-ok="handleOk"></DatePicker>
        <Button type="primary" @click="getlist()">筛选</Button>
        <Button type="primary">导出</Button>
      </Row>
    </div>
    <Table border :loading="loading" ref="selection" :columns="columns4" :data="data1"></Table>
    <Row class='page'>
      <Page :total="tp" :current='cp' :page-size="ep" size="small" show-total show-sizer show-elevator :page-size-opts='[10,20,30]' @on-change="currentPageChange" @on-page-size-change="eachPageChange"></Page>
    </Row>
    <!-- 详情模态框 -->
    <Modal v-model="detailModal" :title="detalObj.bookName" id="detailModal" width="600">
      <Row>
        <Col span="6">
        <div class="img-warp">
          <div class="img-box" v-if="detalObj.cover&&detalObj.cover!=''" :style="{backgroundImage:'url('+baseUrl+detalObj.cover+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
        </div>
        </Col>
        <Col span="18">
        <!-- <h3>{{detalObj.bookName}}</h3> -->
        <Row style="font-size: 14px;line-height: 30px;">
          <Col span="5">
          <p>电子书价：</p>
          <p>作　　者：</p>
          <p>出 &nbsp;版 &nbsp;社：</p>
          <p>页　　面：</p>
          <p>中　　图：</p>
          </Col>
          <Col span="7">
          <p>{{detalObj.price?formatPrice(detalObj.price):'0.00'}}</p>
          <p class="es">{{detalObj.author?detalObj.author:'-'}}</p>
          <p>{{detalObj.pubName?detalObj.pubName:'-'}}</p>
          <p>{{detalObj.page?detalObj.page:'-'}}</p>
          <p>{{detalObj.cateStandard?detalObj.cateStandard:'-'}}</p>
          </Col>
          <Col span="5">
          <p>纸质书价：</p>
          <p>I S　B N：</p>
          <p>出版日期：</p>
          <p>开　　本：</p>
          <p>装　　帧：</p>
          </Col>
          <Col span="7">
          <p>{{detalObj.paperPrice?formatPrice(detalObj.paperPrice):'0.00'}}</p>
          <p class="es">{{detalObj.number?detalObj.number:'-'}}</p>
          <p>{{detalObj.publishTime?secondsToNormalDate(detalObj.publishTime):'-'}}</p>
          <p>{{detalObj.size?detalObj.size:'-'}}</p>
          <p>{{detalObj.bind?detalObj.bind:'-'}}</p>
          </Col>
        </Row>
        </Col>
      </Row>
      <div slot="footer" style="text-align: center;">
        <Button type="primary" @click="detailModal=false">确定</Button>
      </div>
    </Modal>
    <!-- 导入文件 -->
    <Modal v-model="importModal" :mask-closable="false" id="modalNofooter" width='630'>
      <p slot="header" style="text-align:center;color:#333;">导入书籍</p>
      <Row style="margin: 15px 0 50px;">
        <Col span="8" style='text-align: right;line-height: 30px;padding-right: 15px;'>上传文件：</Col>
        <Col span="16">
        <Upload v-if="resetUpload" :action="baseUrl+'/v1/admin/file/booksUpload'" :before-upload="handleUpload" :on-success="uploadSuccess">
          <Button type="ghost" icon="ios-cloud-upload-outline">请上传zip格式的压缩包</Button>
        </Upload>
        <!-- <div v-if="fileObj !== null">{{ fileObj.name }}</div> -->
        </Col>
      </Row>
      <!-- <div style="text-align: right;margin-top: 50px;">
        <Button type="ghost" @click="shopUpload">取消</Button>
        <Button type="primary" @click="importData" :loading="loadingStatus">确定</Button>
      </div> -->
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseUrl: 'http://eknowledge.jqweike.com',
      tp: 0,
      cp: 1,
      ep: 10,
      dateValue: '',
      startTime: '',
      endTime: '',
      loading: false,

      detailModal: false,
      detalObj: {},

      importModal: false,
      fileObj: {},
      resetUpload: true,

      columns4: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: 'ISBN',
        key: 'number',
        ellipsis:true,
      }, {
        title: '书名',
        key: 'bookName',
        ellipsis:true,
        render: (h, params) => {
          return h("span", params.row.bookName ? params.row.bookName : '-')
        }
      }, {
        title: '作者',
        key: 'author',
        ellipsis:true,
        render: (h, params) => {
          return h("span", params.row.author ? params.row.author : '-')
        }
      }, {
        title: '出版社',
        key: 'pubName',
        ellipsis:true,
        render: (h, params) => {
          return h("span", params.row.pubName ? params.row.pubName : '-')
        }
      }, {
        title: '出版日期',
        key: 'name',
        ellipsis:true,
        render: (h, params) => {
          return h("span", this.secondsToNormalDate(params.row.publishTime))
        }
      }, {
        title: '电子书价格',
        key: 'price',
        render: (h, params) => {
          return h('div', [
            h("span", params.row.price ? this.formatPrice(params.row.price, 2) : '0.00')
          ])
        }
      }, {
        title: '纸质书价格',
        key: 'price',
        render: (h, params) => {
          return h("span", params.row.paperPrice ? this.formatPrice(params.row.paperPrice, 2) : '0.00')
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
          startTime: this.startTime,
          endTime: this.endTime,
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
    /**
     * [handleChange 处理日期赋值]
     * @Author   赵雯欣
     * @DateTime 2017-11-19
     * @param    {[type]}   date [description]
     * @return   {[type]}        [description]
     */
    handleChange(date) {
      this.dateValue = date;
    },
    handleOk() {
      this.openDate = false;
      this.startTime = this.dateValue[0];
      this.endTime = this.dateValue[1];
      // this.getlist()
    },
    clearData() {
      this.openDate = false;
      this.startTime = '';
      this.endTime = '';
      // this.getlist()
    },
    openModal() {
      this.importModal = true;
    },
    //上传之前的处理函数
    handleUpload(file) {
      if (file.name.indexOf('zip') > 0 || file.name.indexOf('rar') > 0) {
        this.fileObj = file;
        // return false;
      } else {
        this.$Message.warning('请上传zip,rar格式的压缩包');
        return false;
      }
    },
    uploadSuccess(response, file, fileList){
      if(response.status==200){
        this.$Message.success('导入成功')
        this.importModal = false;
        this.getlist()
      }else{
        this.$Message.error(response.message)
      }
    },
    /**
     * [importData 导入知识体系]
     * @Author   赵雯欣
     * @DateTime 2017-11-19
     * @return   {[type]}   [description]
     */
    importData() {
      if (this.file) {
        // this.loading = true;
        this.loadingStatus = true;

        var form = new FormData();
        form.append("file", this.file, this.file.name);
        form.append("BridgePlatformName", transferUrl);
        form.append("ApiName", '/Hierarchy/ImportWordData');
        var _this = this;

        var xhr = $.ajax({
          url: _this.baseUrl + '/Hierarchy/ImportWordData',
          contentType: false,
          type: 'POST',
          data: form,
          processData: false,
          dataType: 'json', //返回的数据格式：json/xml/html/script/jsonp/text
          success: function(data, textStatus, jqXHR) {
            if (data.Success) {
              _this.$Message.success('导入成功')
              _this.getlist()
              _this.file = null;
              _this.loadingStatus = false;
              // _this.loading = false;
              _this.showModal = false;
            } else {
              _this.$Message.error(res.Description)
            }
          }
        })

        //取消请求
        // xhr.abort()
      } else {
        this.$Message.warning('请先选择文件')
      }
    },
  },
}

</script>
<style lang="less">
.Synchronization {
  .top {
    margin-bottom: 15px;
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

#detailModal {
  font-size: 14px;
  .img-warp {
    width: 120px;
    height: 150px;
    overflow: hidden;
    background: url('../../../static/img/no_cover_m.jpg');
    background-size:'cover';
    background-position: center center;
  }

  .img-box{
    width: 120px;
    height: 150px;
  }
  .es {
    width: 124px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 30px;
  }
}

</style>
