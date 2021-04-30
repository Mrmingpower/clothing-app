<template>
	<view>
		<view style="margin: 30rpx 30rpx;">
			<view>
				<u-row gutter="16">
					<u-col span="1">
						<view>
							<u-icon name="play-right" color="#2979ff" size="28"></u-icon>
						</view>
					</u-col>
					<u-col span="3">
						<view class="flex-item-30">入库单号</view>
					</u-col>
					<u-col span="4">
						<view class="flex-item-70">{{stockInDetail.no}}</view>
					</u-col>
				</u-row>
			</view>
			<view class="line-cla">
				<u-row gutter="16">
					<u-col span="1">
						<view>
							<u-icon name="play-right" color="#2979ff" size="28"></u-icon>
						</view>
					</u-col>
					<u-col span="3">
						<view class="flex-item-30">入库时间</view>
					</u-col>
					<u-col span="8">
						<view class="flex-item-70">{{stockInDetail.datetime}}</view>
					</u-col>
				</u-row>
			</view>
			
			<view class="line-cla">
				<u-row gutter="16">
					<u-col span="1">
						<view>
							<u-icon name="play-right" color="#2979ff" size="28"></u-icon>
						</view>
					</u-col>
					<u-col span="3">
						<view class="flex-item-30">仓库</view>
					</u-col>
					<u-col span="4">
						<view class="flex-item-70">{{stockInDetail.warehouse}}</view>
					</u-col>
				</u-row>
			</view>
			
			<view class="line-cla">
				<u-row gutter="16">
					<u-col span="1">
						<view>
							<u-icon name="play-right" color="#2979ff" size="28"></u-icon>
						</view>
					</u-col>
					<u-col span="3">
						<view class="flex-item-30">总数量</view>
					</u-col>
					<u-col span="4">
						<view class="flex-item-70">{{stockInDetail.quantity}}</view>
					</u-col>
				</u-row>
			</view>
			<view class="line-cla">
				<u-row gutter="16">
					<u-col span="1">
						<view>
							<u-icon name="play-right" color="#2979ff" size="28"></u-icon>
						</view>
					</u-col>
					<u-col span="3">
						<view class="flex-item-30">总金额</view>
					</u-col>
					<u-col span="4">
						<view class="flex-item-70">{{stockInDetail.amount}}</view>
					</u-col>
				</u-row>
			</view>
			<view class="line-cla">
				<u-row gutter="16">
					<u-col span="1">
						<view>
							<u-icon name="play-right" color="#2979ff" size="28"></u-icon>
						</view>
					</u-col>
					<u-col span="3">
						<view class="flex-item-30">属性</view>
					</u-col>
					<u-col span="4">
						<view class="flex-item-70">
							<u-tag :text="formatProperties(stockInDetail.properties)"
								:type="formatPropertiesType(stockInDetail.properties)" mode="dark" 
								shape="square"/>
						</view>
					</u-col>
				</u-row>
			</view>
			<view class="line-cla">
				<u-row gutter="16">
					<u-col span="1">
						<view>
							<u-icon name="play-right" color="#2979ff" size="28"></u-icon>
						</view>
					</u-col>
					<u-col span="3">
						<view class="flex-item-30">状态</view>
					</u-col>
					<u-col span="4">
						<view class="flex-item-70">
							<u-tag :text="formatStockInStatus(stockInDetail.status)"
								:type="formatStockInStatusType(stockInDetail.status)" mode="dark"
								shape="circle" />
						</view>
					</u-col>
				</u-row>
			</view>
			<view class="line-cla">
				<u-row gutter="16">
					<u-col span="1">
						<view>
							<u-icon name="play-right" color="#2979ff" size="28"></u-icon>
						</view>
					</u-col>
					<u-col span="3">
						<view class="flex-item-30">入库类型</view>
					</u-col>
					<u-col span="4">
						<view class="flex-item-70">
							<u-tag :text="formatSourceType(stockInDetail.sourceType)" mode="dark"
								shape="circle" />
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<view v-for="(item,index) in stockInDetail.details" :key="index" :index="index">
			<u-card :border="false" margin="0rpx 0rpx" :thumb="thumb" thumb-width="40" :title-size="35"
				border-radius="0" :title="item.productName">
				<view slot="body">
					<view style="width: 500rpx;" class="u-border-right">
						<view>
							<u-row gutter="7">
								<u-col span="4">
									<view class="flex-item-20">产品款号</view>
								</u-col>
								<u-col span="3">
									<view>{{item.productNo}}</view>
								</u-col>
							</u-row>
						</view>
						<view class="line-cla2">
							<u-row gutter="7">
								<u-col span="4">
									<view class="flex-item-20">计量单位</view>
								</u-col>
								<u-col span="3">
									<view>{{item.unit}}</view>
								</u-col>
							</u-row>
						</view>
						<view class="line-cla2">
							<u-row gutter="7">
								<u-col span="4">
									<view class="flex-item-20">金额</view>
								</u-col>
								<u-col span="3">
									<view>{{item.amount}}</view>
								</u-col>
							</u-row>
						</view>
						<view class="line-cla2">
							<u-row gutter="7">
								<u-col span="4">
									<view class="flex-item-20">副计量单位</view>
								</u-col>
								<u-col span="3">
									<view>{{item.assistantUnit}}</view>
								</u-col>
							</u-row>
						</view>
					</view>
					<view style="position: absolute;right: 80rpx;top: 120rpx;">
						<view class="line-cla2">
							<u-row gutter="7">
								<u-col span="4">
									<view class="flex-item-20">数量</view>
								</u-col>
								<u-col span="3">
									<view>{{item.quantity}}</view>
								</u-col>
							</u-row>
						</view>
						<view class="line-cla2">
							<u-row gutter="7">
								<u-col span="4">
									<view class="flex-item-20">单价</view>
								</u-col>
								<u-col span="3">
									<view>{{item.price}}</view>
								</u-col>
							</u-row>
						</view>
						<view class="line-cla2">
							<u-row gutter="7">
								<u-col span="4">
									<view class="flex-item-20">副计量单位数量</view>
								</u-col>
								<u-col span="3">
									<view>{{item.quantityByAssistant}}</view>
								</u-col>
							</u-row>
						</view>
					</view>
				</view>
			</u-card>
		</view>
		<view style="height: 80rpx;"></view>
		<view style="width: 100%;position: fixed;bottom: 0;z-index: 9999;">
			<uni-goods-nav :options="options" :button-group="buttonGroup" />
		</view>
	</view>
