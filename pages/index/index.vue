<template>
	<view class="YmContent">
			<view class="clothing_services_1">
				<!-- <view class="clothing_services_2">
				</view> -->
				<view class="clothing_services_3">
					<!-- <image v-on:click="clothing_services_4_4_click()"  src="/static/clothing_services/images/clothing_services_4_4.jpg" mode="scaleToFill" border="0"    class="clothing_services_4"></image>
					<text decode="true" class="clothing_services_5">标题</text>
					<image v-on:click="clothing_services_6_6_click()"  src="/static/clothing_services/images/clothing_services_6_6.jpg" mode="scaleToFill" border="0"    class="clothing_services_6"></image> -->
					<u-swiper height="191" :list="list"></u-swiper>
				</view>
			</view>
			<view class="clothing_services_7">
				<view class="clothing_services_8">
					<view class="clothing_services_9">
					</view>
					<text decode="true" class="clothing_services_10">入库模块</text>
				</view>
				<!-- clothing_services_11是两行的  clothing_services_17是单行的-->
				<view class="clothing_services_11">
					<u-grid :col="3" :border="true">
						<u-grid-item @click="toPage('../stock-in/stockIn')">
							<u-icon name="info-circle-fill" color="#ffaa00" :size="47"></u-icon>
							<view class="grid-text">入库订单</view>
						</u-grid-item>
						<u-grid-item @click="toPage('../stock-in/add/material-add')">
							<u-icon name="tags-fill" color="#ffaa00" :size="47"></u-icon>
							<view class="grid-text">面料入库</view>
						</u-grid-item>
						<u-grid-item @click="toPage('../stock-in/accessoryAdd/accessoryAdd')">
							<u-icon name="lock-fill" color="#ffaa00" :size="47"></u-icon>
							<view class="grid-text">辅料入库</view>
						</u-grid-item>
						<u-grid-item @click="toPage('../stock-in/finishedProductAdd/finishedProductAdd')">
							<u-icon name="lock-fill" color="#ffaa00" :size="47"></u-icon>
							<view class="grid-text">成品入库</view>
						</u-grid-item>
					</u-grid>
				</view>
				<view class="clothing_services_20">
					<view class="clothing_services_21">
					</view>
					<text decode="true" class="clothing_services_22">出库模块</text>
				</view>
				<view class="clothing_services_11" style="height: 295rpx;">
					<u-grid :col="3" :border="true">
						<u-grid-item @click="toPage('../stock-out/stockOut')">
							<u-icon name="grid-fill" color="#ff5500" :size="47"></u-icon>
							<view class="grid-text">出库查询</view>
						</u-grid-item>
						<u-grid-item @click="toPage('../stock-out/add/material-add')">
							<u-icon name="star-fill" color="#ff5500" :size="47"></u-icon>
							<view class="grid-text">面料出库</view>
						</u-grid-item>
						<u-grid-item @click="toPage('../stock-out/accessoryAdd/accessoryAdd')">
							<u-icon name="shopping-cart-fill" color="#ff5500" :size="47"></u-icon>
							<view class="grid-text">辅料出库</view>
						</u-grid-item>
						<u-grid-item @click="toPage('../stock-out/finishedProductAdd/finishedProductAdd')">
							<u-icon name="plus-circle-fill" color="#ff5500" :size="47"></u-icon>
							<view class="grid-text">成品出库</view>
						</u-grid-item>
					</u-grid>
				</view>
				<view class="clothing_services_20">
					<view class="clothing_services_21">
					</view>
					<text decode="true" class="clothing_services_22">生产模块</text>
				</view>
				<view class="clothing_services_11">
					<u-grid :col="3" :border="true">
						<u-grid-item>
							<u-icon name="car-fill" color="#55aaff" :size="47"></u-icon>
							<view class="grid-text">生产模块1</view>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="setting-fill" color="#55aaff" :size="47"></u-icon>
							<view class="grid-text">生产模块2</view>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="bag-fill" color="#55aaff" :size="47"></u-icon>
							<view class="grid-text">生产模块3</view>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="plus-square-fill" color="#55aaff" :size="47"></u-icon>
							<view class="grid-text">生产模块4</view>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="gift-fill" color="#55aaff" :size="47"></u-icon>
							<view class="grid-text">生产模块5</view>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
		
	
		<!-- <view class="loading">{{loadingText}}</view> -->
		<view class="ymBbottom"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
			}
		},
		onLoad() {

		},
		onShow() {
			if(!this.$store.state.hasLogin) {
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
		},
		methods: {
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.grid-text {
			font-size: 28rpx;
			margin-top: 4rpx;
			color: $u-type-info;
		}
	@import './index.scss'
</style>
