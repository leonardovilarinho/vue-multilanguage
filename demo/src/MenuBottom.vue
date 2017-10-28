<template>
	<div>
		<i>{{title}}: </i>
		<button v-lang.language="'PT'" @click="language = 'pt'"></button>
    	<button v-lang.language="'EN'" @click="language = 'en'"></button>
	</div>
</template>

<script>

export default{
	name: 'lv-menu',
	messages: {
		en: {
			title: 'Switch language'
		},
		pt: {
			title: 'Alterar idioma'
		}
	},
	computed: {
		title() {
			return this.translate('title')
		}
	},
}
</script>