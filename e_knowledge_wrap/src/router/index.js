import Vue from 'vue'
import Router from 'vue-router'

import BgSystem from './bgSystem/'

const BgSystemWrap = resolve => require.ensure([], () => resolve(require('@/components/bgSystem/Wrap')), 'bgSystem002')
const BgSystemLogin = resolve => require.ensure([], () => resolve(require('@/components/common/BgLogin')), 'bgSystem001')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: BgSystemWrap,
    redirect: '/wrap',
  }, {
    path: '/wrap',
    component: BgSystemWrap,
    redirect: '/wrap/index',
    beforeEnter: (to, from, next) => {
      let userInfo = JSON.parse(window.sessionStorage.getItem('bg_user_info'));
      if (userInfo && userInfo.id && userInfo.id != 'undefined' && userInfo.realName && userInfo.realName != 'undefined' && userInfo.access_token && userInfo.access_token != 'undefined') {
        next()
      } else {
        next({ path: '/login' })
      }
    },
    children: [
      ...BgSystem
    ]
  }, {
    path: '/login',
    component: BgSystemLogin,
  }],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
