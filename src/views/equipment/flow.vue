<!-- 流量监控设备 -->
<template>
  <div class="pallet">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="按设备" name="first">
        <div class="search">
          <el-select placeholder="状态" style="width:120px" v-model="searchOne.status">
            <el-option label="已禁用" value="0"></el-option>
            <el-option label="已启用" value="1"></el-option>
          </el-select>
          <el-select placeholder="版本" style="width:120px" v-model="searchOne.version">
            <el-option v-for="list in versionList" :key="list.id" :label="list.val" :value="list.id"></el-option>
          </el-select>
          <el-input placeholder="搜索公司" style="width:120px" v-model="searchOne.company"></el-input>
          <el-input placeholder="搜索门店" style="width:120px" v-model="searchOne.store"></el-input>
          <el-input placeholder="搜索编号" style="width:120px" v-model="searchOne.number"></el-input>
          <el-button icon="el-icon-search" @click="request"></el-button>
          <div class="add">
            <el-button type="primary" @click="setVersion = true">设置版本号</el-button>
            <el-button type="primary" @click="addPallet = true">新增</el-button>
            <el-button type="primary" @click="importOrder">批量导入</el-button>
            <input type="file" @change="fileUpload" id='uploadFile'>
          </div>
        </div>
        <div class="table">
          <el-table :data="tableData" stripe style="width: 100%" :default-sort = "{prop: 'created_at', prop: 'start_at', order: 'descending'}">
            <el-table-column prop="device_id" label="设备编号"></el-table-column>
            <el-table-column prop="merchant_name" label="所属公司"></el-table-column>
            <el-table-column prop="merchant_store_name" label="门店"></el-table-column>
            <el-table-column prop="version_val" label="版本"></el-table-column>
            <el-table-column prop="created_at" sortable label="添加时间">
              <template slot-scope="scope" v-if="scope.row.created_at">
              {{scope.row.created_at | date(2)}}
              </template>
            </el-table-column>
            <el-table-column prop="start_at" sortable label="启用时间">
              <template slot-scope="scope" v-if="scope.row.start_at">
              {{scope.row.start_at | date(2)}}
              </template>
            </el-table-column>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-switch inactive-value = "0" active-value="1" :value="`${scope.row.status}`" @change="status(scope.row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="editShow(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pages" v-if="pages.pageCount > 0">
            <el-pagination background layout="prev, pager, next" @current-change="deviceChange" :page-size="pages.perPage" :page-count = 'pages.pageCount'>
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <!--按商家-->
      <el-tab-pane label="按商家" name="second">
        <div class="search">
          <el-input placeholder="搜索商家" style="width:200px" v-model="searchTwo"></el-input>
          <el-button icon="el-icon-search" @click="merchant"></el-button>
          <span class="undinster">未分配：{{undistributed}}</span>
        </div>
        <div class="table">
          <el-table :data="businessData" stripe style="width: 100%">
            <el-table-column prop="name" label="所属品牌"></el-table-column>
            <el-table-column prop="device_cnt" label="件数"></el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="goStore(scope.row)">进入</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pages" v-if="businessPages.pageCount > 0">
            <el-pagination background layout="prev, pager, next" @current-change="bussinessChange" :page-size="businessPages.perPage" :page-count = 'businessPages.pageCount'>
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
     <!-- 新增货盘 -->
    <el-dialog :title="title" :visible.sync="addPallet" @close="closeDialog('addDevice')">
      <el-form label-width="80px" :model="addDevice" class="demo-ruleForm" ref="addDevice" :rules="rules">
        <el-form-item label="硬件编号" prop="device_id">
          <el-input style="width:400px;" v-model="addDevice.device_id"></el-input>
        </el-form-item>
        <el-form-item label="版本" prop="version">
          <el-select placeholder="请选择版本" style="width:400px;" v-model="addDevice.version">
            <el-option v-for="list in versionList"  :key="list.id" :label="list.val" :value="list.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商家" prop="belong_mid">
          <el-select placeholder="请选择商家" style="width:400px;" v-model="addDevice.belong_mid">
            <el-option v-for="list in businessList" :key="list.id" :label="list.name" :value="list.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addPallet = false">取 消</el-button>
        <el-button type="primary" @click="add('addDevice')" v-if="addButton === true">确 定</el-button>
        <el-button type="primary" @click="edit('addDevice')" v-else>修 改</el-button>
      </div>
    </el-dialog>
    <!-- 设置版本号 -->
    <el-dialog title="版本号设置" :visible.sync="setVersion">
      <div style="border-bottom:1px solid #ebeef5;padding-bottom:20px">
        新增版本号：<el-input style="width:300px;margin-right:90px" v-model="version"></el-input>
        <el-button type="primary" @click="addVersion">确 定</el-button>
      </div>
      <div class="line" v-for="list in versionList" :key="list.id">
        <span>{{list.val}} </span>
        <el-button type="text" @click="deleVersion(list.id)">删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import equipmentApi from '../../api/faceDevice'
import businessApi from '../../api/business'
import storage from '../../utils/storage'

export default {
  name: 'pallet',
  data () {
    return {
      title: '新增监控设备',
      addButton: true,
      activeName: 'first',
      undistributed: 0,
      searchOne: {
        status: '',
        version: '',
        company: '',
        store: '',
        number: ''
      },
      searchTwo: '',
      onePage: '1',
      twoPage: '1',
      tableData: [],
      businessData: [],
      businessList: {},
      pages: {},
      businessPages: {},
      addDevice: {
        device_id: '',
        belong_mid: '',
        version: '',
        status: 1
      },
      deviceId: '',
      rules: {
        device_id: [
          { required: true, message: '请输入设备编号', trigger: 'blur' }
        ],
        belong_mid: [
          { required: true, message: '请选择商家', trigger: 'change' }
        ],
        version: [
          { required: true, message: '请选择版本号', trigger: 'change' }
        ]
      },
      versionList: {},
      version: '',
      addPallet: false,
      setVersion: false
    }
  },
  created: function () {
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent
    templates.navMenu = this.$route.name
    templates.upperLevelMenu = ''

    this.request()
    this.merchant()
    this.getVersion()
    this.business()
  },
  methods: {
    request () {
      let list = {
        'filter[and][][status]': this.searchOne.status,
        'filter[and][][version]': this.searchOne.version,
        'filter[and][][belong_mid]': this.searchOne.company,
        'filter[and][][belong_sid]': this.searchOne.store,
        'filter[and][][device_id]': this.searchOne.number,
        'page': this.onePage
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
    merchant () {
      let list = {
        'filter[name][like]': this.searchTwo,
        'page': this.twoPage
      }
      let qs = require('querystring')
      equipmentApi.merchantList(qs.stringify(list)).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.undistributed = returnData.data.undistributed
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
    deviceChange (val) {
      this.onePage = val
      this.request()
    },
    bussinessChange (val) {
      this.twoPage = val
      this.merchant()
    },
    business () {
      let list = {
        'disable_pagination': 1
      }
      let qs = require('querystring')
      businessApi.businessList(qs.stringify(list)).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.businessList = returnData.data.list
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
      storage.setSessionStorage('storeName', row.name)
      storage.setSessionStorage('storeId', row.id)
      this.$router.replace({name: 'Store', params: {'storeId': row.id}})
    },
    importOrder () {
       document.querySelector('#uploadFile').click()
    },
    fileUpload () {
      let formData = new FormData()
      formData.append('file', document.querySelector('#uploadFile').files[0])
      // let qs = require('querystring')
      equipmentApi.importOrder(formData).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.addPallet = false
          this.request()
        } else {
          this.$alert(returnData.msg, {
            type: 'error',
            callback: action => {
            }
          })
        }
      })
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
    },
    // 新增设备
    add (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let qs = require('querystring')
          equipmentApi.addDevice(qs.stringify(this.addDevice)).then((response) => {
            let returnData = response.data
            if (returnData.errno === 0) {
              this.addPallet = false
              this.request()
            } else {
              this.$alert(returnData.msg, {
                type: 'error',
                callback: action => {
                }
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 修改设备
    editShow (row) {
      this.title = '修改监控设备'
      this.deviceId = row.id
      this.addDevice.device_id = row.device_id
      this.addDevice.belong_mid = row.belong_mid
      this.addDevice.version = row.version
      this.addPallet = true
      this.addButton = false
    },
    closeDialog () {
      this.addPallet = false
      this.title = '修改监控设备'
      this.addButton = true
      this.$refs[formName].resetFields()
    },
    edit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let qs = require('querystring')
          equipmentApi.editDevice(qs.stringify(this.addDevice), this.deviceId).then((response) => {
            let returnData = response.data
            if (returnData.errno === 0) {
              this.addPallet = false
              this.request()
            } else {
              this.$alert(returnData.msg, {
                type: 'error',
                callback: action => {
                }
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 获取版本号
    getVersion () {
      equipmentApi.getVersion().then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.versionList = returnData.data.version_list
        } else {
          this.$alert(returnData.msg, {
            type: 'error',
            callback: action => {
            }
          })
        }
      })
    },
    // 增加版本号
    addVersion () {
      let list = {
        'version': this.version
      }
      let qs = require('querystring')
      equipmentApi.addVersion(qs.stringify(list)).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.version = ''
          this.getVersion()
        } else {
          this.$alert(returnData.msg, {
            type: 'error',
            callback: action => {
            }
          })
        }
      })
    },
    // 删除版本号
    deleVersion (id) {
      let ID = {
        'id': id
      }
      let qs = require('querystring')
      equipmentApi.deleVersion(qs.stringify(ID)).then((response) => {
        let returnData = response.data
        if (returnData.errno === 0) {
          this.getVersion()
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
.line{
  padding: 12px 0;
  border-bottom: 1px solid #ebeef5;
}
.line span{
  display:inline-block;
  width:400px;
  margin-left:100px;
}
.undinster {
  display:inline-block;
  background-color: #fef0f0;
  color: #f56c6c;
  padding: 8px 16px;
  margin-left:50px;
}
</style>