<template>
	<view>
		<u-cell-group>
			<u-cell-item title="头像" @click='changeHead'>
				<u-image width='100rpx' height='100rpx' slot="right-icon" :src="headImg" shape="circle"></u-image>
			</u-cell-item>
			<u-cell-item title="昵称" :value="username"></u-cell-item>
			<u-cell-item title="公司" :value="company"></u-cell-item>
			<u-cell-item title="手机" :value="mobile"></u-cell-item>
			<u-cell-item title="身份" :value="nickname"></u-cell-item>
			<!-- <u-cell-item title="常居地" :value="address" @click='showAddr=true'></u-cell-item>
			<u-cell-item title="个人简介" >
				<view class="u-line-1 u-p-l-30">
					{{profile}}
				</view>
			</u-cell-item> -->
		</u-cell-group>
		<u-calendar v-model="show" @change="change"></u-calendar>
		<u-picker mode="region" v-model="showAddr" :area-code='["21", "2101", "210103"]' @confirm='selectAddr'></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: this.$store.state.userInfo.username,
				company: this.$store.state.userInfo.company,
				mobile: this.$store.state.userInfo.mobile,
				nickname: this.$store.state.userInfo.nickname,
				
				
				headImg:'/static/user/face.jpg',
				sex: '男',
				birthday: '2021-02-23',
				show: false,
				address:'辽宁省-沈阳市-沈河区',
				profile:'欢迎加扣群(325021815)交流学习',
				showAddr:false
			}
		},
		methods: {
			changeHead(){
				// uni.chooseImage({
				//     count: 1, 
				//     success: (res)=> {
				// 				this.headImg = res.tempFilePaths[0]
				//     }
				// });
			},
			selectSex() {
				const arr = ['男', '女', '保密']
				uni.showActionSheet({
					itemList: arr,
					success: (res) => {
						this.sex = arr[res.tapIndex]
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			change(e) {
				this.birthday = e.result
			},
			selectAddr(e){
				console.log(e)
				this.address = `${e.province.label}-${e.city.label}-${e.area.label}`
			}
		}
	}
</script>

<style>

</style>
