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
		<view v-for="(item,index) in stockInDetail.details" :key="index" :index="index"  v-if="!canEdit">
			<u-card :border="false" margin="0rpx 0rpx" :thumb="thumb" thumb-width="40" :title-size="35"
				border-radius="0" :title="item.productName">
				<view slot="body">
					<view style="width: 350rpx;" class="u-border-right">
						<view style="width: 380rpx;">
							<u-row gutter="7">
								<u-col span="5">
									<view class="flex-item-20">产品款号</view>
								</u-col>
								<u-col span="2">
									<view style="width: 180rpx;">{{item.productNo}}</view>
								</u-col>
							</u-row>
						</view>
						<view class="line-cla2" style="width: 380rpx;">
							<u-row gutter="8">
								<u-col span="5">
									<view class="flex-item-20">计量单位</view>
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
									<view class="flex-item-20">金额</view>
								</u-col>
								<u-col span="2">
									<view style="width: 180rpx;color: #ff0000;">{{item.amount}}</view>
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
										<u-number-box :positive-integer="false" bg-color="#efe5fe" v-model="item.quantity"></u-number-box>
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
									<u-number-box :positive-integer="false" bg-color="#efe5fe" v-model="item.price"></u-number-box>
								</view>
								</u-col>
							</u-row>
						</view>
						<view class="line-cla2" v-if="stockInDetail.properties === 0">
							<view>副计量单位数量</view>
							<view style="margin-top: 14rpx;position: relative;right: -90rpx;">
								<u-number-box :positive-integer="false" bg-color="#efe5fe" v-model="item.quantityByAssistant"></u-number-box>
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
						<view class="line-cla2" v-if="stockInDetail.properties === 0">
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
		<view v-for="(item,index) in editObj.detail" :key="index" :index="index" v-if="canEdit">
			<u-card :border="false" margin="0rpx 0rpx" :thumb="thumb" thumb-width="40" :title-size="35"
				border-radius="0" :title="item.productName">
				<view slot="body">
					<view style="width: 350rpx;" class="u-border-right">
						<view style="width: 380rpx;">
							<u-row gutter="7">
								<u-col span="5">
									<view class="flex-item-20">产品款号</view>
								</u-col>
								<u-col span="2">
									<view style="width: 180rpx;">{{item.productNo}}</view>
								</u-col>
							</u-row>
						</view>
						<view class="line-cla2" style="width: 380rpx;">
							<u-row gutter="8">
								<u-col span="5">
									<view class="flex-item-20">计量单位</view>
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
									<view class="flex-item-20">金额</view>
								</u-col>
								<u-col span="2">
									<view style="width: 180rpx;color: #ff0000;">{{item.amount}}</view>
								</u-col>
							</u-row>
						</view>
					</view>
					<view style="position: absolute;right: 80rpx;top: 120rpx;">
						<view class="line-cla2">
							<u-row gutter="7">
								<u-col span="4">
									<view>数量</view>
								</u-col>
								<u-col span="3">
									<!-- <view>{{item.quantity}}</view> -->
									<view>
										<u-number-box :positive-integer="false" bg-color="#efe5fe" v-model="item.quantity"></u-number-box>
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
									<u-number-box :positive-integer="false" bg-color="#efe5fe" v-model="item.price"></u-number-box>
								</view>
								</u-col>
							</u-row>
						</view>
						<view class="line-cla2" v-if="stockInDetail.properties === 0">
							<view>副计量单位数量</view>
							<view style="margin-top: 14rpx;position: relative;right: -90rpx;">
								<u-number-box :positive-integer="false" bg-color="#efe5fe" v-model="item.quantityByAssistant"></u-number-box>
							</view>
						</view>
					</view>
				</view>
			</u-card>
		</view>
		<u-divider>没有更多了</u-divider>
		<view style="height: 100rpx;"></view>
		<view v-if="stockInDetail.status === -1" style="width: 100%;position: fixed;bottom: 0;z-index: 9999;">
			<uni-goods-nav :options="options" @click="editClick" @buttonClick="buttonClick" :button-group="buttonGroup" />
		</view>
		<view v-if="stockInDetail.status === 0" style="width: 100%;position: fixed;bottom: 0;z-index: 9999;">
			<uni-goods-nav :options="options" @click="editClick" @buttonClick="buttonClick0" :button-group="buttonGroup0" />
		</view>
		<view v-if="stockInDetail.status === 1" style="width: 100%;position: fixed;bottom: 0;z-index: 9999;">
			<uni-goods-nav :options="options" @click="editClick" @buttonClick="buttonClick1" :button-group="buttonGroup1" />
		</view>
		<view v-if="canEdit" style="width: 100%;position: fixed;bottom: 0;z-index: 9999;">
			<uni-goods-nav :options="options" @click="editClick" @buttonClick="buttonClick2" :button-group="buttonGroup2" />
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
						text: '删除',
						backgroundColor: '#e54d42',
						color: '#fff'
					}
				],
				buttonGroup0: [{
						text: '删除',
						backgroundColor: '#e54d42',
						color: '#fff'
					},
					{
						text: '审核',
						backgroundColor: '#39b54a',
						color: '#fff'
					}
				],
				buttonGroup1: [{
						text: '撤销审核',
						backgroundColor: '#ffaa00',
						color: '#fff'
					}
				],
				buttonGroup2: [{
						text: '确认修改',
						backgroundColor: '#20a0ff',
						color: '#fff'
					}
				],
				stockInDetail: {},
				thumb: '/static/stockIn/product.png',
				canEdit: false,
				editObj: '',
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
				this.canEdit = false
				let result = await this.$myRequest({
					url: '/stock-in/' + id
				})
				console.log(result)
				this.stockInDetail = result
			},
			editClick(e) {
				if(this.stockInDetail.status === 0) {
					this.canEdit = !this.canEdit
					let arr = []
					for (var i = 0; i < this.stockInDetail.details.length; i++) {
						arr.push({
							amount: this.stockInDetail.details[i].amount,
							assistantUnit: this.stockInDetail.details[i].assistantUnit,
							assistantUnit: this.stockInDetail.details[i].assistantUnit,
							id: this.stockInDetail.details[i].id,
							price: this.stockInDetail.details[i].price,
							productId: this.stockInDetail.details[i].productId,
							productName: this.stockInDetail.details[i].productName,
							productNo: this.stockInDetail.details[i].productNo,
							quantity: this.stockInDetail.details[i].quantity,
							quantityByAssistant: this.stockInDetail.details[i].quantityByAssistant,
							stockInId: this.stockInDetail.details[i].stockInId,
							unit: this.stockInDetail.details[i].unit
						})
					}
					this.editObj = {
						amount: this.stockInDetail.amount,
						arrivalNo: this.stockInDetail.arrivalNo,
						datetime: this.stockInDetail.datetime,
						description: this.stockInDetail.description,
						id: this.stockInDetail.id,
						no: this.stockInDetail.no,
						orderNo: this.stockInDetail.orderNo,
						properties: this.stockInDetail.properties,
						quantity: this.stockInDetail.quantity,
						sourceType: this.stockInDetail.sourceType,
						status: this.stockInDetail.status,
						warehouse: this.stockInDetail.warehouse,
						warehouseId: this.stockInDetail.warehouseId,
						detail: arr
					}
					console.log(this.editObj)
				} else {
					uni.showToast({
						title: '当前单据已取消或者已审核',
						icon: 'none'
					})
					return
				}
			},
			async buttonClick(e) {
				let result = await this.$myRequest({
					url: '/stock-in/'+this.stockInDetail.id,
					method: 'delete'
				})
				if(result === 200) {
					uni.showToast({
						title: '删除成功',
						icon: 'success'
					})
					setTimeout(function() {
						uni.switchTab({
							url:'../index/index'
						})
					}, 800);
				}
			},
			async buttonClick0(e) {
				if(e.index === 0) {
					let result = await this.$myRequest({
						url: '/stock-in/'+this.stockInDetail.id,
						method: 'delete'
					})
					if(result === 200) {
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
						setTimeout(function() {
							uni.switchTab({
								url:'../index/index'
							})
						}, 800);
					}
				}
				if(e.index === 1) {
					let result = await this.$myRequest({
						url: '/stock-in/check/'+this.stockInDetail.id,
						method: 'put'
					})
					if(result === 200) {
						uni.showToast({
							title: '审核成功',
							icon: 'success'
						})
						// setTimeout(function() {
						// 	uni.switchTab({
						// 		url:'../index/index'
						// 	})
						// }, 800);
						this.getDetailList(this.stockInDetail.id)
					}
				}
			},
			async buttonClick1(e) {
				let result = await this.$myRequest({
					url: '/stock-in/uncheck/'+this.stockInDetail.id,
					method: 'put'
				})
				if(result === 200) {
					uni.showToast({
						title: '撤销审核成功',
						icon: 'success'
					})
					// setTimeout(function() {
					// 	uni.switchTab({
					// 		url:'../index/index'
					// 	})
					// }, 800);
					this.getDetailList(this.stockInDetail.id)
				}
			},
			async buttonClick2(e) {
				for (var i = 0; i < this.editObj.detail.length; i++) {
					if(this.editObj.detail[i].exchangeRate * this.editObj.detail[i].quantityByAssistant !== this.editObj.detail[i].quantity) {
						console.log(this.editObj.detail[i].exchangeRate * this.editObj.detail[i].quantityByAssistant)
						uni.showToast({
							title: this.editObj.detail[i].productName+'的数量填写错误',
							icon: 'none'
						})
						return
					} else {
						this.editObj.detail[i].amount = this.editObj.detail[i].price * this.editObj.detail[i].quantity
					} 
				}
				let result = await this.$myRequest({
					url: '/stock-in/',
					method: 'put',
					data: {
						 
					}
				})
				if(result === 200) {
					uni.showToast({
						title: '修改成功',
						icon: 'success'
					})
					this.getDetailList(this.stockInDetail.id)
				}
			},
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
	.edit-num {
		text-align: center;
	}
</style>
