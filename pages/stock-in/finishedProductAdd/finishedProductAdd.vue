<template>
	<view>
		<view class="wrap">
			<u-field v-model="sourceTypeName" disabled icon="home" :clearable="false" required label-width="200"
				placeholder="请选择入库类型" label="入库类型">
				<!-- <u-button  slot="right" size="mini" type="primary">选择</u-button> -->
			</u-field>
			<u-field v-model="warehouseName" @click="warehouseClick" required icon="shopping-cart" label-width="200"
				:disabled="true" right-icon="arrow-down-fill" placeholder="请选择仓库" label="仓库"></u-field>
			<view style="margin-top: 15rpx;">
				<view class="u-border-bottom" style="background-color: #FFFFFF;text-align: center;" >
					<text style="font-size: 50rpx;">成品信息</text>
				</view>
				<view   v-for="(item,index) in productArr" :index="index" :key="index">
					<u-card :title="item.productNo" :sub-title="item.color" title-size="40" border-radius="0" :border="false"
					@head-click="headClick(item)">
						<view slot="body" class="main" v-if="item.showw">
							<view style="margin-bottom: 20rpx;" class="No">
								<text>品名</text>
								<text style="margin-left: 50rpx;">{{item.productName}}</text>
								<text style="margin-left: 100rpx" >单价</text>
									<text style="margin-left: 50rpx;width: 30rpx;text-align: center;display: inline-block;">{{item.settlePricee}}</text>
								</view>
							<view class="Specifications">
								<text>规格</text>
								<view v-for="(itemm,index) in item.spec " >
									<text style="margin-left: 50rpx;width: 30rpx;text-align: center;display: inline-block;">{{itemm.specification}}</text>
								</view>
							</view>
							<view  class="number" >
								<text>数量</text>
								<view v-for="(itemm,index) in item.spec " >
									<text style="margin-left: 50rpx;width: 30rpx;text-align: center;display: inline-block;" @tap="toEdit(itemm)">{{itemm.num}}</text>
								</view>
							</view>
							<view class="total">
								<text style="color:#000000;font-size: 32rpx;float: left;">合计:<text style="color: #FF0000;margin-left: 40rpx">{{item.allNum}}</text></text>
								<text style="color:#000000;font-size: 32rpx;float: right;">金额:<text style="color: #FF0000;">￥{{item.allNum*item.settlePricee}}</text></text>
							</view>
							<view class="footer-box">
								<view class="my-iconfont" @tap="toDel(index)">
									<u-icon name="close-circle" color="#e54d42" size="50" label="" label-color="#e54d42">
									</u-icon>
								</view>
							</view>
						</view>
					</u-card>
				</view>
				<view style="background-color: #FFFFFF;" class="u-border-top">
					<view style="padding-top: 20rpx;padding-bottom: 20rpx;">
						<u-icon name="saomiao" class="saomiao_cla" custom-prefix="custom-icon" size="60"
							color="#00aaff"></u-icon>
						<u-icon name="icon-test" class="add_cla" custom-prefix="custom-icon" size="60"
							@click="toAddProduct" color="#00aaff"></u-icon>
					</view>
				</view>
				<view class="wrap" style="margin-top: 15rpx;">
					<u-calendar v-model="calendarShow" mode="date" @change="calendarChange"></u-calendar>
					<u-field :field-style="fieldStyle"  disabled icon="star" label-width="200"
						placeholder="成品" label="成品"></u-field>
					<u-field v-model="date" icon="calendar" @click="dateClick" label-width="200" :disabled="true"
						right-icon="arrow-down-fill" placeholder="请选择出库日期" label="出库日期"></u-field>
				</view>

				<view class="wrap" style="margin-top: 15rpx;">
					<u-field v-model="description" type="textarea" icon="tags" label-width="200" placeholder="备注" label="备注">
					</u-field>
				</view>
				<view>
					<u-button throttle-time="2000" type="primary" :ripple="true" :plain="true" @click="submit">确认开单</u-button>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="center" length="90%" :closeable="true" height="300rpx">

				<view style="text-align: center;"  v-for="(item,index) in productArr" :index="index" :key="index" >
					<text style="font-size: 30rpx;">请输入数量</text>
					<u-input v-model="sp.num" :type="type" :border="border" style="margin-top: 40rpx;" />
					<u-button @tap="submitPop(item)" size="medium" type="primary" style="margin-top: 70rpx;">确定</u-button>
				</view>

		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sourceTypeName: '其他入库',
				warehouseName: '',
				warehouseId: '',
				productArr: [],
				productArr:[],
				total:'',
				show:false,
				value: '',
				type: 'text',
				border: true,
				sp:'',
				calendarShow: false,
				fieldStyle: {
					'color': '#ff557f',
				},
				date: '',
				description: '',
				tempProductArr:[],
				spec:[]
			}
		},
		onShow() {
			let that = this
			uni.getStorage({
				key: 'selectStockInWarehouseByFinishedProductAdd',
				success(res) {
					if (that.warehouseId !== res.data.id) {
						that.productArr = []
					}
					that.warehouseName = res.data.name
					that.warehouseId = res.data.id
					uni.removeStorage({
						key: 'selectStockInWarehouseByFinishedProductAdd'
					});
				}
			})
			uni.getStorage({
				key:'out-add-product',
				success(res){
					for (var j=0;j<res.data.length;j++){
						let only = res.data[j].productNo + '-' + res.data[j].color
						if (that.tempProductArr.indexOf(only) > -1) {
							let index = that.tempProductArr.indexOf(only)
							that.productArr[index].allNum = that.productArr[index].allNum + res.data[j].allNum
							for (var s=0;s<that.productArr[index].spec.length;s++){
								that.productArr[index].spec[s].num = that.productArr[index].spec[s].num + res.data[j].spec[s].num
								console.log(that.productArr[index].spec[s].num)
							}
						}
						else{
							that.tempProductArr.push(only)
							that.productArr.push({
								productName:res.data[j].productName ,
								productNo:res.data[j].productNo ,
								settlePricee:res.data[j].settlePricee,
								spec:res.data[j].spec ,
								color:res.data[j].color,
								showw:true,
								allNum:res.data[j].allNum
							})
						}

					}
					this.settlePricee = res.data.settlePricee
					uni.removeStorage({
						key: 'out-add-product'
					});
				}
			})
		},
		methods: {
			calendarChange(e) {
				this.date = e.result
			},
			dateClick() {
				this.calendarShow = true
			},
			headClick(item) {
				item.showw = !item.showw
				console.log('执行了')
			},
			submitPop(item) {
				if (!this.$u.test.digits(this.sp.num)) {
					uni.showToast({
						title: '只能输入整数',
						icon: 'none'
					})
					this.sp.num = 0
					return
				}
				console.log(item)
				console.log(this.sp.num)
				this.allNum = this.sp.num + item.allNum
				console.log(this.allNum)
				this.show = false
			},
			toDel(index) {
				console.log('执行了')
				let that = this
				this.productArr.splice(index, 1)
			},
			toEdit(itemm) {
				this.show = true
				this.sp = itemm
				console.log(this.sp.num)
				console.log(itemm)
			},
			warehouseClick() {
				uni.navigateTo({
					url: 'selectWarehouseByFinishedProductAdd?supplierNames=' + this.warehouseName
				})
				console.log('选仓库')
			},
			toAddProduct() {
				if(this.warehouseName !==''){
					uni.navigateTo({
						url: 'finished-add-add?warehouseId=' + this.warehouseId
					});
				}
			},
			async submit() {
				if (this.$u.test.isEmpty(this.warehouseName)) {
					uni.showToast({
						title: '仓库不能为空',
						icon: 'none'
					})
					return
				}
				let productDetails = []
				console.log(this.productArr)
				for(var s=0;s<this.productArr.length;s++){
					for(var j=0;j<this.productArr[s].spec.length;j++){
						this.skuId = this.productArr[s].spec[j].skuId
					}
					productDetails.push({
						price:this.productArr[s].settlePricee,
						quantity:this.productArr[s].allNum,
						skuId: this.skuId
					})
				}
				let params = {
					date: this.date,
					description: this.description,
					warehouseId: this.warehouseId,
					details:productDetails
				}
				console.log(params)
				let result = await this.$myRequest({
					url: '/product-in/',
					method: 'post',
					ContentType: 'application/json;charset=UTF-8',
					data: params
				})
				if (result === 200) {
					uni.showToast({
						title: '开单成功',
						icon: 'success'
					})
					setTimeout(function() {
						uni.switchTab({
							url: '../../index/index'
						})
					}, 800);
				} else {
					uni.showToast({
						title: '开单失败',
						icon: 'none'
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f5f4f9;
	}

	.wrap {
		padding: 30rpx;
		background-color: #fff;
	}

	.saomiao_cla {
		position: relative;
		left: 150rpx;
	}

	.add_cla {
		position: relative;
		left: 470rpx;
	}
	.Specifications{
		flex-direction: row;
		display: flex;
	}
	.number{
		margin-top: 30rpx;
		flex-direction: row;
		display: flex;
	}
	.footer-box {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 17%;
	}
	.my-iconfont {
		color: #0081ff;
		margin-left: 420rpx;
		margin-top: -260rpx;
		margin-bottom: -30rpx;
	}
	.total{

		margin-top: 30rpx;
		font-size: 30rpx;
		color: #FF0000;
	}
	.unitPrice{
		margin-top: 30rpx;
	}
</style>
