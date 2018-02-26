export default {
	//示例
	ResourceRecommendList: resolve => require.ensure([], () => resolve(require('web/resourceRecommend/ResourceRecommendList.vue')), '001'),
	ResourceRecommendDetail: resolve => require.ensure([], () => resolve(require('web/resourceRecommend/ResourceRecommendDetail.vue')), '002'),
	TubeActivity: resolve => require.ensure([], () => resolve(require('web/tubeActivity/TubeActivity.vue')), '003'),

}