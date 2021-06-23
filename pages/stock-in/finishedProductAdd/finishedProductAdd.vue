<template>
	<view>
		<view class="wrap">
			<u-field v-model="sourceTypeName" disabled icon="home" :clearable="false" required label-width="200"
				placeholder="请选择入库类型" label="入库类型">
				<u-button  slot="right" size="mini" type="primary">选择</u-button>
			</u-field>
			<u-field v-model="warehouseName" @click="warehouseClick" required icon="shopping-cart" label-width="200"
				:disabled="true" right-icon="arrow-down-fill" placeholder="请选择仓库" label="仓库"></u-field>
			<view style="margin-top: 15rpx;">
				<view class="u-border-bottom" style="background-color: #FFFFFF;text-align: center;">
					<text style="font-size: 50rpx;">成品信息</text>
					<u-card :title="123">
						
					</u-card>
				</view>
				<view style="background-color: #FFFFFF;" class="u-border-top">
					<view style="padding-top: 20rpx;padding-bottom: 20rpx;">
						<u-icon name="saomiao" class="saomiao_cla" custom-prefix="custom-icon" size="60"
							color="#00aaff"></u-icon>
						<u-icon name="icon-test" class="add_cla" custom-prefix="custom-icon" size="60"
							@click="toAddProduct" color="#00aaff"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sourceTypeName: '其他入库',
				warehouseName: '',
				warehouseId: '',
			}
		},

		onShow() {
			let that = this
			uni.getStorage({
				key: 'selectStockInWarehouseByFinishedProductAdd',
				success(res) {
					if (that.warehouseId !== res.data.id) {
						that.productList = []
					}
					that.warehouseName = res.data.name
					that.warehouseId = res.data.id
					uni.removeStorage({
						key: 'selectStockInWarehouseByFinishedProductAdd'
					});
				}
			})
			uni.getStorage({
				key:'out-add-product',
				success(res){
					console.log(res)
					console.log('---------------------------------------------------')
					
					uni.removeStorage({
						key: 'out-add-product'
					});
				}
			})
		},
		methods: {
			warehouseClick() {
				uni.navigateTo({
					url: 'selectWarehouseByFinishedProductAdd?supplierNames=' + this.warehouseName
				})
				console.log('选仓库')
			},
			toAddProduct() {
				uni.navigateTo({
					url: 'finished-add-add?warehouseId=' + this.warehouseId
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f5f4f9;
	}

	.wrap {
		padding: 30rpx;
		background-color: #fff;
	}

	.saomiao_cla {
		position: relative;
		left: 150rpx;
	}

	.add_cla {
		position: relative;
		left: 470rpx;
	}
</style>
