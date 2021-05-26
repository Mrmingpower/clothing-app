import Vue from 'vue'
import App from './App'

import uView from "uview-ui"


Vue.use(uView)
Vue.config.productionTip = false
import store from './store'

Vue.prototype.$store = store;

App.mpType = 'app'

import { myRequest } from './util/api.js';
Vue.prototype.$map = new Map()
Vue.prototype.$myRequest = myRequest
const app = new Vue({
    ...App,
	store
})
app.$mount()
