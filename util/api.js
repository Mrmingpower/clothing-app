const BASE_URL = 'http://192.168.0.116:21616'
import store from '../store/index.js'
// const token =
// 	"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzMjhhZWRjMS0yMGE2LTQ1OTItODA0NC0yYWMzY2I3OWJjNjgiLCJzdWIiOiJhdXRoIiwiaWF0IjoxNjIxOTEzNDI5LCJleHAiOjE2MjE5OTk4MjksInVzZXJuYW1lIjoiY2FycmllciJ9.HU5QQTZp2vc6v80_1JaCNp5vV9GirWAN39Ev6ge_iNk"
export const myRequest = (options) => {
	let token = store.state.accessToken.token
	let refreshToken = store.state.accessToken.refreshToken
	let expires = store.state.accessToken.expires
	let refreshExpires = store.state.accessToken.refreshExpires
	console.log('--------------')
	console.log(token)
	console.log(refreshToken)
	console.log(expires)
	console.log(refreshExpires)
	console.log('--------------')
	if (options.url !== '/users/login') {
		if (!store.state.hasLogin) {
			uni.showLoading({
				 title: '请重新登陆'
			})
			setTimeout(function() {
				uni.hideLoading()
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}, 1000);
			return
		}
		
		let now = new Date().getTime()

		if (parseFloat(expires) < parseFloat(now)) {
			// token已经过期，开始判断刷新token
			if (parseFloat(refreshExpires) < parseFloat(now)) {
				console.log('刷新token也过期了')
				// 刷新token也已经过期
				uni.showToast({
					title: '请重新登陆',
					icon: 'none'
				})
				store.commit('logout')
				setTimeout(function() {
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}, 1000);
			} else {
				console.log('刷新没过期')
				// 说明刷新token没过期
				uni.request({
					url: BASE_URL + '/users/refresh',
					method: 'GET',
					data: {
						header: 'Bearer ' + refreshToken
					},
					success: (res) => {
						if (res.data.code === 200) {
							store.commit('setToken', res.data.result)

							// refreshExpires = res.result.refreshExpires
							// expires = res.result.expires
							// token = res.result.token
							// refreshToken = res.result.refreshToken
						} else {
							uni.showToast({
								title: res.data.message || '请重新登陆',
								icon: 'none'
							})
							setTimeout(function() {
								uni.reLaunch({
									url: '/pages/login/login'
								})
							}, 1000);
						}
					}
				})
			}
		}
	}

	return new Promise((resolve, reject) => {
		uni.request({
			header: {
				"Clothing-Authorization": 'Bearer ' + token,
				"Content-Type": options.ContentType || 'application/x-www-form-urlencoded'
			},
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if (res.data.code === 200) {
					resolve(res.data.result || 200)
				} else {
					uni.showToast({
						title: res.data.message || '请求失败',
						icon: 'none'
					})
					return
				}
			},
			fail: (err) => {
				// uni.hideLoading();
				uni.showToast({
					title: '请求接口失败',
					icon: 'none'
				})
				reject(err)
			}
		})
	})
}
