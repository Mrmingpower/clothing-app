<template>
	<view class="YmContent">
			<view class="clothing_services_1">
				<!-- <view class="clothing_services_2">
				</view> -->
				<view class="clothing_services_3">
					<image v-on:click="clothing_services_4_4_click()"  src="/static/clothing_services/images/clothing_services_4_4.jpg" mode="scaleToFill" border="0"    class="clothing_services_4"></image>
					<text decode="true" class="clothing_services_5">标题</text>
					<image v-on:click="clothing_services_6_6_click()"  src="/static/clothing_services/images/clothing_services_6_6.jpg" mode="scaleToFill" border="0"    class="clothing_services_6"></image>
				</view>
			</view>
			<view class="clothing_services_7">
				<view class="clothing_services_8">
					<view class="clothing_services_9">
					</view>
					<text decode="true" class="clothing_services_10">入库模块</text>
				</view>
				<!-- clothing_services_11是两行的  clothing_services_17是单行的-->
				<view class="clothing_services_17">
					<u-grid :col="3" :border="true">
						<u-grid-item @click="toPage('../stock-in/stockIn')">
							<u-icon name="info-circle-fill" color="#ffaa00" :size="47"></u-icon>
							<view class="grid-text">入库查询</view>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="tags-fill" color="#ffaa00" :size="47"></u-icon>
							<view class="grid-text">到货入库</view>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="lock-fill" color="#ffaa00" :size="47"></u-icon>
							<view class="grid-text">其他入库</view>
						</u-grid-item>
					</u-grid>
				</view>
				<view class="clothing_services_20">
					<view class="clothing_services_21">
					</view>
					<text decode="true" class="clothing_services_22">出库模块</text>
				</view>
				<view class="clothing_services_11">
					<u-grid :col="3" :border="true">
						<u-grid-item>
							<u-icon name="grid-fill" color="#ff5500" :size="47"></u-icon>
							<view class="grid-text">出库查询</view>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="star-fill" color="#ff5500" :size="47"></u-icon>
							<view class="grid-text">生产领用</view>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="shopping-cart-fill" color="#ff5500" :size="47"></u-icon>
							<view class="grid-text">销售单</view>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="plus-circle-fill" color="#ff5500" :size="47"></u-icon>
							<view class="grid-text">其他出库</view>
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
				title: 'Hello'
			}
		},
		onLoad() {

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
