import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		hasLogin: false, //用户是否登录
		userInfo: {}, //用户数据
		accessToken: {}
	},
	//mutations定义同步操作的方法
	mutations: {
		// 登录
		login(state, user) {
			state.userInfo = user
			//储存用户数据到本地
			// uni.setStorage({
			// 	key: 'userInfo',
			// 	data: user,
			// });
			console.log('登陆成功')
			console.log(state.hasLogin, state.userInfo)
			uni.setStorage({
				key: 'userInfo',
				data: user
			})
		},
		setToken(state, token) {
			//登录状态为已登录
			state.hasLogin = true
			state.accessToken = token
			uni.setStorage({
				key: 'tokenInfo',
				data: token
			})
		},

		// 退出登录
		logout(state) {
			//登录状态为未登录
			state.hasLogin = false
			state.userInfo = {}
			state.accessToken = {}
			//删除本地储存
			uni.removeStorage({
			    key: 'tokenInfo'
			});
			uni.removeStorage({
				key: 'userInfo'
			})
		}
	},
	actions: {

	}
})
export default store
