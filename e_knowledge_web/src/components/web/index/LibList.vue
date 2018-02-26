<template>
  <div class="lib-list">
    <div class="container lib-main">
      <div class="pr lib-nav">
        <ul class="nav-main">
          <li v-for="(item,index) in navList" :key="index" :class="defaultIndex==index?'selected':''" @click="navChange(item,index)">{{item.title}}</li>
        </ul>
        <span class="more-btn" @click="$router.push('/training')">更多</span>
      </div>
      <div class="lib-container" v-html="content">
      </div>
      <div class="lib-control" v-if="navList.length>1">
        <span class="lib-right" :class="defaultIndex<(navList.length-1)?'can-control':''" @click="changeNav(false)"></span>
        <span class="lib-left" :class="defaultIndex>0?'can-control':''" @click="changeNav(true)"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sn: '',

      defaultIndex: 0,

      navList: [],
      content: '',

      limit: 4,
    }
  },
  methods: {
    changeNav(val) {
      if (val) {
        if (this.defaultIndex <= 0) {
          return;
        } else {
          this.defaultIndex = this.defaultIndex - 1;
        }
      } else {
        if (this.defaultIndex >= this.navList.length - 1) {
          return;
        } else {
          this.defaultIndex = this.defaultIndex + 1;
        }
      }
      this.navList.forEach((item, index) => {
        if (this.defaultIndex == index) {
          this.sn = this.navList[index].id;
        }
      })
    },
    navChange(item, index) {
      this.sn = item.id;
      this.defaultIndex = index;
    },
    getListData() {
      let params = {};
      if (this.sn) {
        params.sn = this.sn;
      }
      this.$http.get('/v1/frontend/index/getTrain', {
          params: params
        })
        .then((res) => {
          if (res.data.status == 200) {
            let data = res.data.data;
            if (data.titles.length > this.limit) {
              this.navList = data.titles.slice(0, this.limit - 1)
            } else {
              this.navList = data.titles;
            }
            this.content = data.content.content;
          }
        })
    }
  },
  created() {
    this.getListData();
  },
  watch: {
    'defaultIndex': function() {
      this.getListData();
    }
  }
}

</script>
<style lang="less">
.lib-list {
  background-color: #f4f4f4;
  padding: 40px 0 30px;

  .lib-main {
    background-color: #fff;
    padding: 11px 50px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .lib-nav {
    font-size: 16px;
    color: #333;
    height: 40px;
    margin-bottom: 45px;

    &:after {
      content: '';
      display: block;
      height: 1px;
      width: 100%;
      background-color: #dfdfdf;
      position: absolute;
      left: 0;
      bottom: -18px;
    }
  }
  .more-btn {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    width: 125px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #666;
    border: 1px solid #a9b1b6;
    cursor: pointer;

    &:hover{
      background-color: #20b391;
      color: #fff;
    }
  }
  .nav-main {
    overflow: hidden;
    max-width: 970px;
    >li {
      float: left;
      padding: 12px;
      margin-right: 30px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
    }
    .selected {
      color: #fff;
      font-weight: bold;
      background-color: #20b391;
    }
  }
  .lib-container {
    max-height: 445px;
    min-height: 100px;
    overflow-y: auto;
  }
  .lib-control {
    margin: 16px 0 13px;
    overflow: hidden;
    .lib-left,
    .lib-right {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-color: #dadada;
      float: right;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
    }

    .lib-left {
      background-image: url('/static/images/prev_l.png');
    }
    .lib-right {
      background-image: url('/static/images/next_r.png');
    }

    .can-control {
      background-color: #20b391;
    }
  }
}

</style>
