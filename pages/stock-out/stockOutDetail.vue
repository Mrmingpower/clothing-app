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
						<view class="flex-item-30">出库单号</view>
					</u-col>
					<u-col span="4">
						<view class="flex-item-70">{{stockOutDetail.no}}</view>
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
						<view class="flex-item-30">出库时间</view>
					</u-col>
					<u-col span="8">
						<view v-if="!canEdit" style="display: inline;" class="flex-item-70">{{stockOutDetail.date}}</view>
						<view v-if="canEdit" style="display: inline;" class="flex-item-70">{{editObj.date}}</view>
						<view v-if="canEdit" style="display: inline;margin-left: 10rpx;">
							<u-icon name="edit-pen" @click="editDate" color="#2979ff" size="28"></u-icon>
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
						<view class="flex-item-30">仓库</view>
					</u-col>
					<u-col span="4">
						<view class="flex-item-70">{{stockOutDetail.warehouseName}}</view>
					</u-col>
				</u-row>
			</view>
			
			<!-- <view class="line-cla">
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
						<view class="flex-item-70">{{stockOutDetail.quantity}}</view>
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
						<view class="flex-item-70">{{stockOutDetail.amount}}</view>
					</u-col>
				</u-row>
			</view> -->
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
							<u-tag :text="formatProperties(stockOutDetail.properties)"
								:type="formatPropertiesType(stockOutDetail.properties)" mode="dark" 
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
							<u-tag :text="formatStockInStatus(stockOutDetail.status)"
								:type="formatStockInStatusType(stockOutDetail.status)" mode="dark"
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
						<view class="flex-item-30">出库类型</view>
					</u-col>
					<u-col span="4">
						<view class="flex-item-70">
							<u-tag :text="formatSourceType(stockOutDetail.sourceType)" mode="dark"
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
						<view class="flex-item-30">收货单位类型</view>
					</u-col>
					<u-col span="4">
						<view class="flex-item-70">
							<u-tag :text="formatReceiver(stockOutDetail.receiverType)"
								:type="formatReceiverType(stockOutDetail.receiverType)" mode="dark" 
								shape="square"/>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<view v-for="(item,index) in stockOutDetail.detail" :key="index" :index="index" v-if="!canEdit">
			<u-card :border="false" margin="0rpx 0rpx" :thumb="thumb" thumb-width="40" :title-size="35"
				border-radius="0" :title="item.productName" :sub-title="item.productNo">
				<view slot="body">
					<view style="width: 350rpx;" class="u-border-right">
						<view style="width: 380rpx;">
							<u-row gutter="7">
								<u-col span="5">
									<view class="flex-item-20">转换率</view>
								</u-col>
								<u-col span="2">
									<view style="width: 180rpx;color: #ff0000;">{{item.exchangeRate}}</view>
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
						<!-- <view class="line-cla2" style="width: 380rpx;">
							<u-row gutter="7">
								<u-col span="5">
									<view class="flex-item-20">转换率</view>
								</u-col>
								<u-col span="2">
									<view style="width: 180rpx;color: #ff0000;">{{item.exchangeRate}}</view>
								</u-col>
							</u-row>
						</view> -->
					</view>
					<view style="position: absolute;right: 80rpx;top: 120rpx;" v-if="canEdit" v-for="(itemm,index) in editObj.detail">
						<view class="line-cla2">
							<u-row gutter="7">
								<u-col span="4">
									<view>数量</view>
								</u-col>
								<u-col span="3">
									<!-- <view>{{item.quantity}}</view> -->
									<view>
										<u-number-box bg-color="#efe5fe" v-model="itemm.quantity"></u-number-box>
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
									<u-number-box bg-color="#efe5fe" v-model="itemm.price"></u-number-box>
								</view>
								</u-col>
							</u-row>
						</view>
						<view class="line-cla2">
							<view>副计量单位数量</view>
							<view style="margin-top: 14rpx;position: relative;right: -90rpx;">
								<u-number-box bg-color="#efe5fe" v-model="itemm.quantityByAssistant"></u-number-box>
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
		<view v-for="(itemm,index) in editObj.detail" :key="index" :index="index" v-if="canEdit">
			<u-card :border="false" margin="0rpx 0rpx" :thumb="thumb" thumb-width="40" :title-size="35"
				border-radius="0" :title="itemm.productName" :sub-title="itemm.productNo">
				<view slot="body">
					<view style="width: 350rpx;" class="u-border-right">
						<view style="width: 380rpx;">
							<u-row gutter="7">
								<u-col span="5">
									<view class="flex-item-20">转换率</view>
								</u-col>
								<u-col span="2">
									<view style="width: 180rpx;color: #ff0000;">{{itemm.exchangeRate}}</view>
								</u-col>
							</u-row>
						</view>
						<view class="line-cla2" style="width: 380rpx;">
							<u-row gutter="8">
								<u-col span="5">
									<view class="flex-item-20">计量单位</view>
								</u-col>
								<u-col span="3">
									<view style="width: 180rpx;">{{itemm.unit}}</view>
								</u-col>
							</u-row>
						</view>
						<view class="line-cla2" style="width: 400rpx;">
							<u-row gutter="7">
								<u-col span="5">
									<view class="flex-item-20">副计量单位</view>
								</u-col>
								<u-col span="2">
									<view style="width: 180rpx;">{{itemm.assistantUnit}}</view>
								</u-col>
							</u-row>
						</view>
						<view class="line-cla2" style="width: 380rpx;">
							<u-row gutter="7">
								<u-col span="5">
									<view class="flex-item-20">金额</view>
								</u-col>
								<u-col span="2">
									<view style="width: 180rpx;color: #ff0000;">{{itemm.amount}}</view>
								</u-col>
							</u-row>
						</view>
						<!-- <view class="line-cla2" style="width: 380rpx;">
							<u-row gutter="7">
								<u-col span="5">
									<view class="flex-item-20">转换率</view>
								</u-col>
								<u-col span="2">
									<view style="width: 180rpx;color: #ff0000;">{{item.exchangeRate}}</view>
								</u-col>
							</u-row>
						</view> -->
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
										<u-number-box :positive-integer="false" bg-color="#efe5fe" v-model="itemm.quantity"></u-number-box>
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
									<u-number-box :positive-integer="false" bg-color="#efe5fe" v-model="itemm.price"></u-number-box>
								</view>
								</u-col>
							</u-row>
						</view>
						<view class="line-cla2">
							<view>副计量单位数量</view>
							<view style="margin-top: 14rpx;position: relative;right: -90rpx;">
								<u-number-box :positive-integer="false" bg-color="#efe5fe" v-model="itemm.quantityByAssistant"></u-number-box>
							</view>
						</view>
					</view>
				</view>
			</u-card>
		</view>
		<u-divider>没有更多了</u-divider>
		<view style="height: 100rpx;"></view>
		<view v-if="stockOutDetail.status === -1" style="width: 100%;position: fixed;bottom: 0;z-index: 9999;">
			<uni-goods-nav :options="options" @click="editClick" @buttonClick="buttonClick" :button-group="buttonGroup" />
		</view>
		<view v-if="stockOutDetail.status === 0" style="width: 100%;position: fixed;bottom: 0;z-index: 9999;">
			<uni-goods-nav :options="options" @click="editClick" @buttonClick="buttonClick0" :button-group="buttonGroup0" />
		</view>
		<view v-if="stockOutDetail.status === 1" style="width: 100%;position: fixed;bottom: 0;z-index: 9999;">
			<uni-goods-nav :options="options" @click="editClick" @buttonClick="buttonClick1" :button-group="buttonGroup1" />
		</view>
		<view v-if="canEdit" style="width: 100%;position: fixed;bottom: 0;z-index: 9999;">
			<uni-goods-nav :options="options" @click="editClick" @buttonClick="buttonClick2" :button-group="buttonGroup2" />
		</view>
		<u-calendar v-model="calendarShow" mode="date" @change="calendarChange"></u-calendar>
	</view>
