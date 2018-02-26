/*
  这里面只用于对state的操作，不允许进行逻辑、流程、异步等操作
 */

import {
  DECREMENT,
  GETSHOPPINGCARCOUNT,
  UPDATEDETAILDATA,
  RESETDETAILDATA,
  SETDETAILTYPEANDPRICE,
  SETNOWTYPEANDPRICE,
  SETUSERINFO,
  SETDETAILDATACOLLECT,
  SETCOLLECTMODAL,
  BUGRESOURCEDETAIL,
  COLLECTDETAIL,
  OPENANDCLOSELOGINMODAL,
  LOGINISBYMODAL,
  SETCALLBACKAFTERLOGIN,
  SETDETAILLOADING,
  TIMECOUNTDOWN,
  RESETUSERINFO,
  COUNTDOWNTIMER

} from './types.js';

import state from './state.js';


const mutations = {

  [DECREMENT]: (state) => {
    state.count--;
  },

  [GETSHOPPINGCARCOUNT]: (state, count) => {
    state.shoppingCarCount = count;
  },

  [UPDATEDETAILDATA]: (state, data) => {
    state.detailsData = Object.assign({}, state.detailsData, data);
  },

  [SETDETAILTYPEANDPRICE]: (state, data) => {
    state.typeAndPrice = data;
  },

  [SETNOWTYPEANDPRICE]:(state,val)=>{
    state.nowTypeAndPrice = val;
  },

  [RESETDETAILDATA]: (state, data) => {
    state.detailsData = data;
  },

  [SETUSERINFO]: (state, data) => {
    state.userInfo = data;
  },

  [SETDETAILDATACOLLECT]: (state, data) => {
    state.detailsData = Object.assign({},state.detailsData,data);
  },

  [SETCOLLECTMODAL]:(state,status)=>{
    state.collectModal = status;
  },

  [OPENANDCLOSELOGINMODAL]:(state,status)=>{
    state.loginModal = status;
  },

  [LOGINISBYMODAL]:(state,status)=>{
    state.loginIsByModal = status;
  },

  [SETCALLBACKAFTERLOGIN]:(state,data)=>{  //state是vuex维护数据，data是传进来的值（这里是一个对象，有值，有方法）
    state.callbackAfterLogin = data;
  },

  [SETDETAILLOADING]:(state,status)=>{
    state.detailLoading = status;
  },

  [TIMECOUNTDOWN]:(state,val)=>{
    state.detailsData.ExtendData.SaleStrategyExpireIn = val;
  },

  [RESETUSERINFO]:(state)=>{
    state.userInfo = '';
  },
}


export default {
  mutations,
  state,
}

//这里需要将mutations和state一起暴露给index.js
//如果是将state独立出来的，可以另外处理
