<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view>
		<view class="cu-bar search bg-white" style="position: fixed;width: 750rpx;z-index: 9999999;background-color: #20a0ff;">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" v-model="ipt" @input="toSearch" placeholder="商品名称/编号" confirm-type="search">
				<u-icon class="icon_cla" v-if="ipt.length !== 0" @click="delQuery" name="close-circle" color="#e3e3e3"
					size="30"></u-icon>
				</input>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="YmContent">
			<view class="all_orders_1">
				<view class="orders">
					<view v-for="(item_orders, index) in list_orders" :key="index" class="item" @click="toSubmit(item_orders)">
						<view class="all_orders_5">
							<view class="all_orders_7">
								<image
									src="/static/all_orders/images/all_orders_8_8.jpg" mode="scaleToFill" border="0"
									class="all_orders_8"></image>
								<view decode="true" class="address_from">
									<text style="font-size: 30rpx;color: #000000;">{{item_orders.productName}}</text>
									<text style="padding-left: 30rpx;color: #c5c5c5;">{{item_orders.productNo}}</text>
								</view>
							</view>
							<image
								src="/static/all_orders/images/all_orders_10_10.jpg" mode="scaleToFill" border="0"
								class="all_orders_10"></image>
							<view class="all_orders_11">
								<image
									src="/static/all_orders/images/all_orders_12_12.jpg" mode="scaleToFill" border="0"
									class="all_orders_12"></image>
								<text decode="true" class="address_to">
									<text style="color: #ff557f;font-size: 30rpx;">
										{{item_orders.supplierName}}
									</text>
									<text style="margin-left: 6rpx;">
										  {{item_orders.categoryName}}
									</text>
								</text>
							</view>
							 <view class="all_orders_14">
								<text decode="true" class="all_orders_15">spuId</text>
								<text decode="true" class="orderNo">{{item_orders.id}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-divider style="background-color: #f1f2f1;"></u-divider>
		</view>
		<u-loadmore :status="status" @loadmore="loadmore" :load-text="loadText" />
		<u-popup v-model="goodsShow" border-radius="16" length="80%" mode="bottom" @close="popClose">
			<view class="specification-wrapper">
				<view class="specification-right">
					<u-icon name="close-circle" @click="goodsShow = false" style="color: #0081FF;font-weight: bold;font-size: 50rpx;position: relative;right: -620rpx;top:30rpx;height: 0rpx;" color="#000000" size="50"></u-icon>
					<view class="price-content">
						<text class="sign">¥</text>
						<text class="price">{{ unitPrice }}</text>
						<u-icon @click="editSettlePrice" style="margin-left: 5rpx;" name="edit-pen" color="#55aaff" size="35"></u-icon>
					</view>
					<view class="inventory">
						<view style="display: inline;">价格:
							<block v-for="(item, index) in resultData">
								<text v-if="index === 0" style="text-decoration: line-through;">{{'￥'+item.price}}</text>
							</block>
						</view>
						<view style="display: inline;margin-left: 50rpx;">货号:
							<block v-for="(item, index) in resultData">
								<text v-if="index === 0">{{item.productNo}}</text>
							</block>
						</view>
						<view style="display: inline;margin-left: 50rpx;">品名:
							<block v-for="(item, index) in resultData">
								<text v-if="index === 0">{{item.productName}}</text>
							</block>
						</view>
					</view>
					<view class="choose">
						已选:
						<block v-for="(item, index) in colorList">
							<text v-if="item.checked">{{item.colorName}}</text>
						</block>
					</view>
					<view class="inventory">
						
					</view>
				</view>
				<view class="item-title">{{ '颜色' }}</view>
				
					<view v-for="(item,index) in dataList">
							{{item.color}}
							<view v-for="(itemm,indexx) in item.productSkuIdWithSpecificationVOList">
								{{itemm.specification}}
							</view>
					</view>
						<!-- <view class="item-wrapper">
							<radio-group @change="checkboxChange" style="display: flex; flex-wrap:wrap">
							  <label :class="item.checked ? 'checkbox selectBox' : 'checkbox '" @click="labelBtn(item.colorId,index)"  v-for="(item,index) in colorList" :key="item.colorId" >
								<radio :value="item.colorId" :checked="item.checked"  v-show="false"/>{{item.color}}
								<text :class="item.checked? 'text_cla1' : 'text_cla'" v-show="item.allNum !== 0"
								>{{item.allNum}}</text>
							  </label>
							</radio-group>
						</view>
						<view class="item-title">{{ '规格' }}</view>
							<view class="item-wrapper u-border-bottom" v-for="(item,index) in specList">
								<view style="display: inherit;margin: 10rpx;">
									<view style="margin-top: 30rpx;">
										{{item.specName}}
									</view>
									<view style="position: absolute;right: 350rpx;bottom: 5rpx;">
										{{item.quantity || 0}}
										 {{11}} 
									</view>
									<view style="margin-top: 30rpx;" class="num_cla">
										<u-number-box :disabled-input="true" :disabled="!item.specDisabled"  v-model="item.num" @change="valChange"></u-number-box>
									</view>
								</view>
							</view> -->
					
					<view class="bottomm" >
					    <text class="totalPrice">
					        <text class="sml">合计:</text>
					        ￥{{ alNum*unitPrice }}
					    </text>
					    <u-button
					        throttle-time="2000"
					        size="medium"
					        :ripple="true"
					        ripple-bg-color="#FEBABD"
					        shape="circle"
							@click="submit"
							class="button"
					    >
					        确定
					    </u-button>
					</view>
			</view>
		</u-popup>
		<u-popup v-model="showw" mode="center" length="60%">
			<view class="importValue">
				<view class="inputPrice">
					<text >请输入临时价格</text>
				</view>
				<u-input v-model="settlePricee" type="text" :border="true" />
				<view class="mt20">
					<u-button type="primary" :ripple="true" :plain="true" shape="circle" @click="onSure">确认</u-button>
				</view>
			</view>
		</u-popup>
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
				goodsShow: false,
				unitPrice: '',
				colorList: [],
				dataList: [],
				temp_colorIndex: 0,
				temp_color: '',
				temp_colorList: '',
				showw: false,
				settlePricee: '',
				alNum: 0,
				specList: [],
				resultData: [],
				value: 0 ,
			}
		},
		onShow() {
			this.initData()
			// this.getList()
			this.getData();
		},
		async onLoad(e){
		        setTimeout(function () {
		            console.log('start pulldown');
		        }, 1000);
		        uni.startPullDownRefresh();
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
			editSettlePrice() {
				this.settlePricee = this.unitPrice
				this.showw = true
			},
			labelBtn(item,index){
				// this.colorList[this.temp_colorIndex].checked = false
				// this.colorList[index].checked = true
				},
			onSure() {
				if(this.$u.test.isEmpty(this.settlePricee)) {
					this.$refs.uToast.show({
						title: '不能为空',
						type: 'error',
						icon: false
					})
					return
				}
				let a = this.settlePrice/this.resultData[0].price*100
				for (var i = 0; i < this.resultData.length; i++) {
					this.resultData[i].discount = 100 - a
				}
				this.unitPrice = this.settlePricee
				this.showw = false
			},
			popClose() {
				this.allMap = new Map()
				console.log('弹出关闭')
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
			checkboxChange: function (e) {
			  this.temp_color = e.detail.value
			  console.log(e.detail.value)
			  console.log(e)
			  console.log('checkbox发生change事件，携带value值为：' + e.detail.value)
			  console.log(this.temp_color,"temp_color")
			},
			async getList() {
				if (this.finished) return;
				console.log('执行了')
				this.pageNo++;
				let queryData = {
					pageNo: this.pageNo, // 传入页码
					pageSize: this.pageSize// 传入每页条数
				}
				if(!this.$u.test.isEmpty(this.queryParams.begin)) {
					queryData.begin = this.queryParams.begin
				}
				if(!this.$u.test.isEmpty(this.queryParams.end)) {
					queryData.end = this.queryParams.end
				}
				if(!this.$u.test.isEmpty(this.queryParams.no)) {
					queryData.no = this.queryParams.no
				}
				if(!this.$u.test.isEmpty(this.queryParams.orderCol)) {
					// 排序的还没加
				}
				if(!this.$u.test.isEmpty(this.queryParams.statuses)) {
					queryData.statuses = this.queryParams.statuses
				}
				if(!this.$u.test.isEmpty(this.queryParams.supplierIds)) {
					queryData.supplierIds = this.queryParams.supplierIds
				}
				if(!this.$u.test.isEmpty(this.queryParams.warehouseIds)) {
					queryData.warehouseIds = this.queryParams.warehouseIds
				}
				console.log(queryData)
				let result = await this.$myRequest({
					url: '/product-spu/search',
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
					url: '/product-spu/search',
					data: {
						query: e.target.value
					}
				})
				this.list_orders = result.items
			},
			
			async getData() {
				let result = await this.$myRequest({
					url: '/product-spu/search',
					data:{
						pageNo: 0,
						pageSize: 10,
						// productNo: 0
					}
				})
				this.list_orders = result.items
				console.log('rrrrrrrrrrr')
				console.log(result)
			},
			async toSubmit(item) {
				// uni.setStorage({
				// 	key: 'out-add-product',
				// 	data: item
				// })
				// uni.navigateBack({
				// 	url: 'finishedProductAdd'
				// })
				let result1 = await this.$myRequest({
					url:'/product-spu/group-color/' + item.id
					
				})
				this.specList = result1.productSkuIdWithSpecificationVOList
				this.resultData = result1
				this.goodsShow = true
				// this.colorList = result1
				this.dataList = result1
				console.log('item')
				console.log(result1)
				console.log(result1[0].color)
				console.log(this.specList)
			},
		}
	}
