// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import util from './util'
Vue.use(util);


// import Share from 'vue-social-share'
// import 'vue-social-share/dist/client.css'
// Vue.use(Share)

//引入axios
import axios from './http.js'
Vue.prototype.$http = axios;

import VueCookies from 'vue-cookies'
Vue.use(VueCookies);


import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

//引入视频播放器
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
Vue.use(VueVideoPlayer)

//引入vuex
// import Vuex from 'vuex'
// Vue.use(Vuex);
// import store from './store/index.js'


import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
Vue.use(ElementUI)

import Ellipsis from '@/components/common/VueEllipsis'
Vue.use(Ellipsis)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
