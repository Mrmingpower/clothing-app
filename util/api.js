const BASE_URL = 'http://192.168.0.98:21616'
// import store from '../store/index.js'
const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwZDE4ZTJjMC0xOGRiLTRiNzctYWFmMi1iYzlhZDRkYjY4MjgiLCJzdWIiOiJhdXRoIiwiaWF0IjoxNjIxNDczOTA1LCJleHAiOjE2MjE1NjAzMDUsInVzZXJuYW1lIjoiY2FycmllciJ9.IzcNoT5F6wHIQ7Iy6HRlif6fcTlAe3iefWgTlVICn38"
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