<template>
  <div class="bg-system-container">
    <BgHeader></BgHeader>
    <div class="main">
      <div class="container">
        <div class="router-main" ref="containerMainArea">
          <div class="router-container">
            <transition name="router-fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
          <BgFooter></BgFooter>
        </div>
      </div>
      <div class='sidemenu'>
        <div class="sidemenu-title">
          导航菜单
        </div>
        <BgSideMenu :menu-list="sideMenuBaseData"></BgSideMenu>
      </div>
    </div>
  </div>
</template>
<script>
import BgHeader from "@/components/common/BgHeader"
import BgSideMenu from "@/components/common/BgSideMenu"
import BgFooter from "@/components/common/BgFooter"
export default {
  data() {
    return {
      sideMenuBaseData: [{
        label: '系统管理',
        icon: 'gear-a',
        path: '/wrap/system',
        children: [{
          label: '账号管理',
          icon: 'ios-person',
          path: '/wrap/system/account'
        // }, {
        //   label: '角色管理',
        //   icon: 'ios-paper',
        //   path: '/wrap/system/role'
        // }, {
        //   label: '机构管理',
        //   icon: 'university',
        //   path: '/wrap/system/academy'
        }]
      }, {
        label: '资源管理',
        icon: 'cube',
        path: '/wrap/resource',
        children: [{
          label: '数据库资料',
          icon: 'ios-paper',
          path: '/wrap/resource/Database'
        },{
          label: '馆藏数据库配置',
          icon: 'ios-cog',
          path: '/wrap/resource/Dataconfig'
        },{
          label: '同步书目',
          icon: 'ios-refresh-outline',
          path: '/wrap/resource/Synchronization'
        },{
          label: '出版社电子资源',
          icon: 'ios-settings-strong',
          path: '/wrap/resource/Press'
        }]
      }, {
        label: '数据管理',
        icon: 'stats-bars',
        path: '/wrap/statistics',
        children: [{
          label: '访问管理',
          icon: 'radio-waves',
          path: '/wrap/statistics/ManageView'
        }]
      }],
    }
  },
  components: {
    BgHeader,
    BgSideMenu,
    BgFooter
  },
  methods: {
  },
  mounted() {
    
  },
  beforeRouteLeave(to, from, next) {
    window.sessionStorage.setItem('bg_user_info', JSON.stringify(Object.assign({}, JSON.parse(window.sessionStorage.getItem('bg_user_info')), {
      access_token: '',
      password: '',
      id: '',
      agency: '',
      agencyId: '',
      realName: ''
    })));
    window.sessionStorage.removeItem('bg_user_permission');
    window.sessionStorage.removeItem('isSuper')
    next();
  },
  watch: {
    '$route': function(val, oldVal) {
      if (val.fullPath != oldVal.fullPath) {
        this.$refs.containerMainArea.scrollTop = 0;
      }
    }
  }

}

</script>
<style lang="less">
.bg-system-container {
  background-color: #e9ecf3;
  min-width: 1180px;
  height: 100%;
  width: 100%;
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .ivu-spin-text {
    padding: 30px 0;
  }
  .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
  .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    font-size: 14px;
  }
  .main {
    background: #e9ecf3;
    width: 100%;
    overflow-y: auto;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 80px solid #e9ecf3;
    overflow: hidden;

    .sidemenu {
      height: 100%;
      background-color: #fff;
      width: 230px;
      border-radius: 6px 6px 0 0;
      float: left;
      margin-left: 10px;

      .ivu-menu-vertical.ivu-menu-light:after {
        background: none;
      }
      .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
      .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
        color: #39f;
        border-right: 2px solid #39f;
        background-color: #313540;
      }

      .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
        padding-left: 34px;
      }

      .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
        color: #5c9acf;
        border-color: #5c9acf;
      }

      .el-menu {
        background-color: #1F2D3D;
      }

      .side-menu-main {
        width: 100%;
        text-align: center;
      }

      .sidemenu-title {
        padding: 20px 0 10px 20px;
        border-bottom: 1px solid #eee;
        color: #5c9acf;
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 20px;
      }
    }

    .container {
      height: 100%;
      width: 100%;
      margin-left: -250px;
      float: right;
      background-color: #e9ecf3;

      .router-main {
        height: 100%;
        margin-left: 250px;
        background-color: #fff;
        overflow-y: auto;
      }
      .router-container {
        min-height: 100%;
        margin-bottom: -42px;
        padding-bottom: 42px;
        padding: 20px 20px 42px;
        font-size: 14px!important;

        .ivu-table {
          font-size: 14px;
        }
      }
    }
  }
  .system-title {
    font-size: 18px;
    color: #5c9acf;
    font-weight: bold;
    overflow: hidden;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;

    i,
    a {
      float: left;
      cursor: pointer;
    }
    a {
      padding-left: 6px;
      color: #5c9acf;
      &:hover {
        color: #2d8cf0;
      }
    }
    span {
      padding-left: 6px;
    }
    .pointer {
      font-size: 14px;
      padding-top: 3px;
      display: inline-block;
    }
    .next-title {
      font-size: 16px;
      color: #999;
      padding-top: 2px;
    }
  }
  .ivu-form-item-content {
    font-size: 14px;
  }
}

.check-works-modal {
  .ivu-form-item {
    margin-bottom: 8px;
  }
}



#modalNofooter{
  .ivu-modal-footer{
    display: none;
  }
}


</style>
