import Vue from 'vue'
import App from './App.vue'
import MultiLanguage from '../../src/vue-multilanguage'

import language from './lang/language'

Vue.use( MultiLanguage, language )


new Vue({
  el: '#app',
  render: h => h(App)
})
