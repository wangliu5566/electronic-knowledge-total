import Require from './require.js'

export default [{
  path: 'index',
  name: '首页',
  component: Require.Index,
}, {
  path: 'system',
  name: '系统管理',
  redirect: 'account',
  component: Require.CommonRouter,
  children: [{
    path: 'account',
    component: Require.Account,
    children: [{
      path: '',
      name: '账号管理',
      component: Require.AccountMain
    }, {
      path: 'add',
      name: '新建账号',
      component: Require.AccountAdd
    }, {
      path: 'edit',
      name: '编辑账号',
      component: Require.AccountEdit
    }]
  // }, {
  //   path: 'role',
  //   component: Require.Role,
  //   children: [{
  //     path: '',
  //     name: '角色管理',
  //     component: Require.RoleMain
  //   }]
  // }, {
  //   path: 'academy',
  //   component: Require.Academy,
  //   children: [{
  //     path: '',
  //     name: '机构管理',
  //     component: Require.AcademyMain
  //   }]
  }]
}, {
  path: 'resource',
  name: '资源管理',
  component: Require.Resource,
  redirect: '/wrap/resource/ManageView',
  children: [{
    path: 'Database',
    name: '数据库资料',
    component: Require.Database,
  },{
    path: 'Dataconfig',
    name: '馆藏数据库配置',
    component: Require.Dataconfig,
  },{
    path: 'Synchronization',
    name: '同步书目',
    component: Require.Synchronization,
  },{
    path: 'Press',
    name: '出版社电子资源',
    component: Require.Press,
  },{
    path: 'AddPress',
    name: '新增出版社资源',
    component: Require.AddPress,
  },{
    path: 'editPress',
    name: '修改出版社资源',
    component: Require.editPress,
  },{
    path: 'AddDatabase',
    name: '新增数据库资料',
    component: Require.AddDatabase,
  },{
    path: 'EditDatabase',
    name: '修改数据库资料',
    component: Require.EditDatabase,
  }]
}, {
  path: 'statistics',
  name: '数据管理',
  component: Require.ManageView,
  redirect: '/wrap/statistics/ManageView',
  children: [{
    path: 'ManageView',
    name: '流量管理',
    component: Require.ManageViewDate,
  }]
}]
