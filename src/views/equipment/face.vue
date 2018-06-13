<!-- 人脸识别 -->
<template>
    <div class="face">人脸识别
    </div>
</template>

<script>
export default {
  name: 'face',
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