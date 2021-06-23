<template>
	<view>
		<view class="cu-bar search bg-white"
			style="position: fixed;width: 750rpx;z-index: 10074;background-color: #20a0ff;">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" v-model="ipt" placeholder="商品名称/编号" confirm-type="search">
				<u-icon class="icon_cla" v-if="ipt.length !== 0" @click="delQuery" name="close-circle" color="#e3e3e3"
					size="30"></u-icon>
				</input>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="YmContent">
			<view class="all_orders_1">
				<view class="orders">
					<view v-for="(item_orders, index) in list_orders" :key="index" class="item"
						@click="toSubmit(item_orders)">
						<view class="all_orders_5">
							<view class="all_orders_7">
								<image src="/static/all_orders/images/all_orders_8_8.jpg" mode="scaleToFill" border="0"
									class="all_orders_8"></image>
								<view decode="true" class="address_from">
									<text style="font-size: 30rpx;color: #000000;">{{item_orders.productName}}</text>
									<text style="padding-left: 30rpx;color: #c5c5c5;">{{item_orders.productNo}}</text>
								</view>
							</view>
							<image src="/static/all_orders/images/all_orders_10_10.jpg" mode="scaleToFill" border="0"
								class="all_orders_10"></image>
							<view class="all_orders_11">
								<image src="/static/all_orders/images/all_orders_12_12.jpg" mode="scaleToFill"
									border="0" class="all_orders_12"></image>
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
		<u-popup v-model="goodsShow" border-radius="16" length="80%" mode="bottom" @close="popClose">
			<view class="specification-wrapper">
				<view class="specification-right">
					<u-icon name="close-circle" @click="goodsShow = false"
						style="color: #0081FF;font-weight: bold;font-size: 50rpx;position: relative;right: -620rpx;top:30rpx;height: 0rpx;"
						color="#000000" size="50"></u-icon>
					<view class="price-content">
						<text class="sign">¥</text>
						<text class="price">{{ unitPrice }}</text>
						<!-- <u-icon @click="editSettlePrice" style="margin-left: 5rpx;" name="edit-pen" color="#55aaff"
							size="35"></u-icon> -->
					</view>
					<!-- <view class="inventory">
						<view style="display: inline;">成本价:
							<block v-for="(item, index) in resultData">
								<text v-if="index === 0"
									style="text-decoration: line-through;">{{'￥'+item.price}}</text>
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
					</view> -->
					<view class="choose">
						已选:
						<block v-for="(item, index) in colorArr">
							<text v-if="item.checked">{{item.colorName}}</text>
						</block>
					</view>
					<view class="inventory">
						
					</view>
				</view>
				<view class="item-title">{{ '颜色' }}</view>
		
				<view class="item-wrapper">
					<radio-group @change="checkboxChange" style="display: flex; flex-wrap:wrap">
						<label :class="item.checked ? 'checkbox selectBox' : 'checkbox '"
							@click="labelBtn(item.colorId,index)" v-for="(item,index) in colorArr" :key="item.colorId">
							<radio :value="item.colorId" :checked="item.checked" v-show="false" />{{item.color}}
							<text :class="item.checked? 'text_cla1' : 'text_cla'"
								v-show="item.allNum !== 0">{{item.allNum}}</text>
						</label>
					</radio-group>
				</view>
				<view class="item-title">{{ '规格' }}</view>
				<view class="item-wrapper u-border-bottom" v-for="(item,index) in specList">
					<view style="display: inherit;margin: 10rpx;">
						<view style="margin-top: 30rpx;">
							{{item.specification}}
						</view>
						<view style="position: absolute;right: 350rpx;bottom: 5rpx;">
							{{item.quantity || 0}}
						</view>
						<view style="margin-top: 30rpx;" class="num_cla">
							<u-number-box :disabled-input="true"  v-model="item.num" @change="valChange"></u-number-box>
						</view>
					</view>
				</view>
		
				<view class="bottomm" >
					<text class="pricee fill">
					    <text class="sml">合计:</text>
					    ￥{{ alNum*unitPrice }}
					</text>
					<u-button
					    throttle-time="2000"
					    size="medium"
					    :ripple="true"
					    ripple-bg-color="#FEBABD"
					    shape="circle"
					    :customStyle="customStyle"
						@click="submit"
					>
					    确定
					</u-button>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="showw" mode="center" length="60%">
			<view class="importValue">
				<view class="inputPrice">
					<text>请输入临时价格</text>
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
				customStyle: {
				    color: '#fff',
				    backgroundColor: '#ffce06',
				    margin: '0',
				    padding: '0 20rpx',
				    width: '200rpx',
				    fontSize: '32rpx'
				},
				pageNo: 0,
				pageSize: 10,
				finished: false,
				total: 0,
				status: 'loadmore',
				loadText: {
					loadmore: '点击加载更多',
					loading: '努力加载中',
					nomore: '没有更多了'
				},
				searchText: '',
				list_orders: [],
				ipt: '',
				warehouseId: '',
				goodsShow: false,
				price: '',
				salePrice: '',
				colorArr: [],
				specArr: [],
				specList: [],
				temp_colorIndex: 0,
				alNum:0,
				unitPrice: '',
			}
		},
		onLoad(e) {
			this.warehouseId = e.warehouseId
			this.initData()
			this.getData();
		},
		methods: {
			submit() {
				let temp_s = 0
				for (var s = 0; s < this.colorList.length; s++) {
					temp_s = temp_s + this.colorList[s].allNum
				}
				if(temp_s === 0) {
					this.$refs.uToast.show({
						title: '请选择规格',
						type: 'error',
						icon: false
					})
					return
				}
				let arr = []
				let that = this
				this.allMap.forEach(function(value,key) {
					for (var i = 0; i < value.length; i++) {
						let temp_barcode = ''
						let price = ''
						let brandId = ''
						let brand = ''
						let discount = ''
						let productNo = ''
						let purchasePrice = ''
						let uniformPrice = ''
						// let settlePrice = ''
						let productName = ''
						let isAddPoints = false
						let promotion = false
						for (var j = 0; j < that.resultData.length; j++) {
							if(that.resultData[j].colorId === that.colorList[key].colorId && that.resultData[j].specId === value[i].specId) {
								temp_barcode = that.resultData[j].productCode
								price = that.resultData[j].price
								brandId = that.resultData[j].brandId
								brand = that.resultData[j].brand
								discount = that.resultData[j].discount
								productNo = that.resultData[j].productNo
								purchasePrice = that.resultData[j].unitPrice
								uniformPrice = that.resultData[j].price
								// settlePrice = that.resultData[j].settlePrice
								productName = that.resultData[j].productName
								isAddPoints = that.resultData[j].isPoints
								promotion = that.resultData[j].isPromotion
							}
						}
						arr.push({
							isAddPoints: isAddPoints,
							promotion: productName,
							price: price,
							unit: that.clickItem.unit,
							brandId: brandId,
							brand: brand,
							discount: discount,
							mainCategoryCode: that.clickItem.cateId,
							productNo: productNo,
							purchasePrice: that.unitPrice,
							subCategoryCode: that.clickItem.subCateId,
							uniformPrice: uniformPrice,
							settlePrice: that.settlePrice,
							productName: productName,
							specName: value[i].specName,
							specId: value[i].specId,
							quantity: value[i].quantity,
							productCode: temp_barcode,
							num: value[i].num,
							colorName: that.colorList[key].colorName,
							colorId: that.colorList[key].colorId,
						})
					}
				})
				this.$purchaseMap.set(that.productName+'('+that.checkProductNo+'-'+this.resultData[0].brand+')',arr)
				this.goodsShow = false
				// this.$purchaseMap.set()
				uni.navigateBack({
					url: 'finishedProductAdd'
				})
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
				// this.clickItem.discount = 100 - a
				this.unitPrice = this.settlePricee
				this.showw = false
			},
			initData() {
				this.finished = false
				this.pageNo = 0
				this.pageSize = 10
				this.total = 0
				this.status = 'loadmore'
				this.searchText = ''
				this.list_orders = []
			},
			delQuery() {
			
			},
			valChange(e) {
				let a = 0
				for (var i = 0; i < this.specList.length; i++) {
					a = a + this.specList[i].num 
				}
				this.colorArr[this.temp_colorIndex].allNum = a
				// let spec_list = []
				// for (var i = 0; i < this.specList.length; i++) {
				// 	spec_list.push({
				// 		checked: this.specList[i].checked,
				// 		specDisabled: this.specList[i].specDisabled,
				// 		num: this.specList[i].num,
				// 		specId: this.specList[i].specId,
				// 		specName: this.specList[i].specName,
				// 		quantity: this.specList[i].quantity
				// 	})
				// }
				let alNum = 0
				for (var i = 0; i < this.colorArr.length; i++) {
					alNum = alNum + this.colorArr[i].allNum
				}
				this.alNum = alNum
				
				// this.allMap.set(this.temp_colorIndex,spec_list)
				
			},
			labelBtn(item, index) {
				console.log('item===========')
				console.log(this.colorArr[index])
				if(this.temp_colorIndex === index) {
					console.log('重复了')
					return
				}
				this.colorArr[this.temp_colorIndex].checked = false
				this.colorArr[index].checked = true
				this.specList = this.specArr[index]
				this.$nextTick(() => {
					this.temp_colorIndex = index
				})
			},
			checkboxChange: function(e) {
				this.temp_color = e.detail.value
				console.log(e.detail.value)
				console.log(e)
				console.log('checkbox发生change事件，携带value值为：' + e.detail.value)
				console.log(this.temp_color, "temp_color")
			},
			
		
			
			async getData() {
				let result = await this.$myRequest({
					url: '/product-spu/search',
					data: {
						pageNo: 0,
						pageSize: 10,
					}
				})
				console.log(result)
				this.list_orders = result.items
			},
		}
	}
