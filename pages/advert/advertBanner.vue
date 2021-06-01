<template>
	<view class="banner">
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
					<el-switch v-model="scope.row.saleStatus" @change="changeHandle($event,scope)"
						active-color="#13ce66" inactive-color="#ccc"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="120">
				<template slot-scope="scope">
					<el-button :style="{marginBottom:'5px'}" @click="deleteHandle(scope.row)" type="danger "
						size="small">删除</el-button>
					<el-button :style="{margin:0}" type="primary" size="small">编辑</el-button>
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
			this.init();
		},
		mounted() {},
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
							'yyyy-MM-dd'), row.saleStatus = row.status ? true : false));
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
			},
			onSubmit() {
				console.log('submit!');
			},
			handleCurrentChange(page) {
				this.currentPage = page;
				this.init();
				this.loading = true;
			}
		},
	}
</script>

<style>
</style>
