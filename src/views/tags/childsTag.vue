<template>
	<div class="tagWrap">
		<div>
			<el-table :data="tableData" stripe border style="width: 700px">
				<el-table-column align="center" prop="name" label="子标签名" width="180">
				</el-table-column>
				<el-table-column align="center" prop="sort" label="排序">
				</el-table-column>
				<el-table-column align="center" label="状态">
					<template slot-scope="scope">
						{{scope.row.is_delete === 1 ? '禁用' : '启用'}}
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作">
					<template slot-scope="scope">
						<el-button type="primary" size="small" plain @click="goEdit(scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>

			<div class="pages">
				<el-pagination background small layout="prev, pager, next" :current-page.sync="pages.currentPage" :page-count="pages.pageCount" @current-change="handlePaze">
				</el-pagination>
			</div>

			<!--弹出框-->
			<el-dialog title="编辑" :visible.sync="dialogVisible" width="600px">
				<el-form :model="dialogForm" ref="refForm" :rules="eidtRule">
					<el-form-item label="子标签名:" prop="name" label-width="100px">
						<el-input v-model.trim="dialogForm.name"></el-input>
					</el-form-item>
					<el-form-item label="排序:" prop="sort" label-width="100px">
						<el-input v-model.trim="dialogForm.sort"></el-input>
					</el-form-item>
					<el-form-item label="状态:" prop="is_delete" label-width="100px">
							<el-switch v-model="dialogForm.is_delete"  :active-value="0" :inactive-value="1">
							</el-switch>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
                     <el-button @click="dialogVisible = false">取 消</el-button>
                     <el-button type="primary" @click="editSubmit">确 定</el-button>
                </span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import tags from '@/api/tags'
	import globalRule from '@/config/globalRules'
	export default {
		name: 'tag-manage',
		data() {
			return {
				tableData: [],
				dialogVisible: false,
				getParameter: {
					parent_id: '',
					page: 1,
					page_size: 20
				},
				pages: {},
				eidtRule: {
					name: globalRule.rules.setting.tagName(),
					sort: globalRule.rules.setting.tagSort(),
					is_delete: [{
						required: true,
						message: '请选择状态！',
						trigger: 'change'
					}]
				},
				dialogForm: {
					id:'',
					name: '',
					sort: '',
					is_delete: ''
				}
			}
		},
		watch: {
			dialogVisible: function() {
				setTimeout(() => {
					this.$refs.refForm.clearValidate();
				})
			}
		},
		created: function() {
			let templates = this.$parent
			templates.navMenu = this.$route.name;
			this.$data.getParameter.parent_id = this.$route.params.id;
			this.getList();
		},
		methods: {
			getList() {
				let qs = require('querystring');
				tags.childsParentList(qs.stringify(this.$data.getParameter)).then((res) => {
					if(res.data.errno === 0) {
						this.$data.tableData = res.data.data.list;
						this.$data.pages = res.data.data.pagination;
					} else {
						this.$message(res.data.msg)
					}
				})
			},

			goEdit(val) {
				this.$data.dialogForm = {
					id:val.id,
					name: val.name,
					sort: val.sort,
					is_delete: val.is_delete
				};
				this.$data.dialogVisible = true;
			},
			editSubmit() {
				let qs = require('querystring');
				this.$refs.refForm.validate((valid) => {
					if(valid) {
						tags.childsEdit(qs.stringify(this.$data.dialogForm)).then((res) => {
							if(res.data.errno === 0) {
								this.$message('编辑成功！')
							} else {
								this.$message(res.data.msg)
							}
							this.$data.dialogVisible = false;
							this.getList();
						})
					}
				})
			},

			//分页
			handlePaze(val) {
				this.$data.getParameter.page = val;
				this.getList();
			},

		}
	}
</script>

<style type="text/css">
	.pages {
		width: 700px;
		text-align: right;
		margin-top: 20px;
	}
</style>