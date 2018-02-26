import VueEllipsis from './VueEllipsis.vue'
// 这里是重点
const Ellipsis = {
    install: function(Vue){
        Vue.component('Ellipsis',VueEllipsis)
    }
}

// 导出组件
export default Ellipsis