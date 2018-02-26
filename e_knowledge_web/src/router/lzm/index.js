import R from "./require.js"

export default [{
  path: '/index',
  component: R.CommonRouter,
  children: [{
    path: '',
    name: '首页',
    component: R.Index
  }, {
    path: 'search',
    name: '搜索结果',
    component: R.Search,
    children: [{
      path: 'db',
      name: '搜索数据库',
      component: R.SearchDb
    }, {
      path: 'ac',
      name: '搜索活动',
      component: R.SearchAc
    }]
  }]
}, {
  path: '/training',
  component: R.CommonRouter,
  children: [{
    path: '',
    name: '入馆培训',
    component: R.Training,
  }]
}, {
  path: '/database',
  component: R.CommonRouter,
  children: [{
    path: '',
    name: '数据库',
    component: R.Database
  }, {
    path: 'dataBaseDetail',
    name: '数据库详情',
    component: R.DataBaseDetail
  }]
}]
