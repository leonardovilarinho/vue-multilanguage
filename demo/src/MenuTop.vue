<template>
	<div>
		<i>{{title}}: </i>
	</div>
</template>

<script>
export default{
	name: 'lv-menu',
	computed: {
		title() {
			return this.translate('title')
		}
	},
}
</script>