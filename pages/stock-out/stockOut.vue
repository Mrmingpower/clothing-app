<template>
	<view>
		<uni-nav-bar :fixed="true" background-color="#20a0ff" :border="false">
			<view style="width: 700rpx;">
				<view class="input-vieww" @click="startSearch">
					<uni-icons type="search" size="22" color="#666666" />
					<input v-model="searchText" :disabled="true" confirm-type="search" class="inputt" type="text" placeholder="输入查询信息">
					<uni-icons :color="'#999999'" v-if="searchText!==''" class="icon-clear" type="clear" size="22"
						@click="clearSearch" />
				</view>
			</view>
		</uni-nav-bar>
		<!-- <uni-nav-bar :fixed="true" background-color="#20a0ff" :border="false">
			<view style="width: 700rpx;z-index: 999999;">
				<u-dropdown inactive-color="#ffffff">
					<u-dropdown-item v-model="value1" title="距离" :options="options1"></u-dropdown-item>
					<u-dropdown-item v-model="value2" title="温度" :options="options2"></u-dropdown-item>
				</u-dropdown>
			</view>
		</uni-nav-bar> -->
		<view>
			<!-- <view style="z-index: 99;width: 750rpx;background-color: #20a0ff;position: fixed;top: 170rpx;">
				<u-dropdown inactive-color="#ffffff">
					<u-dropdown-item v-model="value1" title="距离" :options="options1"></u-dropdown-item>
					<u-dropdown-item v-model="value2" title="温度" :options="options2"></u-dropdown-item>
				</u-dropdown>
			</view> -->
			<view>
				<view v-for="(item,index) in stockOutList" :key="index" :index="index" style="margin-bottom: 10rpx">
					<u-card margin="20rpx 0rpx" :title-size="35" border-radius="0"
						:title="formatSourceTypeOut(item.sourceType)" :sub-title="item.date"
						:thumb="`/static/stockIn/${formatSourceTypeImg(item.sourceType)}`" thumb-width="40">
						<view @click="toDetail(item.id)" class="audit-card-content" slot="body">
							<view>
								<u-row gutter="16">
									<u-col span="3">
										<view class="flex-item-20">出库单号</view>
									</u-col>
									<u-col span="4">
										<view>{{item.no}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla">
								<u-row gutter="16">
									<u-col span="3">
										<view class="flex-item-20">仓库</view>
									</u-col>
									<u-col span="4">
										<view>{{item.warehouseName}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla">
								<u-row gutter="16">
									<u-col span="3">
										<view class="flex-item-20">总数量</view>
									</u-col>
									<u-col span="4">
										<view>{{item.quantity}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla">
								<u-row gutter="16">
									<u-col span="3">
										<view class="flex-item-20">总金额</view>
									</u-col>
									<u-col span="4">
										<view>{{item.amount}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="line-cla">
								<u-row gutter="16">
									<u-col span="3">
										<view class="flex-item-20">属性</view>
									</u-col>
									<u-col span="4">
										<u-tag :text="formatProperties(item.properties)"
											:type="formatPropertiesType(item.properties)" mode="dark" size="mini"
											shape="square" />
									</u-col>
								</u-row>
							</view>
							<view class="line-cla">
								<u-row gutter="16">
									<u-col span="3">
										<view class="flex-item-20">收货单位</view>
									</u-col>
									<u-col span="4">
										<u-tag :text="formatReceiver(item.receiverType)"
											:type="formatReceiverType(item.receiverType)" mode="dark" size="mini"
											shape="square" />
									</u-col>
								</u-row>
							</view>
							<view class="line-cla">
								<u-row gutter="16">
									<u-col span="3">
										<view class="flex-item-20">审核状态</view>
									</u-col>
									<u-col span="4">
										<u-tag :text="formatStockInStatus(item.status)"
											:type="formatStockInStatusType(item.status)" mode="dark" size="mini"
											shape="circle" />
									</u-col>
								</u-row>
							</view>
						</view>
					</u-card>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" @loadmore="loadmore" :load-text="loadText" />
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import {
		formatSourceTypeOut,
		formatSourceTypeImg,
		formatStockInStatus,
		formatStockInStatusType,
		formatProperties,
		formatPropertiesType,
		formatReceiverType,
		formatReceiver
	} from '@/util/index.js'
	export default {
		components: {
			uniNavBar,
			uniIcons
		},
		data() {
			return {
				value1: 1,
				value2: 2,
				options1: [{
						label: '默认排序',
						value: 1,
					},
					{
						label: '距离优先',
						value: 2,
					},
					{
						label: '价格优先',
						value: 3,
					}
				],
				options2: [{
						label: '去冰',
						value: 1,
					},
					{
						label: '加冰',
						value: 2,
					},
				],
				searchText: '',
				stockOutList: [],
				pageNo: 0,
				pageSize: 5,
				total: 0,
				status: 'loadmore',
				loadText: {
					loadmore: '点击加载更多',
					loading: '努力加载中',
					nomore: '没有更多了'
				},
				queryParams: '',
			}
		},
		// onLoad() {
		// 	this.getList()
		// },
		onShow() {
			let queryParams = this.$map.get('stockOutQueryParams') || {}
			// let queryParams = uni.getStorageSync('stockInQueryParams')
			console.log('queryParams')
			console.log(queryParams)
			this.queryParams = queryParams
			// uni.removeStorage({
			//     key: 'stockInQueryParams'
			// });
			this.initData()
			this.getList()
		},
		onUnload() {
			// uni.removeStorage({
			//     key: 'stockInQueryParams'
			// });
			this.$map.delete('stockOutQueryParams')
		},
		async onReachBottom() {
			if (parseInt(this.total) === this.stockOutList.length) {
				this.status = 'nomore'
				return
			}
			this.status = 'loading'
			await this.getList();
		},
		methods: {
			formatSourceTypeOut,
			formatSourceTypeImg,
			formatStockInStatus,
			formatStockInStatusType,
			formatProperties,
			formatPropertiesType,
			formatReceiverType,
			formatReceiver,
			initData() {
				this.finished = false
				this.pageNo = 0
				this.pageSize = 5
				this.total = 0
				this.status = 'loadmore'
				this.searchText = ''
				this.stockOutList = []
			},
			clearSearch() {
				this.searchText = ''
			},
			toDetail(id) {
				uni.navigateTo({
					url: 'stockOutDetail?id=' + id
				})
			},
			startSearch() {
				uni.navigateTo({
					url: 'stockOutSearch?queryParams='+JSON.stringify(this.queryParams)
				})
			},
			async loadmore() {
				if (parseInt(this.total) === this.stockOutList.length) {
					this.status = 'nomore'
					return
				}
				this.status = 'loading'
				await this.getList()
			},
			async getList() {
				if (this.finished) return;
				this.pageNo++;
				let queryData = {
					pageNo: this.pageNo, // 传入页码
					pageSize: this.pageSize// 传入每页条数
				}
				if(!this.$u.test.isEmpty(this.queryParams.begin)) {
					queryData.dateBegin = this.queryParams.begin
				}
				if(!this.$u.test.isEmpty(this.queryParams.end)) {
					queryData.dateEnd = this.queryParams.end
				}
				// if(!this.$u.test.isEmpty(this.queryParams.no)) {
				// 	queryData.no = this.queryParams.no
				// }
				if(!this.$u.test.isEmpty(this.queryParams.orderCol)) {
					// 排序的还没加
					queryData.orderCol = this.queryParams.orderCol
				}
				if(!this.$u.test.isEmpty(this.queryParams.receiverType)) {
					queryData.receiverType = this.queryParams.receiverType
				}
				if(!this.$u.test.isEmpty(this.queryParams.sourceType)) {
					queryData.sourceType = this.queryParams.sourceType
				}
				if(!this.$u.test.isEmpty(this.queryParams.statuses)) {
					queryData.status = this.queryParams.statuses
				}
				if(!this.$u.test.isEmpty(this.queryParams.properties)) {
					queryData.properties = this.queryParams.properties
				}
				if(!this.$u.test.isEmpty(this.queryParams.warehouseIds)) {
					queryData.warehouseId = this.queryParams.warehouseIds
				}
				let result = await this.$myRequest({
					url: '/stock-out/search',
					data: queryData
				})
				console.log('result')
				console.log(result)
				this.stockOutList = [...this.stockOutList, ...result.items]
				this.total = result.count;
				if (this.stockOutList.length == this.total) {
					this.finished = true;
					this.status = 'nomore'
				}
			}
		}
	}
</script>

<style lang="scss" scope>
	.input-vieww {
		align-items: center;
		justify-content: center;
		width: 100%;
		display: flex;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap: nowrap;
		line-height: 30px;
		background: #f5f5f5;
	}

	.input-vieww .uni-icon {
		line-height: 30px !important;
	}

	.input-vieww .inputt {
		height: 30px;
		line-height: 30px;
		width: 94%;
		padding: 0 3%;
	}

	page {
		background-color: #f1f1f1;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.audit-card-content {
		margin: 0 20rpx;
	}

	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.audit-card-content {
		margin: 0 20rpx;
	}

	.flex-item-20 {
		color: #8799a3;
	}

	.line-cla {
		margin: 14rpx 0;
	}
</style>
