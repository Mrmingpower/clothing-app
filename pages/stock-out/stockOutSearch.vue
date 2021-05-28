<template>
	<view>
		<view style="position: relative;left: 30rpx;top: 20rpx;">
			<u-icon name="rewind-right-fill" color="#2979ff" size="36"></u-icon>
			<text style="font-size: 30rpx;margin-left: 15rpx;">日期</text>
		</view>
		<view class="wrap" style="margin-top: 15rpx;">
			<u-field v-model="begin" icon="calendar" label-width="200" placeholder="请选择订单开始日期" @click="startClick" :disabled="true" right-icon="arrow-down-fill" label="开始日期"></u-field>
			<u-field v-model="end" icon="calendar" label-width="200" placeholder="请选择订单结束日期" @click="endClick" :disabled="true" right-icon="arrow-down-fill" label="结束日期"></u-field>
		</view>
		<view style="position: relative;left: 30rpx;top: 20rpx;">
			<u-icon name="rewind-right-fill" color="#2979ff" size="36"></u-icon>
			<text style="font-size: 30rpx;margin-left: 15rpx;">基本信息</text>
		</view>
		<view class="wrap" style="margin-top: 15rpx;">
			<!-- <u-field v-model="no" icon="coupon" label-width="200" placeholder="请输入单号" label="单号"></u-field> -->
			<u-field v-model="propertiesName" icon="coupon" @click="propertiesClick" label-width="200" :disabled="true" right-icon="arrow-down-fill"  placeholder="请选择属性" label="属性"></u-field>
			<u-field v-model="statusesName" icon="tags" @click="statusClick" :disabled="true" right-icon="arrow-down-fill" label-width="200" placeholder="请选择单据状态" label="单据状态"></u-field>
		</view>
		<view style="position: relative;left: 30rpx;top: 20rpx;">
			<u-icon name="rewind-right-fill" color="#2979ff" size="36"></u-icon>
			<text style="font-size: 30rpx;margin-left: 15rpx;">其他信息</text>
		</view>
		<view class="wrap" style="margin-top: 15rpx;">
			<!-- <u-field v-model="supplierNames" icon="man" @click="supplierClick" :disabled="true" right-icon="arrow-down-fill" label-width="200" placeholder="请选择供应商" label="供应商"></u-field> -->
			<u-field v-model="warehouseNames" icon="home" @click="warehouseClick" :disabled="true" right-icon="arrow-down-fill" label-width="200" placeholder="请选择仓库" label="仓库"></u-field>
			<u-field v-model="receiverTypeName" icon="coupon" @click="receiverTypeClick" label-width="220" :disabled="true" right-icon="arrow-down-fill"  placeholder="请选择收货单位类型" label="收货单位类型"></u-field>
			<u-field v-model="sourceTypeName" icon="coupon" @click="sourceTypeClick" label-width="200" :disabled="true" right-icon="arrow-down-fill"  placeholder="请选择出库类型" label="出库类型"></u-field>
		</view>
		<view style="position: relative;left: 30rpx;top: 20rpx;">
			<u-icon name="rewind-right-fill" color="#2979ff" size="36"></u-icon>
			<text style="font-size: 30rpx;margin-left: 15rpx;">排序</text>
		</view>
		<view class="wrap" style="margin-top: 15rpx;">
			<u-field v-model="orderColName" icon="list" @click="orderClick" :disabled="true" right-icon="arrow-down-fill" label-width="200" placeholder="请选择排序列" label="排序列"></u-field>
		</view>
		<view>
			<view class="close-btn">
				<u-button @tap="searchData" size="medium" type="primary">查询</u-button>
				<u-button @tap="clearData" size="medium">重置</u-button>
			</view>
			<!-- <u-button type="primary" shape="circle" :custom-style="customStyle">查询</u-button> -->
		</view>
		<multiple-select v-model="statusesShow" :default-selected="statusesDefaultSelected" :data="statusList" @confirm="statusConfirm"></multiple-select>
		<multiple-select v-model="propertiesShow" :default-selected="propertiesDefaultSelected" :data="propertiesList" @confirm="propertiesConfirm"></multiple-select>
		<multiple-select v-model="receiverTypeShow" :default-selected="receiverDefaultSelected" :data="receiverTypeList" @confirm="receiverTypeConfirm"></multiple-select>
		<multiple-select v-model="sourceTypeShow" :default-selected="sourceTypeDefaultSelected" :data="sourceTypeList" @confirm="sourceTypeConfirm"></multiple-select>
		<u-calendar v-model="startShow" mode="date" @change="startChange"></u-calendar>
		<u-calendar v-model="endShow" mode="date" @change="endChange"></u-calendar>
	</view>
