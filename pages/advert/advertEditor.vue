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
					<uni-file-picker v-model="form.listtArr" title="" return-type="array" limit="1"
						file-mediatype="image" :auto-upload='true' @select="select" @progress="progress"
						@success="success" @fail="fail" @delete="deleteHandle">
					</uni-file-picker>
				</el-form-item>
				<el-form-item label="默认开启">
					<el-switch v-model="form.status"></el-switch>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" :disabled="disabled" @click="onSubmit">确定提交</el-button>
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
					status: true,
					listtArr: []
				},
				type: '',
				content: '广告图新增',
				disabled: true,
				loadingInstance: null,
				banerInfo: {}
			}
		},
		onLoad() {
			this.type = this.$route.query.type;
			this.content = this.type == 'editor' ? "广告图编辑" : "广告图新增";
			if (this.type == 'editor') {
				this.banerInfo = this.$storageFn('get', 'banerInfo') || {};
				const {
					name,
					image,
					status
				} = this.banerInfo;
				this.form.name = name;
				this.form.status = (status == '1' ? true : false);
				let obj = {
					name,
					extname: "jpg",
					url: image,
				}
				this.form.listtArr.push(obj);
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			onSubmit() {
				if (this.type == 'add') {
					this.$request('advert/addAdvertImage', {
						name: this.form.name,
						image: this.form.listtArr[0].url,
						status: this.form.status ? 1 : 0
					}).then(res => {
						if (res.code == 0) {
							const Message = this.$message({
								type: 'success',
								message: res.msg
							});
							setTimeout(() => {
								Message.close();
								uni.navigateBack();
							}, 1500);
						} else {
							this.$message({
								type: 'info',
								message: res.msg
							});
						}
					})
				} else {
					console.log('更新');
					this.$request('advert/updateAdvertImage', {
						_id: this.banerInfo._id,
						name: this.form.name,
						image: this.form.listtArr[0].url,
						status: this.form.status ? 1 : 0
					}).then(res => {
						if (res.code == 0) {
							const Message = this.$message({
								type: 'success',
								message: res.msg
							});
							setTimeout(() => {
								Message.close();
								uni.navigateBack();
							}, 1500);
						} else {
							this.$message({
								type: 'info',
								message: res.msg
							});
						}
					})
				}

			},
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e);
				this.loadingInstance = this.$loading({
					target: '.form-wrap',
					background: 'transparent'
				})
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功', e)
				this.loadingInstance.close();
				this.loadingInstance = null;
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
				this.$message({
					type: 'info',
					message: '图片上传失败!'
				});
			},
			//删除
			deleteHandle(e) {
				this.loadingInstance = this.$loading({
					target: '.form-wrap',
					background: 'transparent'
				})
				this.$request('deleteFile/deleteFilePic', {
					fileID: e.tempFilePath
				}).then(res => {
					this.form.listtArr = [];
					this.loadingInstance.close();
					this.loadingInstance = null;
				})
			}
		},
		watch: {
			form: {
				handler(newVal) {
					if (newVal.name != '' && newVal.listtArr.length > 0) {
						this.disabled = false;
					} else {
						this.disabled = true;
					}
				},
				deep: true
			}
		}
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
