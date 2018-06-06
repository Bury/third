<!-- 货盘 -->
<template>
  <div class="pallet">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="按设备" name="first">
        <div class="search">
          <el-select placeholder="状态" style="width:120px">
            <el-option label="已禁用"></el-option>
            <el-option label="已启用"></el-option>
          </el-select>
          <el-select placeholder="版本" style="width:120px">
            <el-option label="1.0.0"></el-option>
            <el-option label="2.0.0"></el-option>
          </el-select>
          <el-input placeholder="搜索公司" style="width:120px"></el-input>
          <el-input placeholder="搜索门店" style="width:120px"></el-input>
          <el-input placeholder="搜索编号" style="width:120px"></el-input>
          <el-button icon="el-icon-search"></el-button>
          <div class="add">
            <el-button type="primary" @click="addPallet = true">新增</el-button>
            <el-button type="primary" @click="importOrder">批量导入</el-button>
            <input type="file" @change="fileUpload" id='uploadFile'>
          </div>
        </div>
        <div class="table">
          <el-table :data="tableData" stripe style="width: 100%" :default-sort = "{prop: 'created_at', order: 'descending'}">
            <el-table-column prop="device_id" label="设备编号"></el-table-column>
            <el-table-column prop="merchant_name" label="所属公司"></el-table-column>
            <el-table-column prop="merchant_store_name" label="门店"></el-table-column>
            <el-table-column prop="version" label="版本"></el-table-column>
            <el-table-column prop="created_at" sortable label="添加时间"></el-table-column>
            <el-table-column prop="start_at" sortable label="启用时间"></el-table-column>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-switch inactive-value = "0" active-value="1" :value="`${scope.row.status}`"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <i class="el-icon-setting"></i>
              </template>
            </el-table-column>
          </el-table>
          <div class="pages" v-if="pages.pageCount > 0">
            <el-pagination background layout="prev, pager, next" :page-size="pages.perPage" :page-count = 'pages.pageCount'>
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <!--按商家-->
      <el-tab-pane label="按商家" name="second">
        <div class="search">
          <el-input placeholder="搜索商家" style="width:200px"></el-input>
          <el-button icon="el-icon-search"></el-button>
          未分配：30
        </div>
        <div class="table">
          <el-table :data="businessData" stripe style="width: 100%">
            <el-table-column prop="name" label="所属公司"></el-table-column>
            <el-table-column prop="device_cnt" label="件数"></el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="goStore(scope.row)">进入</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pages" v-if="businessPages.pageCount > 0">
            <el-pagination background layout="prev, pager, next" :page-size="businessPages.perPage" :page-count = 'businessPages.pageCount'>
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
     <!-- 新增货盘 -->
    <el-dialog title="新增货盘" :visible.sync="addPallet">
      <el-form label-width="80px">
        <el-form-item label="硬件编号" required>
          <el-input style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="版本" required>
          <el-select placeholder="请选择版本" style="width:400px;">
            <el-option label="1.0"></el-option>
            <el-option label="2.0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商家">
          <el-select placeholder="请选择商家" style="width:400px;">
            <el-option label="金梦园" value="shanghai"></el-option>
            <el-option label="湖州金店" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addPallet = false">取 消</el-button>
        <el-button type="primary" @click="addPallet = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import equipmentApi from '../../api/equipment'
export default {
  name: 'pallet',
  data () {
    return {
      activeName: 'first',
      tableData: [],
      businessData: [],
      pages: {},
      businessPages: {},
      addPallet: false
    }
  },
  created: function () {
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent
    templates.navMenu = this.$route.name
    templates.upperLevelMenu = ''

    this.request()
    this.merchant()
  },
  mounted: function () {
  },
  methods: {
    request () {
      equipmentApi.palletList().then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.tableData = returnData.data.list
          this.pages = returnData.data.pagination
        } else {
          console.log('bbb')
        }
      })
    },
    merchant () {
      equipmentApi.merchantList().then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.businessData = returnData.data.list
          this.businessPages = returnData.data.pagination
        } else {
          this.$alert(returnData.msg, {
            type: 'error',
            callback: action => {
            }
          })
        }
      })
    },
    goStore (row) {
      // 跳转到门店列表
      this.$router.replace({name: 'Store', params: {'storeId': row.id}, query: {'name': row.name}})
    },
    importOrder () {
       document.querySelector('#uploadFile').click()
    },
    fileUpload () {
      let fileData = new window.FormData()
      fileData.append('file', document.querySelector('#uploadFile').files[0])
      let file = {
        'file': fileData
      }
      let qs = require('querystring')
      equipmentApi.importOrder(qs.stringify(file)).then((response) => {
        let returnData = response.data
        if (returnData.success) {
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
#uploadFile{
  position:absolute;
  top:0;
  right:0;
  width:90px;
  height:40px;
  display:none;
}
</style>