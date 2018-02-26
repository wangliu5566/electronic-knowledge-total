<template>
  <div class="lib-database">
    <div class="database-swiper">
    </div>
    <LibDatabase></LibDatabase>
    <div class="database-wrap">
      <div class="container">
        <div class="list-filter">
          <span>筛选：</span>
          <ul>
            <li @click.stop.prevent="letterClick" :class="showLetter?'selected':''"><span class="li-label">{{letter}}</span><i class="el-icon-arrow-down"></i>
              <ul class="filter-dropdown" v-show="showLetter" @click.stop.prevent="showLetter=true">
                <li v-for="(item,index) in letterList" :key="index" :class="item.letter == letter ?'item-selected':''" @click.stop.prevent="letterChange(index)">{{item.letter}}</li>
              </ul>
            </li>
            <li @click.stop.prevent="languageClick" :class="showLanguage?'selected':''"><span class="li-label">{{language}}</span><i class="el-icon-arrow-down"></i>
              <ul class="filter-dropdown" v-show="showLanguage" @click.stop.prevent="showLanguage=true">
                <li v-for="(item,index) in languageList" :key="index" :class="item.name == language ?'item-selected':''" @click.stop.prevent="languageChange(index)">{{item.name}}</li>
              </ul>
            </li>
            </li>
            <li @click.stop.prevent="subjectClick" :class="showSubject?'selected':''"><span class="li-label">{{subject}}</span><i class="el-icon-arrow-down"></i>
              <ul class="filter-dropdown" v-show="showSubject" @click.stop.prevent="showSubject=true">
                <li v-for="(item,index) in subjectList" :key="index" :class="item.name == subject ?'item-selected':''" @click.stop.prevent="subjectChange(index)">{{item.name}}</li>
              </ul>
            </li>
            </li>
          </ul>
        </div>
        <div class="list-wrap">
          <ul class="list-main list-database" v-if="dataList.length!=0">
            <li v-for="(item,index) in dataList" :key="index" @click="toDbDetail(item.id)">
              <div class="cover">
                <div class="cover" :style="{backgroundImage:'url('+item.coverImage+')'}">
                  <p :class="item.isTest==1?'flag-gray':item.isTest==2?'flag-green':''">{{dbFlag(item.isTest)}}</p>
                </div>
              </div>
              <p class="list-title" ref="listTitle" style="line-height: 44px;">
                <ellipsis :data="item.name" :line-height="'44px'"></ellipsis>
              </p>
              <div class="info" ref="listInfo">
                <ellipsis :data="item.subjectName + '-' + item.languageName" :line-height="'26px'"></ellipsis>
                <ellipsis :data="item.intro" :line-clamp="2" :line-height="'26px'"></ellipsis>
              </div>
            </li>
          </ul>
          <div class="page-control" v-show="tp!=0">
            <el-pagination background layout="prev, pager, next" :total="tp" :page-size="ep" :current-page="cp" class="search-page">
            </el-pagination>
          </div>
          <div class="no-result search-no" v-if="noResult">
          </div>
        </div>
      </div>
    </div>
    <RecommendActivity></RecommendActivity>
  </div>
