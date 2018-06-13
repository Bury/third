<!-- 流量监控 -->
<template>
    <div class="flow">流量监控
    </div>
</template>

<script>
export default {
  name: 'flow',
  data () {
    return {
    }
  },
  created: function () {
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
</style>