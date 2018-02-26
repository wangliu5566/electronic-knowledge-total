<template>
  <div>
    <ActivityEditCommon :activity-datas="activityAddDatas"></ActivityEditCommon>
  </div>
</template>
<script>
import ActivityEditCommon from "./ActivityEditCommon"
export default {
  data() {
    return {
      activityAddDatas: {
        type: '1',
        userId:'',
        name: '',
        pcImage: '',
        mobileImage:'',
        smallImage:'',
        bigImage:'',
        intro: '',
        allowJoin:'0',
        introImage: [],
        prize: [{
          type:'',
          prizeName: '',
          prizeIntro: '',
          totalPeople : ''
        }],
        activityTime: [{
          type: '',
          signStartTime: '',
          signEndTime: '',
          reviewStartTime: '',
          announceAwardsTime: '',
        }],
        reviewStandard: '',
        activityStartTime: '',
        activityEndTime: '',
        questionAnswerDetail:'',
        score:{
          integration:'',
          number:'',
        }
      }
    }
  },
  components: {
    ActivityEditCommon
  }
}

</script>
<style lang="less">


</style>
