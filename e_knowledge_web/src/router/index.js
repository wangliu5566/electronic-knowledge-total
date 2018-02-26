import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import lzm from "./lzm/"
import wl from "./wl/"

export default new Router({
 mode: 'history',
  routes: [{
  	path:'/',
  	redirect:'/index',
  	component:resolve => require.ensure([], () => resolve(require('@/components/Wrap')), '001'),
  	children:[...lzm,...wl]
  }],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
