<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		methods:{
			...mapMutations(['login','setToken']),
		},
		onLaunch: function() {
			console.log('App Launch')
			console.log('重置了')
			let userInfo = uni.getStorageSync('userInfo')
			let tokenInfo = uni.getStorageSync('tokenInfo')
			if(tokenInfo.token) {
				console.log('tokenInfo.access_token')
				this.setToken(tokenInfo)
			}
			if(userInfo.username) {
				console.log('userinfo.id')
				this.login(userInfo)
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "./static/iconfont.css";
	@import "common/colorui/main.css";
	@import "common/colorui/icon.css";
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
