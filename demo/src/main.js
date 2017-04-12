import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import MultiLanguage from '../../src/es6'

Vue.use(Vuex)

const Store = new Vuex.Store({
	state: {
		mlang: {}
	}
})

Vue.use( MultiLanguage, { path: 'src/lang', d_language: 'pt', store: Store } )

new Vue({
  el: '#app',
  render: h => h(App)
})
