<!-- 门店列表 -->
<template>
  <div class="store">
		<div class="search">
			<el-input placeholder="搜索门店" style="width:200px" v-model="search"></el-input>
			<el-button icon="el-icon-search" @click="request"></el-button>
			<span class="undinster">未分配：{{undistributed}}</span>
			<!--<div class="add">
				<el-button type="primary">新增</el-button>
				<el-button type="primary">批量导入</el-button>
			</div>-->
		</div>
		<div class="table">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="name" label="所属门店"></el-table-column>
				<el-table-column prop="device_cnt" label="总件数"></el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="goDevice(scope.row)">进入</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pages" v-if="pages.pageCount > 0">
				<el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pages.perPage" :page-count = 'pages.pageCount'>
				</el-pagination>
			</div>
		</div>
  </div>
</template>

<script>
import equipmentApi from '../../api/equipment'
import storage from '../../utils/storage'

export default {
  name: 'store',
  data () {
    return {
      search: '',
      undistributed: '',
      tableData: [],
      pages: {},
      currentPage: '1'
    }
  },
  created: function () {
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent
    templates.navMenu = this.$route.name
    templates.storeName = storage.getSessionStorage('storeName')
    templates.upperLevelMenu = ''

		this.request()
  },
  mounted: function () {
  },
  methods: {
    request () {
			let list = {
				'mid': this.$route.params.storeId,
        'filter[name][like]': this.search,
        'page': this.currentPage
			}
			let qs = require('querystring')
      equipmentApi.storetList(qs.stringify(list)).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.undistributed = returnData.data.undistributed
          this.tableData = returnData.data.list
          this.pages = returnData.data.pagination
        } else {
          this.$alert(returnData.msg, {
            type: 'error',
            callback: action => {
            }
          })
        }
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.request()
    },
    goDevice (row) {
      console.log(row)
      // 跳转到设备列表
      storage.setSessionStorage('shopName', row.name)
      this.$router.replace({name: 'Device', params: {'shopId': row.id}})
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
.undinster {
  display:inline-block;
  background-color: #fef0f0;
  color: #f56c6c;
  padding: 8px 16px;
  margin-left:50px;
}
</style>