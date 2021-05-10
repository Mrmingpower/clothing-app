<template>
	<view>
		<view class="wrap">
			<u-field v-model="sourceTypeName" icon="home" :clearable="false" @click="sourceTypeClick" label-width="200"
				placeholder="请选择入库类型" label="入库类型">
				<u-button @click="sourceTypeClick" slot="right" size="mini" type="primary">选择</u-button>
			</u-field>
			<u-field v-model="supplierName" @click="selectSupplier" icon="coupon" right-icon="arrow-down-fill"
				:disabled="true" label-width="200" placeholder="请选择供应商" label="供应商"></u-field>
			<u-field v-model="arrivalNo" icon="calendar" @click="purchaseClick" right-icon="arrow-down-fill"
				:disabled="true" label-width="200" placeholder="请选择采购单" label="采购单"></u-field>
		</view>
		<view style="margin-top: 15rpx;">
			<view class="u-border-bottom" style="background-color: #FFFFFF;text-align: center;">
				<text style="font-size: 50rpx;">面料信息</text>
			</view>
			<view v-for="(item,index) in materialList" :key="index" :index="index">
				<u-card :border="false" margin="0rpx 0rpx" :thumb="thumb" thumb-width="40" :title-size="35"
					border-radius="0" :title="item.productName" :sub-title="item.productNo">
					<view slot="body">
						<view style="width: 350rpx;" class="u-border-right">
							<view style="width: 380rpx;">
								<u-row gutter="7">
									<u-col span="5">
										<view class="flex-item-20">颜色</view>
									</u-col>
									<u-col span="2">
										<view style="width: 180rpx;">{{item.color}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2" style="width: 380rpx;">
								<u-row gutter="8">
									<u-col span="5">
										<view class="flex-item-20">规格</view>
									</u-col>
									<u-col span="3">
										<view style="width: 180rpx;">{{item.specification}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2" style="width: 380rpx;">
								<u-row gutter="8">
									<u-col span="5">
										<view class="flex-item-20">单位</view>
									</u-col>
									<u-col span="3">
										<view style="width: 180rpx;">{{item.unit}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2" style="width: 400rpx;">
								<u-row gutter="7">
									<u-col span="5">
										<view class="flex-item-20">副计量单位</view>
									</u-col>
									<u-col span="2">
										<view style="width: 180rpx;">{{item.assistantUnit}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2" style="width: 380rpx;">
								<u-row gutter="7">
									<u-col span="5">
										<view class="flex-item-20">金额</view>
									</u-col>
									<u-col span="2">
										<view style="width: 180rpx;color: #ff0000;">{{item.amount}}</view>
									</u-col>
								</u-row>
							</view>
						</view>
						<view style="position: absolute;right: 80rpx;top: 120rpx;">
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="6">
										<view class="flex-item-20">单价</view>
									</u-col>
									<u-col span="1" style="margin-left: 30rpx;">
										<view style="width: 100rpx;">{{item.price}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="6">
										<view class="flex-item-20">匹数</view>
									</u-col>
									<u-col span="1" style="margin-left: 30rpx;">
										<view style="width: 10rpx;">{{item.quantityByAssistant.toString()}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="6">
										<view class="flex-item-20">单匹重量</view>
									</u-col>
									<u-col span="1" style="margin-left: 30rpx;">
										<view style="width: 100rpx;">{{item.exchangeRate.toString()}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="6">
										<view class="flex-item-20">总匹数</view>
									</u-col>
									<u-col span="1" style="margin-left: 30rpx;">
										<view style="width: 100rpx;color: #ff0000;">{{item.allQuantityByAssistant.toString()}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="6">
										<view class="flex-item-20">总数量</view>
									</u-col>
									<u-col span="1" style="margin-left: 30rpx;">
										<view style="width: 100rpx;color: #ff0000;">{{sumQuantity(item)}}</view>
									</u-col>
								</u-row>
							</view>
							
						</view>
					</view>
					<view slot="foot">
						<view class="footer-box">
							<view class="my-iconfont text-blue" @tap="toEdit(item)">
								<u-icon name="more-circle" color="#2979ff" size="28" label="修改" label-color="#2979ff"></u-icon>
							</view>
							<view class="my-iconfont text-blue" @tap="toDel(index)">
								<u-icon name="close-circle" color="#e54d42" size="28" label="删除" label-color="#e54d42"></u-icon>
							</view>
						</view>
					</view>

				</u-card>
			</view>
			<view style="background-color: #FFFFFF;" class="u-border-top">
				<view style="padding-top: 20rpx;padding-bottom: 20rpx;">
					<u-icon name="saomiao" class="saomiao_cla" custom-prefix="custom-icon" size="60" @click="toScan"
						color="#00aaff"></u-icon>
					<u-icon name="icon-test" class="add_cla" custom-prefix="custom-icon" size="60" @click="toAddProduct"
						color="#00aaff"></u-icon>
				</view>
			</view>
		</view>

		<view class="wrap" style="margin-top: 15rpx;">
			<u-field :field-style="fieldStyle" v-model="properties" disabled icon="star" label-width="200"
				placeholder="属性" label="属性"></u-field>
			<u-field v-model="orderNo" disabled icon="minus-circle" label-width="200" placeholder="订单号" label="订单号">
			</u-field>
			<u-field v-model="datetime" icon="calendar" @click="dateTimeClick" label-width="200" :disabled="true"
				right-icon="arrow-down-fill" placeholder="请选择入库日期" label="入库日期"></u-field>
			<u-field v-model="warehouseName" @click="warehouseClick" icon="shopping-cart" label-width="200"
				:disabled="true" right-icon="arrow-down-fill" placeholder="请选择仓库" label="仓库"></u-field>
		</view>

		<view class="wrap" style="margin-top: 15rpx;">
			<u-field v-model="description" type="textarea" icon="tags" label-width="200" placeholder="备注" label="备注">
			</u-field>
		</view>
		<view>
			<u-button throttle-time="2000" type="primary" :ripple="true" :plain="true" @click="submit">确认开单</u-button>
		</view>
		<view>
			<u-toast ref="uToast" />
			<u-select v-model="sourceTypeShow" :list="sourceTypeList" @confirm="sourceTypeConfirm"></u-select>
			<u-calendar v-model="calendarShow" mode="date" @change="calendarChange"></u-calendar>
			<u-select v-model="purchaseOrderShow" :list="purchaseList" @confirm="purchaseConfirm"></u-select>
			<u-popup v-model="editShow" mode="bottom" border-radius="14" length="70%" @close="popClose">
				<view class="u-demo-wrap">
					<view style="height: 50rpx;"></view>
					<view style="text-align: center;font-size: 38rpx;line-height: 50rpx;">单匹重量 & 匹数</view>
					<view style="margin-top: 20rpx;">
						<u-cell-group>
							<u-field v-model="editRow.productName"label="面料名称" label-width="150" :clearable="false" disabled :required="false" type="text"></u-field>
							<u-field v-model="editRow.productNo"label="面料编号" label-width="150" :clearable="false" disabled :required="false" type="text"></u-field>
							<u-field v-model="editRow.coloringNo"label="缸号" label-width="150" :clearable="false" :required="false" type="text"></u-field>
							<u-table>
									<u-tr>
										<u-th>单匹重量</u-th>
										<u-th>匹数</u-th>
									</u-tr>
									<view v-for="(item,index) in tempExchangeRate" :key="index">
										<u-tr>
											<u-td>
												<view>
													<u-number-box align="center" v-model="item.exchangeRate"></u-number-box>
												</view>
											</u-td>
											<u-td>
												<view>
													<u-number-box align="center" v-model="item.quantityByAssistant"></u-number-box>
												</view>
											</u-td>
										</u-tr>
									</view>
								</u-table>
						</u-cell-group>
						<view class="close-btn">
							<u-button @tap="addLine" size="medium" type="warning">添加</u-button>
							<u-button @tap="editExchangeRate" size="medium" type="primary">确定</u-button>
							<u-button @tap="closeBtn" size="medium">取消</u-button>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		sumQuantity
	} from '@/util/index.js'
	export default {
		data() {
			return {
				fieldStyle: {
					'color': '#ff557f',
				},
				sourceType: '',
				supplierId: '',
				supplierName: '',
				warehouseId: '',
				warehouseName: '',
				datetime: '',
				description: '',
				arrivalId: '',
				arrivalNo: '',
				orderId: '',
				orderNo: '',
				properties: '面料',
				status: '',
				details: [],
				sourceTypeList: [{
					value: '0',
					label: '采购入库'
				}, {
					value: '2',
					label: '其他入库'
				}],
				sourceTypeShow: false,
				sourceTypeName: '',
				calendarShow: false,
				purchaseOrderShow: false,
				purchaseList: [],
				materialList: [],
				thumb: '/static/stockIn/product.png',
				editShow: false,
				editRow: '',
				tempExchangeRate: [],
				tempQuantityByAssistant: []
			}
		},
		onShow() {
			let that = this
			uni.getStorage({
				key: 'selectStockInSupplierByAdd',
				async success(res) {
					console.log('res了')
					that.supplierName = res.data.name
					that.supplierId = res.data.id
					let result = await that.$myRequest({
						url: '/purchase-order/running/supplier/' + res.data.id
					})
					let data = []
					for (var i = 0; i < result.length; i++) {
						data.push({
							value: result[i],
							label: result[i]
						})
					}
					that.purchaseList = data
					uni.removeStorage({
						key: 'selectStockInSupplierByAdd'
					});
				}
			})
			uni.getStorage({
				key: 'selectStockInWarehouseByAdd',
				success(res) {
					console.log('res')
					console.log(res)
					// let textStr = []
					// let textId = []
					// for (var i = 0; i < res.data.length; i++) {
					// 	textStr.push(res.data[i].name)
					// 	textId.push(res.data[i].id)
					// }
					that.warehouseName = res.data.name
					that.warehouseId = res.data.id
					uni.removeStorage({
						key: 'selectStockInWarehouseByAdd'
					});
				}
			})
		},
		methods: {
			sumQuantity,
			closeBtn() {
				this.editShow = false
			},
			popClose() {
				this.tempExchangeRate = []
			},
			toEdit(item) {
				this.editShow = true
				this.editRow = item
				for (var i = 0; i < item.exchangeRate.length; i++) {
					this.tempExchangeRate.push({
						exchangeRate: item.exchangeRate[i],
						quantityByAssistant: item.quantityByAssistant[i]
					})
				}
			},
			toDel(index) {
				console.log('执行了')
				this.materialList.splice(index,1)
			},
			addLine() {
				console.log(this.tempExchangeRate)
				this.tempExchangeRate.push({
					exchangeRate: 1,
					quantityByAssistant: 1
				})
			},
			editExchangeRate() {
				let arr = []
				let finalData = []
				for (var i = 0; i < this.tempExchangeRate.length; i++) {
					if(arr.indexOf(this.tempExchangeRate[i].exchangeRate) > -1) {
						let index = arr.indexOf(this.tempExchangeRate[i].exchangeRate)
						finalData[index].quantityByAssistant = finalData[index].quantityByAssistant + this.tempExchangeRate[i].quantityByAssistant
					} else {
						finalData.push(this.tempExchangeRate[i])
						arr.push(this.tempExchangeRate[i].exchangeRate)
					}
				}
				let exchangeRate = []
				let quantityByAssistant = []
				for (var i = 0; i < finalData.length; i++) {
					exchangeRate.push(finalData[i].exchangeRate)
					quantityByAssistant.push(finalData[i].quantityByAssistant)
				}
				this.editRow.exchangeRate = exchangeRate
				this.editRow.quantityByAssistant = quantityByAssistant
				this.editShow = false
			},
			purchaseClick() {
				this.purchaseOrderShow = true
			},
			selectSupplier() {
				uni.navigateTo({
					url: 'selectSupplierByAdd?supplierNames=' + this.supplierName
				})
			},
			calendarChange(e) {
				this.datetime = e.result
			},
			dateTimeClick() {
				this.calendarShow = true
			},
			warehouseClick() {
				uni.navigateTo({
					url: 'selectWarehouseByAdd?supplierNames=' + this.warehouseName
				})
			},
			sourceTypeClick() {
				this.sourceTypeShow = true
			},
			sourceTypeConfirm(e) {
				this.sourceTypeName = e[0].label
				this.sourceType = e[0].value
			},
			async purchaseConfirm(e) {
				let result = await this.$myRequest({
					url: '/purchase-order/no/' + e[0].value
				})
				for (var i = 0; i < result.details.length; i++) {
					this.materialList.push({
						color: result.details[i].color,
						specification: result.details[i].specification,
						unit: result.details[i].unit,
						assistantUnit: result.details[i].assistantUnit,
						price: result.details[i].price,
						productId: result.details[i].productId,
						productName: result.details[i].productName,
						productNo: result.details[i].productNo,
						exchangeRate: [1,2],
						quantityByAssistant: [1,2],
						allQuantityByAssistant: '',
						quantity: '',
						amount: '',
						coloringNo: ''
					})
				}
			},
			toAddProduct() {
				uni.navigateTo({
					url: 'material-add-add'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f5f4f9;
	}

	.footer-box {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 17%;
	}
	.my-iconfont {
		font-size: 24rpx;
	}
	.text-blue {
		color: #0081ff;
	}
	
	.line-cla2 {
		margin: 14rpx 0;
	}

	.close-btn {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
	}

	.data_cla {
		display: flex;
		display: -webkit-flex;
		/*Safari*/
		justify-content: space-between;
		/*水平排布方式*/
		align-items: center;
		/*垂直对齐方式*/
		padding: 15rpx;
	}

	.wrap {
		padding: 30rpx;
		background-color: #fff;
	}

	.field_cla {
		margin-left: -165rpx;
	}

	.saomiao_cla {
		position: relative;
		left: 150rpx;
	}

	.add_cla {
		position: relative;
		left: 470rpx;
	}
	.u-demo-wrap {
		background-color: #ffffff;
		width: 90%;
		margin-left: 5%;
		align-items: center;
	}

	.bottom {
		padding: 0 20rpx;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: var(--window-bottom);
		display: flex;
		align-items: center;
		justify-content: flex-end;
		z-index: 99;
		height: 110rpx;
		background-color: #fff;
		box-sizing: border-box;
		box-shadow: 0 0 10rpx 6rpx rgba(0, 0, 0, 0.1);
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
