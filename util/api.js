const BASE_URL = 'http://192.168.0.98:21616'
// import store from '../store/index.js'
const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2YzdlMWM5Ni1lMzVkLTQ2NDMtOTVjYS0wZjc5NzMwYzg5YzkiLCJzdWIiOiJhdXRoIiwiaWF0IjoxNjE5NzQ1MjE0LCJleHAiOjE2MTk4MzE2MTQsInVzZXJuYW1lIjoiY2FycmllciJ9.GHmLp-JSYzeDMDkm7aQ7-P0wfG5L0xBDoa8LGvDlDsU"
export const myRequest = (options) => {
	return new Promise((resolve,reject) => {
		uni.request({
			header: {
				"Clothing-Authorization": 'Bearer '+ token,
				"Content-Type": options.ContentType || 'application/x-www-form-urlencoded'
			},
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if(res.data.code === 200) {
					resolve(res.data.result)
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