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
					border-radius="0" :title="item.productName">
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
										<view class="flex-item-20">订单价格</view>
									</u-col>
									<u-col span="2">
										<view style="width: 180rpx;color: #ff0000;">{{item.price}}</view>
									</u-col>
								</u-row>
							</view>
						</view>
						<view style="position: absolute;right: 80rpx;top: 120rpx;" v-if="canEdit">
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="4">
										<view>数量</view>
									</u-col>
									<u-col span="3">
										<!-- <view>{{item.quantity}}</view> -->
										<view>
											<u-number-box bg-color="#efe5fe" v-model="item.quantity"></u-number-box>
										</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="4">
										<view class="flex-item-20">单价</view>
									</u-col>
									<u-col span="3">
										<!-- <view>{{item.price}}</view> -->
										<view>
											<u-number-box bg-color="#efe5fe" v-model="item.price"></u-number-box>
										</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2">
								<view>副计量单位数量</view>
								<view style="margin-top: 14rpx;position: relative;right: -90rpx;">
									<u-number-box bg-color="#efe5fe" v-model="item.quantityByAssistant"></u-number-box>
								</view>
							</view>
						</view>
						<view style="position: absolute;right: 140rpx;top: 120rpx;" v-if="!canEdit">
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="4">
										<view>数量</view>
									</u-col>
									<u-col span="3">
										<view style="margin-left: 30rpx;">{{item.quantity}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2">
								<u-row gutter="7">
									<u-col span="4">
										<view class="flex-item-20">单价</view>
									</u-col>
									<u-col span="3" style="margin-left: 30rpx;">
										<view style="width: 100rpx;">{{item.price}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla2">
								<u-row gutter="12">
									<u-col span="12">
										<view>副计量单位数量</view>
									</u-col>
								</u-row>
								<u-row gutter="12">
									<u-col span="12">
										<view style="margin-top: 14rpx;">{{item.quantityByAssistant}}</view>
									</u-col>
								</u-row>
							</view>
						</view>
					</view>
				
				</u-card>
			</view>
			<view style="background-color: #FFFFFF;"class="u-border-top">
				<view style="padding-top: 20rpx;padding-bottom: 20rpx;">
					<u-icon name="saomiao" class="saomiao_cla" custom-prefix="custom-icon" size="60" @click="toScan" color="#00aaff"></u-icon>
					<u-icon name="icon-test" class="add_cla" custom-prefix="custom-icon" size="60" @click="toAddProduct" color="#00aaff"></u-icon>
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
		<u-calendar v-model="show" :mode="mode" @change="change"></u-calendar>
		<u-popup v-model="saleAccountShow" mode="bottom" border-radius="14" length="80%">
			<view>
				<view class="u-demo-wrap">
					<view class="u-demo-title">银联账户</view>
					<view class="u-demo-area">
						<u-cell-group v-for="(item,index) in cardList">
							<u-field v-model="item.amount" :label="item.name" label-width="350" placeholder="请填写金额"
								:required="false" type="text"></u-field>
							<!-- <u-field v-model="styleIds" label="时令款式" label-width="150" placeholder="请填写时令款式" :required="false" type="text"></u-field> -->
						</u-cell-group>
						<view class="close-btn">
							<u-button @tap="accountSubmit" size="medium" type="primary">确定</u-button>
							<u-button @tap="accountClear" size="medium">清空</u-button>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<view>
			<u-toast ref="uToast" />
			<u-select v-model="sourceTypeShow" :list="sourceTypeList" @confirm="sourceTypeConfirm"></u-select>
			<u-calendar v-model="calendarShow" mode="date" @change="calendarChange"></u-calendar>
			<u-select v-model="purchaseOrderShow" :list="purchaseList" @confirm="purchaseConfirm"></u-select>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardList: '',
				branchNo: '',
				saleAccountShow: false,
				customStyle: {
					backgroundColor: '#ffffff',
				},
				style0: '',
				style1: '',
				style2: '',
				style3: '',
				style4: '',
				style5: '',
				removeChecked: false,
				amount: 0,
				// settlementTypeShow: false,
				show: false,
				mode: 'date',
				title: '商品信息',
				errorType: ['message'],
				amount: '',
				assistantShopping: '',
				// bargain: '',
				// cash: '',
				// credit: '',
				date: '',
				// deliveryAddress: '',
				employee: '',
				employeeId: '',
				exchangeByPoint: '',
				outLine: '',
				// mobilePay: '',
				customerId: '',
				customerAbbreviation: '',
				balance: '',
				points: '',
				// round: '',
				salesType: '',
				settlementType: '',
				// transfer: '',
				wholeDiscount: '',
				productDTOList: {
					amount: '',
					amountAndTax: '',
					barcode: '',
					brand: '',
					brandId: '',
					carrier: '',
					color: '',
					discount: '',
					evidence: '',
					marinCategoryCode: '',
					outline: '',
					productCode: '',
					productName: '',
					productNo: '',
					productSpecification: '',
					promotion: '',
					purchasePrice: '',
					quantity: '',
					rank: '',
					replenishment: '',
					salesClassification: '',
					salesUnit: '',
					selfDefinedFirst: '',
					selfDefinedSecond: '',
					selfDefinedThird: '',
					settlement: '',
					shipper: '',
					specificItem: '',
					subCategoryCode: '',
					tax: '',
					taxRate: '',
					uniformPrice: '',
					unit: '',
				},
				mapList: [],


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
				canEdit: false
			}
		},
		async onLoad() {
			await this.getUserInfo();
		},
		onShow() {
			this.removeChecked = false
			this.mapList = []
			let that = this
			// let totalNum = 0
			let allTotalPrice = 0
			this.$map.forEach(function(value, key) {
				let totalNum = 0
				let totalPrice = 0
				for (var i = 0; i < value.length; i++) {
					totalNum = totalNum + parseInt(value[i].num)
					totalPrice = totalPrice + (parseInt(value[i].num) || 0) * (parseFloat(value[i].settlePrice) ||
						0)
					value[i].editChecked = false
					// value[i].removeChecked = false
				}
				allTotalPrice = allTotalPrice + totalPrice
				that.mapList.push({
					productName: key,
					allChecked: false,
					totalNum: totalNum,
					totalPrice: totalPrice,
					data: value
				})
			})
			if (this.mapList.length !== 0) {
				this.mapList[this.mapList.length - 1].allChecked = true
			}
			// this.totalNum = totalNum
			// this.totalPrice = totalPrice
			this.amount = allTotalPrice

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




			uni.getStorage({
				key: 'customer',
				success(res) {
					that.customerId = res.data.id
					that.customerAbbreviation = res.data.abbreviation
					that.points = res.data.points
					that.balance = res.data.balance
					that.salesType = res.data.priceExe
				}
			})
			uni.getStorage({
				key: 'emp',
				success(res) {
					that.employeeId = res.data.id
					that.employee = res.data.lastName
				}
			})
			uni.getStorage({
				key: 'assistant',
				success(res) {
					that.assistantShopping = res.data.lastName
				}
			})
		},
		onUnload() {
			this.$map.clear()
			uni.removeStorage({
				key: 'customer',
				success: function(res) {
					console.log('success');
				}
			});
			uni.removeStorage({
				key: 'emp',
				success: function(res) {
					console.log('success');
				}
			});
			uni.removeStorage({
				key: 'assistant',
				success: function(res) {
					console.log('success');
				}
			});
		},
		methods: {
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
				this.materialList = result.details
			},


			async toScan() {
				uni.scanCode({
					scanType: ['barCode'],
					success: async (res) => {
						let result = await this.$myRequest({
							url: '/product/getByBarcode',
							data: {
								barcode: res.result
							}
						})
						if (result.data.code !== 200) {
							this.$refs.uToast.show({
								title: '查询失败',
								type: 'error',
								icon: false
							})
							return
						}
						let product = result.data.result[0]
						let resultt = await this.$myRequest({
							url: '/product/detail_for_sales',
							data: {
								branchId: this.branchNo,
								brandId: product.brandId,
								customerId: this.customerId,
								productNo: product.productNo
							}
						})
						if (resultt.data.code !== 200) {
							this.$refs.uToast.show({
								title: resultt.data.message || '获取商品详情失败',
								type: 'error',
								icon: false
							})
							return
						}
						let allResult = resultt.data.result
						console.log(allResult)
						console.log(product)
						let specList = []
						let tempSpecList = []
						let productReal = []
						let productReal2 = {}
						for (var i = 0; i < allResult.length; i++) {
							if (tempSpecList.indexOf(allResult[i].specId) === -1) {
								if (product.colorId === allResult[i].colorId) {
									specList.push({
										specId: allResult[i].specId,
										specName: allResult[i].specName,
										brand: allResult[i].brand,
										brandId: allResult[i].brandId,
										colorId: product.colorId,
										colorName: product.color,
										discount: allResult[i].discount,
										isAddPoints: allResult[i].isPoints, // 是否积分
										mainCategoryCode: product.cateId,
										price: allResult[i].price, // 定价
										productCode: allResult[i].productCode,
										productName: allResult[i].productName,
										productNo: allResult[i].productNo,
										promotion: allResult[i].isPromotion, // 是否特价
										purchasePrice: allResult[i].unitPrice,
										settlePrice: allResult[i].settlePrice, // 结算价
										subCategoryCode: product.subCateId,
										uniformPrice: allResult[i].price, //定价
										unit: product.unit,
									})
								} else {
									specList.push({
										specId: allResult[i].specId,
										specName: allResult[i].specName,
										brand: '',
										brandId: '',
										colorId: product.colorId,
										colorName: product.color,
										discount: '',
										isAddPoints: allResult[i].isPoints, // 是否积分
										mainCategoryCode: product.cateId,
										price: '', // 定价
										productCode: '',
										productName: '',
										productNo: '',
										promotion: '', // 是否特价
										purchasePrice: '',
										settlePrice: '', // 结算价
										subCategoryCode: product.subCateId,
										uniformPrice: '', //定价
										unit: product.unit,
									})
								}

							}
							tempSpecList.push(allResult[i].specId)
						}
						console.log(specList)
						for (var i = 0; i < allResult.length; i++) {
							if (allResult[i].colorId === product.colorId && allResult[i].specId === product
								.specId) {
								productReal.push({
									brand: allResult[i].brand,
									brandId: allResult[i].brandId,
									colorId: allResult[i].colorId,
									colorName: allResult[i].color,
									discount: allResult[i].discount,
									editChecked: false,
									isAddPoints: allResult[i].isPoints, // 是否积分
									mainCategoryCode: product.cateId,
									num: 1,
									price: allResult[i].price, // 定价
									productCode: allResult[i].productCode,
									productName: allResult[i].productName,
									productNo: allResult[i].productNo,
									promotion: allResult[i].isPromotion, // 是否特价
									purchasePrice: allResult[i].unitPrice,
									quantity: '',
									settlePrice: allResult[i].settlePrice, // 结算价
									specId: allResult[i].specId,
									specName: allResult[i].specName,
									subCategoryCode: product.subCateId,
									uniformPrice: allResult[i].price, //定价
									unit: product.unit,
								})
								productReal2 = {
									brand: allResult[i].brand,
									brandId: allResult[i].brandId,
									colorId: allResult[i].colorId,
									colorName: allResult[i].color,
									discount: allResult[i].discount,
									editChecked: false,
									isAddPoints: allResult[i].isPoints, // 是否积分
									mainCategoryCode: product.cateId,
									num: 1,
									price: allResult[i].price, // 定价
									productCode: allResult[i].productCode,
									productName: allResult[i].productName,
									productNo: allResult[i].productNo,
									promotion: allResult[i].isPromotion, // 是否特价
									purchasePrice: allResult[i].unitPrice,
									quantity: '',
									settlePrice: allResult[i].settlePrice, // 结算价
									specId: allResult[i].specId,
									specName: allResult[i].specName,
									subCategoryCode: product.subCateId,
									uniformPrice: allResult[i].price, //定价
									unit: product.unit,
								}
							} else {}
						}
						for (var i = 0; i < specList.length; i++) {
							if (specList[i].specId === product.specId) {
								specList.splice(i, 1)
							}
						}
						for (var i = 0; i < specList.length; i++) {
							productReal.push({
								brand: specList[i].brand,
								brandId: specList[i].brandId,
								colorId: product.colorId,
								colorName: product.color,
								discount: specList[i].discount,
								editChecked: false,
								isAddPoints: specList[i].isPoints, // 是否积分
								mainCategoryCode: specList.cateId,
								num: 0,
								price: specList[i].price, // 定价
								productCode: specList[i].productCode,
								productName: specList[i].productName,
								productNo: specList[i].productNo,
								promotion: specList[i].isPromotion, // 是否特价
								purchasePrice: specList[i].unitPrice,
								quantity: '',
								settlePrice: specList[i].settlePrice, // 结算价
								specId: specList[i].specId,
								specName: specList[i].specName,
								subCategoryCode: specList.subCateId,
								uniformPrice: specList[i].price, //定价
								unit: specList.unit,
							})
						}
						console.log('productReal')
						console.log(productReal)
						let product_object = {
							brand: product.brand,
							brandId: product.brandId,
							colorId: product.colorId,
							colorName: product.colorName,
							discount: product.discount,
							editChecked: false,
							isAddPoints: '', // 是否积分
							mainCategoryCode: product.cateId,
							num: 1,
							price: '', // 定价
							productCode: product.productCode,
							productName: product.productName,
							productNo: product.productNo,
							promotion: "休闲裤", // 是否特价
							purchasePrice: product.latestPurchasePrice,
							quantity: '',
							settlePrice: product.settlePrice, // 结算价
							specId: product.specId,
							specName: product.spec,
							subCategoryCode: product.subCateId,
							uniformPrice: 358, //定价
							unit: product.unit,
						}
						let productName = product.productName + '(' + product.productNo + '-' + product
							.brand + ')'
						let temp_productName = []
						for (var i = 0; i < this.mapList.length; i++) {
							temp_productName.push(this.mapList[i].productName)
						}
						console.log('productReal')
						console.log(this.mapList)
						if (this.mapList.length !== 0) {
							// for (var i = 0; i < this.mapList.length; i++) {
							if (temp_productName.indexOf(productName) !== -1) {
								console.log('不等于-1')
								let index = temp_productName.indexOf(productName)
								this.mapList[index].allChecked = true
								console.log(this.mapList[index].data)
								let checkA = true
								for (var j = 0; j < this.mapList[index].data.length; j++) {
									if (this.mapList[index].data[j].colorId === product.colorId && this
										.mapList[index].data[j].specId === product.specId) {
										checkA = false
										console.log('11111')
										this.mapList[index].data[j].num = parseInt(this.mapList[index]
											.data[j].num) + 1
										this.mapList[index].totalPrice = parseFloat(this.mapList[index]
											.totalPrice) + parseFloat(this.mapList[index].data[j]
											.settlePrice)
										this.amount = parseFloat(this.amount) + parseFloat(this.mapList[
											index].data[j].settlePrice)
									}
								}
								if (checkA) {
									console.log('222222')
									this.mapList[index].data = [...this.mapList[index].data, ...
										productReal]
									this.mapList[index].totalPrice = parseFloat(this.mapList[index]
										.totalPrice) + parseFloat(productReal2.settlePrice)
									this.amount = parseFloat(this.amount) + parseFloat(productReal2
										.settlePrice)
									this.$map.set(productName, this.mapList[index].data)
								}
							} else {
								console.log('不同')
								let totalPrice = 0
								for (var i = 0; i < productReal.length; i++) {
									totalPrice = totalPrice + (parseInt(productReal[i].num) || 0) * (
										parseFloat(productReal[i].settlePrice) || 0)
								}
								this.amount = parseFloat(this.amount) + parseFloat(totalPrice)
								this.mapList.push({
									productName: productName,
									allChecked: true,
									data: productReal,
									totalPrice: totalPrice
								})
								this.$map.set(productName, productReal)
							}
							// }
						} else {
							console.log('3333')
							let totalPrice = 0
							for (var i = 0; i < productReal.length; i++) {
								totalPrice = totalPrice + (parseInt(productReal[i].num) || 0) * (
									parseFloat(productReal[i].settlePrice) || 0)
							}
							this.amount = parseFloat(this.amount) + parseFloat(totalPrice)
							this.mapList.push({
								productName: productName,
								allChecked: true,
								data: productReal,
								totalPrice: totalPrice
							})
							this.$map.set(productName, productReal)
						}
						console.log(this.mapList)
						console.log(this.$map)
					}
				});

			},


			numIconClick(index, indexx) {
				let num = this.mapList[index].data[indexx].num
				for (var i = 0; i < this.mapList[index].data.length; i++) {
					if (this.mapList[index].data[i].num !== 0) {
						this.mapList[index].data[i].num = num
					}
				}
				this.inputchange(index)
			},
			priceIconClick(index, indexx) {
				let price = this.mapList[index].data[indexx].settlePrice
				for (var i = 0; i < this.mapList[index].data.length; i++) {
					this.mapList[index].data[i].settlePrice = price
					this.inputchangee(index, i)
				}
			},
			changeAllChecked(index) {
				this.mapList[index].allChecked = !this.mapList[index].allChecked
			},
			accountClear() {
				for (var i = 0; i < this.cardList.length; i++) {
					this.cardList[i].amount = ''
				}
			},
			accountSubmit() {
				this.saleAccountShow = false
			},
			async submit() {
				let productDTOList = []
				for (var i = 0; i < this.mapList.length; i++) {
					for (var j = 0; j < this.mapList[i].data.length; j++) {
						productDTOList.push({
							discount: this.mapList[i].data[j].discount,
							isAddPoints: this.mapList[i].data[j].isAddPoints,
							promotion: this.mapList[i].data[j].promotion,
							purchasePrice: this.mapList[i].data[j].purchasePrice,
							returnQuantity: "0",
							uniformPrice: this.mapList[i].data[j].price,
							unit: this.mapList[i].data[j].unit,
							quantity: this.mapList[i].data[j].num || 0,
							settlement: this.mapList[i].data[j].settlePrice || 0,
							productCode: this.mapList[i].data[j].productCode,
							amount: (this.mapList[i].data[j].num || 0) * (this.mapList[i].data[j]
								.settlePrice || 0)
						})
						console.log(productDTOList)
					}
				}
				return
				let salesAccountDTOList = []
				if (!this.$u.test.isEmpty(this.style0)) {
					salesAccountDTOList.push({
						style: 0,
						amount: this.style0
					})
				}
				for (var i = 0; i < this.cardList.length; i++) {
					if (!this.$u.test.isEmpty(this.cardList[i].amount)) {
						salesAccountDTOList.push({
							style: 1,
							subjectCode: this.cardList[i].code,
							subjectName: this.cardList[i].name,
							amount: this.cardList[i].amount
						})
					}
				}
				if (!this.$u.test.isEmpty(this.style2)) {
					salesAccountDTOList.push({
						style: 2,
						amount: this.style2
					})
				}
				if (!this.$u.test.isEmpty(this.style3)) {
					salesAccountDTOList.push({
						style: 3,
						amount: this.style3
					})
				}
				if (!this.$u.test.isEmpty(this.style4)) {
					salesAccountDTOList.push({
						style: 4,
						amount: this.style4
					})
				}
				if (!this.$u.test.isEmpty(this.style5)) {
					salesAccountDTOList.push({
						style: 5,
						amount: this.style5
					})
				}
				console.log('json是')
				console.log(JSON.stringify({
					amount: this.amount,
					assistantShopping: this.assistantShopping,
					// branch: this.branchNo,
					branch: '102',
					customerAbbreviation: this.customerAbbreviation,
					customerId: this.customerId,
					date: this.date,
					employee: this.employee,
					employeeId: this.employeeId,
					exchangeByPoint: this.exchangeByPoint,
					outLine: this.outLine,
					productDTOList: productDTOList,
					salesAccountDTOList: salesAccountDTOList
				}))
				let result = await this.$myRequest({
					url: '/sales/',
					method: 'post',
					ContentType: 'application/json;charset=UTF-8',
					data: {
						amount: this.amount,
						assistantShopping: this.assistantShopping,
						branch: this.branchNo,
						customerAbbreviation: this.customerAbbreviation,
						customerId: this.customerId,
						date: this.date,
						employee: this.employee,
						employeeId: this.employeeId,
						exchangeByPoint: this.exchangeByPoint,
						outLine: this.outLine,
						productDTOList: productDTOList,
						salesAccountDTOList: salesAccountDTOList
					}
				});
				if (result.data.code === 200) {
					this.$refs.uToast.show({
						title: '开单成功',
						type: 'success',
						icon: false
					})
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/service/service'
						})
					}, 800);
					this.$map.clear()
				} else {
					this.$refs.uToast.show({
						title: result.data.message || '开单失败',
						type: 'error'
					})
					return
				}
			},
			async getUserInfo() {
				let result = await this.$myRequest({
					url: '/user/info',
				})
				if (result.data.code !== 200) {
					this.$refs.uToast.show({
						title: '获取用户信息失败',
						type: 'error',
						icon: false
					})
					return
				}
				this.branchNo = result.data.result.branchNo
				console.log(this.branchNo)
				let resultt = await this.$myRequest({
					url: '/get/' + this.branchNo,
				})
				if (resultt.data.code !== 200) {
					this.$refs.uToast.show({
						title: '获取银联信息失败',
						type: 'error',
						icon: false
					})
					return
				}
				for (var i = 0; i < resultt.data.result.length; i++) {
					resultt.data.result[i].amount = ''
				}
				this.cardList = resultt.data.result
			},
			async toSelectSalesAccount() {
				this.saleAccountShow = true
				// uni.navigateTo({
				// 	url: 'selectSalesAccount'
				// })
			},
			toRemove(index, indexx) {
				let count = 0
				for (var i = 0; i < this.mapList[index].data.length; i++) {
					if (this.mapList[index].data[i].num !== 0) {
						count++
					}
				}
				if (count === 1) {
					this.$map.delete(this.mapList[index].productName)
					this.mapList.splice(index, 1)
					return
				}
				this.mapList[index].totalNum = this.mapList[index].totalNum - this.mapList[index].data[indexx].num
				this.mapList[index].totalPrice = this.mapList[index].totalPrice - this.mapList[index].data[indexx].num *
					this.mapList[index].data[indexx].settlePrice
				this.mapList[index].data[indexx].num = 0
				let allTotalPrice = 0
				this.$map.forEach(function(value, key) {
					let totalNum = 0
					let totalPrice = 0
					for (var i = 0; i < value.length; i++) {
						totalNum = totalNum + parseInt(value[i].num)
						totalPrice = totalPrice + (parseInt(value[i].num) || 0) * (parseFloat(value[i]
							.settlePrice) || 0)
					}
					allTotalPrice = allTotalPrice + totalPrice
				})
				this.amount = allTotalPrice
			},
			toEdit() {
				for (var i = 0; i < this.mapList.length; i++) {
					for (var j = 0; j < this.mapList[i].data.length; j++) {
						this.mapList[i].data[j].editChecked = false
					}
				}
				this.removeChecked = !this.removeChecked
				console.log('编辑')
			},
			inputchange(index) {
				let data = this.mapList[index].data
				let temp_totalPrice = 0
				let temp_totalNum = 0
				for (var i = 0; i < data.length; i++) {
					temp_totalPrice = temp_totalPrice + (parseInt(data[i].num) || 0) * (parseFloat(data[i].settlePrice) ||
						0)
					temp_totalNum = temp_totalNum + parseInt(data[i].num)
				}
				// this.$set(this.mapList[index],'totalNum',temp_totalNum)
				// this.$set(this.mapList[index],'totalPrice',temp_totalNum)
				this.mapList[index].totalNum = temp_totalNum
				this.mapList[index].totalPrice = temp_totalPrice
				console.log(data)
				console.log('改变了')
				let allTotalPrice = 0
				this.$map.forEach(function(value, key) {
					let totalPrice = 0
					for (var i = 0; i < value.length; i++) {
						totalPrice = totalPrice + (parseInt(value[i].num) || 0) * (parseFloat(value[i]
							.settlePrice) || 0)
					}
					allTotalPrice = allTotalPrice + totalPrice
				})
				this.amount = allTotalPrice
			},
			inputchangee(index, indexx) {
				let a = (this.mapList[index].data[indexx].settlePrice || 0) / this.mapList[index].data[indexx].price * 100
				this.mapList[index].data[indexx].discount = 100 - a
				let data = this.mapList[index].data
				let temp_totalPrice = 0
				let temp_totalNum = 0
				for (var i = 0; i < data.length; i++) {
					temp_totalPrice = temp_totalPrice + (parseInt(data[i].num) || 0) * (parseFloat(data[i].settlePrice) ||
						0)
					temp_totalNum = temp_totalNum + parseInt(data[i].num)
				}
				// this.$set(this.mapList[index],'totalNum',temp_totalNum)
				// this.$set(this.mapList[index],'totalPrice',temp_totalNum)
				this.mapList[index].totalNum = temp_totalNum
				this.mapList[index].totalPrice = temp_totalPrice
				console.log(data)
				console.log('改变了')
				let allTotalPrice = 0
				this.$map.forEach(function(value, key) {
					let totalPrice = 0
					for (var i = 0; i < value.length; i++) {
						totalPrice = totalPrice + (parseInt(value[i].num) || 0) * (parseFloat(value[i]
							.settlePrice) || 0)
					}
					allTotalPrice = allTotalPrice + totalPrice
				})
				this.amount = allTotalPrice
			},
			empClick() {
				uni.navigateTo({
					url: 'selectEmployee?empId=' + this.employeeId
				})
			},
			assistantClick() {
				uni.navigateTo({
					url: 'selectAssistant?assistantShopping=' + this.assistantShopping
				})
			},
			customerClick() {
				uni.navigateTo({
					url: 'selectCustomer?id=' + this.customerId
				})
			},
			checkDate() {
				this.show = true
			},
			change(e) {
				this.date = e.result
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

	.right-item {
		margin: 0 12rpx;
		position: relative;
		display: flex;
	}

	.butt_cla {
		position: relative;
		left: 580rpx;
		top: -70rpx
	}

	.saomiao_cla {
		position: relative;
		left: 150rpx;
	}

	.add_cla {
		position: relative;
		left: 470rpx;
	}

	.input_cla {
		width: 200rpx;
	}

	.u-demo-wrap {
		background-color: #ffffff;
		width: 90%;
		margin-left: 5%;
		margin-top: 10%;
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

	.pricee {
		font-size: 32rpx;
		color: #ff0a0e;
		// position: relative;
		// left: -100rpx;
	}

	.sml {
		margin-right: 10rpx;
		color: #666;
		font-size: 36rpx;
		// margin-left: 10rpx;
	}
</style>
