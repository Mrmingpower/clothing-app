<template>
	<view>
		<view class="wrap">
			<u-field v-model="sourceTypeName" icon="home" :clearable="false" @click="sourceTypeClick" label-width="200"
				placeholder="请选择入库类型" label="入库类型">
				<u-button @click="sourceTypeClick" slot="right" size="mini" type="primary">选择</u-button>
			</u-field>
			<u-field v-if="sourceType==='0'" v-model="supplierName" @click="selectSupplier" icon="coupon" right-icon="arrow-down-fill"
				:disabled="true" label-width="200" placeholder="请选择供应商" label="供应商"></u-field>
			<u-field v-if="sourceType==='0'"  v-model="arrivalNo" icon="calendar" @click="purchaseClick" right-icon="arrow-down-fill"
				:disabled="true" label-width="200" placeholder="请选择采购单" label="采购单"></u-field>
		</view>
		<view style="margin-top: 15rpx;">
			<view class="u-border-bottom" style="background-color: #FFFFFF;text-align: center;">
				<text style="font-size: 50rpx;">辅料信息</text>
			</view>
			<view v-for="(item,index) in materialList" :key="index" :index="index">
				<u-card :border="false" margin="0rpx 0rpx" :thumb="thumb" @head-click="headClick(item)" thumb-width="40" :title-size="35"
					border-radius="0" :title="item.productName" :sub-title="item.productNo+'--'+item.color+'--'+item.specification">
					<view slot="body" v-if="item.clickChecked">
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
							
						</view>
						<view style="position: absolute;right: 80rpx;top: 120rpx;">
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="7">
										<view class="flex-item-20">单价</view>
									</u-col>
									<u-col span="1" style="margin-left: 30rpx;">
										<view style="width: 100rpx;">{{item.price}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="7">
										<view class="flex-item-20">辅助数量</view>
									</u-col>
									<u-col span="1" style="margin-left: 30rpx;">
										<view style="width: 10rpx;color: #00aaff;" v-if="item.quantityByAssistant.length < 3">{{item.quantityByAssistant.join('|')}}</view>
										<view v-if="item.quantityByAssistant.length >= 3">
											<u-button type="primary" size="mini" @click="seeClick(item)">查看</u-button>
										</view>
									</u-col>
								</u-row>
							</view>
							<!-- <view class="line-cla2">
								<u-row gutter="7">
									<u-col span="6">
										<view class="flex-item-20">单匹重量</view>
									</u-col>
									<u-col span="1" style="margin-left: 30rpx;">
										<view style="width: 100rpx;color: #00aaff;" v-if="item.exchangeRate.length < 3">{{item.exchangeRate.join('|')}}</view>
										<view  v-if="item.exchangeRate.length >= 3">
											<u-button type="primary" size="mini" @click="seeClick(item)">查看</u-button>
										</view>
									</u-col>
								</u-row>
							</view> -->
							<!-- <view class="line-cla2">
								<u-row gutter="7">
									<u-col span="6">
										<view class="flex-item-20">总匹数</view>
									</u-col>
									<u-col span="1" style="margin-left: 30rpx;">
										<view style="width: 100rpx;color: #ff0000;">{{item.allQuantityByAssistant.toString()}}</view>
									</u-col>
								</u-row>
							</view> -->
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="7">
										<view class="flex-item-20">总数量</view>
									</u-col>
									<u-col span="1" style="margin-left: 30rpx;">
										<view style="width: 100rpx;color: #00aaff;">{{item.quantity}}</view>
									</u-col>
								</u-row>
							</view>
							<!-- <view class="line-cla2">
								<u-row gutter="7">
									<u-col span="7">
										<view class="flex-item-20">金额</view>
									</u-col>
									<u-col span="1">
										<view style="width: 100rpx;color: #ff0000;">{{sumAmount(item)}}</view>
									</u-col>
								</u-row>
							</view> -->
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="7">
										<view class="flex-item-20">金额</view>
									</u-col>
									<u-col span="1" style="margin-left: 30rpx;">
										<view style="width: 100rpx;color: #ff0000;">{{sumAmount(item)}}</view>
									</u-col>
								</u-row>
							</view>
						</view>
					</view>
					<view slot="foot" v-if="item.clickChecked">
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
			<u-field :field-style="fieldStyle" v-model="propertiesName" disabled icon="star" label-width="200"
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
			<!-- <u-calendar v-model="calendarShow" mode="date" @change="calendarChange"></u-calendar> -->
			<u-picker v-model="calendarShow" :params="params" mode="time" @confirm="calendarChange"></u-picker>
			<u-select v-model="purchaseOrderShow" :list="purchaseList" @confirm="purchaseConfirm"></u-select>
			<u-popup v-model="editShow" mode="bottom" border-radius="14" length="70%" @close="popClose">
				<view class="u-demo-wrap">
					<view style="height: 50rpx;"></view>
					<view style="text-align: center;font-size: 38rpx;line-height: 50rpx;">数量 & 单价</view>
					<view style="margin-top: 20rpx;">
						<u-cell-group>
							<u-field v-model="editRow.productName"label="辅料名称" label-width="150" :clearable="false" disabled :required="false" type="text"></u-field>
							<u-field v-model="editRow.productNo"label="辅料编号" label-width="150" :clearable="false" disabled :required="false" type="text"></u-field>
							<u-field v-model="editRow.quantity"label="数量" label-width="150" :clearable="true" :required="false" type="text"></u-field>
							<u-field v-model="editRow.price"label="单价" label-width="150" :clearable="true" :required="false" type="text"></u-field>
							<!-- <u-table>
									<u-tr>
										<u-th>单匹重量</u-th>
										<u-th>匹数</u-th>
									</u-tr>
									<view v-for="(item,index) in tempExchangeRate" :key="index">
										<u-tr>
											<u-td>
												<view>
													<u-number-box :min="1" align="center" v-model="item.exchangeRate"></u-number-box>
												</view>
											</u-td>
											<u-td>
												<view>
													<u-number-box :min="1" align="center" v-model="item.quantityByAssistant"></u-number-box>
												</view>
											</u-td>
										</u-tr>
									</view>
								</u-table> -->
						</u-cell-group>
						<view class="close-btn">
							<u-button @tap="editExchangeRate" size="medium" type="primary">确定</u-button>
							<u-button @tap="closeBtn" size="medium">取消</u-button>
						</view>
					</view>
				</view>
			</u-popup>
			
			<u-popup v-model="seeShow" mode="center" border-radius="14" length="70%" :closeable="true" @close="seeShow = false">
				<view class="u-demo-wrap">
					<view style="margin-top: 20rpx;margin-bottom: 20rpx;">
						<u-cell-group>
							<u-table>
									<u-tr>
										<u-th>单匹重量</u-th>
										<u-th>匹数</u-th>
									</u-tr>
									<view v-for="(item,index) in seeRow.exchangeRate" :key="index">
										<u-tr>
											<u-td>
												{{seeRow.exchangeRate[index]}}
											</u-td>
											<u-td>
												{{seeRow.quantityByAssistant[index]}}
											</u-td>
										</u-tr>
									</view>
								</u-table>
						</u-cell-group>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		sumAmount
	} from '@/util/index.js'
	export default {
		data() {
			return {
				fieldStyle: {
					'color': '#ff557f',
				},
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true,
					timestamp: true
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
				propertiesName: '辅料',
				properties: 1,
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
				tempMaterialList: [],
				thumb: '/static/stockIn/open.png',
				editShow: false,
				editRow: '',
				tempExchangeRate: [],
				tempQuantityByAssistant: [],
				seeShow: false,
				seeRow: ''
			}
		},
		onShow() {
			let that = this
			uni.getStorage({
				key: 'addOther-material',
				success(res) {
					let a = {
						color: res.data.color,
						specification: res.data.specification,
						unit: res.data.unit,
						assistantUnit: res.data.assistantUnit,
						price: res.data.price,
						spuId: res.data.spuId,
						productId: res.data.spuId,
						productName: res.data.productName,
						productNo: res.data.productNo,
						exchangeRate: [1],
						quantityByAssistant: [1],
						allQuantityByAssistant: '',
						quantity: '',
						amount: '',
						coloringNo: '',
						clickChecked: true
					}
					let only = res.data.productNo + '-' + res.data.color + '-' + res.data.specification
					if(that.tempMaterialList.indexOf(only) > -1) {
						let index = that.tempMaterialList.indexOf(only)
						that.materialList.splice(index,1)
						that.tempMaterialList.splice(index,1)
					}
					that.tempMaterialList.push(only)
					that.materialList.push(a)
					uni.removeStorage({
						key: 'addOther-material'
					});
				}
			})
			uni.getStorage({
				key: 'add-accessory',
				success(res) {
					let a = {
						color: res.data.color,
						specification: res.data.specification,
						unit: res.data.unit,
						assistantUnit: res.data.assistantUnit,
						price: res.data.price,
						spuId: res.data.spuId,
						productId: res.data.spuId,
						productName: res.data.productName,
						productNo: res.data.productNo,
						exchangeRate: [1],
						quantityByAssistant: [1],
						allQuantityByAssistant: '',
						quantity: 1,
						amount: '',
						coloringNo: '',
						clickChecked: true
					}
					let only = res.data.productNo + '-' + res.data.color + '-' + res.data.specification
					if(that.tempMaterialList.indexOf(only) > -1) {
						let index = that.tempMaterialList.indexOf(only)
						that.materialList.splice(index,1)
						that.tempMaterialList.splice(index,1)
					}
					that.tempMaterialList.push(only)
					that.materialList.push(a)
					uni.removeStorage({
						key: 'add-accessory'
					});
				}
			})
			uni.getStorage({
				key: 'selectStockInSupplierByAccessoryAdd',
				async success(res) {
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
						key: 'selectStockInSupplierByAccessoryAdd'
					});
				}
			})
			uni.getStorage({
				key: 'selectStockInWarehouseByAccessoryAdd',
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
						key: 'selectStockInWarehouseByAccessoryAdd'
					});
				}
			})
		},
		methods: {
			sumAmount,
			seeClick(item) {
				this.seeRow = {
					exchangeRate: item.exchangeRate,
					quantityByAssistant: item.quantityByAssistant
				}
				this.seeShow = true
			},
			headClick(item) {
				item.clickChecked = !item.clickChecked
			},
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
				console.log(this.sourceType)
				if(!this.$u.test.isEmpty(this.supplierId) && this.sourceType === '0') {
					this.purchaseOrderShow = true
				}
			},
			selectSupplier() {
				uni.navigateTo({
					url: 'selectSupplierByAccessoryAdd?supplierNames=' + this.supplierName
				})
			},
			calendarChange(e) {
				let a = e.year+'-'+e.month+'-'+e.day+' '+e.hour+':'+e.minute+':'+e.second
				console.log(a)
				this.datetime = a
				// this.datetime = e.result
			},
			dateTimeClick() {
				this.calendarShow = true
			},
			warehouseClick() {
				uni.navigateTo({
					url: 'selectWarehouseByAccessoryAdd?supplierNames=' + this.warehouseName
				})
			},
			sourceTypeClick() {
				this.sourceTypeShow = true
			},
			sourceTypeConfirm(e) {
				this.sourceTypeName = e[0].label
				this.sourceType = e[0].value
				this.supplierId = ''
				this.supplierName = ''
				this.warehouseId = ''
				this.warehouseName = ''
				this.datetime = ''
				this.description = ''
				this.arrivalId = ''
				this.arrivalNo = ''
				this.orderId = ''
				this.orderNo = ''
				this.details = []
				this.purchaseList = []
				this.materialList = []
				this.tempMaterialList = []
				this.editRow = ''
				this.tempExchangeRate = []
				this.tempQuantityByAssistant = []
			},
			async submit() {
				if(this.$u.test.isEmpty(this.warehouseId)) {
					uni.showToast({
						title: '仓库不能为空',
						icon: 'none'
					})
					return
				}
				if(this.sourceType === '0') {
					let detailsArr = []
					for (var i = 0; i < this.materialList.length; i++) {
						for (var j = 0; j < this.materialList[i].exchangeRate.length; j++) {
							detailsArr.push({
								// allQuantityByAssistant: this.materialList[i].allQuantityByAssistant,
								amount: this.materialList[i].amount,
								assistantUnit: this.materialList[i].assistantUnit,
								color: this.materialList[i].color,
								coloringNo: this.materialList[i].coloringNo,
								exchangeRate: this.materialList[i].exchangeRate[j],
								price: this.materialList[i].price,
								productId: this.materialList[i].productId,
								productName: this.materialList[i].productName,
								productNo: this.materialList[i].productNo,
								properties: this.properties,
								purchaseArrivalId: this.arrivalId,
								purchaseOrderDetailId: this.materialList[i].arrivalDetailId,
								quantity: this.materialList[i].quantity,
								quantityByAssistant: this.materialList[i].quantityByAssistant[j],
								specification: this.materialList[i].specification,
								unit: this.materialList[i].unit,
								spuId: this.materialList[i].spuId || '',
							})
						}
					}
					let params = {
						arrivalDate: this.datetime,
						description: this.description,
						purchaseOrderId: this.arrivalId,
						supplierId: this.supplierId,
						warehouseId: this.warehouseId,
						details: detailsArr
					}
					let result = await this.$myRequest({
						url: '/purchase-arrival/',
						method: 'POST',
						ContentType: 'application/json;charset=UTF-8',
						data: params
					})
					if(result === 200) {
						uni.showToast({
							title: '开单成功',
							icon: 'success'
						})
						setTimeout(function() {
							uni.switchTab({
								url:'../../index/index'
							})
						}, 800);
					} else {
						uni.showToast({
							title: '开单失败',
							icon: 'none'
						})
						console.log(result)
					}
				} else {
					let detailsArr = []
					for (var i = 0; i < this.materialList.length; i++) {
						for (var j = 0; j < this.materialList[i].exchangeRate.length; j++) {
							detailsArr.push({
								arrivalDetailId: this.materialList[i].arrivalDetailId || '',
								// allQuantityByAssistant: this.materialList[i].allQuantityByAssistant,
								amount: this.materialList[i].amount,
								assistantUnit: this.materialList[i].assistantUnit,
								color: this.materialList[i].color,
								coloringNo: this.materialList[i].coloringNo,
								exchangeRate: this.materialList[i].exchangeRate[j],
								price: this.materialList[i].price,
								productName: this.materialList[i].productName,
								productNo: this.materialList[i].productNo,
								quantity: this.materialList[i].quantity,
								quantityByAssistant: this.materialList[i].quantityByAssistant[j],
								specification: this.materialList[i].specification,
								unit: this.materialList[i].unit,
								productId: this.materialList[i].productId,
								spuId: this.materialList[i].spuId || ''
							})
						}
					}
					let params = {
						arrivalId: this.arrivalId,
						arrivalNo: this.arrivalNo,
						// datetime: this.datetime,
						datetime: this.datetime,
						description: this.description,
						properties: this.properties,
						orderId: '',
						orderNo: '',
						sourceType: this.sourceType,
						supplierId: this.supplierId,
						warehouseId: this.warehouseId,
						details: detailsArr
					}
					let result = await this.$myRequest({
						url: '/stock-in/',
						method: 'POST',
						ContentType: 'application/json;charset=UTF-8',
						data: params
					})
					if(result === 200) {
						uni.showToast({
							title: '开单成功',
							icon: 'success'
						})
						setTimeout(function() {
							uni.switchTab({
								url:'../../index/index'
							})
						}, 800);
					} else {
						uni.showToast({
							title: '开单失败',
							icon: 'none'
						})
						console.log(result)
					}
				}
			},
			async purchaseConfirm(e) {
				let result = await this.$myRequest({
					url: '/purchase-order/no/' + e[0].value
				})
				this.arrivalNo = result.orderNo
				this.arrivalId = result.id
				this.materialList = []
				for (var i = 0; i < result.details.length; i++) {
					this.materialList.push({
						arrivalDetailId: result.details[i].id,
						color: result.details[i].color,
						specification: result.details[i].specification,
						unit: result.details[i].unit,
						assistantUnit: result.details[i].assistantUnit,
						price: result.details[i].price,
						productId: result.details[i].productId,
						spuId: result.details[i].productId,
						productName: result.details[i].productName,
						productNo: result.details[i].productNo,
						exchangeRate: [1],
						quantityByAssistant: [1],
						allQuantityByAssistant: '',
						quantity: 1,
						amount: '',
						coloringNo: '',
						clickChecked: true
					})
				}
			},
			toAddProduct() {
				if(!this.$u.test.isEmpty(this.sourceType)) {
					if(this.sourceType === '0') {
						if(this.$u.test.isEmpty(this.arrivalNo) && !this.$u.test.isEmpty(this.supplierId) ) {
							uni.navigateTo({
								url: 'accessory-add-add?supplierId='+this.supplierId
							})
						}
					} else {
						uni.navigateTo({
							url: 'accessory-add-addOther'
						})
					}
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
