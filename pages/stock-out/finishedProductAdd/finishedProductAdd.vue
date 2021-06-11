<template>
	<view>
		<view class="wrap">
			<u-field v-model="sourceTypeName" icon="home" :clearable="false" required @click="sourceTypeClick"
				label-width="200" placeholder="请选择出库类型" label="出库类型">
				<u-button @click="sourceTypeClick" slot="right" size="mini" type="primary">选择</u-button>
			</u-field>
			<u-field v-model="warehouseName" @click="warehouseClick" required icon="shopping-cart" label-width="200"
				:disabled="true" right-icon="arrow-down-fill" placeholder="请选择仓库" label="仓库"></u-field>
			<u-field v-if="sourceType===0" v-model="customerIdLabel" @click="selectcustomer" icon="coupon"
					right-icon="arrow-down-fill" :disabled="true" label-width="200" placeholder="请选择客户id" label="客户ID">
			</u-field>
			<u-field v-if="sourceType===0" v-model="pickOrderIdLabel" icon="calendar" @click="selectcommand"
				right-icon="arrow-down-fill" :disabled="true" label-width="200" placeholder="请选择销售单" label="销售单">
			</u-field>
		</view>
		<view style="margin-top: 15rpx;">
			<view class="u-border-bottom" style="background-color: #FFFFFF;text-align: center;">
				<text style="font-size: 50rpx;">成品信息</text>
			</view>
			<view v-for="(item,index) in productList" :key="index" :index="index">
				<u-card :border="false" margin="0rpx 0rpx" :thumb="thumb" @head-click="headClick(item)" thumb-width="40"
					:title-size="35" border-radius="0" :title="item.productName" :sub-title="item.productNo">
					<view slot="body">
						<view style="width: 350rpx;" class="u-border-right">
							<view style="width: 380rpx;">
								<u-row gutter="8">
									<u-col span="5">
										<view class="flex-item-20">名称</view>
									</u-col>
									<u-col span="3">
										<view style="width: 180rpx;">{{item.productName}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2" style="width: 380rpx;">
								<u-row gutter="8">
									<u-col span="5">
										<view class="flex-item-20">编号</view>
									</u-col>
									<u-col span="3">
										<view style="width: 180rpx;">{{item.productNo}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2" style="width: 400rpx;">
								<u-row gutter="7">
									<u-col span="5">
										<view class="flex-item-20">单位</view>
									</u-col>
									<u-col span="2">
										<view style="width: 180rpx;">{{item.unit}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="5">
										<view class="flex-item-20">颜色</view>
									</u-col>
									<u-col span="2" style="margin-left: 30rpx;">
										<view style="width: 100rpx;">{{item.color}}</view>
									</u-col>
								</u-row>
							</view>
						</view>
						<view style="position: absolute;right: 80rpx;top: 120rpx;">
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="6">
										<view class="flex-item-20">尺码</view>
									</u-col>
									<u-col span="1" style="margin-left: 30rpx;">
										<view style="width: 100rpx;">{{item.specification}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="6">
										<view class="flex-item-20">数量</view>
									</u-col>
									<u-col span="1" style="margin-left: 30rpx;">
										<view style="width: 100rpx;">{{item.quantity}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="5">
										<view class="flex-item-20">单价</view>
									</u-col>
									<u-col span="2">
										<view style="width: 180rpx;color: #ff0000;">{{item.price}}</view>
									</u-col>
								</u-row>
							</view>
						</view>
					</view>
					<view slot="foot">
						<view class="footer-box">
							<view class="my-iconfont text-blue" @tap="toEdit(item)">
								<u-icon name="more-circle" color="#2979ff" size="28" label="修改" label-color="#2979ff">
								</u-icon>
							</view>
							<view class="my-iconfont text-blue" @tap="toDel(index)">
								<u-icon name="close-circle" color="#e54d42" size="28" label="删除" label-color="#e54d42">
								</u-icon>
							</view>
						</view>
					</view>
			
				</u-card>
			</view>
			<view style="background-color: #FFFFFF;" class="u-border-top">
				<view style="padding-top: 20rpx;padding-bottom: 20rpx;">
					<u-icon name="saomiao" class="saomiao_cla" custom-prefix="custom-icon" size="60" color="#00aaff"></u-icon>
					<u-icon name="icon-test" class="add_cla" custom-prefix="custom-icon" size="60" @click="toAddProduct"
						color="#00aaff"></u-icon>
				</view>
			</view>
		</view>

		<view class="wrap" style="margin-top: 15rpx;">
			<u-field :field-style="fieldStyle" v-model="propertiesName" disabled icon="star" label-width="200"
				placeholder="属性" label="属性"></u-field>
			<u-field v-model="date" icon="calendar" @click="dateClick" label-width="200" :disabled="true"
				right-icon="arrow-down-fill" placeholder="请选择出库日期" label="出库日期"></u-field>
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
			<u-select v-model="receiverIdShow" :list="receiverIdList" @confirm="receiverIdConfirm"></u-select>
			<u-select v-model="commandShow" :list="commandList" @confirm="commandConfirm"></u-select>
			<u-select v-model="sourceTypeShow" :list="sourceTypeList" @confirm="sourceTypeConfirm"></u-select>
			<u-calendar v-model="calendarShow" mode="date" @change="calendarChange"></u-calendar>
			<u-select v-model="pickOrderShow" :list="pickOrderList" @confirm="pickOrderConfirm"></u-select>
			<u-select v-model="pickCustomerShow" :list="pickCustomerList" @confirm="pickCustomerConfirm"></u-select>
			<u-popup v-model="editShow" mode="bottom" border-radius="14" length="70%" @close="popClose">
				<view class="u-demo-wrap">
					<view style="height: 50rpx;"></view>
					<view style="text-align: center;font-size: 38rpx;line-height: 50rpx;">单匹重量 & 匹数</view>
					<view style="margin-top: 20rpx;">
						<u-cell-group>
							<u-field v-model="editRow.productName" label="成品名称" label-width="150" :clearable="false"
								disabled :required="false" type="text"></u-field>
							<u-field v-model="editRow.productNo" label="成品编号" label-width="150" :clearable="false"
								disabled :required="false" type="text"></u-field>
							<u-field v-model="editRow.unit" label="单位" label-width="150" :clearable="false" disabled
								:required="false" type="text"></u-field>
							<!-- <u-field v-model="editRow.deliveryDate" label="副计量单位" label-width="150" :clearable="false"
								disabled :required="false" type="text"></u-field> -->
							<u-table>
								<u-tr>
									<u-th>名称</u-th>
									<u-th>数量</u-th>
									<u-th>库存数量</u-th>
								</u-tr>
								<view v-for="(item,index) in editRow.productSkuArr" :key="index">
									<u-tr>
										<u-td>
											<view>
												<text>{{item.exchangeRate}}</text>
											</view>
										</u-td>
										<u-td>
											<view @click="tempClick(item)">
												<text>{{item.quantityByAssistantEdit}}</text>
											</view>
										</u-td>
										<u-td>
											<view>
												<text>{{item.quantity}}</text>
											</view>
										</u-td>
									</u-tr>
								</view>
							</u-table>
						</u-cell-group>
					</view>
					<u-divider>没有更多了</u-divider>
				</view>
			</u-popup>

			<u-popup v-model="tempQuantityByAssistantShow" mode="center" border-radius="14" width="80%" height="400rpx">
				<view>
					<view style="height: 50rpx;"></view>
					<view style="text-align: center;font-size: 38rpx;line-height: 50rpx;">匹数</view>
					<view style="margin-top: 30rpx;">
						<u-cell-group>
							<u-field v-model="tempQuantityByAssistant" label="匹数:" label-width="150" :clearable="false"
								:required="false" type="text"></u-field>
						</u-cell-group>
						<view class="close-btn">
							<u-button @tap="submitPop" size="medium" type="primary">确定</u-button>
							<u-button @tap="tempQuantityByAssistantShow = false" size="medium">取消</u-button>
						</view>
					</view>
				</view>
			</u-popup>
			<u-popup v-model="seeShow" mode="center" border-radius="14" length="70%" :closeable="true"
				@close="seeShow = false">
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		sumQuantity,
		formatStockAssistant
	} from '@/util/index.js'
	export default {
		data() {
			return {
				tempQuantityByAssistant: 0,
				tempRow: '',
				tempQuantityByAssistantShow: false,
				fieldStyle: {
					'color': '#ff557f',
				},
				sourceType: '',
				warehouseId: '',
				warehouseName: '',
				date: '',
				description: '',
				arrivalNo: '',
				orderId: '',
				propertiesName: '成品',
				properties: 0,
				status: '',
				details: [],
				commandList:[],
				receiverTypeList: [],
				receiverIdList: [],
				sourceTypeList: [{
					value: 0,
					label: '销售出库'
				}, {
					value: 1,
					label: '调拨出库'
				}, {
					value: 2,
					label: '其他出库'
				}, 
				 ],
				sourceTypeShow: false,
				sourceTypeName: '',
				calendarShow: false,
				pickOrderShow: false,
				pickOrderList: [],
				pickOrderIdLabel:'',
				customerIdLabel:'',
				commandShow: false,
				receiverIdShow: false,
				pickCustomerShow: false,
				pickCustomerList : [],
				productList: [],
				tempproductList: [],
				thumb: '/static/stockIn/open.png',
				editShow: false,
				editRow: '',
				tempExchangeRate: [],
				tempQuantityByAssistant: [],
				seeShow: false,
				seeRow: '',
				"customerId": 0,
				  "date": "",
				  "description": "",
				  "details": [
				    {
				      "cost": 0,
				      "detailDescription": "",
				      "orderDetailId": 0,
				      "specification": '',
				      "quantity": '',
				      "skuId": 0
				    }
				  ],
				  "orderId": 0,
				  "orderNo": "",
				  "payAccountId": 0,
				  "payStyle": 0,
				  "principalName": "",
				  "warehouseId": 0
			}
		},
		onShow() {
			let that = this
			uni.getStorage({
				key: 'selectStockOutWarehouseByFinishedProductAdd',
				success(res) {
					if (that.warehouseId !== res.data.id) {
						that.productList = []
					}
					that.warehouseName = res.data.name
					that.warehouseId = res.data.id
					uni.removeStorage({
						key: 'selectStockOutWarehouseByFinishedProductAdd'
					});
				}
			})
			uni.getStorage({
				key:'out-add-customer',
				success(res){
					that.customerIdLabel = res.data.no
					uni.removeStorage({
						key:'out-add-customer'
					})
				}
			})
			uni.getStorage({
				key:'out-add-order',
				success(res){
					console.log(res)
					that.pickOrderIdLabel = res.data.no
					that.productList = res.data
					uni.removeStorage({
						key:'out-add-order'
					})
				}
			})
			uni.getStorage({
				key: 'out-add-product',
				async success(res) {
					console.log('resoutaddproduct')
					console.log(res)
					// let only = res.data.productNo + '-' + res.data.color
					// if (that.tempproductList.indexOf(only) > -1) {
					// 	let index = that.tempproductList.indexOf(only)
					// 	that.productList.splice(index, 1)
					// 	that.tempproductList.splice(index, 1)
					// }
					// that.tempproductList.push(only)
					
					// let result1 = await that.$myRequest({
					// 	url: '/product-spu/'
					// })
					// console.log(result1)
					// let productSkuArr = []
					// for (var j = 0; j < result1.length; j++) {
					// 	productSkuArr.push({
					// 		specification: result1[j].specification || 0,
					// 		productSkuId: result1[j].skuId || '',
					// 		coloringNo: result1[j].coloringNo || '',
					// 		exchangeRate: result1[j].skuQuantity || 0,
					// 		quantity: result1[j].quantity || 0,
					// 		quantityByAssistant: result1[j].quantityByAssistant || 0,
					// 		quantityByAssistantEdit: result1[j].quantityByAssistantEdit || 0,
					// 	})
					// }
					that.productList.push({
						productName: res.data.productName || '',
						productNo: res.data.productNo || '',
						productSpuId: res.data.styleId || '',
						quantity:0,
						quantityByAssistant: 0,
						unit: res.data.unit || '',
						deliveryDate: res.data.deliveryDate || '',
						price: res.data.price || '',
						specification:res.data.specification || '',
						color:res.data.color || '',
						// productSkuArr: productSkuArr,
						// clickChecked: true
					})
					uni.removeStorage({
						key: 'out-add-product'
					});
				}
			})
		},
		methods: {
			toDel(index) {
				console.log('执行了')
				this.materialList.splice(index, 1)
			},
			toEdit(item) {
				this.editShow = true
				this.editRow = item
				console.log(this.editRow)
			},
			popClose() {
				this.tempExchangeRate = []
			},
			tempClick(e) {
				console.log(e)
				this.tempRow = e
				this.tempQuantityByAssistant = e.quantityByAssistantEdit
				this.tempQuantityByAssistantShow = true
			},
			selectcommand(e){
				uni.navigateTo({
					url: 'searchOrder'
				})
			},
			selectcustomer(){
				uni.navigateTo({
					url: 'selectCustomers'
				})
				},
			receiverIdConfirm(e) {
				this.receiverId = e[0].value
				this.receiverIdName = e[0].label
			},
			pickOrderClick() {
				if (this.sourceType === 0) {
					if (this.$u.test.isEmpty(this.sourceType)) {
						uni.showToast({
							title: '出库类型不能为空',
							icon: 'none'
						})
						return
					}
					if (this.$u.test.isEmpty(this.warehouseId)) {
						uni.showToast({
							title: '仓库不能为空',
							icon: 'none'
						})
						return
					}
					this.pickOrderShow = true
				}
			},
			async pickOrderConfirm(e) {
				let result = await this.$myRequest({
					url: '/sales-order/' + e[0].value
				})
				this.pickOrderId = result.id
				this.pickOrderIdLabel = result.no
				console.log('result')
				console.log(result)
		for (var i = 0; i < result.details.length; i++) {
			let result3 = await this.$myRequest({
				// url: '/product-spu/' + result.details[i].productSpuId + '/' + this.warehouseId,
				url:'/sales-order/no/' + result.data.no,
			})
			// console.log('result.details[i]')
			// console.log(result.details[i])
			// console.log('result3')
			// console.log(result3)
			let productSkuArr = []
			for (var j = 0; j < result3.length; j++) {
				productSkuArr.push({
					// specification: result3[j].specification || 0,
					productSkuId: result3[j].skuId || '',
					coloringNo: result3[j].coloringNo || '',
					exchangeRate: result3[j].skuQuantity || 0,
					quantity: result3[j].quantity || 0,
					quantityByAssistant: result3[j].quantityByAssistant || 0,
					quantityByAssistantEdit: result3[j].quantityByAssistantEdit || 0,
				})
			}
			this.productList.push({
				productName: result.details[i].productName || '',
				productNo: result.details[i].productNo || '',
				productSpuId: result.details[i].productSpuId || '',
				quantity: 0,
				quantityByAssistant: 0,
				unit: result.details[i].unit || '',
				deliveryDate: result.details[i].deliveryDate || '',
				amount: 0,
				pickOrderDetailId: result.details[i].id || '',
				// productSkuArr: productSkuArr,
				clickChecked: true
			})
		}
		console.log('this.productList')
		console.log(this.productList)
			},
			async getData(e) {
				let result = await this.$myRequest({
					url: '/customer/search',
				})
				this.list_orders = res.data
				console.log(res.data)
			},
			calendarChange(e) {
				this.date = e.result
			},
			dateClick() {
				this.calendarShow = true
			},
			// headClick(item) {
			// 	item.clickChecked = !item.clickChecked
			// },
			warehouseClick() {
				uni.navigateTo({
					url: 'selectWarehouseByFinishedProductAdd?supplierNames=' + this.warehouseName
				})
			},
			sourceTypeClick() {
				this.sourceTypeShow = true
			},
			async sourceTypeConfirm(e) {
				this.sourceTypeName = e[0].label
				this.sourceType = e[0].value
				this.warehouseId = ''
				this.warehouseName = ''
				this.date = ''
				this.description = ''
				this.orderId = ''
				this.details = []
			},
			async submit() {
				if (this.$u.test.isEmpty(this.warehouseId)) {
					uni.showToast({
						title: '仓库不能为空',
						icon: 'none'
					})
					return
				}
				let params = {
					date: this.date,
					sourceTypeName: this.sourceTypeName,
					warehouseName:this.warehouseName,
					customerIdLabel:this.customerIdLabel,
					pickOrderIdLabel:this.pickOrderIdLabel,
				}
				console.log('params')
				let result = await this.$myRequest({
					url: '/product-out/',
					method: 'post',
					ContentType: 'application/json;charset=UTF-8',
					data: params
				})
				if (result === 200) {
					uni.showToast({
						title: '开单成功',
						icon: 'success'
					})
					setTimeout(function() {
						uni.switchTab({
							url: '../../index/index'
						})
					}, 800);
				} else {
					uni.showToast({
						title: '开单失败',
						icon: 'none'
					})
					console.log(result)
				}
			},
			toAddProduct() {
				if (this.sourceType ===1,2 && this.warehouseName !=='') {
					uni.navigateTo({
						url: 'finished-add-add'
					})
				}

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
