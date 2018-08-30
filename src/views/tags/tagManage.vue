<template>
	<div class="tagWrap">
		<div>
			<el-table :data="tableData" stripe border style="width: 600px">
				<el-table-column align="center" prop="name" label="标签名">
				</el-table-column>
				<el-table-column align="center" label="操作">
					<template slot-scope="scope">
						<el-button type="primary" size="small" plain @click.native.prevent="goEdit(scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
            
            <div class="pages">
            	<el-pagination background small layout="prev, pager, next" :current-page.sync="pages.currentPage" :page-count="pages.pageCount" @current-change="handlePaze">
			</el-pagination>
            </div>
			
		</div>
	</div>
</template>

<script>
	import tags from '@/api/tags'
	export default {
		name: 'tag-manage',
		data() {
			return {
				tableData: [],
				pagination: {
					page: 1,
					page_size: 20
				},
				pages:{}
			}
		},
		created: function() {
			let templates = this.$parent
			templates.navMenu = this.$route.name;
			this.getList();
		},
		methods: {
			getList() {
				let qs = require('querystring');
				tags.parentList(qs.stringify(this.$data.pagination)).then((res) => {
					if(res.data.errno === 0) {
						this.$data.tableData = res.data.data.list;
						this.$data.pages = res.data.data.pagination;					
					} else {
						this.$message(res.data.msg)
					}
				})
			},
			goEdit(val) {
				this.$router.push({
					name: 'childsTag',
					params: {
						id: val.id
					}
				})
			},
			
			//分页
			handlePaze(val){
				this.$data.getParameter.page = val;
				this.getList();
			}

		}
	}
</script>

<style type="text/css">
	
	.pages{
		width: 600px;
		text-align: right;
		margin-top: 20px;
	}
		
</style>