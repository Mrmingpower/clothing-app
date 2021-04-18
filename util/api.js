const BASE_URL = 'http://127.0.0.1:21616'
// import store from '../store/index.js'
const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjYTIxZjRmZS0xZGIyLTRlOGUtYjA3ZC0yY2NiMDk1ZGZhNDIiLCJzdWIiOiJhdXRoIiwiaWF0IjoxNjE4NzI3MDE3LCJleHAiOjE2MTg4MTM0MTcsInVzZXJuYW1lIjoiY2FycmllciJ9.N9zzntY7fP6b1BReaG835RoPYtddxB56LRx_YvSm1L0"
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
				resolve(res)
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