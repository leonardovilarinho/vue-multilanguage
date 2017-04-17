<template>
  <div id="app">
    <lv-menu></lv-menu>
    <lv-content></lv-content>
  </div>
</template>

<script>
import LvMenu from './Menu.vue'
import LvContent from './Content.vue'

export default {
  name: 'app',
  components: {LvMenu, LvContent},
  mounted() {
  	console.log(this)
  }
}
</script>