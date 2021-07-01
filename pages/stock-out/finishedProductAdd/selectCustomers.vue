<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view>
		<view class="cu-bar search bg-white" style="position: fixed;width: 750rpx;z-index: 9999999;background-color: #20a0ff;">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" v-model="ipt" @input="toSearch" placeholder="客户名称/ID" confirm-type="search">
				<!-- <u-icon class="icon_cla" v-if="ipt.length !== 0" @click="delQuery" name="close-circle" color="#e3e3e3"
					size="30"></u-icon> -->
				</input>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
			<view class="all_orders_1">
				<view class="orders">
					<view v-for="(item_orders, index) in list_orders" :key="index" class="item" @click="toSubmit(item_orders)">
						<view class="all_orders_5">
							<view class="all_orders_7">               <!-- 姓名 -->
								<image
									src="/static/all_orders/images/all_orders_8_8.jpg" mode="scaleToFill" border="0"
									class="all_orders_8"></image>
								<view decode="true" class="address_from">
									<text style="font-size: 30rpx;color: #000000;">客户名称：{{item_orders.name}}</text>
								</view>
							</view>
							<image
								src="/static/all_orders/images/all_orders_10_10.jpg" mode="scaleToFill" border="0"
								class="all_orders_10"></image>
							<view class="all_orders_11">                   <!-- 订单号 -->
								<image
									src="/static/all_orders/images/all_orders_12_12.jpg" mode="scaleToFill" border="0"
									class="all_orders_12"></image>
								<text decode="true" class="address_to">
									<text style="color: #ff557f;font-size: 30rpx;">
										客户编码：{{item_orders.no}}
									</text>
								</text>
							</view>
							<image
								src="/static/all_orders/images/all_orders_10_10.jpg" mode="scaleToFill" border="0"
								class="all_orders_10"></image>
							<view class="all_orders_20">
								<image
									src="/static/all_orders/images/all_orders_8_8.jpg" mode="scaleToFill" border="0" style="width: 22upx;height: 22upx;margin-left: -14rpx;"
									class="all_orders_8"></image>
								<text style="padding-left: 6rpx;color: #c5c5c5;font-size: 30rpx;">手机号：{{item_orders.mobile}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-divider style="background-color: #f1f2f1;"></u-divider>
		<u-loadmore :status="status" @loadmore="loadmore" :load-text="loadText" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ipt: '',
				loadingText: '123',
				list_orders: [],
				page: 0, //当前分页页码
				apiUrl: '', //后端接口地址
				id: '', //传值使用,方便存在本地的locakStorage
				del_id: '' ,//方便存在本地的locakStorage
				searchText: '',
				pageNo: 0,
				pageSize: 5,
				total: 0,
				status: 'loadmore',
				loadText: {
					loadmore: '点击加载更多',
					loading: '努力加载中',
					nomore: '没有更多了'
				},
			}
		},
		onShow() {
			// this.initData()
			// this.getList()
		},
		onLoad: function (options) {
		        setTimeout(function () {
		            console.log('start pulldown');
		        }, 1000);
		        uni.startPullDownRefresh();
				this.getData();
		    },
		    onPullDownRefresh() {
		        console.log('refresh');
		        setTimeout(function () {
		            uni.stopPullDownRefresh();
		        }, 1000);
		    },
			async onReachBottom() {
				if (parseInt(this.total) === this.list_orders.length) {
					this.status = 'nomore'
					return
				}
				this.status = 'loading'
				await this.getList();
			},
		methods: {
			toSubmit(item) {
				uni.setStorage({
					key: 'out-add-customer',
					data: item
				})
				uni.navigateBack({
					url: 'finishedProductAdd'
				})
			},
			initData() {
				this.finished = false
				this.pageNo = 0
				this.pageSize = 5
				this.total = 0
				this.status = 'loadmore'
				this.searchText = ''
				this.list_orders = []
			},
			async loadmore() {
				if (parseInt(this.total) === this.list_orders.length) {
					this.status = 'nomore'
					return
				}
				this.status = 'loading'
				await this.getList()
			},
			async getList() {
				if (this.finished) return;
				console.log('执行了')
				this.pageNo++;
				let queryData = {
					pageNo: this.pageNo, // 传入页码
					pageSize: this.pageSize// 传入每页条数
				}
				console.log(queryData)
				let result = await this.$myRequest({
					url: '/customer/search',
					data: queryData
				})
				this.list_orders = [...this.list_orders, ...result.items]
				this.total = result.count;
				if (this.list_orders.length == this.total) {
					this.finished = true;
					this.status = 'nomore'
				}
			},
			delQuery() {
				this.ipt = ''
				this.getData()
			},
			async toSearch(e) {
				let result = await this.$myRequest({
					url: '/customer/search',
					data: {
						query: e.target.value
					}
				})
				this.list_orders = result.items
			},
			async getData(e) {
				let result = await this.$myRequest({
					url: '/customer/search',
					data:{
						pageNo: this.pageNo,
						pageSize: 10,
						total: 0,
					}
				})
				this.list_orders = result.items
				console.log(result)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f1f2f1;
	}
	.YmContent {
		height: 100%;
		width: 100%;
		background-color: #f1f2f1;
	}

	button::after {
		border: none;
		width: auto;
	}

	input {
		outline: none;
		border: none;
		list-style: none;
		width: auto;
	}

	.list_item {
		float: left;
	}

	.ym_hide {
		display: none;
	}

	.ym_show {
		display: block;
	}

	.list_horizontal {
		width: auto;
		display: inline-block;
	}

	.all_orders_1 {
		white-space: normal;
		// width: 749upx;
		// height: 2821upx;
		padding: 0upx;
		clear: both;
		float: left;
		background-color: #f1f2f1;
		text-align: left;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.all_orders_1 .orders {
		white-space: normal;
		width: 749upx;
		// height: 1124upx;
		padding: 0upx;
		clear: both;
		margin-top: 6upx;
		margin-left: 0upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.all_orders_1 .orders .item {
		white-space: normal;
		width: 702upx;
		height: 250upx;
		padding: 0upx;
		margin-top: 21upx;
		margin-left: 24upx;
		float: left;
		background-color: #ffffff;
		text-align: left;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.all_orders_1 .orders .item .all_orders_5 {
		white-space: normal;
		width: 571upx;
		height: 181upx;
		padding: 0upx;
		margin-top: 47upx;
		margin-left: 17upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		font-size: 8upx;
	}

	.all_orders_1 .orders .item .all_orders_5 .all_orders_7 {
		white-space: normal;
		width: 563upx;
		height: 26upx;
		padding: 0upx;
		clear: both;
		margin-top: 13upx;
		margin-left: 7upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		font-size: 24upx;
		line-height: 26upx;
	}

	.all_orders_1 .orders .item .all_orders_5 .all_orders_7 .all_orders_8 {
		white-space: normal;
		width: 22upx;
		height: 22upx;
		padding: 0upx;
		margin-top: 1upx;
		margin-left: 0upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		font-size: 20upx;
		line-height: 22upx;
	}

	.all_orders_1 .orders .item .all_orders_5 .all_orders_7 .address_from {
		white-space: normal;
		width: 529upx;
		height: 26upx;
		padding: 0upx;
		margin-top: 0upx;
		margin-left: 11upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		color: #646464;
		font-size: 25upx;
		line-height: 26upx;
	}

	.all_orders_1 .orders .item .all_orders_5 .all_orders_10 {
		white-space: normal;
		width: 4upx;
		height: 40upx;
		padding: 0upx;
		clear: both;
		margin-top: 2upx;
		margin-left: 17upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		font-size: 38upx;
		line-height: 40upx;
	}

	.all_orders_1 .orders .item .all_orders_5 .all_orders_11 {
		white-space: normal;
		width: 563upx;
		height: 27upx;
		padding: 0upx;
		clear: both;
		margin-top: 4upx;
		margin-left: 7upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		font-size: 26upx;
		line-height: 27upx;
	}

	.all_orders_1 .orders .item .all_orders_5 .all_orders_11 .all_orders_12 {
		white-space: normal;
		width: 22upx;
		height: 22upx;
		padding: 0upx;
		margin-top: 1upx;
		margin-left: 0upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		font-size: 20upx;
		line-height: 22upx;
	}

	.all_orders_1 .orders .item .all_orders_5 .all_orders_11 .address_to {
		white-space: normal;
		width: 529upx;
		height: 27upx;
		padding: 0upx;
		margin-top: 0upx;
		margin-left: 11upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		color: #646464;
		font-size: 25upx;
		line-height: 27upx;
	}

	.all_orders_1 .orders .item .all_orders_5 .all_orders_14 {
		white-space: normal;
		width: 563upx;
		height: 25upx;
		padding: 0upx;
		clear: both;
		margin-top: 29upx;
		margin-left: 8upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		font-size: 24upx;
		line-height: 25upx;
	}

	.all_orders_1 .orders .item .all_orders_5 .all_orders_14 .all_orders_15 {
		white-space: normal;
		width: auto;
		height: 25upx;
		padding: 0upx;
		margin-top: 0upx;
		margin-left: 0upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		color: #c8c8c8;
		font-size: 22upx;
		line-height: 25upx;
	}

	.all_orders_1 .orders .item .all_orders_5 .all_orders_14 .orderNo {
		white-space: normal;
		width: auto;
		height: 25upx;
		padding: 0upx;
		margin-top: 0upx;
		margin-left: 13upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		color: #c8c8c8;
		font-size: 22upx;
		line-height: 23upx;
	}

	.all_orders_1 .orders .item .all_orders_6 {
		white-space: normal;
		width: 113upx;
		height: 111upx;
		padding: 0upx;
		margin-top: 0upx;
		margin-left: 0upx;
		float: left;
		text-align: left;
		border-radius: 0upx;
		font-size: 8upx;
		line-height: 111upx;
	}
	.icon_cla{
		padding: 0px 10px 0px 0px;
	}
	.all_orders_20{
		margin-top: 125rpx;
		// margin-left: 20px;
		font-size: 30px;
	}
</style>
