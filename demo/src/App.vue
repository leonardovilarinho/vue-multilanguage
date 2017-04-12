<template>
  <div id="app">
    {{ l('hello', ['VueJS', 4]) }}

    <button @click="changeLanguage('en')">EN</button>
    <button @click="changeLanguage('pt')">PT</button>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>