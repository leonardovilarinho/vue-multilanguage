import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import MultiLanguage from '../../src/es6'

Vue.use( MultiLanguage, { path: 'src/lang', d_language: 'pt' } )

new Vue({
  el: '#app',
  render: h => h(App)
})
