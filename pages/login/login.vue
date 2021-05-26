<template>
	<view class="container bg-white" style="height: 100%;">
		<image src="../../static/login.png" mode="widthFix" class="bindbakcImage"></image>
		<view class='systemName'>服装快反</view>		
		<view class="bottomBox">
			<view class="TRinputBox" >
				<input placeholder="请输入账号" v-model="username" class="text-right" name="input"></input>
			</view>
			<view class="TRinputBox margin-top">
				<input placeholder="请输入密码"  v-model="password" type="password" class="text-right" name="input"></input>
			</view>
			<view class="flex align-center justify-between margin-top-xl">
 				<view class="loginBtnText">登录</view>
				<view class="loginBtn" @click="bindUser()">
					<u-icon name="arrow-rightward" color="#ffffff" size="36"></u-icon>
				</view>
			</view>
			<!-- <view class="loginWay margin-top">切换登录方式</view> -->
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				username: "carrier",
				password: "carrier"
			};
		},
		onLoad(){
			if (this.$store.state.hasLogin) {
				uni.switchTab({
					url: '../index/index'
				})
			}
		},
		methods:{
			...mapMutations(['login','setToken','logout']),
			async bindUser() {
				uni.showLoading({
					 title: '登录中'
				})
				let result = await this.$myRequest({
					url:'/users/login',
					method: 'POST',
					ContentType: 'application/json;charset=UTF-8',
					data: {
						username: this.username,
						password: this.password,
					}
				})
				if(!result.token) {
					uni.hideLoading();
				}
				this.setToken(result)
				console.log('result')
				console.log(result)
				let userInfoResult = await this.$myRequest({
					url: '/users/info'
				})
				if(!userInfoResult.username) {
					uni.hideLoading();
					this.logout()
				}
				this.login(userInfoResult)
				// setTimeout(() => {
				    uni.hideLoading();
					uni.switchTab({
						url: '../index/index'
					})
				// }, 2000);
				
			},
		}
	}
</script>

<style lang='scss' scoped>
	page{
		height: 100%;
		background: #FFFFFF;
	}
	.HeadCon{
		height: 391upx;
	}
	.systemName{
		font-size: 54upx;
		font-family: SourceHanSansCN;
		font-weight: 500;
		color: #FFFFFF;
		position: absolute;
		top: 305upx;
		left: 75upx;
		z-index: 9;
	}
	.systemName text{
	  display: block;
	  font-size: 42rpx;
	}	
	.bottomBox{
		width: 100%;
		position: absolute;
		bottom: 40upx;
		left: 0;
		padding: 0 80upx;
		padding-bottom: 100upx;
	}
	.bindbakcImage{
	  width: 100%;
	  height: auto;
	  position: absolute;
	  top: 0;
	  left: 0
	}
	.TRinputBox{
		padding:21upx 0;
		border-bottom: 1px solid  #ABB6CC;
		input{
			text-align: left;
			font-size: 32upx;
			color: #2a2a2a;
			&::-webkit-input-placeholder{
			    color:rgba(171, 182, 204, 1);
			}
			&::-moz-placeholder{   /* Mozilla Firefox 19+ */
			    color:rgba(171, 182, 204, 1);
			}
			&:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
			    color:rgba(171, 182, 204, 1);
			}
			&:-ms-input-placeholder{  /* Internet Explorer 10-11 */
			    color:rgba(171, 182, 204, 1);
			}
		}
	}
	.loginBtnText{
		font-size: 48upx;
		font-family: SourceHanSansCN;
		font-weight: 500;
		color: #3C4249;
	}
	.loginBtn{
		width: 96upx;
		height: 96upx;
		background: linear-gradient(90deg, #368BF4 0%, #42A7FB 100%);
		border-radius: 16upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 96upx;
	}
	.loginWay{
		font-size: 32upx;
		font-family: SourceHanSansCN;
		font-weight: 400;
		color: #3C4249;
		display: inline-block;
		padding: 5upx 0;
		border-bottom: 1px solid #3C4249;;
	}
</style>