</template>

<script>
	import multipleSelect from "@/components/momo-multipleSelect/momo-multipleSelect";
	export default {
		components: {
		      multipleSelect,
		},
		data() {
			return {
				statusesShow: false,
				propertiesShow: false,
				receiverTypeShow: false,
				sourceTypeShow: false,
				startShow: false,
				endShow: false,
				customStyle: {
					marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
				},
				begin: '',
				end: '',
				no: '',
				propertiesName: '',
				properties: '',
				receiverTypeName: '',
				receiverType: '',
				sourceTypeName: '',
				sourceType: '',
				statuses: '',
				statusesName: '',
				orderColName: '',
				orderCol: '',
				supplierIds: '',
				supplierNames: '',
				warehouseIds: '',
				warehouseNames: '',
				sortList: [],
				receiverDefaultSelected: [],
				statusesDefaultSelected: [],
				propertiesDefaultSelected: [],
				sourceTypeDefaultSelected: [],
				statusList: [
				{
					label: "未审核",
					value: 0,
				},
				{
					label: "已审核",
					value: 1,
				}],
				propertiesList: [
				{
					label: "面料",
					value: 0,
				},
				{
					label: "辅料",
					value: 1,
				},{
					label: "成品",
					value: 2,
				}],
				receiverTypeList: [
					{
						label: "车间",
						value: 0,
					},
					{
						label: "外协厂",
						value: 1,
					},{
						label: "仓库",
						value: 2,
					}
				],
				sourceTypeList: [
					{
						label: "生产领用",
						value: 0,
					},
					{
						label: "销售出库",
						value: 1,
					},
					{
						label: "其他出库",
						value: 2,
					},
					{
						label: "调拨出库",
						value: 3,
					}
				]
			}
		},
		onLoad(e) {
			let queryParams = JSON.parse(e.queryParams)
			if(!this.$u.test.isEmpty(queryParams.begin)) {
				this.begin = queryParams.begin
			}
			if(!this.$u.test.isEmpty(queryParams.end)) {
				this.end = queryParams.end
			}
			// if(!this.$u.test.isEmpty(queryParams.no)) {
			// 	this.no = queryParams.no
			// }
			if(!this.$u.test.isEmpty(queryParams.orderCol)) {
				this.orderCol = queryParams.orderCol
			}
			if(!this.$u.test.isEmpty(queryParams.orderColName)) {
				this.orderColName = queryParams.orderColName
			}
			if(!this.$u.test.isEmpty(queryParams.sortList)) {
				this.sortList = queryParams.sortList
			}
			if(!this.$u.test.isEmpty(queryParams.statuses)) {
				this.statuses = queryParams.statuses
				this.statusesDefaultSelected = queryParams.statuses.split(',')
			}
			if(!this.$u.test.isEmpty(queryParams.statusesName)) {
				this.statusesName = queryParams.statusesName
			}
			// if(!this.$u.test.isEmpty(queryParams.supplierIds)) {
			// 	this.supplierIds = queryParams.supplierIds
			// }
			// if(!this.$u.test.isEmpty(queryParams.supplierNames)) {
			// 	this.supplierNames = queryParams.supplierNames
			// }
			if(!this.$u.test.isEmpty(queryParams.properties)) {
				this.properties = queryParams.properties
				this.propertiesDefaultSelected = queryParams.properties.split(',')
			}
			if(!this.$u.test.isEmpty(queryParams.propertiesName)) {
				this.propertiesName = queryParams.propertiesName
			}
			if(!this.$u.test.isEmpty(queryParams.warehouseIds)) {
				this.warehouseIds = queryParams.warehouseIds
			}
			if(!this.$u.test.isEmpty(queryParams.warehouseNames)) {
				this.warehouseNames = queryParams.warehouseNames
			}
			if(!this.$u.test.isEmpty(queryParams.receiverType)) {
				this.receiverType = queryParams.receiverType
				this.receiverDefaultSelected = queryParams.receiverType.split(',')
			}
			if(!this.$u.test.isEmpty(queryParams.receiverTypeName)) {
				this.receiverTypeName = queryParams.receiverTypeName
			}
			if(!this.$u.test.isEmpty(queryParams.sourceType)) {
				this.sourceType = queryParams.sourceType
				this.sourceTypeDefaultSelected = queryParams.sourceType.split(',')
			}
			if(!this.$u.test.isEmpty(queryParams.sourceTypeName)) {
				this.sourceTypeName = queryParams.sourceTypeName
			}
		},
		onShow() {
			let that = this
			uni.getStorage({
				key: 'selectStockInSupplier',
				success(res) {
					let textStr = []
					let textId = []
					for (var i = 0; i < res.data.length; i++) {
						textStr.push(res.data[i].name)
						textId.push(res.data[i].id)
					}
					that.supplierNames = textStr.toString()
					that.supplierIds = textId.toString()
					uni.removeStorage({
					    key: 'selectStockInSupplier'
					});
				}
			}),
			uni.getStorage({
				key: 'selectStockOutWarehouse',
				success(res) {
					let textStr = []
					let textId = []
					for (var i = 0; i < res.data.length; i++) {
						textStr.push(res.data[i].name)
						textId.push(res.data[i].id)
					}
					that.warehouseNames = textStr.toString()
					that.warehouseIds = textId.toString()
					uni.removeStorage({
					    key: 'selectStockOutWarehouse'
					});
				}
			}),
			uni.getStorage({
				key: 'stockOutSort',
				success(res) {
					console.log('res')
					console.log(res)
					that.orderColName = res.data.arrName
					that.orderCol = res.data.arr
					that.sortList = res.data.sortList
					uni.removeStorage({
					    key: 'stockOutSort'
					});
				}
			})
		},
		methods: {
			orderClick() {
				uni.navigateTo({
					url: 'selectSortOut?sortList=' + JSON.stringify(this.sortList)
				})
			},
			searchData() {
				let queryParams = {
					begin: this.begin,
					end: this.end,
					// no: this.no,
					properties: this.properties,
					propertiesName: this.propertiesName,
					statuses: this.statuses,
					statusesName: this.statusesName,
					// supplierIds: this.supplierIds,
					// supplierNames: this.supplierNames,
					warehouseIds: this.warehouseIds,
					warehouseNames: this.warehouseNames,
					receiverTypeName: this.receiverTypeName,
					receiverType: this.receiverType,
					sourceType: this.sourceType,
					sourceTypeName: this.sourceTypeName,
					orderCol: this.orderCol,
					orderColName: this.orderColName,
					sortList: this.sortList
				}
				// uni.setStorage({
				// 	key: 'stockInQueryParams',
				// 	data: queryParams
				// })
				console.log(queryParams)
				this.$map.set('stockOutQueryParams',queryParams)
				uni.navigateBack({
					url:'stockOut'
				})
			},
			clearData() {
				this.begin = ''
				this.end = ''
				// this.no = ''
				this.statusesName = ''
				this.statuses = ''
				// this.supplierIds = ''
				// this.supplierNames = ''
				this.warehouseIds = ''
				this.warehouseNames = ''
				this.orderCol = ''
				this.orderColName = ''
				this.properties = ''
				this.propertiesName = ''
				this.sortList = []
				this.receiverTypeName = ''
				this.receiverType = ''
				this.sourceType = ''
				this.sourceTypeName = ''
			},
			startChange(e) {
				this.begin = e.result
			},
			endChange(e) {
				this.end = e.result
			},
			startClick() {
				this.startShow = true
			},
			endClick() {
				this.endShow = true
			},
			statusConfirm(e) {
				let label = []
				let value = []
				for (var i = 0; i < e.length; i++) {
					label.push(e[i].label)
					value.push(e[i].value)
				}
				this.statusesName = label.toString()
				this.statuses = value.toString()
			},
			receiverTypeConfirm(e) {
				let label = []
				let value = []
				for (var i = 0; i < e.length; i++) {
					label.push(e[i].label)
					value.push(e[i].value)
				}
				this.receiverTypeName = label.toString()
				this.receiverType = value.toString()
			},
			sourceTypeConfirm(e) {
				let label = []
				let value = []
				for (var i = 0; i < e.length; i++) {
					label.push(e[i].label)
					value.push(e[i].value)
				}
				this.sourceTypeName = label.toString()
				this.sourceType = value.toString()
			},
			propertiesConfirm(e) {
				let label = []
				let value = []
				for (var i = 0; i < e.length; i++) {
					label.push(e[i].label)
					value.push(e[i].value)
				}
				this.propertiesName = label.toString()
				this.properties = value.toString()
			},
			statusClick() {
				this.statusesShow = true
			},
			propertiesClick() {
				this.propertiesShow = true
			},
			supplierClick() {
				uni.navigateTo({
					url: 'selectSupplier?supplierNames='+ this.supplierNames
				})
			},
			warehouseClick() {
				uni.navigateTo({
					url: 'selectWarehouseOut?supplierNames='+ this.warehouseNames
				})
			},
			receiverTypeClick() {
				this.receiverTypeShow = true
			},
			sourceTypeClick() {
				this.sourceTypeShow = true
			}
		}
	}
</script>

<style lang="scss" scoped>
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
