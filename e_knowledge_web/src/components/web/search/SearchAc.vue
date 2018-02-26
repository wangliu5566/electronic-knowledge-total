<template>
  <div>
    <div class="search-header">
      <ul class="search-nav">
        <li :class="isSelected(item)" v-for="(item,index) in navList" :key="index" @click="cutNav(item)">{{item.label}}</li>
      </ul>
      <span style="margin-top: 2px;">
          <el-input placeholder="关键字..." v-model="searchKey">
            <b slot="append" class="search-icon" @click="searchInfo" @keyup.native.13='searchInfo'></b>
          </el-input>
        </span>
    </div>
    <ul class="list-main list-search" v-if="dataList.length!=0">
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
    <div class="page-control" v-show="tp!=0">
      <el-pagination background layout="prev, pager, next" :total="tp" :page-size="ep" :current-page="cp" class="search-page" @current-change="cpChange">
      </el-pagination>
    </div>
    <div class="no-result search-no" v-if="noResult">
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: [{
        label: '数据库',
        path: '/index/search/db',
      }, {
        label: '活动',
        path: '/index/search/ac'
      }],


      searchKey: '',
      dataList: [],

      cp: 1,
      tp: 0,
      ep: 16,


      noResult:false,
    }
  },
  methods: {
    cutNav(item) {
      this.$router.push({
        path: item.path,
        query: this.$route.query
      })
    },

    isSelected(item) {
      if (this.$route.path == item.path) {
        return 'selected';
      } else {
        return '';
      }
    },
    searchInfo() {
      this.cp = 1;
      this.tp = 0;
      this.getListData(this.searchKey);

    },
    getListData(searchKey) {

      this.$http.get('/v1/frontend/index/getAc', {
          params: {
            page: this.cp,
            length: this.ep,
            key: searchKey ? searchKey : this.$route.query.key,
          }
        })
        .then((res) => {
          this.searchKey = '';
          if (res.data.status == 200) {
            let data = res.data.data;
            this.dataList = data.ac;
            this.tp = parseInt(data.count);

            if (this.tp==0) {
              this.noResult = true;
            }else{
              this.noResult = false;
            }
          }
        })
    },

    cpChange(val) {
      this.cp = val;
      this.getListData();
    }

  },
  created() {
    this.getListData();
  },
  watch:{
    '$route':function(){
      this.cp = 1;
      this.getListData();
    }
  }
}

</script>
