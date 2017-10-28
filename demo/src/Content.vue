<template>
	<div>
    <lv-categories></lv-categories>
		<h3 v-lang.content.example='user'></h3>
	</div>
</template>

<script>
import LvCategories from './Categories.vue'

export default{
	name: 'lv-content',
  components: {LvCategories},
  messages: {
    pt: {
      example: 'Bem-vindo {name}, você tem {friends} amigos'
		},
		en: {
			example: 'Welcome {name}, you have {friends} friends'
		}
  },
	data() {
  	return {
  		user: {
  			name: 'Leonardo',
  			friends: 20
  		}
  	}
  }
}
</script>