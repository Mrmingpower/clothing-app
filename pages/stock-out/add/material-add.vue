<template>
	<view>
		<view class="wrap">
			<u-field v-model="sourceTypeName" icon="home" :clearable="false" required @click="sourceTypeClick"
				label-width="200" placeholder="请选择出库类型" label="出库类型">
				<u-button @click="sourceTypeClick" slot="right" size="mini" type="primary">选择</u-button>
			</u-field>
			<u-field v-model="warehouseName" @click="warehouseClick" required icon="shopping-cart" label-width="200"
				:disabled="true" right-icon="arrow-down-fill" placeholder="请选择仓库" label="仓库"></u-field>
			<u-field v-if="sourceType===0" v-model="commandIdLabel" @click="selectcommand" icon="coupon"
				right-icon="arrow-down-fill" :disabled="true" label-width="200" placeholder="请选择生产指令" label="生产指令">
			</u-field>
			<u-field v-if="sourceType===0" v-model="pickOrderIdLabel" icon="calendar" @click="pickOrderClick"
				right-icon="arrow-down-fill" :disabled="true" label-width="200" placeholder="请选择领料单" label="领料单">
			</u-field>
		</view>
		<view style="margin-top: 15rpx;">
			<view class="u-border-bottom" style="background-color: #FFFFFF;text-align: center;">
				<text style="font-size: 50rpx;">面料信息</text>
			</view>
			<view v-for="(item,index) in materialList" :key="index" :index="index">
				<u-card :border="false" margin="0rpx 0rpx" :thumb="thumb" @head-click="headClick(item)" thumb-width="40"
					:title-size="35" border-radius="0" :title="item.productName" :sub-title="item.productNo">
					<view slot="body" v-if="item.clickChecked">
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
										<view class="flex-item-20">副计量单位</view>
									</u-col>
									<u-col span="2" style="margin-left: 30rpx;">
										<view style="width: 100rpx;">{{item.assistantUnit}}</view>
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
										<view style="width: 100rpx;">{{item.materialSkuArr[0].price}}</view>
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
							<!-- <view class="line-cla2">
								<u-row gutter="12">
									<u-col span="11">
										<view class="flex-item-20">辅助单位数量</view>
									</u-col>
									<u-col span="1" style="margin-left: 30rpx;">
										<view style="width: 100rpx;">{{item.quantityByAssistant}}</view>
									</u-col>
								</u-row>
							</view> -->
							<view class="line-cla2">
								<u-row gutter="12">
									<u-col span="11">
										<view>辅助单位数量</view>
									</u-col>
									<u-col span="1">
										<view>{{formatStockAssistant(item)}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2">
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
			<u-field v-model="date" icon="calendar" @click="dateClick" label-width="200" :disabled="true"
				right-icon="arrow-down-fill" placeholder="请选择出库日期" label="出库日期"></u-field>

			<u-field v-model="receiverTypeName" @click="receiverTypeClick" icon="shopping-cart" label-width="220"
				:disabled="true" right-icon="arrow-down-fill" required placeholder="请选择收货单位类型" label="收货单位类型"></u-field>
			<u-field v-model="receiverIdName" @click="receiverIdClick" icon="shopping-cart" label-width="220"
				:disabled="true" right-icon="arrow-down-fill" required placeholder="请选择收货单位" label="收货单位"></u-field>
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
			<u-select v-model="receiverTypeShow" :list="receiverTypeList" @confirm="receiverTypeConfirm"></u-select>
			<u-select v-model="commandShow" :list="commandList" @confirm="commandConfirm"></u-select>
			<u-select v-model="sourceTypeShow" :list="sourceTypeList" @confirm="sourceTypeConfirm"></u-select>
			<u-calendar v-model="calendarShow" mode="date" @change="calendarChange"></u-calendar>
			<!-- <u-picker v-model="calendarShow" mode="date" @confirm="calendarChange"></u-picker> -->
			<u-select v-model="pickOrderShow" :list="pickOrderList" @confirm="pickOrderConfirm"></u-select>
			<u-popup v-model="editShow" mode="bottom" border-radius="14" length="70%" @close="popClose">
				<view class="u-demo-wrap">
					<view style="height: 50rpx;"></view>
					<view style="text-align: center;font-size: 38rpx;line-height: 50rpx;">单匹重量 & 匹数</view>
					<view style="margin-top: 20rpx;">
						<u-cell-group>
							<u-field v-model="editRow.productName" label="面料名称" label-width="150" :clearable="false"
								disabled :required="false" type="text"></u-field>
							<u-field v-model="editRow.productNo" label="面料编号" label-width="150" :clearable="false"
								disabled :required="false" type="text"></u-field>
							<u-field v-model="editRow.unit" label="单位" label-width="150" :clearable="false" disabled
								:required="false" type="text"></u-field>
							<u-field v-model="editRow.assistantUnit" label="副计量单位" label-width="150" :clearable="false"
								disabled :required="false" type="text"></u-field>

							<u-table>
								<u-tr>
									<u-th>单匹重量</u-th>
									<u-th>匹数</u-th>
									<u-th>库存数量</u-th>
									<u-th>库存匹数</u-th>
								</u-tr>
								<view v-for="(item,index) in editRow.materialSkuArr" :key="index">
									<u-tr>
										<u-td>
											<view>
												<text>{{item.exchangeRate}}</text>
											</view>
										</u-td>
										<u-td>
											<view @click="tempClick(item)">
												<text>{{item.quantityByAssistantEdit}}</text>
												<!-- <u-icon name="edit-pen" color="#2979ff" size="20"></u-icon> -->
												<!-- <u-number-box :input-width="28" :input-height="30" align="center"
													v-model="item.quantityByAssistant || 0"></u-number-box> -->
												<!-- <u-input v-model="item.quantityByAssistant" type="text" :border="border" /> -->
											</view>
										</u-td>
										<u-td>
											<view>
												<text>{{item.quantity}}</text>
											</view>
										</u-td>
										<u-td>
											<view>
												<text>{{item.quantityByAssistant}}</text>
											</view>
										</u-td>
									</u-tr>
								</view>
							</u-table>
						</u-cell-group>
						<!-- <view class="close-btn">
							<u-button @tap="addLine" size="medium" type="warning">添加</u-button>
							<u-button @tap="editExchangeRate" size="medium" type="primary">确定</u-button>
							<u-button @tap="closeBtn" size="medium">取消</u-button>
						</view> -->
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
							<!-- <u-number-box align="center"
									v-model="tempQuantityByAssistant"></u-number-box> -->
							<!-- <view style="margin-left: 50rpx;">
										<u-row gutter="7">
											<u-col span="4">
												<view class="flex-item-20">匹数:</view>
											</u-col>
											<u-col span="3">
											<view>
												<u-number-box v-model="tempQuantityByAssistant"></u-number-box>
											</view>
											</u-col>
										</u-row>
									</view> -->
						</u-cell-group>
						<view class="close-btn">
							<!-- <u-button @tap="testConnect" size="mini" type="warning">测试连接</u-button> -->
							<u-button @tap="submitPop" size="medium" type="primary">确定</u-button>
							<u-button @tap="tempQuantityByAssistantShow = false" size="medium">取消</u-button>
						</view>
					</view>
				</view>
			</u-popup>
			<u-popup v-model="seeShow" mode="center" border-radius="14" length="70%" :closeable="true"
				@close="seeShow = false">
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
				arrivalId: '',
				arrivalNo: '',
				orderId: '',
				propertiesName: '面料',
				properties: 0,
				status: '',
				details: [],
				receiverTypeList: [],
				receiverIdList: [],
				sourceTypeList: [{
					value: 0,
					label: '生产领用'
				}, {
					value: 1,
					label: '销售出库'
				}, {
					value: 2,
					label: '其他出库'
				}, {
					value: 3,
					label: '调拨出库'
				}, ],
				sourceTypeShow: false,
				sourceTypeName: '',
				calendarShow: false,
				pickOrderShow: false,
				pickOrderList: [],
				materialList: [],
				tempMaterialList: [],
				thumb: '/static/stockIn/open.png',
				editShow: false,
				editRow: '',
				tempExchangeRate: [],
				tempQuantityByAssistant: [],
				seeShow: false,
				seeRow: '',

				commandList: [],
				commandShow: false,
				commandId: '',
				commandIdLabel: '',
				pickOrderIdLabel: '',
				pickOrderId: '',
				receiverType: '',
				receiverTypeName: '',
				receiverId: '',
				receiverIdName: '',
				receiverTypeShow: false,
				receiverIdShow: false,
			}
		},
		onShow() {
			let that = this
			uni.getStorage({
				key: 'out-add-material',
				async success(res) {
					console.log('resoutaddmaterial')
					console.log(res)
					let only = res.data.productNo + '-' + res.data.color + '-' + res.data.specification
					if (that.tempMaterialList.indexOf(only) > -1) {
						let index = that.tempMaterialList.indexOf(only)
						that.materialList.splice(index, 1)
						that.tempMaterialList.splice(index, 1)
					}
					that.tempMaterialList.push(only)
					let result1 = await that.$myRequest({
						url: '/material-sku/' + res.data.id + '/' + that.warehouseId
					})
					console.log('result11')
					console.log(result1)
					let materialSkuArr = []
					for (var j = 0; j < result1.length; j++) {
						materialSkuArr.push({
							price: result1[j].price || 0,
							productSkuId: result1[j].skuId || '',
							coloringNo: result1[j].coloringNo || '',
							exchangeRate: result1[j].skuQuantity || 0,
							quantity: result1[j].quantity || 0,
							quantityByAssistant: result1[j].quantityByAssistant || 0,
							quantityByAssistantEdit: result1[j].quantityByAssistantEdit || 0,
						})
					}
					that.materialList.push({
						productName: res.data.name || '',
						productNo: res.data.no || '',
						productSpuId: res.data.id || '',
						quantity: 0,
						quantityByAssistant: 0,
						unit: res.data.unit || '',
						assistantUnit: res.data.assistantUnit || '',
						amount: 0,
						materialSkuArr: materialSkuArr,
						clickChecked: true
					})
					// let a = {
					// 	color: res.data.color,
					// 	specification: res.data.specification,
					// 	unit: res.data.unit,
					// 	assistantUnit: res.data.assistantUnit,
					// 	price: res.data.price,
					// 	spuId: res.data.spuId,
					// 	productId: res.data.spuId,
					// 	productName: res.data.name,
					// 	productNo: res.data.no,
					// 	quantityByAssistant: '',
					// 	coloringNo: res.data.coloringNo,
					// 	quantity: '',
					// 	amount: '',
					// }
					// let only = res.data.productNo + '-' + res.data.color + '-' + res.data.specification
					// if (that.tempMaterialList.indexOf(only) > -1) {
					// 	let index = that.tempMaterialList.indexOf(only)
					// 	that.materialList.splice(index, 1)
					// 	that.tempMaterialList.splice(index, 1)
					// }
					// that.tempMaterialList.push(only)
					// that.materialList.push(a)
					uni.removeStorage({
						key: 'out-add-material'
					});
				}
			})

			uni.getStorage({
				key: 'selectStockOutWarehouseByAdd',
				success(res) {
					if (that.warehouseId !== res.data.id) {
						that.materialList = []
					}
					that.warehouseName = res.data.name
					that.warehouseId = res.data.id
					uni.removeStorage({
						key: 'selectStockOutWarehouseByAdd'
					});
				}
			})
		},
		methods: {
			sumQuantity,
			formatStockAssistant,
			tempClick(e) {
				console.log(e)
				this.tempRow = e
				this.tempQuantityByAssistant = e.quantityByAssistantEdit
				this.tempQuantityByAssistantShow = true
			},
			submitPop() {
				if (!this.$u.test.digits(this.tempQuantityByAssistant)) {
					uni.showToast({
						title: '只能输入整数',
						icon: 'none'
					})
					return
				}
				this.tempRow.quantityByAssistantEdit = parseInt(this.tempQuantityByAssistant)
				this.tempQuantityByAssistantShow = false
			},
			async receiverTypeConfirm(e) {
				this.receiverTypeName = e[0].label
				this.receiverType = e[0].value
				this.receiverIdList = []
				this.receiverId = ''
				this.receiverIdName = ''
				if (e[0].value === 0) {
					let result = await this.$myRequest({
						url: '/workshop/search',
						data: {
							pageNo: 1,
							pageSize: -1
						}
					})
					for (var i = 0; i < result.items.length; i++) {
						this.receiverIdList.push({
							value: result.items[i].id,
							label: result.items[i].name
						})
					}
				} else if (e[0].value === 1) {
					let result = await this.$myRequest({
						url: '/cooperation-factory/search',
						data: {
							pageNo: 1,
							pageSize: -1
						}
					})
					for (var i = 0; i < result.items.length; i++) {
						this.receiverIdList.push({
							value: result.items[i].id,
							label: result.items[i].name
						})
					}
				} else {
					let result = await this.$myRequest({
						url: '/warehouse/search',
						data: {
							pageNo: 1,
							pageSize: -1,
							prop: 0
						}
					})
					for (var i = 0; i < result.items.length; i++) {
						this.receiverIdList.push({
							value: result.items[i].id,
							label: result.items[i].name
						})
					}
				}
			},
			receiverIdConfirm(e) {
				this.receiverId = e[0].value
				this.receiverIdName = e[0].label
			},

			selectcommand() {
				// let result = await this.$myRequest({
				// 	url: '/command/active'
				// })
				// console.log('result')
				// console.log(result)
				// for (var i = 0; i < result.length; i++) {
				// 	this.commandList.push({
				// 		value: result[i].id,
				// 		label: result[i].no
				// 	})
				// }
				this.commandShow = true
			},
			async commandConfirm(e) {
				this.commandIdLabel = e[0].label
				this.commandId = e[0].value
				let result = await this.$myRequest({
					url: '/pick-order/get-no',
					data: {
						commandId: e[0].value,
						properties: this.properties
					}
				})
				console.log(e[0].value)
				console.log(result)
				if (result.length > 0) {
					for (var i = 0; i < result.length; i++) {
						this.pickOrderList.push({
							value: result[i].id,
							label: result[i].no
						})
					}
				}
			},
			pickOrderClick() {
				if (this.sourceType === 0) {
					if (this.pickOrderList.length === 0) {
						uni.showToast({
							title: '当前指令下不存在领料单',
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
				this.materialList = []
				let result = await this.$myRequest({
					url: '/pick-order/' + e[0].value
				})

				this.pickOrderId = result.id
				this.pickOrderIdLabel = result.no
				console.log('result')
				console.log(result)
				for (var i = 0; i < result.details.length; i++) {
					let result3 = await this.$myRequest({
						url: '/material-sku/' + result.details[i].materialSpuId + '/' + this.warehouseId
					})
					console.log('result.details[i]')
					console.log(result.details[i])
					console.log('result3')
					console.log(result3)
					let materialSkuArr = []
					for (var j = 0; j < result3.length; j++) {
						materialSkuArr.push({
							price: result3[j].price || 0,
							productSkuId: result3[j].skuId || '',
							coloringNo: result3[j].coloringNo || '',
							exchangeRate: result3[j].skuQuantity || 0,
							quantity: result3[j].quantity || 0,
							quantityByAssistant: result3[j].quantityByAssistant || 0,
							quantityByAssistantEdit: result3[j].quantityByAssistantEdit || 0,
						})
					}
					this.materialList.push({
						productName: result.details[i].materialName || '',
						productNo: result.details[i].materialNo || '',
						productSpuId: result.details[i].materialSpuId || '',
						quantity: 0,
						quantityByAssistant: 0,
						unit: result.details[i].unit || '',
						assistantUnit: result.details[i].assistantUnit || '',
						amount: 0,
						pickOrderDetailId: result.details[i].id || '',
						materialSkuArr: materialSkuArr,
						clickChecked: true
					})
				}
				console.log('this.materialList')
				console.log(this.materialList)
			},
			calendarChange(e) {
				this.date = e.result
			},
			async receiverIdClick() {
				if (this.$u.test.isEmpty(this.receiverType)) {
					uni.showToast({
						title: '收货单位类型不能为空',
						icon: 'none'
					})
					return
				}
				console.log(this.receiverType)

				this.receiverIdShow = true
			},
			receiverTypeClick() {
				console.log(this.sourceType)
				if (this.$u.test.isEmpty(this.sourceType)) {
					uni.showToast({
						title: '出库类型不能为空',
						icon: 'none'
					})
					return
				}
				this.receiverTypeShow = true
			},
			seeClick(item) {
				this.seeRow = {
					exchangeRate: item.exchangeRate,
					quantityByAssistant: item.quantityByAssistant
				}
				this.seeShow = true
			},
			// headClick(item) {
			// 	item.clickChecked = !item.clickChecked
			// },
			closeBtn() {
				this.editShow = false
			},
			popClose() {
				this.tempExchangeRate = []
			},
			toEdit(item) {
				this.editShow = true
				this.editRow = item
				// let tempMaterialSkuArr = []
				// for (var i = 0; i < this.editRow.materialSkuArr.length; i++) {
				// 	tempMaterialSkuArr.push({
				// 		coloringNo: this.editRow.materialSkuArr[i].coloringNo,
				// 		exchangeRate: this.editRow.materialSkuArr[i].exchangeRate,
				// 		price: this.editRow.materialSkuArr[i].price,
				// 		productSkuId: this.editRow.materialSkuArr[i].productSkuId,
				// 		quantity: this.editRow.materialSkuArr[i].quantity,
				// 		quantityByAssistant: 0,
				// 		quantityByAssistantStock: this.editRow.materialSkuArr[i].quantityByAssistant
				// 	})
				// }
				// this.editRow.tempMaterialSkuArr = tempMaterialSkuArr
				console.log(this.editRow)
				// for (var i = 0; i < item.exchangeRate.length; i++) {
				// 	this.tempExchangeRate.push({
				// 		exchangeRate: item.exchangeRate[i],
				// 		quantityByAssistant: item.quantityByAssistant[i]
				// 	})
				// }
			},
			toDel(index) {
				console.log('执行了')
				this.materialList.splice(index, 1)
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
					if (arr.indexOf(this.tempExchangeRate[i].exchangeRate) > -1) {
						let index = arr.indexOf(this.tempExchangeRate[i].exchangeRate)
						finalData[index].quantityByAssistant = finalData[index].quantityByAssistant + this
							.tempExchangeRate[i].quantityByAssistant
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


			dateClick() {
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
			async sourceTypeConfirm(e) {
				this.receiverTypeList = []
				this.receiverType = ''
				this.receiverTypeName = ''
				this.receiverIdList = []
				this.receiverId = ''
				this.receiverIdName = ''
				this.pickOrderId = ''
				this.pickOrderIdLabel = ''
				this.pickOrderList = []
				this.commandId = ''
				this.commandIdLabel = ''
				this.commandList = []
				if (e[0].value === 0) {
					this.receiverTypeList.push({
						value: 0,
						label: '车间'
					}, {
						value: 1,
						label: '外协厂'
					})


					let result = await this.$myRequest({
						url: '/command/active'
					})
					for (var i = 0; i < result.length; i++) {
						this.commandList.push({
							value: result[i].id,
							label: result[i].no
						})
					}


				} else if (e[0].value === 1 || e[0].value === 2) {
					this.receiverTypeList.push({
						value: 1,
						label: '外协厂'
					})
				} else {
					this.receiverTypeList.push({
						value: 2,
						label: '仓库'
					})
				}
				this.sourceTypeName = e[0].label
				this.sourceType = e[0].value
				this.warehouseId = ''
				this.warehouseName = ''
				this.date = ''
				this.description = ''
				this.arrivalId = ''
				this.orderId = ''
				this.details = []
				this.purchaseList = []
				this.materialList = []
				this.tempMaterialList = []
				this.editRow = ''
				this.tempExchangeRate = []
				this.tempQuantityByAssistant = []
			},
			async submit() {
				if (this.$u.test.isEmpty(this.warehouseId)) {
					uni.showToast({
						title: '仓库不能为空',
						icon: 'none'
					})
					return
				}
				if (this.$u.test.isEmpty(this.sourceType)) {
					uni.showToast({
						title: '出库类型不能为空',
						icon: 'none'
					})
					return
				}
				if (this.$u.test.isEmpty(this.receiverType)) {
					uni.showToast({
						title: '收货单位类型不能为空',
						icon: 'none'
					})
					return
				}
				if (this.$u.test.isEmpty(this.receiverId)) {
					uni.showToast({
						title: '收货单位不能为空',
						icon: 'none'
					})
					return
				}
				let paramsDetail = []
				for (var i = 0; i < this.materialList.length; i++) {
					for (var j = 0; j < this.materialList[i].materialSkuArr.length; j++) {
						if (this.materialList[i].materialSkuArr[j].quantityByAssistantEdit > 0) {
							paramsDetail.push({
								amount: this.materialList[i].amount,
								assistantUnit: this.materialList[i].assistantUnit,
								coloringNo: this.materialList[i].materialSkuArr[j].coloringNo,
								exchangeRate: this.materialList[i].materialSkuArr[j].exchangeRate,
								pickOrderDetailId: this.materialList[i].pickOrderDetailId || '',
								price: this.materialList[i].materialSkuArr[j].price,
								productName: this.materialList[i].productName,
								productNo: this.materialList[i].productNo,
								productSkuId: this.materialList[i].materialSkuArr[j].productSkuId,
								productSpuId: this.materialList[i].productSpuId,
								quantity: this.materialList[i].materialSkuArr[j].quantityByAssistantEdit * this.materialList[i].materialSkuArr[j].exchangeRate,
								quantityByAssistant: this.materialList[i].materialSkuArr[j].quantityByAssistantEdit,
								unit: this.materialList[i].unit
							})
						}

					}
				}
				let params = {
					commandId: this.commandId || '',
					date: this.date,
					description: this.description,
					pickOrderId: this.pickOrderId || '',
					properties: this.properties,
					receiverId: this.receiverId,
					receiverType: this.receiverType,
					sourceType: this.sourceType,
					warehouseId: this.warehouseId,
					details: paramsDetail
				}
				console.log('params')
				console.log(params)
				let result = await this.$myRequest({
					url: '/stock-out/',
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
				if (!this.$u.test.isEmpty(this.sourceType) && !this.$u.test.isEmpty(this.warehouseId) && this.$u.test.isEmpty(this.pickOrderId)) {
					uni.navigateTo({
						url: 'material-add-add'
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
