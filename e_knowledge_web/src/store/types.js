/*
  这里面定义所有action的唯一名称，需要在actions和mutations里用到，类似redux里的type
 */

export const ADD = 'ADD';
export const DECREMENT = 'DECREMENT';

export const CHANGEYEAR = 'CHANGEYEAR';

export const OPENANDCLOSELOGINMODAL ="OPENANDCLOSELOGINMODAL";

export const LOGINISBYMODAL = "LOGINISBYMODAL";

export const SETWINDOW ="SETWINDOW";

//设置购物车
export const GETSHOPPINGCARCOUNT ="GETSHOPPINGCARCOUNT";

//更新详情数据
export const UPDATEDETAILDATA = "UPDATEDETAILDATA";

//重置详情数据
export const RESETDETAILDATA = 'RESETDETAILDATA';

//显示当前资源类型和价格
export const SETDETAILTYPEANDPRICE = 'SETDETAILTYPEANDPRICE';

export const SETNOWTYPEANDPRICE = "SETNOWTYPEANDPRICE";

//是否登录和登录信息
export const SETUSERINFO = 'SETUSERINFO';

//设置收藏
export const SETDETAILDATACOLLECT = 'SETDETAILDATACOLLECT';

//显示收藏成功模态框
export const SETCOLLECTMODAL = 'SETCOLLECTMODAL';

//购买资源-详情
export const BUGRESOURCEDETAIL = 'BUGRESOURCEDETAIL';

//收藏资源-详情
export const COLLECTDETAIL = 'COLLECTDETAIL';

//登陆之后的操作
export const SETCALLBACKAFTERLOGIN='SETCALLBACKAFTERLOGIN';


//详情登录
export const SETDETAILLOADING = 'SETDETAILLOADING';

//活动倒计时
export const TIMECOUNTDOWN = "TIMECOUNTDOWN";

//重置用户信息
export const RESETUSERINFO = "RESETUSERINFO";

//价格倒计时定时器
export const COUNTDOWNTIMER = "COUNTDOWNTIMER";
