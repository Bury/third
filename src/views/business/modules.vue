<!-- 商家模块 -->
<template>
  <div class="modules">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(o, index) in 4" :key="o">
        <el-card  class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
              <span>ERP</span>
              <el-switch style="float: right; padding: 3px 0" v-model="value3"></el-switch>
            </div>
            <div class="text item">
              
              有效期剩余：<span class="day">365天</span> <i class="el-icon-circle-plus"></i>
              <el-button style="float: right; padding: 3px 0" type="text">权限设置</el-button>
              <el-form style="margin-top:20px">
                <el-form-item label="增加有效期：">
                  <el-select placeholder="请选择" style="width:125px">
                    <el-option value="1个月"></el-option>
                    <el-option value="2个月"></el-option>
                    <el-option value="3个月"></el-option>
                    <el-option value="4个月"></el-option>
                    <el-option value="5个月"></el-option>
                    <el-option value="6个月"></el-option>
                    <el-option value="7个月"></el-option>
                    <el-option value="8个月"></el-option>
                    <el-option value="9个月"></el-option>
                    <el-option value="10个月"></el-option>
                    <el-option value="11个月"></el-option>
                    <el-option value="1年"></el-option>
                    <el-option value="2年"></el-option>
                    <el-option value="3年"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'modules',
  data () {
    return {
      value3: true
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
  color: #ccc;
  font-size:22px;
  vertical-align: middle;
}
.item .day{
  color:#f00;
}
</style>