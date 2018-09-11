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
			<tbody v-if="isSingle === false" style="text-align: center">
				<tr v-for="(item,index) in tableData" :key="index" height="40">
					<td>
						<div  class="lookWrap">
							<el-button @click="goDetail(item.face_id)"  type="primary" plain>查看</el-button>
							<div>
								<p>来客编号/照片</p>
								<img :src="item.face_avatar" alt="" class="imgSize">
								<p>{{item.face_id}}</p>
							</div>
						</div>
					</td>
					<td style="display: flex;flex-direction: column;align-items: center;">
						<p style="margin-top: 2rem">相识度: {{item.bd_score}}</p>
						<img src="static/images/main/rightLeft.png" alt="" style="margin-top: 3rem">
					</td>
					<td>
						<p>来客编号/照片</p>
						<img :src="item.s_face_avatar" alt="" class="imgSize">
						<p>{{item.s_face_id == null ? '暂无匹配数据' : item.s_face_id}}</p>
					</td>
				</tr>
			</tbody>
			<tbody v-if="isSingle === true" style="text-align: center">
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
		name: "recognition-result-b",
		data() {
			return {
				tableData: '',
				isSingle:false,
				searchData:{
					face_avatar:'',
					face_id:''
				},
				id: '',
				firstName: '',
				SecondName: '',
				s_group_id:''
			}
		},
		created: function() {
			// 刷新时，获取动态数据 设置navmenu
			let templates = this.$parent
			templates.navMenu = this.$route.name
			templates.upperLevelMenu = ''
			this.$data.id = this.$route.params.id;
			this.getList();
			// console.log('我再b页面')
		},
		methods: {
			getList() {
				let list = {
					'id': this.$data.id
				}
				let qs = require('querystring')
				faceDataApi.faceSoultDetail(qs.stringify(list)).then((response) => {
					if(response.data.errno === 0){
						if(response.data.data.search.type == undefined){
							this.$data.isSingle = false;
							this.$data.tableData = response.data.data.search;
					        this.$data.firstName = response.data.data.group_name;
					        this.$data.SecondName = response.data.data.s_group_name;
					        this.$data.s_group_id = response.data.data.s_group_id;
						}else if(response.data.data.search.type == 'single'){
							this.$data.isSingle = true;
							this.$data.tableData = response.data.data.search.search_res;
							this.$data.firstName = response.data.data.group_name;
					        this.$data.SecondName = response.data.data.s_group_name;
					        this.$data.searchData.face_avatar = response.data.data.search.face_avatar;
					        this.$data.searchData.face_id = response.data.data.search.face_id;						    	
						}
						
					}
					
				})
			},
			takeUps() {
				// console.log('回到列表')
				this.$router.replace({
					name: 'RecognitionList'
				})
			},
			goDetail(val){
				this.$router.replace({
					name: 'RecognitionResultDetail',
					params: {'listId':this.$data.id,'id': val,'group_id':this.$data.s_group_id}
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
	
	.lookWrap {
		width: 100%;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
	}
	.lookWrap div{
		margin: 0;
		margin-left: 20px;
	}
</style>