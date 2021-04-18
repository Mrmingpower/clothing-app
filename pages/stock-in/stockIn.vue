<template>
	<view>
		<uni-nav-bar :fixed="true" background-color="#20a0ff" :border="false">
			<view class="input-vieww">
				<uni-icons type="search" size="22" color="#666666" />
				<input v-model="searchText" confirm-type="search" class="inputt" type="text" placeholder="输入查询信息">
				<uni-icons :color="'#999999'" v-if="searchText!==''" class="icon-clear" type="clear" size="22" @click="clearSearch" />
			</view>
		</uni-nav-bar>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		components: {
			uniNavBar,
			uniIcons
		},
		data() {
			return {
				searchText: '111',
			}
		},
		methods: {
			clearSearch() {
				console.log('清楚了')
			}
		}
	}
</script>

<style>
		.input-vieww {
			align-items: center;
			justify-content: center;
			width: 100%;
			display: flex;
			background-color: #e7e7e7;
			height: 30px;
			border-radius: 15px;
			padding: 0 4%;
			flex-wrap: nowrap;
			margin: 7px 10rpx;
			line-height: 30px;
			background: #f5f5f5;
		}
		 .inputt {
			height: 30px;
			line-height: 30px;
			width: 94%;
			padding: 0 3%;
		}
</style>
