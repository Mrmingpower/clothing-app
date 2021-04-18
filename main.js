import Vue from 'vue'
import App from './App'

import uView from "uview-ui"
Vue.use(uView)
Vue.config.productionTip = false

App.mpType = 'app'
// 测试
const app = new Vue({
    ...App
})
app.$mount()
