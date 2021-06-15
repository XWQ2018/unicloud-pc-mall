<template>
	<view class="advert">
		<view class="top">
			<el-button @click="addAdvert" type="primary" size="large">新增
			</el-button>
		</view>
		<el-table :data="tableData" v-loading="loading" border style="width: 100%" :cell-style="{textAlign:'center'}"
			:header-cell-style="{textAlign:'center'}">
			<el-table-column prop="add_time" label="日期" width="150">
			</el-table-column>
			<el-table-column prop="name" label="名称" width="300">
			</el-table-column>
			<el-table-column prop="image" label="图片" min-width="250">
				<template slot-scope="scope">
					<el-image lazy :src="scope.row.image" fit="fill"></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="price" label="上架状态" width="120">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.startStatus" @change="changeHandle($event,scope)"
						active-color="#13ce66" inactive-color="#ccc"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="120">
				<template slot-scope="scope">
					<el-button :style="{marginBottom:'5px'}" @click="deleteHandle(scope.row)" type="danger "
						size="small">删除</el-button>
					<el-button :style="{margin:0}" @click="editorHandle(scope.row)" type="primary" size="small">编辑
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<view v-if="tableData.length>0">
			<el-pagination :hide-on-single-page="value" @current-change="handleCurrentChange"
				:current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: true,
				loading: true,
				tableData: [],
				currentPage: 1,
				value: true,
				pageSize: 10,
				total: 0
			}
		},
		created() {

		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				const requestInfo = {
					offset: (this.currentPage - 1) * 10,
					limit: this.pageSize
				};
				this.$request('advert/getAdvertList', requestInfo).then(res => {
					if (res.code == 0) {
						this.tableData = res.data;
						this.total = res.total;
						this.tableData.forEach(row => (row.add_time = this.$dateFormat(row.add_time,
							'yyyy-MM-dd'), row.startStatus = row.status ? true : false));
						this.loading = false;
					}
				})
			},
			changeHandle(val, {
				$index,
				row
			}) {
				row.startStatus = val;
				this.$set(this.tableData, $index, row)
				this.$request('advert/hideAdvertImage', {
					id: row._id,
					status: val ? 1 : 0
				}).then(res => {
					console.log(res);
					if (res.code == 0) {
						this.$message({
							type: 'success',
							message: val ? '已开启' : '已关闭'
						});
					} else {
						this.$message({
							type: 'error',
							message: '更新失败'
						});
					}
				})
			},
			deleteHandle(row) {
				console.log('row==', row);
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			handleCurrentChange(page) {
				this.currentPage = page;
				this.init();
				this.loading = true;
			},
			editorHandle(row) {
				console.log(row);
				this.$storageFn('set', 'banerInfo', row)
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/advert/advertEditor?type=editor'
					})
				}, 500)
			},
			addAdvert() {
				uni.navigateTo({
					url: '/pages/advert/advertEditor?type=add'
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.advert {
		padding: 10px;

		.top {
			padding: 15px 0;
		}
	}
</style>
