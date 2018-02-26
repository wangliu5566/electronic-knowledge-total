<template>
	<div class="index-main">
		<SwiperIndex></SwiperIndex>
		<LibList></LibList>
		<LibDatabase></LibDatabase>
		<LibActivity></LibActivity>
		<LibRecommend></LibRecommend>
	</div>
</template>

<script>
import SwiperIndex from "common/SwiperIndex"
import LibList from "web/index/LibList"
import LibDatabase from "web/index/LibDatabase"
import LibActivity from "web/index/LibActivity"
import LibRecommend from "web/index/LibRecommend"
	export default {
		data(){
			return {

			}
		},
		components:{
			SwiperIndex,
			LibList,
			LibDatabase,
			LibActivity,
			LibRecommend
		}
	}
</script>