</template>
<script>
import LibDatabase from "web/database/LibDatabase"
import RecommendActivity from "web/search/RecommendActivity"
export default {
  data() {
    return {
      tp: 0,
      ep: 16,
      cp: 1,

      dataList: [],

      noResult: false,

      letter: '所有字母',
      language: '所有语言',
      languageId: '',
      subject: '所有学科',
      subjectId: '',

      showLetter: false,
      showLanguage: false,
      showSubject: false,

      letterList: [{
        letter: '所有字母'
      }],
      languageList: [{
        id: '',
        name: '所有语言',
      }],
      subjectList: [{
        subjectId: '',
        name: '所有学科'
      }],
    }
  },
  components: {
    LibDatabase,
    RecommendActivity
  },

  methods: {
    letterClick() {
      this.showLetter = !this.showLetter;
      this.showLanguage = false;
      this.showSubject = false;
    },
    languageClick() {
      this.showLanguage = !this.showLanguage;
      this.showLetter = false;
      this.showSubject = false;
    },
    subjectClick() {
      this.showSubject = !this.showSubject;
      this.showLanguage = false;
      this.showLetter = false;
    },
    letterChange(index) {
      this.letter = this.letterList[index].letter;
      this.showLetter = !this.showLetter;
    },

    languageChange(index) {
      this.language = this.languageList[index].name;
      this.languageId = this.languageList[index].id;
      this.showLanguage = !this.showLanguage;
    },

    subjectChange(index) {
      this.subject = this.subjectList[index].name;
      this.subjectId = this.subjectList[index].subjectId;
      this.showSubject = !this.showSubject;
    },
    getLetterList() {
      this.$http.get('/v1/frontend/data-base/getLetterLists')
        .then((res) => {
          if (res.data.status == 200) {
            this.letterList = [...this.letterList, ...res.data.data];
          }
        })
    },

    getLanguageList() {
      this.$http.get('/v1/frontend/language/getLists')
        .then((res) => {
          if (res.data.status == 200) {
            this.languageList = [...this.languageList, ...res.data.data];
          }
        })

    },

    getSubjectList() {
      this.$http.get('/v1/frontend/subject/getLists')
        .then((res) => {
          if (res.data.status == 200) {
            this.subjectList = [...this.subjectList, ...res.data.data];
          }
        })
    },

    getListData() {
      let params = {
        page: this.cp,
        length: this.ep,
        key: '',
        isRc: 0,
      }
      if (this.letter != '所有字母') {
        params.letter = this.letter;
      }
      if (this.languageId) {
        params.languageId = this.languageId;
      }
      if (this.subjectId) {
        params.subjectId = this.subjectId;
      }
      this.$http.get('/v1/frontend/index/getDb', {
          params: params
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.dataList = res.data.data.db;
            this.tp = parseInt(res.data.data.count);

            if (this.dataList.length == 0) {
              this.noResult = true;
            } else {
              this.noResult = false;
            }
          }
        })
    }
  },
  created() {
    this.getListData();
    this.getLetterList();
    this.getLanguageList();
    this.getSubjectList();


    document.addEventListener('click', (e) => {
      if (this.$el.contains(e.target)) {
        this.showLetter = false;
        this.showLanguage = false;
        this.showSubject = false;
      }
    })
  },
  watch: {
    letter: function(val, oldVal) {
      this.cp = 1;
      this.getListData();
    },
    language: function(val, oldVal) {
      this.cp = 1;
      this.getListData();
    },
    subject: function(val, oldVal) {
      this.cp = 1;
      this.getListData();
    }
  }
}

</script>
<style lang="less">
.lib-database {
  .database-swiper {

    height: 500px;
    min-width: 1200px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url('/static/images/database_swiper.jpg');
  }

  .database-wrap {
    padding: 20px 0 52px;
  }

  .list-wrap {
    width: 100%;
  }

  .list-filter {
    height: 37px;
    box-sizing: border-box;
    border: 1px dashed #21b290;
    padding: 0 20px;
    font-size: 16px;
    line-height: 36px;

    >span {
      float: left;
    }

    >ul {
      display: inline-block;

      >li {
        display: table-cell;
        color: #666;
        padding: 0 10px;
        cursor: pointer;
        position: relative;

        &:hover {
          background-color: #21b290;
          color: #fff;
        }
      }

      .li-label {
        display: inline-block;
      }

      .selected {
        background-color: #21b290;
        color: #fff;
      }

      .filter-dropdown {
        position: absolute;
        left: 0;
        top: 38px;
        width: 330px;
        max-width: 330px;
        background-color: #21b290;
        color: #fff;
        overflow: hidden;
        z-index: 100;
        margin-right: -10px;
        box-sizing: border-box;
        padding: 0 10px 0;
        >li {
          float: left;
          margin-right: 10px;
          &:hover {
            color: #ff2727;
          }
        }

        .item-selected {
          color: #ff2727;
        }
      }
    }
  }
  .page-control {
    text-align: center;
  }

  .list-database {
    padding-top: 30px;
  }
}

</style>
