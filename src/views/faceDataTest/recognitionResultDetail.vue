<template>
	<div class="business-list">
		<table width="99%" class="table-bordered">
			<thead style="background-color: #d1d1d1">
				<tr height="40">
					<th class="col-md-1 text-center">{{firstName}}</th>
					<th class="col-md-1 text-center"></th>
					<th class="col-md-1 text-center">{{SecondName}}</th>
				</tr>
			</thead>
			<tbody v-if="tableData.length > 0" style="text-align: center">
				<tr v-for="(item,index) in tableData" :key="index" height="40">
					<td v-if="index === 0" :rowspan="tableData.length">
						<p>来客编号/照片</p>
						<img :src="searchData.face_avatar" alt="" class="imgSize">
						<p>{{searchData.face_id}}</p>
					</td>
					<td style="display: flex;flex-direction: column;align-items: center;">
						<p style="margin-top: 2rem">相识度: {{item.bd_score}}</p>
						<img src="static/images/main/rightLeft.png"  style="margin-top: 3rem">
					</td>
					<td>
						<p>来客编号/照片</p>
						<img :src="item.s_face_avatar" alt="" class="imgSize">
						<p>{{item.s_face_id == null ? '暂无匹配数据' : item.s_face_id}}</p>
					</td>
				</tr>
			</tbody>
			<tbody v-else>
				<tr><td colspan="3" align="center" height="70">暂无数据</td></tr>
			</tbody>
		</table>
		<el-row>
			<el-col style="text-align: center">
				<button class="btn" @click="takeUps()">返回</button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import faceDataApi from '../../api/faceDataTest'
	export default {
		name: "recognition-result-detail",
		data() {
			return {
				tableData: [],
				searchData:{
					face_avatar:'',
					face_id:''
				},
				firstName:'',
				SecondName:'',
				parameter:{
					id:'',
					group_id:''
				},
				insert_id:'',
				parsentListId:''
				
			}
		},
		created: function() {
			// 刷新时，获取动态数据 设置navmenu
			let templates = this.$parent
			templates.navMenu = this.$route.name
			templates.upperLevelMenu = '';
			templates.singleParsentId = this.$route.params.listId;
			this.$data.parsentListId = this.$route.params.listId;
			this.$data.parameter.id = this.$route.params.id;
			this.$data.parameter.group_id = this.$route.params.group_id;
			this.getId();
			// console.log('我再b页面')
		},
		methods: {
			getId() {
				let qs = require('querystring');
				faceDataApi.faceSingleSearch(qs.stringify(this.$data.parameter)).then((response) => {					
					if(response.data.errno === 0){
						this.$data.insert_id = response.data.data.insert_id;
						this.getList();
					}					 
				})
			},
			getList() {
				let list = {
					'id': this.$data.insert_id
				}
				let qs = require('querystring')
				faceDataApi.faceSoultDetail(qs.stringify(list)).then((response) => {
					console.log(response)
					if(response.data.errno === 0){
						this.$data.firstName = response.data.data.group_name;
					    this.$data.SecondName = response.data.data.s_group_name;
					    this.$data.searchData.face_avatar = response.data.data.search.face_avatar;
					    this.$data.searchData.face_id = response.data.data.search.face_id;
						this.$data.tableData = response.data.data.search.search_res;					    
					}
					
				})
			},
			takeUps() {
				// console.log('回到列表')
				this.$router.replace({
					name: 'RecognitionResultsFound',
					params: {'id': this.$data.parsentListId}
				})
			}
		}
	}
</script>

<style scoped>
	.imgSize {
		width: 8rem;
		height: 8rem;
	}
	
	.btn {
		margin-top: 5rem;
		margin-bottom: 1rem;
		display: inline-block;
		padding: 6px 12px;
		font-size: 14px;
		font-weight: 400;
		line-height: 1.42857143;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		-ms-touch-action: manipulation;
		touch-action: manipulation;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		background-image: none;
		border: 1px solid transparent;
		border-radius: 4px;
		background-color: #4BC076;
		color: white;
	}
	
	.btn:hover {
		background: #4DB076;
		color: #fff!important;
	}
</style>