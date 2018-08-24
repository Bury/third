<template>
	<div>
		66
	</div>
</template>

<script>
export default {
  name: 'time-frame-list',
  data () {
    return {
		
    }
  },
  created: function () {
	  let templates = this.$parent
	  templates.navMenu = this.$route.name
	  templates.upperLevelMenu = ''
  },
  methods: {
    
  }
}
</script>