</template>

<script>
	import {
		formatSourceType,
		formatSourceTypeImg,
		formatStockInStatus,
		formatStockInStatusType,
		formatProperties,
		formatPropertiesType
	} from '@/util/index.js'
	export default {
		data() {
			return {
				options: [{
					icon: '/static/edit.png',
					text: '调整'
				}],
				buttonGroup: [{
						text: '拒绝',
						backgroundColor: '#e54d42',
						color: '#fff'
					},
					{
						text: '通过',
						backgroundColor: '#39b54a',
						color: '#fff'
					}
				],
				stockInDetail: {},
				thumb: '/static/stockIn/product.png',
			}
		},
		onLoad(e) {
			let id = e.id
			this.getDetailList(id)
		},
		methods: {
			formatSourceType,
			formatSourceTypeImg,
			formatStockInStatus,
			formatStockInStatusType,
			formatProperties,
			formatPropertiesType,
			async getDetailList(id) {
				let result = await this.$myRequest({
					url: '/stock-in/' + id
				})
				console.log(result)
				this.stockInDetail = result
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex-item-30 {
		color: #005500;
		font-size: 30rpx;
	}

	.flex-item-70 {
		text-decoration: underline;
		margin-left: 50rpx;
	}
	.line-cla {
		margin: 20rpx 0;
	}
	.line-cla2 {
		margin: 14rpx 0;
	}
</style>
