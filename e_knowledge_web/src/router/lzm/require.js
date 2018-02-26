export default {
	//示例
	CommonRouter: resolve => require.ensure([], () => resolve(require('web/CommonRouter')), '001'),
	Index: resolve => require.ensure([], () => resolve(require('web/index/Index')), '001'),
	Search: resolve => require.ensure([], () => resolve(require('web/search/Search')), '001'),
	SearchDb:resolve => require.ensure([], () => resolve(require('web/search/SearchDb')), '001'),
	SearchAc:resolve => require.ensure([], () => resolve(require('web/search/SearchAc')), '001'),
	Training: resolve => require.ensure([], () => resolve(require('web/training/LibTraining')), '001'),
	Database:resolve => require.ensure([], () => resolve(require('web/database/Database')), '001'),
	DataBaseDetail: resolve => require.ensure([], () => resolve(require('web/dataBaseDetail/DataBaseDetail.vue')), '004'),
}