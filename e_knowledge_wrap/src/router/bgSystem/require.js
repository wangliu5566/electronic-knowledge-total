export default {
    Index: resolve => require.ensure([], () => resolve(require('@/components/bgSystem/Index')), 'bgSystem002'),
    CommonRouter: resolve => require.ensure([], () => resolve(require('@/components/bgSystem/CommonRouter')), 'bgSystem001'),

    Account: resolve => require.ensure([], () => resolve(require('@/components/User/Account')), 'bgSystem003'),
    AccountMain: resolve => require.ensure([], () => resolve(require('@/components/User/AccountMain')), 'bgSystem003'),
    AccountAdd: resolve => require.ensure([], () => resolve(require('@/components/User/AccountAdd')), 'bgSystem004'),
    AccountEdit: resolve => require.ensure([], () => resolve(require('@/components/User/AccountEdit')), 'bgSystem005'),

    Role: resolve => require.ensure([], () => resolve(require('@/components/bgSystem/Role')), 'bgSystem006'),
    RoleMain: resolve => require.ensure([], () => resolve(require('@/components/bgSystem/RoleMain')), 'bgSystem006'),

    ManageView: resolve => require.ensure([], () => resolve(require('@/components/statistics/ManageView')), 'bgSystem017'),
    ManageViewDate: resolve => require.ensure([], () => resolve(require('@/components/statistics/ManageViewDate')), 'bgSystem017'),
    //资源管理
    Resource: resolve => require.ensure([], () => resolve(require('@/components/resource/Resource')), 'bgSystem015'),
    
    Database: resolve => require.ensure([], () => resolve(require('@/components/resource/Database')), 'bgSystem015'),
    AddDatabase: resolve => require.ensure([], () => resolve(require('@/components/resource/AddDatabase')), 'bgSystem015'),
    EditDatabase: resolve => require.ensure([], () => resolve(require('@/components/resource/EditDatabase')), 'bgSystem015'),
    
    Dataconfig: resolve => require.ensure([], () => resolve(require('@/components/resource/Dataconfig')), 'bgSystem015'),
    Synchronization: resolve => require.ensure([], () => resolve(require('@/components/resource/Synchronization')), 'bgSystem015'),
    Press: resolve => require.ensure([], () => resolve(require('@/components/resource/Press')), 'bgSystem015'),
    AddPress: resolve => require.ensure([], () => resolve(require('@/components/resource/AddPress')), 'bgSystem015'),
    editPress: resolve => require.ensure([], () => resolve(require('@/components/resource/editPress')), 'bgSystem015'),
}
