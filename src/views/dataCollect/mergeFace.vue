<template>
    <div class="business-list">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
        >
        </el-table-column>
        <el-table-column
          label="序号"
        >
          <template slot-scope="scope">{{ scope.row.num }}</template>
        </el-table-column>
        <el-table-column
          label="来客编号"
        >
          <template slot-scope="scope">{{ scope.row.num }}</template>
        </el-table-column>
        <el-table-column
          label="照片"
        >
          <template slot-scope="scope">{{ scope.row.num }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名别"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="年龄"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姿态角度"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="光照"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="模糊度"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="遮挡"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="脸完整度"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="识别结果"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="220"
        >
          <template slot-scope="scope" style="display: flex">
            <el-button
              size="mini"
              type="success"
              @click="manage(scope.row)">管理</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "merge-face",
      data(){
          return{
            tableData3: [{
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }],
          }
      },
    }
</script>

<style scoped>

</style>
