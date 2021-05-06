<template>
	<view>
		<view class="wrap" style="margin-top: 15rpx;">
			<u-field v-model="begin" icon="calendar" label-width="200" placeholder="请选择订单开始日期" @click="startClick" :disabled="true" right-icon="arrow-down-fill" label="开始日期"></u-field>
			<u-field v-model="end" icon="calendar" label-width="200" placeholder="请选择订单结束日期" @click="endClick" :disabled="true" right-icon="arrow-down-fill" label="结束日期"></u-field>
		</view>
		<view class="wrap" style="margin-top: 15rpx;">
			<u-field v-model="no" icon="coupon" label-width="200" placeholder="请输入单号" label="单号"></u-field>
			<u-field v-model="statuses" icon="tags" label-width="200" placeholder="请选择单据状态" label="单据状态"></u-field>
		</view>
		<view class="wrap" style="margin-top: 15rpx;">
			<u-field v-model="supplierIds" icon="map-fill" label-width="200" placeholder="请输入供应商" label="供应商"></u-field>
			<u-field v-model="warehouseIds" icon="map-fill" label-width="200" placeholder="请输入仓库" label="仓库"></u-field>
		</view>
		<view class="wrap" style="margin-top: 15rpx;">
			<u-field v-model="orderCol" icon="map-fill" label-width="200" placeholder="请输入排序列" label="排序列"></u-field>
		</view>
		<view>
			<view class="close-btn">
				<u-button @tap="searchShop" size="medium" type="primary">查询</u-button>
				<u-button @tap="closeBtn" size="medium">重置</u-button>
			</view>
			<!-- <u-button type="primary" shape="circle" :custom-style="customStyle">查询</u-button> -->
		</view>
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
				startShow: false,
				endShow: false,
				customStyle: {
					marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
				},
				begin: '',
				end: '',
				no: '',
				statuses: '',
				orderCol: '',
				supplierIds: '',
				warehouseIds: ''
			}
		},
		methods: {
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