</template>

<script>
	import {
		formatSourceType,
		formatSourceTypeImg,
		formatStockInStatus,
		formatStockInStatusType,
		formatProperties,
		formatPropertiesType,
		formatReceiverType,
		formatReceiver
	} from '@/util/index.js'
	export default {
		data() {
			return {
				calendarShow: false,
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
				stockOutDetail: {},
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
			formatReceiverType,
			formatReceiver,
			calendarChange(e) {
				this.editObj.date = e.result
			},
			editDate() {
				this.calendarShow = true
			},
			async getDetailList(id) {
				this.canEdit = false
				let result = await this.$myRequest({
					url: '/stock-out/' + id
				})
				console.log('result')
				console.log(result)
				this.stockOutDetail = result
			},
			editClick(e) {
				if(this.stockOutDetail.status === 0) {
					this.canEdit = !this.canEdit
					let arr = []
					for (var i = 0; i < this.stockOutDetail.detail.length; i++) {
						arr.push({
							quantity: this.stockOutDetail.detail[i].quantity,
							quantityByAssistant: this.stockOutDetail.detail[i].quantityByAssistant,
							exchangeRate: this.stockOutDetail.detail[i].exchangeRate,
							price: this.stockOutDetail.detail[i].price,
							unit: this.stockOutDetail.detail[i].unit,
							assistantUnit: this.stockOutDetail.detail[i].assistantUnit,
							productName: this.stockOutDetail.detail[i].productName,
							productNo: this.stockOutDetail.detail[i].productNo,
							amount: this.stockOutDetail.detail[i].amount,
							productSkuId: this.stockOutDetail.detail[i].productSkuId,
							productSpuId: this.stockOutDetail.detail[i].productSpuId,
							remark1: this.stockOutDetail.detail[i].remark1,
							remark2: this.stockOutDetail.detail[i].remark2,
							remark3: this.stockOutDetail.detail[i].remark3,
							id: this.stockOutDetail.detail[i].id
						})
					}
					this.editObj = {
						date: this.stockOutDetail.date,
						no: this.stockOutDetail.no,
						properties: this.stockOutDetail.properties,
						sourceType: this.stockOutDetail.sourceType,
						warehouseId: this.stockOutDetail.warehouseId,
						description: this.stockOutDetail.description,
						id: this.stockOutDetail.id,
						detail: arr
					}
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
					url: '/stock-in/'+this.stockOutDetail.id,
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
						// uni.navigateBack({
						// 	url: 'stockOut'
						// })
					}, 800);
				}
			},
			async buttonClick0(e) {
				if(e.index === 0) {
					let result = await this.$myRequest({
						url: '/stock-out/'+this.stockOutDetail.id,
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
						url: '/stock-out/check/'+this.stockOutDetail.id,
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
						this.getDetailList(this.stockOutDetail.id)
					}
				}
			},
			async buttonClick1(e) {
				let result = await this.$myRequest({
					url: '/stock-out/revoke/'+this.stockOutDetail.id,
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
					this.getDetailList(this.stockOutDetail.id)
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
					} 
				}
				let detailArr = []
				for (var i = 0; i < this.editObj.detail.length; i++) {
					detailArr.push({
						amount: this.editObj.detail[i].amount,
						id: this.editObj.detail[i].id,
						productSkuId: this.editObj.detail[i].productSkuId,
						productSpuId: this.editObj.detail[i].productSpuId,
						quantity: this.editObj.detail[i].quantity,
						remark1: this.editObj.detail[i].remark1,
						remark2: this.editObj.detail[i].remark2,
						remark3: this.editObj.detail[i].remark3
					})
				}
				console.log(this.editObj)
				let result = await this.$myRequest({
					url: '/stock-out/',
					method: 'put',
					ContentType: 'application/json;charset=UTF-8',
					data: {
						 date: this.editObj.date,
						 id: this.editObj.id,
						 no: this.editObj.no,
						 properties: this.editObj.properties,
						 sourceType: this.editObj.sourceType,
						 warehouseId: this.editObj.warehouseId,
						 description: this.editObj.description,
						 details: detailArr
					}
				})
				console.log('tttresult')
				console.log(result)
				if(result === 200) {
					uni.showToast({
						title: '修改成功',
						icon: 'success'
					})
					this.getDetailList(this.stockOutDetail.id)
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
