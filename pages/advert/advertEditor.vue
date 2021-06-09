<template>
	<view class="advert-editor">
		<el-page-header @back="goBack" content="广告图编辑页面">
		</el-page-header>
		<view class="form-wrap">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<!-- 			<el-form-item label="活动区域">
					<el-select v-model="form.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item> -->
				<!-- <el-form-item label="活动时间">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;">
						</el-date-picker>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
					</el-col>
				</el-form-item> -->
				<el-form-item label="是否开启">
					<el-switch v-model="form.status"></el-switch>
				</el-form-item>
				<el-form-item label="类型">
					<el-checkbox-group v-model="form.type">
						<el-checkbox label="广告图" name="advert"></el-checkbox>
						<el-checkbox label="一级分类图" name="oneCate"></el-checkbox>
						<el-checkbox label="二级分类图" name="twoCate"></el-checkbox>
						<el-checkbox label="产品主图" name="productPic"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="上传图片">
					<!-- <el-radio-group v-model="form.resource">
						<el-radio label="线上品牌商赞助"></el-radio>
						<el-radio label="线下场地免费"></el-radio>
					</el-radio-group> -->
					<!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
						:on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload> -->
					<uni-file-picker v-model="listtArr" title="" return-type="array" limit="1" file-mediatype="image"
						@select="select" @progress="progress" @success="success" @fail="fail" @delete="deleteHandle">
					</uni-file-picker>
				</el-form-item>
				<!-- <el-form-item label="活动形式">
					<el-input type="textarea" v-model="form.desc"></el-input>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="onSubmit">确定提交</el-button>
					<!-- <el-button>取消</el-button> -->
				</el-form-item>
			</el-form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					status: true,
					type: [],
					resource: '',
					desc: ''
				},
				fileList: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}],
				listtArr: []
			}
		},
		created() {

		},
		mounted() {

		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			onSubmit() {
				console.log('submit!');
				uni.chooseImage({
					success: async chooseImageRes => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log('imag==', tempFilePaths);
						// this.isLoading = true;
						// const uploadResult = await uniCloud.uploadFile({
						// 	filePath: tempFilePaths[0],
						// 	cloudPath: 'avatar.jpg',
						// 	fileType: 'image'
						// });
						// this.isLoading = false;
						// this.userDatum.avatar = uploadResult.fileID;
					}
				});
			},
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功',e)
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			//删除
			deleteHandle(e) {
				console.log('删除文件：', e)
			}
		},
	}
</script>

<style lang="scss">
	.advert-editor {
		padding: 15px;

		.form-wrap {
			margin-top: 20px;
			width: 50%;
		}
	}
</style>
