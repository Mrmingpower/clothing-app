<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="YmContent">
			<view class="all_orders_1">
				<!-- <text decode="true" class="all_orders_2">全部订单</text> -->
				<view class="orders">
					<view v-for="(item_orders, index) in list_orders" :key="index" class="item">
						<view class="all_orders_5">
							<view class="all_orders_7">
								<image v-on:click="all_orders_8_8_click(item_orders)"  src="/static/all_orders/images/all_orders_8_8.jpg" mode="scaleToFill" border="0"    class="all_orders_8"></image>
								<text decode="true" class="address_from">{{item_orders.address_from}}</text>
							</view>
							<image v-on:click="all_orders_10_10_click(item_orders)"  src="/static/all_orders/images/all_orders_10_10.jpg" mode="scaleToFill" border="0"    class="all_orders_10"></image>
							<view class="all_orders_11">
								<image v-on:click="all_orders_12_12_click(item_orders)"  src="/static/all_orders/images/all_orders_12_12.jpg" mode="scaleToFill" border="0"    class="all_orders_12"></image>
								<text decode="true" class="address_to">{{item_orders.address_to}}</text>
							</view>
							<view class="all_orders_14">
								<text decode="true" class="all_orders_15">订单号</text>
								<text decode="true" class="orderNo">{{item_orders.orderNo}}</text>
							</view>
						</view>
						<!-- <image v-on:click="all_orders_6_6_click(item_orders)"  src="/static/all_orders/images/all_orders_6_6.jpg" mode="scaleToFill" border="0"    class="all_orders_6"></image> -->
					</view>
				</view>
			</view>
		

		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadingText: '',
				list_orders: [
				{
					address_to:'南城都汇六期(武侯区荟锦路246号附近',
					address_from:'四川省成都市武侯区府城大道西段399号',
					orderNo:'20200414171834319510',
				
				},
				{
					address_to:'南城都汇六期(武侯区荟锦路246号附近',
					address_from:'四川省成都市武侯区府城大道西段399号',
					orderNo:'20200414171834319510',
				
				},
				{
					address_to:'南城都汇六期(武侯区荟锦路246号附近',
					address_from:'四川省成都市武侯区府城大道西段399号',
					orderNo:'20200414171834319510',
				
				},
				{
					address_to:'南城都汇六期(武侯区荟锦路246号附近',
					address_from:'四川省成都市武侯区府城大道西段399号',
					orderNo:'20200414171834319510',
				
				},
				{
					address_to:'南城都汇六期(武侯区荟锦路246号附近',
					address_from:'四川省成都市武侯区府城大道西段399号',
					orderNo:'20200414171834319510',
				
				},
				],
				page:0,//当前分页页码
				apiUrl:'',//后端接口地址
				id:'',//传值使用,方便存在本地的locakStorage  
				del_id:''//方便存在本地的locakStorage  
			}
		},
		onLoad() {
	
		},
		methods: {
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
// import all_orders from "./all_orders.js";
// export default all_orders;
</script>

<style lang="scss" scoped>
   // @import './all_orders.scss'
   .YmContent {height: 100%;width: 100%;}
   uni-page-body,#app {height: 100%;}
   button::after {border: none;width: auto;}
   input{outline: none;border: none;list-style: none;width: auto;}
   .list_item{float: left;}
   .ym_hide{display: none;}
   .ym_show{display: block;}
   .slide-image {  width: 100%;  height:100%;}
   .list_horizontal {width: auto; display:inline-block; }
    .all_orders_1{white-space:normal;width:749upx;height:1201upx;padding:0upx;clear:both;float:left;background-color:#f1f2f1;text-align:left; border-radius:0upx;font-size:8upx;}
    .all_orders_1 .all_orders_2{white-space:normal;width:169upx;height:40upx;padding:0upx;clear:both;margin-top:29upx;margin-left:24upx;float:left;text-align:left; border-radius:0upx; color:#000000;font-size:32upx; line-height:40upx;}
    .all_orders_1 .orders{white-space:normal;width:749upx;height:1124upx;padding:0upx;clear:both;margin-top:6upx;margin-left:0upx;float:left;text-align:left; border-radius:0upx;font-size:8upx;}
    .all_orders_1 .orders .item{white-space:normal;width:702upx;height:250upx;padding:0upx;margin-top:21upx;margin-left:24upx;float:left;background-color:#ffffff;text-align:left; border-radius:0upx;font-size:8upx;}
    .all_orders_1 .orders .item .all_orders_5{white-space:normal;width:571upx;height:181upx;padding:0upx;margin-top:47upx;margin-left:17upx;float:left;text-align:left; border-radius:0upx;font-size:8upx;}
    .all_orders_1 .orders .item .all_orders_5 .all_orders_7{white-space:normal;width:563upx;height:26upx;padding:0upx;clear:both;margin-top:13upx;margin-left:7upx;float:left;text-align:left; border-radius:0upx;font-size:24upx; line-height:26upx;}
    .all_orders_1 .orders .item .all_orders_5 .all_orders_7 .all_orders_8{white-space:normal;width:22upx;height:22upx;padding:0upx;margin-top:1upx;margin-left:0upx;float:left;text-align:left; border-radius:0upx;font-size:20upx; line-height:22upx;}
    .all_orders_1 .orders .item .all_orders_5 .all_orders_7 .address_from{white-space:normal;width:529upx;height:26upx;padding:0upx;margin-top:0upx;margin-left:11upx;float:left;text-align:left; border-radius:0upx; color:#646464;font-size:25upx; line-height:26upx;}
    .all_orders_1 .orders .item .all_orders_5 .all_orders_10{white-space:normal;width:4upx;height:40upx;padding:0upx;clear:both;margin-top:2upx;margin-left:17upx;float:left;text-align:left; border-radius:0upx;font-size:38upx; line-height:40upx;}
    .all_orders_1 .orders .item .all_orders_5 .all_orders_11{white-space:normal;width:563upx;height:27upx;padding:0upx;clear:both;margin-top:4upx;margin-left:7upx;float:left;text-align:left; border-radius:0upx;font-size:26upx; line-height:27upx;}
    .all_orders_1 .orders .item .all_orders_5 .all_orders_11 .all_orders_12{white-space:normal;width:22upx;height:22upx;padding:0upx;margin-top:1upx;margin-left:0upx;float:left;text-align:left; border-radius:0upx;font-size:20upx; line-height:22upx;}
    .all_orders_1 .orders .item .all_orders_5 .all_orders_11 .address_to{white-space:normal;width:529upx;height:27upx;padding:0upx;margin-top:0upx;margin-left:11upx;float:left;text-align:left; border-radius:0upx; color:#646464;font-size:25upx; line-height:27upx;}
    .all_orders_1 .orders .item .all_orders_5 .all_orders_14{white-space:normal;width:563upx;height:25upx;padding:0upx;clear:both;margin-top:29upx;margin-left:8upx;float:left;text-align:left; border-radius:0upx;font-size:24upx; line-height:25upx;}
    .all_orders_1 .orders .item .all_orders_5 .all_orders_14 .all_orders_15{white-space:normal;width:auto;height:25upx;padding:0upx;margin-top:0upx;margin-left:0upx;float:left;text-align:left; border-radius:0upx; color:#c8c8c8;font-size:22upx; line-height:25upx;}
    .all_orders_1 .orders .item .all_orders_5 .all_orders_14 .orderNo{white-space:normal;width:auto;height:25upx;padding:0upx;margin-top:0upx;margin-left:13upx;float:left;text-align:left; border-radius:0upx; color:#c8c8c8;font-size:22upx; line-height:23upx;}
    .all_orders_1 .orders .item .all_orders_6{white-space:normal;width:113upx;height:111upx;padding:0upx;margin-top:0upx;margin-left:0upx;float:left;text-align:left; border-radius:0upx;font-size:8upx; line-height:111upx;}
   
</style>