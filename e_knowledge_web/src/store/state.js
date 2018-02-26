//state是保存整个仓库的状态
export default {
  count: 10,
  shoppingCarCount: 0,

  //详情页面数据
  detailsData: {
    ExtendData: {
      IsOrdered: false,
      IsJoinedCart: false,
      HasElectronicalBook: false,
      HasPod: false,
      HasPaperBook: false,
      IsFavorited: false,
    },
    ObjectType: '',
    CoverUrl: '',
  },
  countDownTimer:'',
  //详情资源类型
  typeAndPrice:[],
  nowTypeAndPrice:{},
  //收藏成功模态框
  collectModal: false,

  //详情页面收藏
  collectDetail: false,

  detailLoading: false,

  //登录弹窗
  loginModal: false,
  loginIsByModal: false,


  //登录后回调
  callbackAfterLogin: {},


  //用户信息
  userInfo: window.$cookies.get('bg_user_info') ? JSON.parse(window.$cookies.get('bg_user_info')) : '',
}
