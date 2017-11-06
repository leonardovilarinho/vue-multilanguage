<template>
  <div id="app">
    <lv-menu-top></lv-menu-top>
    <lv-content></lv-content>
    <lv-menu-bottom></lv-menu-bottom>
    <transition name="fade">
      <p v-lang.title></p>
    </transition>
  </div>
</template>

<script>
import LvMenuTop from './MenuTop.vue'
import LvMenuBottom from './MenuBottom.vue'
import LvContent from './Content.vue'

export default {
  name: 'app',
  components: {LvMenuTop, LvMenuBottom, LvContent}
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>