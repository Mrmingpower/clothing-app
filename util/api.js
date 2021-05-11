const BASE_URL = 'http://192.168.0.98:21616'
// import store from '../store/index.js'
const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhZDJlNmIwMi0yMjM4LTRkOTAtYWYzMy1mOGMzMWEzNWI0MmYiLCJzdWIiOiJhdXRoIiwiaWF0IjoxNjIwNjkzMjk0LCJleHAiOjE2MjA3Nzk2OTQsInVzZXJuYW1lIjoiY2FycmllciJ9.GT8ed2q25Y7Z5Jy7MljwsziEy4kCEl2RDcu89woMFgY"
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