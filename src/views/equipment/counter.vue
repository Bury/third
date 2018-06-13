<!-- 智能柜台 -->
<template>
    <div class="counter">智能柜台
    </div>
</template>

<script>
export default {
  name: 'counter',
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