<template>
	<view>
		<view class="u-page">
			<!-- 所有内容的容器 -->
			<view style="" class="u-border-bottom">	
				<u-field icon="scan" v-model="tempNum" :focus="true" @click="focus" @confirm="confirm" @focus="focus"  label-width="230" input-align="right" label="当前扫描物料:">
				</u-field>
			</view>
			<view class="wrap" style="margin-top: 15rpx;">
				<u-field v-model="itemNumber" disabled required label-width="200" input-align="right" label="物料号码:">
				</u-field>
				<u-field v-model="description" disabled required label-width="200" input-align="right" label="物料描述:">
				</u-field>
				<u-field v-model="inventoryItemId" disabled required label-width="200" input-align="right"
					label="物料id号:">
				</u-field>
				<u-field v-model="invCategory" disabled required label-width="230" input-align="right" label="物料库存分类:">
				</u-field>
				<u-field v-model="status" disabled required label-width="200" input-align="right" label="状态:">
				</u-field>
				<u-field v-model="primaryUomCode" disabled required label-width="230" input-align="right"
					label="主要计量单位:">
				</u-field>
				<u-field v-model="itemType" required disabled label-width="230" input-align="right" label="用户物料类型:">
				</u-field>
				<u-field v-model="lastUpdateDate" required disabled label-width="230" input-align="right"
					label="最后更新日期:">
				</u-field>
				<u-field v-model="weightUomCode" disabled required label-width="200" input-align="right" label="重量单位:">
				</u-field>
				<u-field v-model="unitWeight" disabled required label-width="200" input-align="right" label="单位重量:">
				</u-field>
				<u-field v-model="volumeUomCode" disabled required label-width="200" input-align="right" label="容积单位:">
				</u-field>
				<u-field v-model="unitVolume" disabled required label-width="200" input-align="right" label="单位容积:">
				</u-field>
				<u-field v-model="dimensionUomCode" disabled required label-width="230" input-align="right"
					label="物理尺寸单位:">
				</u-field>
				<u-field v-model="unitLength" disabled required label-width="200" input-align="right" label="长度:">
				</u-field>
				<u-field v-model="unitWidth" disabled required label-width="200" input-align="right" label="宽度:">
				</u-field>
				<u-field v-model="unitHeight" disabled required label-width="200" input-align="right" label="高度:">
				</u-field>
			</view>
			<u-divider>没有更多了</u-divider>
			<u-popup v-model="show" mode="center" border-radius="14" width="80%" height="400rpx">
				<view>
					<view style="height: 50rpx;"></view>
					<view style="text-align: center;font-size: 38rpx;line-height: 50rpx;">配置</view>
					<view style="margin-top: 30rpx;">
						<u-cell-group>
							<u-field v-model="tempUrl" label="服务器地址:" label-width="150" :clearable="false"
								:required="false" type="text"></u-field>
						</u-cell-group>
						<view class="close-btn">
							<!-- <u-button @tap="testConnect" size="mini" type="warning">测试连接</u-button> -->
							<u-button @tap="submitPop" size="medium" type="primary">确定</u-button>
							<u-button @tap="closePop" size="medium">取消</u-button>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list" :mid-button="true" :before-switch="beforeSwitch"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				url: '',
				tempUrl: '',
				tempNum: '',
				itemNumber: '',
				description: '',
				inventoryItemId: '',
				invCategory: '',
				status: '',
				primaryUomCode: '',
				itemType: '',
				lastUpdateDate: '',
				weightUomCode: '',
				unitWeight: '',
				volumeUomCode: '',
				unitVolume: '',
				dimensionUomCode: '',
				unitLength: '',
				unitWidth: '',
				unitHeight: '',
				list: [{
						iconPath: "setting",
						selectedIconPath: "setting",
						text: '配置',
						customIcon: false,
					},
					{
						iconPath: "../../static/scan.png",
						selectedIconPath: "../../static/scan.png",
						text: '扫描',
						midButton: true,
						customIcon: false,
					},
					{
						iconPath: "reload",
						selectedIconPath: "reload",
						text: '重置',
						customIcon: false,
					}
				],
				current: 0
			}
		},
		onLoad() {
			let url = uni.getStorageSync('url')
			if (this.$u.test.isEmpty(url)) {
				this.url = 'http://192.168.0.98:8081'
			} else {
				this.url = url
			}
		},
		onShow() {
			uni.hideKeyboard()
		},
		methods: {
			focus(e) {
				uni.hideKeyboard()
				// uni.onKeyboardHeightChange((res) => {
				// 	console.log('坚挺了')
				// 	if(res.height > 0) {
				// 		uni.hideKeyboard()
				// 	}
				// 	uni.offKeyboardHeightChange(res =>{
						
				// 	})
				// })
			},
			confirm(e) {
				console.log('确定了')
				this.description = ''
				this.inventoryItemId = ''
				this.invCategory = ''
				this.status = ''
				this.primaryUomCode = ''
				this.itemType = ''
				this.lastUpdateDate = ''
				this.weightUomCode = ''
				this.unitWeight = ''
				this.volumeUomCode = ''
				this.unitVolume = ''
				this.dimensionUomCode = ''
				this.unitLength = ''
				this.unitWidth = ''
				this.unitHeight = ''
				uni.showLoading({
				    title: '加载中',
					mask: true
				});
				uni.request({
					header: {
						"Content-Type": 'application/x-www-form-urlencoded'
					},
					url: this.url + "/item/by-item-number",
					method: 'GET',
					data: {
						itemNumber: e
					},
					success: (res) => {
						this.tempNum = ''
						let result = res.data
						if (result.code === 200) {
							uni.hideLoading();
							uni.showToast({
								title: '查询成功',
								icon: 'success'
							})
							this.itemNumber = result.result.itemNumber
							this.description = result.result.description
							this.inventoryItemId = result.result.inventoryItemId
							this.invCategory = result.result.invCategory
							this.status = result.result.status
							this.primaryUomCode = result.result.primaryUomCode
							this.itemType = result.result.itemType
							this.lastUpdateDate = result.result.lastUpdateDate
							this.weightUomCode = result.result.weightUomCode
							this.unitWeight = result.result.unitWeight
							this.volumeUomCode = result.result.volumeUomCode
							this.unitVolume = result.result.unitVolume
							this.dimensionUomCode = result.result.dimensionUomCode
							this.unitLength = result.result.unitLength
							this.unitWidth = result.result.unitWidth
							this.unitHeight = result.result.unitHeight
						} else {
							uni.hideLoading();
							if(this.$u.test.isEmpty(result.code)) {
								uni.showToast({
									title: result.message || '请配置正确的服务器地址并保证连接正确并保证连接正确',
									icon: 'none'
								})
								this.show = true
								this.tempUrl = this.url
							} else {
								uni.showToast({
									title: result.message || '查询错误',
									icon: 'none'
								})
							}
							// uni.showToast({
							// 	title: result.message || '请配置正确的服务器地址并保证连接正确',
							// 	icon: 'none'
							// })
							// this.show = true
							// this.tempUrl = this.url
						}
					},
					fail: (err) => {
						this.tempNum = ''
						uni.hideLoading();
						uni.showToast({
							title: '请配置正确的服务器地址并保证连接正确',
							icon: 'none'
						})
						this.show = true
						this.tempUrl = this.url
					}
				})
			},
			testConnect() {
				let that = this
				uni.showLoading({
				    title: '加载中',
					mask: true
				});
				uni.request({
					url: that.tempUrl + "/material/test-connecting",
					success: (res) => {
						uni.hideLoading()
						if(res.data.code === 200) {
							uni.showToast({
								title: '连接成功',
								icon: 'success'
							})
							that.url = that.tempUrl
							uni.setStorageSync('url', that.tempUrl)
							that.show = false
						} else {
							uni.showToast({
								title: '连接失败',
								icon: 'none'
							})
						}
					},
					fail: (err) => {
						uni.hideLoading()
						console.log(that.tempUrl)
						console.log('err')
						console.log(err)
						uni.showToast({
							title: '连接失败',
							icon: 'none'
						})
					}
				})
			},
			submitPop() {
				this.testConnect()
				// this.url = this.tempUrl
				// uni.setStorageSync('url', this.tempUrl)
				// this.show = false
			},
			closePop() {
				this.show = false
			},
			beforeSwitch(index) {
				if (index === 0) {
					this.show = true
					this.tempUrl = this.url
				} else if (index === 1) {
					this.itemNumber = ''
					this.description = ''
					this.inventoryItemId = ''
					this.invCategory = ''
					this.status = ''
					this.primaryUomCode = ''
					this.itemType = ''
					this.lastUpdateDate = ''
					this.weightUomCode = ''
					this.unitWeight = ''
					this.volumeUomCode = ''
					this.unitVolume = ''
					this.dimensionUomCode = ''
					this.unitLength = ''
					this.unitWidth = ''
					this.unitHeight = ''
					uni.scanCode({
						scanType: ['qrCode'],
						success: (res) => {
							let that = this
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);
							let itemNumber = res.result
							uni.showLoading({
							    title: '加载中',
								mask: true
							});
							uni.request({
								header: {
									"Content-Type": 'application/x-www-form-urlencoded'
								},
								url: that.url + "/item/by-item-number",
								method: 'GET',
								data: {
									itemNumber: itemNumber
								},
								success: (res) => {
									let result = res.data
									console.log(that.url)
									console.log(result)
									if (result.code === 200) {
									    uni.hideLoading();
										uni.showToast({
											title: '扫描成功',
											icon: 'success'
										})
										that.itemNumber = result.result.itemNumber
										that.description = result.result.description
										that.inventoryItemId = result.result.inventoryItemId
										that.invCategory = result.result.invCategory
										that.status = result.result.status
										that.primaryUomCode = result.result.primaryUomCode
										that.itemType = result.result.itemType
										that.lastUpdateDate = result.result.lastUpdateDate
										that.weightUomCode = result.result.weightUomCode
										that.unitWeight = result.result.unitWeight
										that.volumeUomCode = result.result.volumeUomCode
										that.unitVolume = result.result.unitVolume
										that.dimensionUomCode = result.result.dimensionUomCode
										that.unitLength = result.result.unitLength
										that.unitWidth = result.result.unitWidth
										that.unitHeight = result.result.unitHeight
									} else {
										uni.hideLoading();
										if(this.$u.test.isEmpty(result.code)) {
											uni.showToast({
												title: result.message || '请配置正确的服务器地址并保证连接正确',
												icon: 'none'
											})
											this.show = true
											this.tempUrl = this.url
										} else {
											uni.showToast({
												title: result.message || '扫描错误',
												icon: 'none'
											})
										}
									}
								},
								fail: (err) => {
									uni.hideLoading();
									uni.showToast({
										title: '请配置正确的服务器地址并保证连接正确',
										icon: 'none'
									})
									this.show = true
									this.tempUrl = this.url
								}
							})
						}
					});
				} else {
					// this.itemNumber = ''
					// this.description = ''
					// this.inventoryItemId = ''
					// this.invCategory = ''
					// this.status = ''
					// this.primaryUomCode = ''
					// this.itemType = ''
					// this.lastUpdateDate = ''
					// this.weightUomCode = ''
					// this.unitWeight = ''
					// this.volumeUomCode = ''
					// this.unitVolume = ''
					// this.dimensionUomCode = ''
					// this.unitLength = ''
					// this.unitWidth = ''
					// this.unitHeight = ''
					uni.redirectTo({
						url: 'index'
					})
				}


			}
		}
	}
</script>
<style lang="scss">
	.wrap {
		padding: 30rpx;
		background-color: #fff;
	}

	.close-btn {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
	}
</style>
