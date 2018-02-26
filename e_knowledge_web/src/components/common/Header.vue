<template>
  <div class="header-main">
    <div class="container dt">
      <a href="#" class="logo" @click.prevent="$router.push('/')"></a>
      <ul class="header-nav">
        <li v-for="(item,index) in navList" @click="goPath(item.path)" :key="index">
          <span :class="pathMatch(item.path)?'selected':''">
          {{item.name}}
        </span>
        </li>
      </ul>
      <i class="search-icon" @click.stop.self="searchInfo">
        <div class="search-main" v-show="showSearch">
          <i class="close-icon" @click.stop.self="closeSearch"></i>
      <span class="search-wrap">
            <el-input autofocus v-model="searchKey" @keyup.native.13='searchInfo'></el-input>
          </span>
    </div>
    <div class="search-record" v-show="showSearch">
      <span>最近搜索</span>
      <ul>
        <li v-for="(item,index) in searchRecord" :key="index" @click.stop="searchKey=item.name"><span>{{item.name}}</span></li>
      </ul>
    </div>
    </i>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchKey: '',

      showSearch: false,

      searchRecord: [],

      navList: [{
        name: '首页',
        path: '/index'
      }, {
        name: '入馆培训',
        path: '/training'
      }, {
        name: '数据库',
        path: '/database'
      }, {
        name: '馆内活动',
        path: '/tubeActivity'
      }, {
        name: '资源推荐',
        path: '/resourceRecommendList'
      }]

    }
  },
  methods: {
    pathMatch(val) {
      if (this.$route.path.indexOf(val) != -1) {
        return true;
      } else {
        return false;
      }
    },
    searchInfo() {
      if (!this.searchKey) {
        this.showSearch = !this.showSearch;
      } else {
        this.$router.push({
          path: '/index/search/db',
          query: {
            key: this.searchKey,
          }
        });
        this.closeSearch();

      }
    },
    closeSearch() {
      this.showSearch = false;
      this.searchKey = '';
    },


    getSearchRecord(){
      this.$http.get('/v1/frontend/record-search-key/getRecord')
      .then((res)=>{
        if (res.data.status == 200) {
          this.searchRecord = res.data.data;
        }
      })
    }
  },
  created() {
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.closeSearch();
      }
    }),

    this.getSearchRecord();
  },

  watch:{
    'showSearch':function(val,oldVal){
      if (val && !oldVal) {
        this.getSearchRecord();
      }
    }
  }

}

</script>
<style lang="less">
.header-main {
  height: 82px;
  background-color: #fff;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-top: 22px;
  font-size: 16px;
  color: #333;
  font-weight: normal;

  .logo {
    display: inline-block;
    width: 137px;
    height: 38px;
    float: left;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    background-image: url('/static/images/logo.png');
  }

  .header-nav {
    width: auto;
    display: inline-block;
    float: left;
    margin-left: 150px;
    padding-top: 8px;

    >li {
      display: inline-block;
      padding: 0 50px;
      position: relative;
      line-height: 20px;

      &:after {
        content: '';
        display: inline-block;
        position: absolute;
        width: 5px;
        height: 5px;
        background: url('/static/images/dot.png') no-repeat center center;
        background-size: contain;
        top: 8px;
        right: 0;
      }

      >span {
        cursor: pointer;

        &:hover {
          color: #21b290;
        }
      }

      &:last-child {
        &:after {
          display: none;
        }
      }
    }

    .selected {
      font-weight: bold;
      position: relative;
      color: #21b290;

      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: #21b290;
        left: 0;
        bottom: -6px;
      }
    }
  }

  .search-icon {
    display: inline-block;
    float: right;
    width: 25px;
    height: 24px;
    background: url('/static/images/search_icon.png') no-repeat center center;
    background-size: contain;
    margin-top: 8px;
    cursor: pointer;
    position: relative;
    z-index: 20;
  }

  .search-main {
    width: 872px;
    height: 27px;
    position: absolute;
    right: 26px;
    top: 0;
    z-index: 10;
    background-color: #fff;
    display: table-cell;

    .el-input__inner {
      height: 27px;
      border: none!important;
      font-size: 16px!important;
    }
    .close-icon {
      width: 20px;
      height: 20px;
      position: absolute;
      left: 2px;
      top: 4px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      background-image: url('/static/images/close.png');

      &:after {
        content: '';
        display: inline-block;
        height: 100%;
        width: 1px;
        position: absolute;
        background-color: #e0e0e0;
        right: -19px;
        top: 0;
      }
    }
    .search-wrap {
      display: inline-block;
      width: 800px;
      margin-left: 50px;
    }
  }
  .search-record {
    position: absolute;
    width: 898px;
    background-color: #fff;
    z-index: 20;
    top: 54px;
    right: 0;
    box-sizing: border-box;
    padding: 10px 18px;
    font-size: 16px;
    font-style: normal;
    cursor: default;
    >span {
      color: #999999;
      font-size: 14px;
    }

    li {
      height: 30px;
      line-height: 30px;

      >span {
        cursor: pointer;
      }
    }
  }
}

</style>
