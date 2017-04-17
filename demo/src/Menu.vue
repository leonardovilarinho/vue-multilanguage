<template>
	<div>
		<strong>{{title}}</strong>
		<button v-lang.language="'PT'" @click="$language = 'pt'"></button>
    	<button v-lang.language="'EN'" @click="$language = 'en'"></button>
	</div>
</template>

<script>
export default{
	name: 'lv-menu',
	computed: {
		title() {
			return this.translate(this.$language, 'title')
		}
	},
}
</script>