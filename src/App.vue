<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  color: #ffffff;
  background-color: #f9f9f9;
}

input, .el-select-dropdown, .el-textarea, .el-textarea__inner, .el-message-box, .el-message,
.el-dropdown-menu, .el-button, .el-cascader-menu, .el-tooltip__popper, .el-picker-panel, .el-date-picker {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
a {
  color: white;
  text-decoration: none;
  cursor: pointer;
}

a:focus {
  outline :none;
}
ul,li{
	list-style: none;
}
.el-table td, .el-table th.is-leaf{
  text-align: center;
}
.el-tree-node__expand-icon.expanded{
  margin: 0;
}
.el-tree-node__expand-icon.is-leaf{
  margin: 0;
}
.el-tree-node__content>.el-checkbox{
  margin: 0;
}
.el-tree-node__label{
  margin: 0;
}

</style>
