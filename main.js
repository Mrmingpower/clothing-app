import Vue from 'vue'
import App from './App'

import uView from "uview-ui"
Vue.use(uView)
Vue.config.productionTip = false

App.mpType = 'app'

import { myRequest } from './util/api.js';
Vue.prototype.$map = new Map()
Vue.prototype.$myRequest = myRequest
const app = new Vue({
    ...App
})
app.$mount()
