<template>
	<view>
		<!-- 	<u-navbar back-text="供应商" back-icon-size="30" :background="background" :custom-back="comback">
			<view slot="right">
				<view class="right-item">
					<text class="toptext_cla" @click="saveSupplier">确认</text>
					<u-icon name="plus" size="35" @click="add"></u-icon>
				</view>
			</view>
		</u-navbar> -->
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" v-model="ipt" @input="toSearch" placeholder="仓库名称" confirm-type="search">
				<u-icon class="icon_cla" v-if="ipt.length !== 0" @click="delQuery" name="close-circle" color="#e3e3e3"
					size="30"></u-icon>
				</input>
			</view>
		</view>
		<!-- <view style="margin-top: 10rpx;">
			<u-search :show-action="false" v-model="keyword"></u-search>
		</view> -->
		<view class="content" v-if="show === false">
			<radio-group @change="checkboxChange" style="display: flex; flex-wrap:wrap">
				<label :class="item.checked ?  'checkbox selectBox' : 'checkbox '" @click="labelBtn(item.id,index)"
					v-for="(item,index) in labelList" :key="item.id">
					<radio :value="item.id" :checked="item.checked" v-show="false" />{{item.name}}
				</label>
			</radio-group>
		</view>
		<view style="width: 100%;position: fixed;bottom: 0;z-index: 9999;">
			<uni-goods-nav :options="options" @click="clear" @buttonClick="saveSupplier" :button-group="buttonGroup" />
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				options: [{
					icon: '/static/clear.png',
					text: '重置'
				}],
				buttonGroup: [{
					text: '确认',
					backgroundColor: '#00aaff',
					color: '#fff'
				}],
				show: true,
				labelName: '',
				labelDataList: [],
				temp_dataList: [],
				allList: [],
				labelList: [],
				ipt: '',
			}
		},
		async onLoad(e) {
			if (this.$u.test.isEmpty(e.supplierNames)) {
				await this.getSupplierList();
			} else {
				await this.getSupplierListt(e.supplierNames);
			}
			this.show = false
		},
		methods: {
			saveSupplier() {
				let a = []
				for (var i = 0; i < this.temp_dataList.length; i++) {
					for (var j = 0; j < this.allList.length; j++) {
						if (this.allList[j].name === this.temp_dataList[i]) {
							a.push(this.allList[j])
						}
					}
				}
				uni.setStorage({
					key: 'selectStockOutWarehouseByAccessoryAdd',
					data: a[0]
				})
				uni.navigateBack({
					url: 'accessoryAdd'
				})
			},
			comback() {
				uni.navigateBack({
					url: '/pages/service/summary/summary'
				})
			},
			toSearch() {
				let tempArr = []
				for (var i = 0; i < this.allList.length; i++) {
					if (this.allList[i].name.indexOf(this.ipt) > -1) {
						tempArr.push(this.allList[i])
					}
				}
				this.labelList = tempArr
			},
			async getSupplierList() {
				let result = await this.$myRequest({
					url: '/warehouse/search',
					data: {
						prop: '1'
					}
				})
				let supplier = result.items
				for (var i = 0; i < supplier.length; i++) {
					supplier[i].checked = false
				}
				this.allList = supplier
				this.labelList = supplier
			},
			async getSupplierListt(b) {
				let result = await this.$myRequest({
					url: '/warehouse/search',
					data: {
						prop: '1'
					}
				})
				let supplier = result.items
				let bb = b.split(",");
				for (var i = 0; i < bb.length; i++) {
					for (var j = 0; j < supplier.length; j++) {
						if (supplier[j].name === bb[i]) {
							supplier[j].checked = true
							this.temp_dataList[0] = supplier[j].name
						}
					}
				}
				this.allList = supplier
				this.labelList = supplier
			},
			labelBtn(name, index) {
				console.log(this.allList)
				this.labelName = name
				for (var i = 0; i < this.labelList.length; i++) {
					this.$set(this.labelList[i], "checked", false)
				}
				for (var i = 0; i < this.allList.length; i++) {
					this.$set(this.allList[i], "checked", false)
				}
				if (this.labelDataList.indexOf(name) > -1) { // 解决组件视图不能跟着更新的两种办法
					this.$set(this.labelList[index], "checked", true)
					this.temp_dataList[0] = this.labelList[index].name
				}
				// else {
				// 	this.$set(this.labelList[index], "checked", false)
				// 	this.temp_dataList.splice(this.temp_dataList.findIndex(item => item === this.labelList[index].name), 1)
				// }
			},
			checkboxChange: function(e) {
				console.log(e)
				this.labelDataList = e.detail.value
			},
			delQuery() {
				this.ipt = ''
				this.toSearch()
			},
			clear() {
				// this.labelName = ''
				// this.labelDataList = ''
				// this.temp_dataList = []
				// this.allList = []
				for (var i = 0; i < this.labelList.length; i++) {
					this.$set(this.labelList[i], "checked", false)
				}
				this.temp_dataList = []
			}
		}
	}
</script>
<style>
	page {
		background: #FFF;
	}

	.ov {
		overflow: hidden;
	}

	.fl {
		float: left;
	}

	.fr {
		float: right;
	}

	.searchTopBox {
		width: 100%;
		background-color: #0b877f;
		height: 100upx;
		box-sizing: border-box;
		padding-top: 15upx;
	}

	.searchBoxRadius {
		width: 90%;
		height: 70upx;
		background-color: #fff;
		margin-left: 5%;
		overflow: hidden;
		border-radius: 35upx;
	}

	.searchBoxIcon {
		font-size: 40upx;
		margin-top: 20upx;
		margin-left: 20upx;
		float: left;
	}

	.searchBoxIpt {
		height: 70upx;
		line-height: 70upx;
		margin-left: 20upx;
		float: left;
	}

	.searchBotBox {
		width: 100%;
		margin-top: 30upx;
		padding: 15upx 3%;
		box-sizing: border-box;
	}

	.searchHistoryBox {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		margin-top: 40upx;
	}

	.searchHistoryBoxItem {
		float: left;
		font-size: 26upx;
		color: #666;
		line-height: 46upx;
		height: 46upx;
		padding: 0 20upx;
		border-radius: 23upx;
		margin-left: 15upx;
		margin-bottom: 20upx;
		border: 1px solid #ccc;
	}

	/* .selectBox{
	  background: #ffaa00!important;
	  color: #fff!important;
	} */
	.selectBox {
		color: #00aaff !important;
	}

	.checkbox {
		padding: 5px 10px;
		border: 1px solid #ececec;
		margin: 10px;
		border-radius: 7upx;
		color: #000;
	}

	.content {
		padding: 10px;
	}

	.toptext_cla {
		width: 120rpx;
		margin-right: 50rpx;
		text-align: center;
	}

	.icon_cla {
		padding: 0px 10px 0px 0px;
	}
</style>
