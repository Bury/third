<template>
	<div>
		<el-form :inline="true" class="demo-form-inline" size="mini">
			<el-form-item label="门店">
				<el-select v-model="storeId" placeholder="请选门店">
					<el-option v-for="(item,index) in storeList" :key="index" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="时间选择：">
				<el-date-picker v-model="day" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期时间" :picker-options="pickerOptionsSet">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="addWrap">
			<el-button type="primary" size="small">新增</el-button>
		</div>
		<el-table :data="tableData" border stripe style="width: 100%">
			<el-table-column prop="order" label="序号">
			</el-table-column>
			<el-table-column prop="store" label="门店">
			</el-table-column>
			<el-table-column prop="date" label="日期">
			</el-table-column>
			<el-table-column prop="go" label="人次">
			</el-table-column>
			<el-table-column prop="num" label="人数">
			</el-table-column>
			<el-table-column prop="address" label="抓拍率">
			</el-table-column>
			<el-table-column prop="eye" label="识别率">
			</el-table-column>
			<el-table-column prop="time" label="创建时间">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini">进入</el-button>
					<el-button size="mini">编辑</el-button>
					<el-button size="mini" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
         
		 <div class="bottomPage">
			 <el-pagination background layout="prev, pager, next" :total="1000">
			 </el-pagination>
		 </div>
		

	</div>
</template>

<script>
	import dataCollectApi from '@/api/dataCollect'
	export default {
		name: 'eye-data-list',
		data() {
			return {
				storeList: [],
				storeId: '',
				day: '',
				pickerOptionsSet: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e6
					}
				},
				tableData: [],

			}
		},
		created: function () {
			let templates = this.$parent;
			templates.navMenu = this.$route.name;
			templates.upperLevelMenu = '';
			this.getPartList();
		},
		methods: {
			getPartList() {
				let list = {
					'type': 1,
					'parent_id': 1,
				};
				let qs = require('querystring');
				dataCollectApi.getDepartList(qs.stringify(list)).then((response) => {
					this.$data.storeList = response.data.data;
				})
			},
		}
	}
</script>
<style scoped>
	.addWrap {
		text-align: right;
		margin-bottom: 10px;
	}
	.bottomPage{
		text-align: center;
		margin-top: 20px;
	}
</style>
