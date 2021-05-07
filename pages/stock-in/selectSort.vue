<template>
	<view>
		<view class="content">
			<HM-dragSorts :list="list" :isLongTouch="true" :rowHeight="55" @change="change" @confirm="confirm"
				@onclick="onclick">
				<template slot="rowContent" slot-scope="{ row }">
					<view class="row">
						<text class="text">{{row.name}}</text>
					</view>
					<view style="position: absolute;right: 300rpx;background-color: #20a0ff;" @click.stop="changeAsc(row)">
						<text style="color: #ffffff;" v-if="row.asc === true">正序</text><u-icon v-if="row.asc === true" name="arrow-downward" color="#ffffff" size="28"></u-icon>
						<text style="color: #FFFFFF;" v-if="row.asc === false">倒序</text><u-icon v-if="row.asc === false" name="arrow-upward" color="#ffffff" size="28"></u-icon>
					</view>
				</template>
			</HM-dragSorts>
		</view>
		<view style="width: 100%;position: fixed;bottom: 0;z-index: 9999;">
			<uni-goods-nav :options="options" @click="throttleClearClick" @buttonClick="saveSort" :button-group="buttonGroup" />
		</view>
		<u-mask :show="maskShow" :mask-click-able="false">
			<view class="warp">
				<u-loading size="50" mode="circle"></u-loading>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import dragSorts from '@/components/HM-dragSorts/HM-dragSorts.vue'
	export default {
		components: {
			'HM-dragSorts': dragSorts
		},
		data() {
			return {
				maskShow: false,
				options: [{
					icon: '/static/clear.png',
					text: '重置'
				}],
				buttonGroup: [{
					text: '确认',
					backgroundColor: '#00aaff',
					color: '#fff'
				}],
				defaultList: [{
						"name": "id","value": "id","asc": false
					},
					{
						"name": "单号","value": "no","asc": false
					},
					{
						"name": "单据状态","value": "status","asc": false
					},
					{
						"name": "供应商","value": "supplierId","asc": false
					},
					{
						"name": "仓库","value": "warehouseId","asc": false
					},
					{
						"name": "订单日期","value": "datetime","asc": false
					},
					{
						"name": "数量","value": "quantity","asc": false
					},
					{
						"name": "金额","value": "amount","asc": false
					}],
				sortList: [{
						"name": "id","value": "id","asc": false
					},
					{
						"name": "单号","value": "no","asc": false
					},
					{
						"name": "单据状态","value": "status","asc": false
					},
					{
						"name": "供应商","value": "supplierId","asc": false
					},
					{
						"name": "仓库","value": "warehouseId","asc": false
					},
					{
						"name": "订单日期","value": "datetime","asc": false
					},
					{
						"name": "数量","value": "quantity","asc": false
					},
					{
						"name": "金额","value": "amount","asc": false
					}],
				list: [{
						"name": "id","value": "id","asc": false
					},
					{
						"name": "单号","value": "no","asc": false
					},
					{
						"name": "单据状态","value": "status","asc": false
					},
					{
						"name": "供应商","value": "supplierId","asc": false
					},
					{
						"name": "仓库","value": "warehouseId","asc": false
					},
					{
						"name": "订单日期","value": "datetime","asc": false
					},
					{
						"name": "数量","value": "quantity","asc": false
					},
					{
						"name": "金额","value": "amount","asc": false
					}],
			}
		},
		onLoad(e) {
			let sortList = JSON.parse(e.sortList)
			if(sortList.length !== 0) {
				this.sortList = sortList
				this.list = sortList
			}
		},
		methods: {
			onclick(e) {
				console.log('=== onclick start ===');
				console.log("被点击行: " + JSON.stringify(e.value));
				console.log("被点击下标: " + JSON.stringify(e.index));
				console.log('=== onclick end ===');
			},
			throttleClearClick() {
				this.$u.throttle(this.clearClick, 1000)
			},
			clearClick() {
				// this.maskShow = true
				this.list = [{
						"name": "id","value": "id","asc": false
					},
					{
						"name": "单号","value": "no","asc": false
					},
					{
						"name": "单据状态","value": "status","asc": false
					},
					{
						"name": "供应商","value": "supplierId","asc": false
					},
					{
						"name": "仓库","value": "warehouseId","asc": false
					},
					{
						"name": "订单日期","value": "datetime","asc": false
					},
					{
						"name": "数量","value": "quantity","asc": false
					},
					{
						"name": "金额","value": "amount","asc": false
					}]
				this.sortList = [{
						"name": "id","value": "id","asc": false
					},
					{
						"name": "单号","value": "no","asc": false
					},
					{
						"name": "单据状态","value": "status","asc": false
					},
					{
						"name": "供应商","value": "supplierId","asc": false
					},
					{
						"name": "仓库","value": "warehouseId","asc": false
					},
					{
						"name": "订单日期","value": "datetime","asc": false
					},
					{
						"name": "数量","value": "quantity","asc": false
					},
					{
						"name": "金额","value": "amount","asc": false
					}]
					// console.log('执行了')
					// setTimeout(()=> {
					// 	this.maskShow = false
					// }, 1000);
			},
			saveSort() {
				let arr = []
				let arrName = []
				for (var i = 0; i < this.sortList.length; i++) {
					if(this.sortList[i].asc) {
						arr.push(this.sortList[i].value+'-asc')
						arrName.push(this.sortList[i].name+'-正序')
					} else {
						arr.push(this.sortList[i].value+'-desc')
						arrName.push(this.sortList[i].name+'-倒序')
					}
				}
				uni.setStorage({
					key: 'stockInSort',
					data: {
						arr: arr.toString(),
						arrName: arrName.toString(),
						sortList: this.sortList
					}
				})
				uni.navigateBack({
					url:'stockInSearch'
				})
				console.log(arr.toString())
				console.log(arrName.toString())
			},
			change(e) {
				console.log('=== change start ===');
				console.log("被拖动行: " + JSON.stringify(e.moveRow));
				console.log('原始下标：', e.index);
				console.log('移动到：', e.moveTo);
				console.log('=== change end ===');
			},
			confirm(e) {
				this.sortList = e.list
				console.log('=== confirm start ===');
				console.log(e)
				console.log("被拖动行: " + JSON.stringify(e.moveRow));
				console.log('原始下标：', e.index);
				console.log('移动到：', e.moveTo);
				console.log('=== confirm end ===');
			},
			changeAsc(e) {
				e.asc = !e.asc
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {.row{display: flex;flex-direction: row;align-items: center;.icon{width: 30px;border-radius: 6px;margin-right: 13px;}.text{font-size: 13px;}}}
	.warp {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
</style>
