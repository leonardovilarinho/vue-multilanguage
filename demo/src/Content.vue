<template>
	<div>
    <lv-categories></lv-categories>
		<h3 v-lang.content.example='user'>Welcome {name}, you have {friends} friends</h3>
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