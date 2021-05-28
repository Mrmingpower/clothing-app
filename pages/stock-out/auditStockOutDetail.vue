<template>
	<view>
		<view class="u-page">
			<!-- 所有内容的容器 -->
			<view style="" class="u-border-bottom">	
				<u-field icon="scan" v-model="tempNum" :focus="true" @click="focus" @confirm="confirm" @focus="focus"  label-width="230" input-align="right" label="当前扫描:">
				</u-field>
			</view>
			<view class="wrap" style="margin-top: 35rpx;">
		<!-- 		<u-field v-model="itemNumber" disabled required label-width="200" input-align="right" label="物料号码:">
				</u-field>
				<u-field v-model="description" disabled required label-width="200" input-align="right" label="物料描述:">
				</u-field> -->
				<u-table font-size="30">
						<u-tr>
							<u-th>名称</u-th>
							<u-th>数量</u-th>
							<u-th>辅助数量</u-th>
							<u-th>已扫描数量</u-th>
						</u-tr>
						<u-tr v-for="(item,index) in detail" :key="index" :index="index">
							<u-td>{{item.productName}}</u-td>
							<u-td class="comm_height"><text>{{item.quantity}}</text></u-td>
							<u-td class="comm_height"><text>{{item.quantityByAssistant}}</text></u-td>
							<u-td class="comm_height" style="color: #ff0004;"><text>{{item.scanQuantity}}</text></u-td>
						</u-tr>
					</u-table>
			</view>
			<u-divider>没有更多了</u-divider>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="list" :mid-button="true" :before-switch="beforeSwitch"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tempNum: '',
				stockOutDetailId: '',
				detail: '',
				list: [
					{
						iconPath: "reload",
						selectedIconPath: "reload",
						text: '重置',
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
						iconPath: "checkmark",
						selectedIconPath: "checkmark",
						text: '确定',
						customIcon: false,
					}
				],
				current: 0
			}
		},
		onLoad(e) {
			let detail = JSON.parse(e.detail)
			for (var i = 0; i < detail.length; i++) {
				detail[i].scanQuantity = 0
			}
			this.stockOutDetailId = e.id
			this.detail = detail
		},
		methods: {
			focus(e) {
				uni.hideKeyboard()
			},
			confirm(e) {
				for (var i = 0; i < this.detail.length; i++) {
					if(this.detail[i].skuCode === e) {
						this.detail[i].scanQuantity = this.detail[i].scanQuantity + 1
					} else {
						uni.showToast({
							title: '不存在的条码',
							icon: 'none'
						})
					}
					this.tempNum = ''
				}
			},
				
			async beforeSwitch(index) {
				if(index === 0) {
					for (var i = 0; i < this.detail.length; i++) {
						this.detail[i].scanQuantity = 0
					}
				} else if(index === 1) {
					uni.scanCode({
						scanType: ['qrCode', 'barCode'],
						success: (res) => {
							let that = this
							let skuCode = res.result
							for (var i = 0; i < this.detail.length; i++) {
								if(this.detail[i].skuCode === res.result) {
									this.detail[i].scanQuantity = this.detail[i].scanQuantity + 1
								} else {
									uni.showToast({
										title: '不存在的条码',
										icon: 'none'
									})
								}
							}
						}
					});
				} else {
					for (var i = 0; i < this.detail.length; i++) {
						if(this.detail[i].quantityByAssistant !== this.detail[i].scanQuantity) {
							uni.showToast({
								title: this.detail[i].productName + '的数量不一致',
								icon: 'none'
							})
							return
						}
					}
					let result = await this.$myRequest({
						url: '/stock-out/check/' + this.stockOutDetailId,
						method: 'put'
					})
					if(result === 200) {
						uni.showToast({
							title: '审核成功',
							icon: 'success'
						})
						setTimeout(function() {
							// uni.switchTab({
							// 	url:'../index/index'
							// })
							uni.navigateBack({
								delta: 2
							})
						}, 800);
					}
					
				}
				
			},
		}
	}
</script>

<style scoped>
	.comm_height{
		height: 62rpx
	}
</style>
