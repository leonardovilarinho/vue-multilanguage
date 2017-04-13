<template>
  <div id="app">
    <button v-lang.language="'PT'" @click="$language = 'pt'"></button>
    <button v-lang.language="'EN'" @click="$language = 'en'"></button>

    <p v-lang.welcome.hello="user"></p>

    <p v-lang.profile.info></p>
  </div>
</template>

<script>
export default {
  name: 'app',
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