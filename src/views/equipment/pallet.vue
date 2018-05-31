<!-- 货盘 -->
<template>
  <div class="pallet">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="按设备" name="first">
        <div class="search">
          <el-select placeholder="状态" style="width:120px">
            <el-option label="已禁用" value="shanghai"></el-option>
            <el-option label="已启用" value="beijing"></el-option>
          </el-select>
          <el-select placeholder="版本" style="width:120px">
            <el-option label="1.0.0" value="shanghai"></el-option>
            <el-option label="2.0.0" value="beijing"></el-option>
          </el-select>
          <el-input placeholder="搜索公司" style="width:120px"></el-input>
          <el-input placeholder="搜索门店" style="width:120px"></el-input>
          <el-input placeholder="搜索编号" style="width:120px"></el-input>
          <el-button icon="el-icon-search"></el-button>
          <div class="add">
            <el-button type="primary" @click="addPallet = true">新增</el-button>
            <el-button type="primary">批量导入</el-button>
          </div>
        </div>
        <div class="table">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="设备编号"></el-table-column>
            <el-table-column prop="name" label="所属公司"></el-table-column>
            <el-table-column prop="shop" label="门店"></el-table-column>
            <el-table-column prop="version" label="版本"></el-table-column>
            <el-table-column prop="time" label="添加时间"></el-table-column>
            <el-table-column prop="startTime" label="启用时间"></el-table-column>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-switch v-model="value3"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <i class="el-icon-setting"></i>
              </template>
            </el-table-column>
          </el-table>
          <div class="pages">
            <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <!--按商家-->
      <el-tab-pane label="按商家" name="second">
        <div class="search">
          <el-input placeholder="搜索商家" style="width:120px"></el-input>
          <el-button icon="el-icon-search"></el-button>
          未分配：30
        </div>
        <div class="table">
          <el-table :data="businessData" stripe style="width: 100%">
            <el-table-column prop="name" label="所属公司"></el-table-column>
            <el-table-column prop="number" label="件数"></el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small">进入</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pages">
            <el-pagination background layout="prev, pager, next" :total="1000">
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
            <el-option label="1.0" value="shanghai"></el-option>
            <el-option label="2.0" value="beijing"></el-option>
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
export default {
  name: 'pallet',
  data () {
    return {
      value3: true,
      activeName: 'first',
      tableData: [{
        id: 'SFGT001',
        name: '金梦园',
        shop: '湖州浙北店',
        version: '1.0',
        time: '2018-1-1',
        startTime: '2018-1-15'
      }, {
        id: 'SFGT002',
        name: '湖州金店',
        shop: '湖州浙北店',
        version: '1.0',
        time: '2018-1-1',
        startTime: '2018-1-15'
      }, {
        id: 'SFGT003',
        name: '王小虎',
        shop: '湖州浙北店',
        version: '1.0',
        time: '2018-1-1',
        startTime: '2018-1-15'
      }],
      businessData: [{
        name: '金梦园',
        number: '100'
      }, {
        name: '湖州金店',
        number: '200'
      }, {
        name: '王小虎',
        number: '300'
      }],
      addPallet: false
    }
  },
  created: function () {
    // 刷新时，获取动态数据 设置navmenu
    let templates = this.$parent
    templates.navMenu = this.$route.name
    templates.upperLevelMenu = ''
  },
  mounted: function () {
  },
  methods: {
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