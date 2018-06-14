<!-- 设备列表 -->
<template>
  <div class="device">
		<div class="search">
			<el-input placeholder="搜索设备" style="width:200px" v-model="search"></el-input>
			<el-button icon="el-icon-search" @click="request"></el-button>
			<!---<div class="add">
				<el-button type="primary">新增</el-button>
				<el-button type="primary">批量导入</el-button>
			</div>-->
		</div>
		<div class="table">
			<el-table :data="tableData" stripe style="width: 100%" :default-sort = "{prop: 'created_at', prop: 'start_at'}">
				<el-table-column prop="device_id" label="设备编号"></el-table-column>
				<el-table-column prop='start_at' sortable label="启用时间">
					<template slot-scope="scope" v-if="scope.row.start_at">
					{{scope.row.start_at | date(2)}}
					</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<el-switch inactive-value = "0" active-value="1" :value="`${scope.row.status}`" @change="status(scope.row)"></el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="created_at" sortable label="添加时间">
					<template slot-scope="scope" v-if="scope.row.created_at">
					{{scope.row.created_at | date(2)}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button type="text" size="small">修改</el-button>
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
  name: 'device',
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
		templates.storeId =  storage.getSessionStorage('storeId')
		templates.storeName = storage.getSessionStorage('storeName')
		templates.shopName = storage.getSessionStorage('shopName')
    templates.upperLevelMenu = ''

		this.request()
  },
  mounted: function () {
  },
  methods: {
		request () {
      let list = {
        'filter[and][][belong_mid]': storage.getSessionStorage('stroeId'),
        'filter[and][][belong_sid]': this.$route.params.shopId,
        'filter[and][][device_id]': this.search,
        'page': this.currentPage
      }
      let qs = require('querystring')
      equipmentApi.palletList(qs.stringify(list)).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
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
		// 更改状态
    status (row) {
      console.log(row)
      let list = {
        'status': row.status === 0 ? 1 : 0,
        'device_id': row.device_id,
        'belong_mid': row.belong_mid,
        'version': row.version,
        'id': row.id
      }
      let qs = require('querystring')
      equipmentApi.editDevice(qs.stringify(list), row.id).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.request()
        } else {
          this.$alert(returnData.msg, {
            type: 'error',
            callback: action => {
            }
          })
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
.undinster {
  display:inline-block;
  background-color: #fef0f0;
  color: #f56c6c;
  padding: 8px 16px;
  margin-left:50px;
}
</style>