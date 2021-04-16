<template>
	<view class="YmContent">
			<view class="clothing_services_1">
				<view class="clothing_services_2">
				</view>
				<view class="clothing_services_3">
					<image v-on:click="clothing_services_4_4_click()"  src="/static/clothing_services/images/clothing_services_4_4.jpg" mode="scaleToFill" border="0"    class="clothing_services_4"></image>
					<text decode="true" class="clothing_services_5">标题</text>
					<image v-on:click="clothing_services_6_6_click()"  src="/static/clothing_services/images/clothing_services_6_6.jpg" mode="scaleToFill" border="0"    class="clothing_services_6"></image>
				</view>
			</view>
			<view class="clothing_services_7">
				<view class="clothing_services_8">
					<view class="clothing_services_9">
					</view>
					<text decode="true" class="clothing_services_10">入库模块</text>
				</view>
				<view class="clothing_services_11">
					<view class="clothing_services_26">
						<view class="clothing_services_28">
							<image v-on:click="clothing_services_29_29_click()"  src="/static/clothing_services/images/clothing_services_29_29.jpg" mode="scaleToFill" border="0"    class="clothing_services_29"></image>
							<text decode="true" class="clothing_services_30">入库1</text>
						</view>
						<view class="clothing_services_31">
							<image v-on:click="clothing_services_32_32_click()"  src="/static/clothing_services/images/clothing_services_32_32.jpg" mode="scaleToFill" border="0"    class="clothing_services_32"></image>
							<text decode="true" class="clothing_services_33">入库2</text>
						</view>
						<view class="clothing_services_34">
							<image v-on:click="clothing_services_35_35_click()"  src="/static/clothing_services/images/clothing_services_35_35.jpg" mode="scaleToFill" border="0"    class="clothing_services_35"></image>
							<text decode="true" class="clothing_services_36">入库3</text>
						</view>
						<view class="clothing_services_37">
							<image v-on:click="clothing_services_38_38_click()"  src="/static/clothing_services/images/clothing_services_38_38.jpg" mode="scaleToFill" border="0"    class="clothing_services_38"></image>
							<text decode="true" class="clothing_services_39">入库4</text>
						</view>
					</view>
					<view class="clothing_services_27">
						<view class="clothing_services_40">
							<image v-on:click="clothing_services_41_41_click()"  src="/static/clothing_services/images/clothing_services_41_41.jpg" mode="scaleToFill" border="0"    class="clothing_services_41"></image>
							<text decode="true" class="clothing_services_42">入库5</text>
						</view>
						<view class="clothing_services_43">
							<image v-on:click="clothing_services_44_44_click()"  src="/static/clothing_services/images/clothing_services_44_44.jpg" mode="scaleToFill" border="0"    class="clothing_services_44"></image>
							<text decode="true" class="clothing_services_45">入库6</text>
						</view>
					</view>
				</view>
				<view class="clothing_services_14">
					<view class="clothing_services_15">
					</view>
					<text decode="true" class="clothing_services_16">出库模块</text>
				</view>
				<view class="clothing_services_17">
					<view class="clothing_services_47">
						<image v-on:click="clothing_services_48_48_click()"  src="/static/clothing_services/images/clothing_services_48_48.jpg" mode="scaleToFill" border="0"    class="clothing_services_48"></image>
						<text decode="true" class="clothing_services_49">出库1</text>
					</view>
					<view class="clothing_services_50">
						<image v-on:click="clothing_services_51_51_click()"  src="/static/clothing_services/images/clothing_services_51_51.jpg" mode="scaleToFill" border="0"    class="clothing_services_51"></image>
						<text decode="true" class="clothing_services_52">出库2</text>
					</view>
					<view class="clothing_services_53">
						<image v-on:click="clothing_services_54_54_click()"  src="/static/clothing_services/images/clothing_services_54_54.jpg" mode="scaleToFill" border="0"    class="clothing_services_54"></image>
						<text decode="true" class="clothing_services_55">出库3</text>
					</view>
				</view>
				<view class="clothing_services_20">
					<view class="clothing_services_21">
					</view>
					<text decode="true" class="clothing_services_22">生产模块</text>
				</view>
				<view class="clothing_services_23">
					<view class="clothing_services_64">
						<image v-on:click="clothing_services_58_58_click()"  src="/static/clothing_services/images/clothing_services_58_58.jpg" mode="scaleToFill" border="0"    class="clothing_services_58"></image>
						<text decode="true" class="clothing_services_61">生产1</text>
					</view>
					<view class="clothing_services_65">
						<image v-on:click="clothing_services_59_59_click()"  src="/static/clothing_services/images/clothing_services_59_59.jpg" mode="scaleToFill" border="0"    class="clothing_services_59"></image>
						<text decode="true" class="clothing_services_62">生产2</text>
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
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	@import './index.scss'
</style>
