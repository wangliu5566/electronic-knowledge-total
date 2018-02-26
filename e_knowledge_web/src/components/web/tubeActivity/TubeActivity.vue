<template>
	<div class="tube-activity">
		<!-- 大图 -->
		<div class="banner-img"></div>
		<div class="container ovh">
			<!-- 馆内活动 -->
			<div class="tube-activity-content">
				<div >
					<p class="section-title fl">馆内活动</p>
					<div class="tube-activity-seach fr">
						<div class="select-btn fr">
							<el-select v-model="status" placeholder="活动状态">
						    <el-option
						      v-for="item in acStatus"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
						</div>
						<div class="select-btn fr">
							<el-select v-model="type" placeholder="活动类型">
						    <el-option
						      v-for="item in acType"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
						</div>
					</div>
				</div>
				<div class="clearfix"></div>
				<ul class="list-main">
					<li v-for="(item,index) in tubeListData" :key="index">
	          <a :href="item.detailUrl" target="_blank">
	            <div class="cover">
	              <div class="cover" :style="{backgroundImage:'url('+item.coverImage+')'}">
	                <p :class="item.status==1?'flag-red':item.status==2?'flag-green':item.status==3?'flag-gray':''">{{acFlag(item.status)}}</p>
	              </div>
	            </div>
	            <p class="list-title">
	              <ellipsis :data="item.name" :line-height="'44px'"></ellipsis>
	            </p>
	          </a>
	        </li>
				</ul>
				<div class="clearfix"></div>
				<!-- 分页 -->
	      <div class="pagination-page" v-show='totalCount!=0'>
	        <el-pagination 
		        background
		        :current-page.sync="page"
		        layout="prev, pager, next" 
		        :total="totalCount"
		        :page-size="pageSize"
		        class="search-page"
		        @current-change="handleCurrentChange">
	        </el-pagination>
	      </div>
	      <div class="clearfix"></div>
			</div> 
		</div>
		<!-- 推荐藏馆数据库 -->
      <div class="tube-activity-data">
      	<div class="container">
      		<p class="section-title section-title-another-one">推荐藏馆数据库</p>
					<ul class="list-main list-database">
						<li v-for="(item,index) in baseListData" :key="index"  @click="toDbDetail(item.id)">
							<div class="cover">
								<div class="cover" :style="{backgroundImage:'url('+item.coverImage+')'}"></div>
                <p :class="item.isTest==1?'flag-gray':item.isTest==2?'flag-green':''">{{dbFlag(item.isTest)}}</p>

							</div>
							<p class="list-title">
								<ellipsis :data="item.name" :line-height="'44px'"></ellipsis>
							</p>
							<div class="info">
								<ellipsis :data="item.subjectName" :line-height="'26px'"></ellipsis>
								<ellipsis :data="item.intro" :line-clamp="2" :line-height="'26px'"></ellipsis>
							</div>
						</li>
					</ul>
      	</div>
			</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				//活动状态
				acStatus: [{
          value: 0,
          label: '不限'
        }, {
          value: 1,
          label: '即将开始'
        }, {
          value: 2,
          label: '正在进行'
        }, {
          value: 3,
          label: '已结束'
        }],
        status: '',
        //活动类型
        acType: [{
          value: 0,
          label: '不限'
        }, {
          value: 1,
          label: '大赛'
        }, {
          value: 2,
          label: '活动'
        }],
        type: '',

				tubeListData:[],
				baseListData:[],
				// 基本数据
	      page: 1,
	      pageSize: 16,
	      totalCount: 0,
			}
		},
		methods:{
			/**
			 * [获取馆内活动数据列表]
			 * @作者     王柳
			 * @日期     2018-02-07
			 */
			getTubeListData() {
	      this.$http.get('/v1/frontend/index/getAc',{
	      	params:{
	      		page:this.page,
	      		length:this.pageSize,
	      		key:'',
	      		status:this.status,
	      		type:this.type
	      	}
	      })
	        .then((res) => {
	        	// console.log(res)
	          if (res.data.status == 200) {
	            this.tubeListData = res.data.data.ac;
	            this.totalCount = parseInt(res.data.data.count);
	          }else{
	          	this.$message.error(res.data.message);
	          }
	        })
	    },
	    // 分页
	    handleCurrentChange(val){
	    	this.page = val;
        this.getTubeListData();
	    },
	    /**
			 * [获取馆藏数据库数据列表]
			 * @作者     王柳
			 * @日期     2018-02-07
			 */
			getBaseListData() {
	      this.$http.get('/v1/frontend/index/getDb',{
	      	params:{
	      		page:1,
	      		length:4,
	      		key:'',
	      		isRc:0,
	      	}
	      })
	        .then((res) => {
	        	// console.log(res)
	          if (res.data.status == 200) {
	            this.baseListData = res.data.data.db;
	          }else{
	          	this.$message.error(res.data.message);
	          }
	        })
	    },
		},
		mounted(){
			this.getTubeListData();
			this.getBaseListData();
		},
		watch:{
			status:function(val,oldVal){
				if(val != oldVal){
					this.getTubeListData();
				}
			},
			type:function(val,oldVal){
				if(val != oldVal){
					this.getTubeListData();
				}
			},
		}
	}
</script>
<style lang="less">
.tube-activity{
	.banner-img{
		height: 500px;
		min-width: 1200px;
		margin-bottom: 32px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		background-image: url('/static/images/馆内活动.png');
	}
	.tube-activity-content{
		/* margin-right: -48px; */
	}
	.tube-activity-data{
		height: 460px;
		background-color: #f4f4f4;
		overflow: hidden;
		/* .select-btn{
			width: 120px;
			.el-select{
				width: 120px;
			}
		} */
	}
	/* .el-input{
		width: 56%;
	} */
	.el-input__inner{
		border: none !important;
		color: #666 !important;
	}
	.el-select-dropdown .el-popper{
		max-width: 120px !important;
	}
}
</style>