</script>

<style lang="scss" scoped>
	.YmContent {
		height: 100%;
		width: 100%;
		background-color: #f1f2f1;
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
	.num_cla{
		position: absolute;
		right: -0rpx;
		bottom: 5rpx;
	}
	.item-wrapper {
		display: flex;
		flex-direction: row;
		flex-flow: wrap;
		margin-right: 40rpx;
	}
	.checkbox {
		position: relative;
		padding: 5px 10px;
		border: 1px solid #ececec;
		margin: 10px;
		border-radius: 7upx;
		color: #000;
	}
	.text_cla{
		text-align: center;
		font-size: 1rpx; 
		color: #ffffff; 
		background-color: #ffaa00; 
		border: 1px solid #ffffff;
		position: absolute;
		right: -10rpx;
		top: -7rpx;
		width: 30rpx;
		height: 30rpx;
	}
	.text_cla1{
		text-align: center;
		font-size: 25rpx; 
		color: #ffaa00; 
		background-color: #e7e7e7; 
		border: 1px solid #ffffff;
		position: absolute;
		right: -10rpx;
		top: -7rpx;
		width: 30rpx;
		height: 30rpx;
	}
	.bottomm{
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
		position: relative;
		left: -200rpx;
	}
	.sml {
		color: #000000;
	}
	.item-title{
		margin-left: 20rpx;
	}
	.selectBox {
		background: #ffaa00 !important;
		// border-color: #fe3a3a!important;
		color: #000000 !important;
	}
	.sign {
		font-size: 28rpx;
	}
	.price-content {
		color: #fe3a3a;
		margin-bottom: 20rpx;
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
</style>
