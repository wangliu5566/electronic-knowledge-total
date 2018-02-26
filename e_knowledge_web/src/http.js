/**
 * 统一配置axios
 * 使用qs.stringify解决axios跨域问题
 * 配置axios请求类型为post时，使用qs.stringify来实现跨域访问，以及每次请求携带token
 * 配置请求成功后res，实现诸如登录失败，登录超时，账户密码错误和请求错误等拦截器
 */
import axios from 'axios'
import qs from 'qs'
// import { Modal, Message } from 'iview'
import router from './router/index.js'

// axios 配置
axios.defaults.timeout = 30000; //请求超时设置
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.withCredentials = true; //axios跨域携带cookie的配置

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (config.method === 'post') {
            config.data = qs.stringify(config.data);
        } else if (config.method === 'get') {

        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
/**
 * 拦截器也可以判定返回的response成功时的状态码进行拦截
 */
axios.interceptors.response.use(
    res => {
        if (res.data.Success) {
            return res;
        } else {
            if (router.currentRoute.fullPath.indexOf('/login?redirect') == -1) {
                switch (parseInt(res.data.Code)) {
                    case 17:
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        })
                        break;
                    case 34:
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        })
                        break;
                    default:
                        return res;
                }
            } else {
                return res;
            }
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 500:
                    // Message.error(error.response.request.responseURL + '服务器无响应')
            }
        }
    });

export default axios;
