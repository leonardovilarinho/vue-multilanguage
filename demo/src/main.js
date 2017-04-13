import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import MultiLanguage from '../../src/es6'

import language from './lang/language'

Vue.use( MultiLanguage, language )


new Vue({
  el: '#app',
  render: h => h(App)
})