</script>

<style lang="scss" scoped>
	// @import './all_orders.scss'
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
	.specification-wrapper {
		width: 100%;
		padding: 30rpx 25rpx;
		box-sizing: border-box;
	}
	.specification-right {
		flex: 1;
		padding: 0 35rpx 0 28rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		font-weight: 500;
	}
	.bottomm{
		background-color: #FFFFFF;
		// margin-top: 140%;
	}
	.totalPrice{
		margin-left: 100rpx;
		font-size: 35rpx;
		vertical-align: middle;
		color: #FE3A3A;
	}
	.button{
		margin-left: 150rpx;
		background-color: #FFCE06;
		color: #FFFFFF;
		outline: none;
		border: none;
	}
	.sml{
		color: #000000;
	}
	.inventory{
		height: 80rpx;
	}
	.importValue{
		padding: 15px;
		
	}
	.inputPrice{
		color: #797373;
	    margin: auto;
	    text-align: center;
	    padding: 10px 0;
	}
	.mt20{
		margin-top: 40rpx;
		width: 300rpx;
		margin-left: 50rpx;
	}
	.checkbox{
	  position: relative;
	  padding: 5px 10px;
	  border: 1px solid #ececec;
	  margin: 10px;
	  border-radius: 7upx;
	  color: #000;
	}
	.selectBox{
	  background: #ffaa00!important;
	  // border-color: #fe3a3a!important;
	  color: #000000!important;
	}
</style>
