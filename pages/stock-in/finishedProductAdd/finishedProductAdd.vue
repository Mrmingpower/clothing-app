<template>
	<view>
		<view class="wrap">
			<u-field v-model="sourceTypeName" disabled icon="home" :clearable="false" required label-width="200"
				placeholder="请选择入库类型" label="入库类型">
				<!-- <u-button  slot="right" size="mini" type="primary">选择</u-button> -->
			</u-field>
			<u-field v-model="warehouseName" @click="warehouseClick" required icon="shopping-cart" label-width="200"
				:disabled="true" right-icon="arrow-down-fill" placeholder="请选择仓库" label="仓库"></u-field>
			<view style="margin-top: 15rpx;">
				<view class="u-border-bottom" style="background-color: #FFFFFF;text-align: center;" >
					<text style="font-size: 50rpx;">成品信息</text>
				</view>
				<view   v-for="(item,index) in productArr" :index="index" :key="index">
					<u-card :title="item.productName" :sub-title="item.color" title-size="40" border-radius="0" :border="false">
						<view slot="body" class="main">
							<view style="margin-bottom: 20rpx;" class="No">
								<text>编号</text>
								<text style="margin-left: 100rpx;">{{item.productNo}}</text>
								</view>
							<view class="Specifications">
								<text>规格</text>
								<view v-for="(itemm,index) in item.spec " style="margin-left: -30rpx;">
									<text style="margin-left: 80rpx;width: 30rpx;text-align: center;display: inline-block;">{{itemm.specification}}</text>
								</view>
							</view>
							<view  class="number" >
								<text>数量</text>
								<view v-for="(itemm,index) in item.spec " style="margin-left: -30rpx;">
									<text style="margin-left: 80rpx;width: 30rpx;text-align: center;display: inline-block;">{{itemm.num}}</text>
								</view>
							</view>
							<view  class="unitPrice" >
								<text>单价</text>
									<text style="margin-left: 80rpx;width: 30rpx;text-align: center;display: inline-block;">{{item.settlePricee}}</text>
							</view>
							
							<view class="footer-box">
								<view class="my-iconfont" @tap="toEdit(item)">
									<u-icon name="more-circle" color="#2979ff" size="50" label="修改" label-color="#2979ff">
									</u-icon>
								</view>
								<view class="my-iconfont" @tap="toDel(index)">
									<u-icon name="close-circle" color="#e54d42" size="50" label="删除" label-color="#e54d42">
									</u-icon>
								</view>
							</view>
						</view>
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
				productList: [],
				productArr:[]
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
					that.productArr = res.data
					console.log('asdasdasdasdasdasdasdsadsadsadsadsadsadasdasd')
					console.log(that.productArr)
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
	.Specifications{
		flex-direction: row;
		display: flex;
	}
	.number{
		margin-top: 30rpx;
		flex-direction: row;
		display: flex;
	}
	.footer-box {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 17%;
	}
	.my-iconfont {
		color: #0081ff;
		margin-left: -50rpx;
		margin-top: 30rpx;
		margin-bottom: -30rpx;
	}
	.unitPrice{
		float: right;
	}
</style>
