<template>
	<view>
		<el-row>
		  <el-button>默认按钮</el-button>
		  <el-button type="primary" @click="btnClick">主要按钮</el-button>
		  <el-button type="success">成功按钮</el-button>
		  <el-button type="info">信息按钮</el-button>
		  <el-button type="warning">警告按钮</el-button>
		  <el-button type="danger">危险按钮</el-button>
		</el-row>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		mounted() {
			
		},
		methods:{
			btnClick(){
				const token=uni.getStorageSync('uni_id_token');
				this.$request('product/getProductList',{token}).then(res=>{
					console.log('数据==',res);
				})
			}
		}
	}
</script>

<style scoped>

</style>
