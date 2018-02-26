<template>
  <div class="account-main">
    <Row>
      <Col span="8">
      <Button type="primary" @click="addNewAccount" >
        <Icon type="plus-round"></Icon> 添加</Button>
      <Button type="error" @click="deleteUser">
        <Icon type="close-round"></Icon> 批量删除</Button>
      &nbsp;
      </Col>
      <Col span="8" style="height:20px;"></Col>
      <Col span="8">
      <Input v-model="searchKey" icon="ios-search-strong" placeholder="搜索用户名" @on-click="searchInfo"></Input>
      </Col>
    </Row>
    <Row class="pt10 pb10">
      <Table :columns="accountColumns" :loading="loadingData" :data="accountDatas" @on-select="tableSelectCurrent" @on-select-all='tableSelectAll' @on-select-cancel="tableCancelCurrent" @on-selection-change="tableChange" highlight-row></Table>
    </Row>
    <Row class="tr pt5 pb10">
      <Page :total="tp" :current='cp' :page-size="ep" size="small" show-total show-sizer show-elevator :page-size-opts='[10,20,30]' @on-change="currentPageChange" @on-page-size-change="eachPageChange"></Page>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    const filters = window.sessionStorage.getItem('bg_user_filter');
    return {
      searchKey: filters != null && filters != '' && JSON.parse(filters) != {} && JSON.parse(filters).searchKey ? JSON.parse(filters).searchKey : '',

      loading: false,
      loadingData: false,
      //分页
      tp: 0,
      cp: filters != null && filters != '' && JSON.parse(filters) != {} && JSON.parse(filters).cp ? parseInt(JSON.parse(filters).cp) : 1,
      ep: filters != null && filters != '' && JSON.parse(filters) != {} && JSON.parse(filters).ep ? parseInt(JSON.parse(filters).ep) : 10,

      //表格选中的项
      selectItem: [],

      //表格配置
      accountColumns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '用户名',
        key: 'username'
      }, {
        title: '真实姓名',
        key: 'realName'
      }, {
        title: '部门',
        key: 'department'
      }, {
        title: '注册时间',
        key: 'signTime',
        sortable: true,
        sortType: 'desc'
      }, {
        title: '操作',
        key: 'action',
        width: 260,
        align: 'center',
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
              },
              on: {
                click: () => {
                  this.editInfo(params.row.id, params.index)
                }
              }
            }, '编辑'),
            h('Button', {
              props: {
                type: 'error',
              },
              on: {
                click: () => {
                  this.removeUser(params.row.id, params.index)
                }
              }
            }, '删除'),
            h('Button', {
              props: {
                type: 'warning',
              },
              on: {
                click: () => {
                  this.resetPsd(params.row.id, params.index)
                }
              }
            }, '重置密码')
          ]);
        }
      }],

      //表格数据
      accountDatas: [],
    }
  },
  methods: {
    getListData(isSetCp = false) {
      if (isSetCp) {
        this.cp = 1;
      }
      this.loadingData = true;

      this.$http.get('/v1/admin/user/list', {
        params: {
          agencyId: JSON.parse(window.sessionStorage.getItem('bg_user_info')).agencyId,
          keyword: this.searchKey,
          pageSize: this.ep,
          page: this.cp
        }
      }).then((res) => {
        this.tp = parseInt(res.data.data.total);
        this.accountDatas = res.data.data.rows;
        this.loadingData = false;
      })
    },

    //新增账户
    addNewAccount() {
      this.$router.push({
        path: '/wrap/system/account/add'
      })
    },
    //搜索关键字
    searchInfo() {
      if (this.searchKey) {
        this.cp = 1;
        this.updateFilter({ 'searchKey': this.searchKey });
        this.getListData();
      } else {
        this.$Message.warning('搜索关键字不能为空')
      }
    },

    //编辑
    editInfo(id, index) {
      this.$router.push({
        path: '/wrap/system/account/edit',
        query: {
          id: id
        }
      })
    },

    //删除单个
    removeUser(id, index) {
      let userIds = [id];
      this.$Modal.confirm({
        title: '确认操作',
        content: '<h3>该操作将删除用户，请确认执行此操作</h3>',
        onOk: () => {
          this.deleteUserById(userIds);
        },
      });
    },

    //批量删除
    deleteUser() {
      let userIds = [];
      if (this.selectItem.length != 0) {
        this.$Modal.confirm({
          title: '确认操作',
          content: '<h3>该操作将删除用户，请确认执行此操作</h3>',
          onOk: () => {
            this.selectItem.forEach((item, index) => {
              userIds.push(item.id)
            })
            this.deleteUserById(userIds);
          },
        });
      } else {
        this.$Message.warning('请至少勾选一个用户后再试！')
      }
    },

    //删除用户
    deleteUserById(userIds) {
      this.$http.post('/v1/admin/user/delete-user', {
        userId: userIds
      }).then((res) => {
        if (res.data.status == 200) {
          this.$Message.success('用户删除成功');
          this.getListData();
        }
      })
    },

    currentPageChange(value) {
      this.cp = value;
      this.updateFilter({'cp':this.cp});
      this.getListData();
    },

    eachPageChange(value) {
      this.ep = value;
      this.updateFilter({'ep':this.ep});
      this.getListData();
    },

    //表格单选/单选
    tableSelectCurrent(selection) {
      this.selectItem = selection;
    },
    tableSelectAll(selection) {
      this.selectItem = selection;
    },
    tableCancelCurrent(selection, row) {
      this.selectItem = selection;
    },
    tableChange(selection) {
      this.selectItem = selection;
    },

    //重置密码
    resetPsd(id, index) {
      this.$Modal.confirm({
        title: '确认操作',
        content: '<h3>该操作将重置用户密码，请确认执行此操作</h3>',
        onOk: () => {
          this.$http.post('/v1/admin/user/reset-password', {
            userId: id
          }).then((res) => {
            if (res.data.status == 200) {
              this.$Message.success({
                content: '用户密码重置成功，新密码为 123456 ',
                duration: 6
              })
            }
          })
        },
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.fullPath.indexOf('/account/add') != -1 || to.fullPath.indexOf('/account/edit') != -1) {
      window.sessionStorage.setItem('bg_user_filter', JSON.stringify({
        searchKey: this.searchKey,
        cp: this.cp,
        ep: this.ep,
      }))
    } else {
      window.sessionStorage.setItem('bg_user_filter', '')
    }
    next();
  },
  mounted() {
    this.getListData();
  },
  watch: {
    'searchKey': function(val, oldVal) {
      if (!val && oldVal) {
        this.cp = 1;
        this.updateFilter({ 'searchKey': '' })
        this.getListData();
      }
    },
  }
}

</script>
<style lang="less">


</style>
