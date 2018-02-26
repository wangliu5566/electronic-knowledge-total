/*
  这里面定义所有action，也就是store的dispatch方法，用于处理接收组件传入的请求
  所有的流程控制、逻辑处理、异步操作都放在这里面进行
  通过commit提交给mutations，通过type作为两者相连的唯一通道
 */
import Vue from 'vue';

import * as types from './types.js';
import Router from '@/router/index'
import store from '@/store/index'
export default {

  //示例
  decrement: ({ commit, state }) => {
    if (state.mutations.count > 0) {
      commit(types.DECREMENT);
    }
  },

  /**
   * [getShoppingCount 设置购物车]
   * @Author   罗文
   * @DateTime 2018-01-09
   * @param    {[type]}   options.commit [触发mutation]
   * @return   {[type]}                  [description]
   */
  getShoppingCount: ({ commit, state }) => {
    //如果没有bg_user_info，则表明是退出时清空购物车数量
    var hasLogin;
    var user_info = state.mutations.userInfo ? state.mutations.userInfo : '';
    if (user_info && user_info.Id && (user_info.MobileNumber || user_info.NickName || user_info.RealName) && user_info.Secret) {
      hasLogin = true;
    } else {
      hasLogin = false;
    }
    if (!hasLogin) {
      commit(types.GETSHOPPINGCARCOUNT, 0);
    } else {
      Vue.prototype.$http.get("/ShoppingCart/GetCount", {
          params: {}
        })
        .then((res) => {
          if (res.data.Success) {
            commit(types.GETSHOPPINGCARCOUNT, res.data.Data);
          }
        })
    }
  },


  getDeatilsByAjax: ({ commit, state }, params) => {
    commit(types.SETDETAILLOADING, true);
    if (state.mutations.countDownTimer) {
      window.clearInterval(state.mutations.countDownTimer);
    }

    Vue.prototype.$http.get('/Content/Detail', {
        params: params
      })
      .then((res) => {

        if (res.data.Success) {
          commit(types.SETDETAILLOADING, false)

          var resData = res.data.Data;

          // resData.IsOnShelf=false

          if (resData.ObjectType == 102) {
            resData = Object.assign({}, resData, {
              CoverUrl: '/static/images/section_zw_detail.jpg'
            })
          }

          //更新detailsData
          commit(types.UPDATEDETAILDATA, resData);


          if (resData.ExtendData.SaleStrategyExpireIn && resData.ExtendData.SaleStrategyExpireIn != 0) {
            state.mutations.countDownTimer = window.setInterval(function() {
              var nowSecond = parseInt(resData.ExtendData.SaleStrategyExpireIn) - 1;

              commit(types.TIMECOUNTDOWN, nowSecond);

              if (nowSecond <= 0) {
                window.clearInterval(state.mutations.countDownTimer);
              }
            }, 1000)
          }

          var typeAndPriceData = [];


          if (resData.ObjectType == 104) {
            if (resData.ExtendData.HasElectronicalBook && resData.ExtendData.HasElectronicalBook.toLowerCase() == 'true') {
              typeAndPriceData.push({
                bookType: 'Elec',
                bookCurrentPrice: resData.CurrentPrice,
                bookMarketPrice: resData.MarketPrice,
                label: '电子书',
              })
            }
            if (resData.ExtendData.HasPaperBook && resData.ExtendData.HasPaperBook.toLowerCase() == 'true') {
              typeAndPriceData.push({
                bookType: 'Entity',
                bookCurrentPrice: resData.ExtendData.PaperBookPrice,
                bookMarketPrice: resData.MarketPrice,
                label: '纸质书'
              })
            }
            if (resData.ExtendData.HasPod && resData.ExtendData.HasPod.toLowerCase() == 'true') {
              typeAndPriceData.push({
                bookType: 'POD',
                bookCurrentPrice: resData.ExtendData.PodPrice,
                bookMarketPrice: resData.MarketPrice,
                label: 'POD'
              })

            }
          }
          if (resData.ObjectType == 108) {
            if (resData.ExtendData.HasMediumPic && resData.ExtendData.HasMediumPic.toLowerCase() == 'true') {
              typeAndPriceData.push({
                bookType: 'MediumPic',
                bookCurrentPrice: resData.ExtendData.MediumImagePrice,
                bookMarketPrice: resData.ExtendData.OriginalImagePrice,
                label: '中图价格'
              })
            }
            if (resData.ExtendData.HasOriginalPic && resData.ExtendData.HasOriginalPic.toLowerCase() == 'true') {
              typeAndPriceData.push({
                bookType: 'OriginalPic',
                bookCurrentPrice: resData.ExtendData.OriginalImagePrice,
                bookMarketPrice: resData.ExtendData.OriginalImagePrice,
                label: '原图价格'
              })
            }
          }
          if (resData.ObjectType != 108 && resData.ObjectType != 104) {

            typeAndPriceData.push({
              bookType: 'Elec',
              bookCurrentPrice: resData.CurrentPrice,
              bookMarketPrice: resData.MarketPrice,
              label: '电子书'
            })

          }

          commit(types.SETNOWTYPEANDPRICE, typeAndPriceData[0]);
          commit(types.SETDETAILTYPEANDPRICE, typeAndPriceData);
        }
      })
  },

  setNowTypeAndPrice: ({ commit, state }, data) => {
    commit(types.SETNOWTYPEANDPRICE, data);
  },
  //获取资源详情
  getDeatilsByAjaxAndCallback: ({ commit, state }, params) => {

    Vue.prototype.$http.get('/Content/Detail', {
        params: params.params
      })
      .then((res) => {
        if (res.data.Success) {
          if (state.mutations.countDownTimer) {
            window.clearInterval(state.mutations.countDownTimer);
          }
          var resData = res.data.Data;

          if (resData.ObjectType == 102) {
            resData = Object.assign({}, resData, {
              CoverUrl: '/static/images/section_zw@3x.png'
            })
          }

          if (resData.ExtendData.SaleStrategyExpireIn && resData.ExtendData.SaleStrategyExpireIn != 0) {
            state.mutations.countDownTimer = window.setInterval(function() {
              var nowSecond = parseInt(resData.ExtendData.SaleStrategyExpireIn) - 1;

              commit(types.TIMECOUNTDOWN, nowSecond);

              if (nowSecond <= 0) {
                window.clearInterval(state.mutations.countDownTimer);
              }
            }, 1000)
          }

          //更新detailsData
          commit(types.UPDATEDETAILDATA, resData);

          if (params.callback && params.callback != '') {
            store.dispatch(params.callback, resData);
          }
        }
      })
  },

  collectDetail: ({ commit, state }, data) => {
    if (data.ExtendData.IsFavorited == "true") {
      commit(types.SETCOLLECTMODAL, true)
    } else {
      store.dispatch('setCollectDetail', data)
    }
  },

  buyResourceDetail: ({ commit, state }, data) => {
    let type = state.mutations.nowTypeAndPrice.bookType;
    Vue.prototype.$http.post('/ShoppingCart/Create', {
        mediaType: type,
        count: 1,
        objectId: state.mutations.detailsData.Id,
        objectType: state.mutations.detailsData.ObjectType,
        forceNewShoppingCart:true,
      })
      .then((res) => {
        if (res.data.Success) {
          if (type == 'Elec') {
            Router.push({ path: '/wrap/elePaid', query: { ObjectIds: res.data.Data } })
          } else {
            Router.push({ path: '/wrap/paperPaid', query: { ObjectIds: res.data.Data } })
          }
        } else {
          Vue.prototype.$confirm(res.data.Description, '', {
              showCancelButton: false,
              showConfirmButton: false,
              type: 'warning',
              customClass: 'detail-confirm',
              center: true
            })
            .then(() => {

            })
            .catch(() => {

            })
        }
      })
  },

  pushInShoppingCarDetail: ({ commit, state }, data) => {
    let type = state.mutations.nowTypeAndPrice.bookType;
    Vue.prototype.$http.post('/ShoppingCart/Create', {
        mediaType: type,
        count: 1,
        objectId: state.mutations.detailsData.Id,
        objectType: state.mutations.detailsData.ObjectType,
      })
      .then((res) => {
        if (res.data.Success) {
          Vue.prototype.$message({
            message: '已成功加入购物车',
            type: 'success'
          });

          store.dispatch('getShoppingCount');

        } else {
          Vue.prototype.$confirm(res.data.Description, '', {
              showCancelButton: false,
              showConfirmButton: false,
              type: 'warning',
              customClass: 'detail-confirm',
              center: true
            })
            .then(() => {

            })
            .catch(() => {

            })
        }
      })
  },


  setCollectDetail: ({ commit, state }, data) => {
    Vue.prototype.$http.post('/Favorite/CreateOrUpdate', {
        state: true,
        objectTypes: data.ObjectType,
        objectIds: data.Id
      })
      .then((response) => {
        if (response.data.Success) {

          commit(types.SETDETAILDATACOLLECT, {
            ExtendData: {
              IsFavorited: 'true'
            }
          });

          commit(types.SETCOLLECTMODAL, true)

        }
      })
  },

  resetDetailData: ({ commit, state }) => {
    commit(types.RESETDETAILDATA, {
      ExtendData: {
        IsOrdered: false,
        IsJoinedCart: false,
        HasElectronicalBook: false,
        HasPod: false,
        HasPaperBook: false
      },
      ObjectType: '',
    })
  },

  setDeatilDataCollect: ({ commit, state }, status) => {
    commit(types.SETDETAILDATACOLLECT, {
      ExtendData: {
        IsFavorited: status
      }
    });

    commit(types.SETCOLLECTMODAL, status == "true" ? true : false)
  },

  closeCollectModal: ({ commit, state }) => {
    commit(types.SETCOLLECTMODAL, false)
  },

  openCollectModal: ({commit, state }) => {
    commit(types.SETCOLLECTMODAL, true)
  },

  //弹出登录框，并且回调
  loginByModalAndCallback: ({ commit, state }, data) => {
    commit(types.OPENANDCLOSELOGINMODAL, true);
    commit(types.SETCALLBACKAFTERLOGIN, data);
  },

  //判断登录时跳页面（false），还是弹登录框（true）
  setLoginByModal: ({ commit, state }, status) => {
    commit(types.LOGINISBYMODAL, status);
  },

  resetCallback: ({ commit, state }) => {
    commit(types.SETCALLBACKAFTERLOGIN, {});
  },

  closeLoginModal: ({ commit, state }) => {
    commit(types.OPENANDCLOSELOGINMODAL, false)
  },


  //活动倒计时
  timeCountDown: ({ commit, state }, val) => {
    commit(types.TIMECOUNTDOWN, val);
  },


  resetUserInfo: ({ commit, state }, val) => {
    commit(types.RESETUSERINFO);
  },

  setUserInfo: ({ commit, state }, data) => {
    commit(types.SETUSERINFO, data);
  }

}
