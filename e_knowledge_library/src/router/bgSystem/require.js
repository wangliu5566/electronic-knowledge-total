export default {
  Index: resolve => require.ensure([], () => resolve(require('@/components/bgSystem/Index')), 'bgSystem002'),
  CommonRouter:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/CommonRouter')), 'bgSystem001'),

  Account:resolve => require.ensure([], () => resolve(require('@/components/User/Account')), 'bgSystem003'),
  AccountMain:resolve => require.ensure([], () => resolve(require('@/components/User/AccountMain')), 'bgSystem003'),
  AccountAdd:resolve => require.ensure([], () => resolve(require('@/components/User/AccountAdd')), 'bgSystem004'),
  AccountEdit:resolve => require.ensure([], () => resolve(require('@/components/User/AccountEdit')), 'bgSystem005'),

  Role:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/Role')), 'bgSystem006'),
  RoleMain:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/RoleMain')), 'bgSystem006'),

  // News:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/News')), 'bgSystem007'),
  // NewsMain:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/NewsMain')), 'bgSystem007'),
  // NewsAdd:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/NewsAdd')), 'bgSystem008'),
  // NewsEdit:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/NewsEdit')), 'bgSystem009'),

  Activity:resolve => require.ensure([], () => resolve(require('@/components/Activity/Activity')), 'bgSystem010'),
  ActivityMain:resolve => require.ensure([], () => resolve(require('@/components/Activity/ActivityMain')), 'bgSystem010'),
  ActivityAudit:resolve => require.ensure([], () => resolve(require('@/components/Activity/ActivityAudit')), 'bgSystem011'),
  ActivityPreview:resolve => require.ensure([], () => resolve(require('@/components/Activity/ActivityPreview')), 'bgSystem012'),
  ActivityEdit:resolve => require.ensure([], () => resolve(require('@/components/Activity/ActivityEdit')), 'bgSystem013'),
  ActivityAdd:resolve => require.ensure([], () => resolve(require('@/components/Activity/ActivityAdd')), 'bgSystem014'),
  ActivityCheck:resolve => require.ensure([], () => resolve(require('@/components/Activity/ActivityCheckWorks')), 'bgSystem015'),
  ActivityAwards:resolve => require.ensure([], () => resolve(require('@/components/Activity/ActivityAwardsManage')), 'bgSystem016'),

  Academy:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/Academy')), 'bgSystem025'),
  AcademyMain:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/AcademyMain')), 'bgSystem025'),


  ManageView:resolve => require.ensure([], () => resolve(require('@/components/statistics/ManageView')), 'bgSystem017'),
  ManageViewDate:resolve => require.ensure([], () => resolve(require('@/components/statistics/ManageViewDate')), 'bgSystem017'),
  ManageViewWeek:resolve => require.ensure([], () => resolve(require('@/components/statistics/ManageViewWeek')), 'bgSystem018'),
  ManageViewMonth:resolve => require.ensure([], () => resolve(require('@/components/statistics/ManageViewMonth')), 'bgSystem019'),

  ManageActivity:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/ManageActivity')), 'bgSystem020'),
  ManageActivityStatus:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/ManageActivityStatus')), 'bgSystem020'),
  ManageActivityRate:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/ManageActivityRate')), 'bgSystem021'),
  ManageActivityTrend:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/ManageActivityTrend')), 'bgSystem022'),
  ManageActivityAnalysis:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/ManageActivityAnalysis')), 'bgSystem025'),

  ActivityWorks:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/ActivityWorks')), 'bgSystem026'),
  ActivityWorksAnalysis:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/ActivityWorksAnalysis')), 'bgSystem026'),
  ActivityWorksClick:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/ActivityWorksClick')), 'bgSystem027'),


  ManagePublisher:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/ManagePublisher')), 'bgSystem023'),
  ManagePublisherMain:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/ManagePublisherMain')), 'bgSystem023'),
  ManagePublisherList:resolve => require.ensure([], () => resolve(require('@/components/bgSystem/ManagePublisherList')), 'bgSystem024'),
    
     //资源管理
    Resource: resolve => require.ensure([], () => resolve(require('@/components/resource/Resource')), 'bgSystem015'),
    
    Database: resolve => require.ensure([], () => resolve(require('@/components/resource/Database')), 'bgSystem015'),
    AddDatabase: resolve => require.ensure([], () => resolve(require('@/components/resource/AddDatabase')), 'bgSystem015'),
    EditDatabase: resolve => require.ensure([], () => resolve(require('@/components/resource/EditDatabase')), 'bgSystem015'),
    
    
    Synchronization: resolve => require.ensure([], () => resolve(require('@/components/resource/Synchronization')), 'bgSystem015'),
    Cultivate: resolve => require.ensure([], () => resolve(require('@/components/resource/Cultivate')), 'bgSystem015'),
}