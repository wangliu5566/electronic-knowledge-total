<template>
  <div>
    <AccountEditCommon :account-datas="editAccountDatas" :account-rules='newAccountDatasRules'></AccountEditCommon>
  </div>
</template>
<script>
import AccountEditCommon from './AccountEditCommon'
export default {
  data() {
    const CheckPsd = (role, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.newAccountDatas.password) {
        callback(new Error('两次输入的密码不一致，请核查后重试'))
      } else {
        callback();
      }
    };
    const CheckRealName = (role, value, callback) => {
      let realNameReg = /^[\u4E00-\u9FA5]{2,4}(?:·[\u4E00-\u9FA5]{2,5})*$/;
      if (value === '') {
        callback(new Error('请输入真实姓名'))
      } else if (!realNameReg.test(value)) {
        callback(new Error('真实姓名格式不正确'))
      } else {
        callback()
      }
    };
    return {
      //新增数据
      editAccountDatas: {
        username: '',
        realName: '',
        bigImage: '',
        smallImage: '',
      },
      newAccountDatasRules: {
        // username: [{
        //   required: true,
        //   message: '请输入用户名',
        //   trigger: 'blur'
        // }],
        // password: [{
        //   required: true,
        //   message: '请输入密码',
        //   trigger: 'blur'
        // }, {
        //   min: 6,
        //   max: 18,
        //   message: '密码长度在6-18位之间',
        //   trigger: 'blur',
        // }],
        realName: [{
          required: true,
          validator: CheckRealName,
          trigger: 'blur'
        }, {
          min: 2,
          message: '长度不得少于2位',
          trigger: 'blur',
        }],
        // checkPsd: [{
        //   validator: CheckPsd,
        //   trigger: 'blur',
        // }],
      },
    }
  },
  methods: {
    getUserInfo() {
      this.$http.get('/v1/admin/user/info', {
        params: {
          userId: this.$route.query.id
        }
      }).then((res) => {
        this.editAccountDatas = res.data.data;
        this.editAccountDatas.agency= res.data.data.company;
        // this.editAccountDatas.agency.name = res.data.data.company;
        this.editAccountDatas.departments = res.data.data.department;
        window.sessionStorage.setItem('user-big-cover',res.data.data.bigImage);
        window.sessionStorage.setItem('user-small-cover',res.data.data.smallImage);
      })
    },
  },
  beforeRouteLeave(to, from, next) {
    window.sessionStorage.setItem('user-big-cover', '')
    window.sessionStorage.setItem('user-small-cover', '')
    next();
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },
  components: {
    AccountEditCommon
  },
  mounted() {
    this.getUserInfo();
  }
}

</script>
<style lang="less">


</style>
