<!-- 货盘 -->
<template>
  <div class="store">
		<div class="search">
			<el-input placeholder="搜索商家" style="width:200px"></el-input>
			<el-button icon="el-icon-search"></el-button>
			未分配：30
			<div class="add">
				<el-button type="primary">新增</el-button>
				<el-button type="primary">批量导入</el-button>
			</div>
		</div>
		<div class="table">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="name" label="所属门店"></el-table-column>
				<el-table-column prop="device_cnt" label="总件数"></el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button type="text" size="small">进入</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pages" v-if="pages.pageCount > 0">
				<el-pagination background layout="prev, pager, next" :page-size="pages.perPage" :page-count = 'pages.pageCount'>
				</el-pagination>
			</div>
		</div>
  </div>
</template>

<script>
import equipmentApi from '../../api/equipment'
export default {
  name: 'store',
  data () {
    return {
      tableData: [],
      pages: {}
    }
  },
  created: function () {
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent
    templates.navMenu = this.$route.name
    templates.storeId = this.$route.query.name
    templates.upperLevelMenu = ''

		this.request()
  },
  mounted: function () {
  },
  methods: {
    request () {
			let list = {
				mid: this.$route.params.storeId
			}
			let qs = require('querystring')
      equipmentApi.storetList(qs.stringify(list)).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.tableData = returnData.data.list
          this.pages = returnData.data.pagination
        } else {
          console.log('bbb')
        }
      })
    }
  }
}
</script>

<style scoped>
.search{
  position:relative;
}
.search .add{
  position: absolute;
  top:0;
  right:0;
}
.table{
  margin-top:20px;
  padding:20px;
  border-radius: 4px;
  background-color: #ffffff;
  border: solid 2px #f1f5fc;
}
.pages{
  text-align:center;
  margin-top:30px;
}
i{
  font-size:24px;
}
</style>