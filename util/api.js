const BASE_URL = 'http://192.168.0.98:21616'
// import store from '../store/index.js'
const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhMWY0YmYwNi0xNzY1LTQxNmMtYjBjOC0xMjBhMjBjNmJiOTkiLCJzdWIiOiJhdXRoIiwiaWF0IjoxNjIxMzg3NDgwLCJleHAiOjE2MjE0NzM4ODAsInVzZXJuYW1lIjoiY2FycmllciJ9.MWyxRnZzrOUNXjSeHKBSGtpbIgWLZ9QwFpVEvEOfZM4"
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