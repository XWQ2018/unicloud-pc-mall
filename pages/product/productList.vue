<template>
	<view>
		<view class="form-wrap">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="关键字">
					<el-input v-model="formInline.keyword" placeholder="输入关键字"></el-input>
				</el-form-item>
				<el-form-item label="上架状态">
					<el-select v-model="formInline.status" placeholder="请选择">
						<el-option label="已上架" value="1"></el-option>
						<el-option label="已下架" value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
		</view>
		<view class="pd-style">
			<el-table :data="tableData" v-loading="loading" border style="width: 100%"
				:cell-style="{textAlign:'center'}" :header-cell-style="{textAlign:'center'}">
				<el-table-column prop="add_time" label="日期" width="150">
				</el-table-column>
				<el-table-column prop="title" label="名称" width="300">
				</el-table-column>
				<el-table-column prop="sales" label="销量" width="120">
				</el-table-column>
				<el-table-column prop="price" label="价格(元)" width="120">
				</el-table-column>
				<el-table-column prop="thumb" label="图片" width="160">
					<template slot-scope="scope">
						<el-image lazy style="width: 100px; height: 100px" :src="scope.row.thumb" fit="fill"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="price" label="上架状态" width="120">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.saleStatus" @change="changeHandle($event,scope)"
							active-color="#13ce66" inactive-color="#ccc"></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="100">
					<template slot-scope="scope">
						<el-button :style="{marginBottom:'5px'}" @click="deleteHandle(scope.row)" type="danger "
							size="small">删除</el-button>
						<el-button :style="{margin:0}" type="primary" size="small">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</view>

		<view v-if="tableData.length>0">
			<view class="pd-style">
				<el-pagination :hide-on-single-page="value" @current-change="handleCurrentChange"
					:current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper"
					:total="total">
				</el-pagination>
			</view>
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
				formInline: {
					keyword: '',
					status: ''
				},
				currentPage: 1,
				value: true,
				pageSize: 10,
				total: 0
			}
		},
		created() {
			this.init();
		},
		mounted() {},
		methods: {
			init(obj = {}) {
				const requestInfo = {
					offset: (this.currentPage - 1) * 10,
					limit: this.pageSize,
					...obj
				};
				this.$request('product/getProductList', requestInfo).then(res => {
					if (res.code == 0) {
						this.tableData = res.data;
						this.total = res.total;
						this.tableData.forEach(row => (row.add_time = this.$dateFormat(row.add_time,
							'yyyy-MM-dd'), row.saleStatus = row.is_sales ? true : false));
						this.loading = false;
					}
				})
			},
			changeHandle(val, {
				$index,
				row
			}) {
				row.saleStatus = val;
				this.$set(this.tableData, $index, row)

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
			onSubmit() {
				const requestInfo = {};
				Object.keys(this.formInline).forEach(row => {
					if (this.formInline[row] != '') {
						requestInfo[row] = this.formInline[row]
					}
				})
				this.loading = true;
				this.currentPage = 1;
				this.init(requestInfo)
			},
			handleCurrentChange(page) {
				this.currentPage = page;
				this.init();
				this.loading = true;
			}
		}
	}
</script>
<style scoped lang="scss">
	.form-wrap {
		padding: 15px 15px 0 15px;
	}

	.pd-style {
		padding: 10px;
	}

	/deep/ .el-pagination button {
		border: none;
		padding: 0 6px;
		background: transparent;
	}

	/deep/ .el-pagination .btn-prev,
	/deep/ .el-pagination .btn-next {
		border: none;
		padding: 0 6px;
		background: transparent;
	}
</style>
