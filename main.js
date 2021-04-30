import Vue from 'vue'
import App from './App'

import uView from "uview-ui"
Vue.use(uView)
Vue.config.productionTip = false
// 11
App.mpType = 'app'

import { myRequest } from './util/api.js';
Vue.prototype.$myRequest = myRequest
const app = new Vue({
    ...App
})
app.$mount()
