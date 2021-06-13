<template>
	<view class="advert-editor">
		<el-page-header @back="goBack" :content="content">
		</el-page-header>
		<view class="form-wrap">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="图片名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="上传图片">
					<uni-file-picker v-model="listtArr" title="" return-type="array" limit="1" file-mediatype="image"
						:auto-upload='true' @select="select" @progress="progress" @success="success" @fail="fail"
						@delete="deleteHandle">
					</uni-file-picker>
				</el-form-item>
				<el-form-item label="类型">
					<el-radio-group v-model="form.type">
						<el-radio label="广告图"></el-radio>
						<el-radio label="一级分类图"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="是否开启">
					<el-switch v-model="form.status"></el-switch>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">确定提交</el-button>
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
				listtArr: [],
				type: '',
				content: '广告图新增'
			}
		},
		created() {
			this.type = this.$route.query.type;
			this.content = this.type == 'editor' ? "广告图编辑" : "广告图新增";
			if (this.type == 'editor') {
				const {
					name,
					image
				} = this.$storageFn('get', 'banerInfo') || {};
				this.form.name = name;
				let obj = {
					name,
					extname: "jpg",
					url: image,
				}
				this.listtArr.push(obj);
			}
		},
		mounted() {},
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
				console.log('listtArr==', this.listtArr);
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功', e)
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
